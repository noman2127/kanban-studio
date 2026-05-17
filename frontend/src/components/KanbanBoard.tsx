"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  DndContext,
  DragOverlay,
  MouseSensor,
  TouchSensor,
  pointerWithin,
  useSensor,
  useSensors,
  closestCorners,
  type CollisionDetection,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
  type UniqueIdentifier,
} from "@dnd-kit/core";
import { KanbanColumn } from "@/components/KanbanColumn";
import { KanbanCardPreview } from "@/components/KanbanCardPreview";
import { initialData, moveCard, type BoardData } from "@/lib/kanban";
import { useAuth } from "@/context/AuthContext";
import {
  createCard as apiCreateCard,
  deleteCard as apiDeleteCard,
  fetchBoard,
  mapBoardResponse,
  moveCard as apiMoveCard,
  updateColumn,
} from "@/lib/api";

export const KanbanBoard = () => {
  const [board, setBoard] = useState<BoardData>(() => initialData);
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const { user, logout } = useAuth();

  const showApiError = (message: string) => {
    setError(message);
    setToast(message);
  };

  useEffect(() => {
    if (!toast) {
      return;
    }
    const timeout = window.setTimeout(() => setToast(null), 3500);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        setIsLoading(true);
        const boardData = await fetchBoard();
        if (!cancelled) {
          setBoard(mapBoardResponse(boardData));
        }
      } catch (loadError) {
        console.error("Failed to load board", loadError);
        if (!cancelled) {
          showApiError("Unable to load board from backend.");
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: { distance: 6 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 120,
        tolerance: 6,
      },
    }),
  );

  const collisionDetectionStrategy: CollisionDetection = (args) => {
    const pointerCollisions = pointerWithin(args);
    if (pointerCollisions.length > 0) {
      const sourceColumnId = String(
        args.active.data.current?.sortable?.containerId ?? ""
      );
      const crossColumnCollision = pointerCollisions.find((collision) => {
        const container = args.droppableContainers.find(
          (droppable) => String(droppable.id) === String(collision.id)
        );
        const type = container?.data.current?.type;
        return type === "column" && String(collision.id) !== sourceColumnId;
      });
      if (crossColumnCollision) {
        return [crossColumnCollision];
      }
      return pointerCollisions;
    }
    return closestCorners(args);
  };

  const cardsById = useMemo(() => board.cards, [board.cards]);
  const dragMetaRef = useRef<{
    sourceColumnId?: string;
    lastOverId?: string;
    lastOverColumnId?: string;
  }>({});

  const findColumnId = (id: string) => {
    const columnById = board.columns.find((column) => column.id === id);
    if (columnById) {
      return columnById.id;
    }
    return board.columns.find((column) => column.cardIds.includes(id))?.id;
  };

  const isColumnId = (id: string) =>
    board.columns.some((column) => column.id === id);

  const resolveColumnIdFromEvent = (
    fallbackId: string,
    sortableContainerId: UniqueIdentifier | undefined
  ) => {
    // If the target is already a column droppable id, trust it directly.
    if (isColumnId(fallbackId)) {
      return fallbackId;
    }

    // For card targets, containerId indicates the owning column.
    if (
      sortableContainerId &&
      board.columns.some((column) => column.id === String(sortableContainerId))
    ) {
      return String(sortableContainerId);
    }
    return findColumnId(fallbackId);
  };

  const getPointerCoordinates = (event: DragEndEvent) => {
    const activator = event.activatorEvent;
    if (activator instanceof MouseEvent) {
      return {
        x: activator.clientX + event.delta.x,
        y: activator.clientY + event.delta.y,
      };
    }
    if (
      typeof TouchEvent !== "undefined" &&
      activator instanceof TouchEvent &&
      activator.changedTouches.length > 0
    ) {
      const touch = activator.changedTouches[0];
      return {
        x: touch.clientX + event.delta.x,
        y: touch.clientY + event.delta.y,
      };
    }
    return null;
  };

  const resolveColumnIdFromPointer = (event: DragEndEvent) => {
    const point = getPointerCoordinates(event);
    if (!point) {
      return undefined;
    }

    if (typeof document === "undefined") {
      return undefined;
    }

    const columnNodes = Array.from(
      document.querySelectorAll<HTMLElement>('[data-testid^="column-"]')
    );
    for (const node of columnNodes) {
      const rect = node.getBoundingClientRect();
      const insideX = point.x >= rect.left && point.x <= rect.right;
      const insideY = point.y >= rect.top && point.y <= rect.bottom;
      if (insideX && insideY) {
        const testId = node.dataset.testid ?? "";
        const columnId = testId.replace(/^column-/, "");
        if (isColumnId(columnId)) {
          return columnId;
        }
      }
    }

    return undefined;
  };

  const getTargetPosition = (targetColumnId: string, overId: string) => {
    if (isColumnId(overId)) {
      return undefined;
    }

    const targetColumn = board.columns.find((column) => column.id === targetColumnId);
    if (!targetColumn) {
      return undefined;
    }

    const index = targetColumn.cardIds.indexOf(overId);
    return index === -1 ? undefined : index + 1;
  };

  const handleDragStart = (event: DragStartEvent) => {
    const activeId = event.active.id as string;
    setActiveCardId(activeId);
    const sourceColumnId = resolveColumnIdFromEvent(
      activeId,
      event.active.data.current?.sortable?.containerId
    );
    dragMetaRef.current = {
      sourceColumnId,
      lastOverId: activeId,
      lastOverColumnId: sourceColumnId,
    };
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { over } = event;
    if (!over) {
      return;
    }

    const overId = over.id as string;
    const overColumnId = resolveColumnIdFromEvent(
      overId,
      over.data.current?.sortable?.containerId
    );
    if (!overColumnId) {
      return;
    }

    dragMetaRef.current.lastOverId = overId;
    dragMetaRef.current.lastOverColumnId = overColumnId;
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveCardId(null);

    const activeId = active.id as string;
    const sourceColumnId =
      dragMetaRef.current.sourceColumnId ??
      resolveColumnIdFromEvent(activeId, active.data.current?.sortable?.containerId);
    const overId = over
      ? (over.id as string)
      : (dragMetaRef.current.lastOverId ?? activeId);
    const targetColumnIdFromOver = over
      ? resolveColumnIdFromEvent(overId, over.data.current?.sortable?.containerId)
      : dragMetaRef.current.lastOverColumnId;
    const targetColumnId = resolveColumnIdFromPointer(event) ?? targetColumnIdFromOver;

    if (!sourceColumnId || !targetColumnId) {
      dragMetaRef.current = {};
      return;
    }

    const overColumnId = findColumnId(overId);
    const effectiveOverId = overColumnId === targetColumnId ? overId : targetColumnId;

    if (sourceColumnId === targetColumnId && activeId === effectiveOverId) {
      dragMetaRef.current = {};
      return;
    }

    const targetPosition = getTargetPosition(targetColumnId, effectiveOverId);
    const previousColumns = board.columns;
    const nextColumns = moveCard(board.columns, activeId, effectiveOverId);

    setBoard((prev) => ({ ...prev, columns: nextColumns }));

    try {
      const cardId = Number.parseInt(activeId, 10);
      const targetColumnNumber = Number.parseInt(targetColumnId, 10);
      if (Number.isNaN(cardId) || Number.isNaN(targetColumnNumber)) {
        throw new Error("Card or column identifier is invalid for backend move.");
      }

      await apiMoveCard(
        1,
        cardId,
        targetColumnNumber,
        targetPosition
      );
    } catch (moveError) {
      console.error('Unable to save card move', moveError);
      setBoard((prev) => ({ ...prev, columns: previousColumns }));
      showApiError('Unable to move card right now.');
    } finally {
      dragMetaRef.current = {};
    }
  };

  const handleRenameColumn = async (columnId: string, title: string) => {
    const previousTitle =
      board.columns.find((column) => column.id === columnId)?.title ?? title;
    setBoard((prev) => ({
      ...prev,
      columns: prev.columns.map((column) =>
        column.id === columnId ? { ...column, title } : column
      ),
    }));

    try {
      await updateColumn(1, parseInt(columnId, 10), title);
    } catch (renameError) {
      console.error('Unable to save column title', renameError);
      setBoard((prev) => ({
        ...prev,
        columns: prev.columns.map((column) =>
          column.id === columnId ? { ...column, title: previousTitle } : column
        ),
      }));
      showApiError('Unable to save column title.');
    }
  };

  const handleAddCard = async (
    columnId: string,
    title: string,
    details: string
  ) => {
    const temporaryCardId = `temp-${Date.now().toString(36)}-${Math.random()
      .toString(36)
      .slice(2, 7)}`;
    setBoard((prev) => ({
      ...prev,
      cards: {
        ...prev.cards,
        [temporaryCardId]: {
          id: temporaryCardId,
          title,
          details: details || 'No details yet.',
        },
      },
      columns: prev.columns.map((column) =>
        column.id === columnId
          ? { ...column, cardIds: [...column.cardIds, temporaryCardId] }
          : column
      ),
    }));

    try {
      const createdCard = await apiCreateCard(
        1,
        parseInt(columnId, 10),
        title,
        details || 'No details yet.'
      );

      const cardId = String(createdCard.id);
      setBoard((prev) => ({
        ...prev,
        cards: {
          ...Object.fromEntries(
            Object.entries(prev.cards).filter(([id]) => id !== temporaryCardId)
          ),
          [cardId]: {
            id: cardId,
            title: createdCard.title,
            details: createdCard.details,
          },
        },
        columns: prev.columns.map((column) =>
          column.id === columnId
            ? {
                ...column,
                cardIds: column.cardIds.map((id) =>
                  id === temporaryCardId ? cardId : id
                ),
              }
            : column
        ),
      }));
    } catch (addError) {
      console.error('Unable to add card', addError);
      setBoard((prev) => ({
        ...prev,
        cards: Object.fromEntries(
          Object.entries(prev.cards).filter(([id]) => id !== temporaryCardId)
        ),
        columns: prev.columns.map((column) =>
          column.id === columnId
            ? {
                ...column,
                cardIds: column.cardIds.filter((id) => id !== temporaryCardId),
              }
            : column
        ),
      }));
      showApiError('Unable to add card.');
    }
  };

  const handleDeleteCard = async (columnId: string, cardId: string) => {
    let previousBoardState: BoardData | null = null;
    setBoard((prev) => {
      previousBoardState = prev;
      return {
        ...prev,
        cards: Object.fromEntries(
          Object.entries(prev.cards).filter(([id]) => id !== cardId)
        ),
        columns: prev.columns.map((column) =>
          column.id === columnId
            ? { ...column, cardIds: column.cardIds.filter((id) => id !== cardId) }
            : column
        ),
      };
    });

    try {
      await apiDeleteCard(1, parseInt(cardId, 10));
    } catch (deleteError) {
      console.error('Unable to delete card', deleteError);
      if (previousBoardState) {
        setBoard(previousBoardState);
      }
      showApiError('Unable to delete card.');
    }
  };

  const activeCard = activeCardId ? cardsById[activeCardId] : null;

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute left-0 top-0 h-[420px] w-[420px] -translate-x-1/3 -translate-y-1/3 rounded-full bg-[radial-gradient(circle,_rgba(32,157,215,0.25)_0%,_rgba(32,157,215,0.05)_55%,_transparent_70%)]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[520px] w-[520px] translate-x-1/4 translate-y-1/4 rounded-full bg-[radial-gradient(circle,_rgba(117,57,145,0.18)_0%,_rgba(117,57,145,0.05)_55%,_transparent_75%)]" />

      <main className="relative mx-auto flex min-h-screen max-w-[1500px] flex-col gap-10 px-6 pb-16 pt-12">
        {toast && (
          <div className="fixed right-6 top-6 z-50 rounded-2xl border border-red-200 bg-red-50 px-5 py-3 text-sm font-semibold text-red-700 shadow-lg">
            {toast}
          </div>
        )}
        <header className="flex flex-col gap-6 rounded-[32px] border border-[var(--stroke)] bg-white/80 p-8 shadow-[var(--shadow)] backdrop-blur">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[var(--gray-text)]">
                Single Board Kanban
              </p>
              <h1 className="mt-3 font-display text-4xl font-semibold text-[var(--navy-dark)]">
                Kanban Studio
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-6 text-[var(--gray-text)]">
                Keep momentum visible. Rename columns, drag cards between stages,
                and capture quick notes without getting buried in settings.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="rounded-2xl border border-[var(--stroke)] bg-[var(--surface)] px-5 py-4">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--gray-text)]">
                  Focus
                </p>
                <p className="mt-2 text-lg font-semibold text-[var(--primary-blue)]">
                  One board. Five columns. Zero clutter.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-[var(--gray-text)]">
                  Welcome, {user?.username}
                </span>
                <button
                  onClick={logout}
                  className="rounded-full border border-[var(--stroke)] px-4 py-2 text-sm font-semibold uppercase tracking-wide text-[var(--gray-text)] transition hover:text-[var(--navy-dark)] hover:border-[var(--primary-blue)]"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            {board.columns.map((column) => (
              <div
                key={column.id}
                className="flex items-center gap-2 rounded-full border border-[var(--stroke)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--navy-dark)]"
              >
                <span className="h-2 w-2 rounded-full bg-[var(--accent-yellow)]" />
                {column.title}
              </div>
            ))}
          </div>
        </header>

        {error && (
          <div className="rounded-3xl border border-red-200 bg-red-50 px-6 py-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="flex min-h-[320px] items-center justify-center rounded-3xl border border-[var(--stroke)] bg-white/80 p-8 text-lg font-semibold text-[var(--navy-dark)]">
            Loading board…
          </div>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={collisionDetectionStrategy}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
          >
            <section className="grid gap-6 lg:grid-cols-5">
              {board.columns.map((column) => (
                <KanbanColumn
                  key={column.id}
                  column={column}
                  cards={column.cardIds.map((cardId) => board.cards[cardId])}
                  onRename={handleRenameColumn}
                  onAddCard={handleAddCard}
                  onDeleteCard={handleDeleteCard}
                />
              ))}
            </section>
            <DragOverlay>
              {activeCard ? (
                <div className="w-[260px]">
                  <KanbanCardPreview card={activeCard} />
                </div>
              ) : null}
            </DragOverlay>
          </DndContext>
        )}
      </main>
    </div>
  );
};
