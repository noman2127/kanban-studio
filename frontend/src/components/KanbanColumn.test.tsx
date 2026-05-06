import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { KanbanColumn } from "@/components/KanbanColumn";
import type { Card, Column } from "@/lib/kanban";

// Mock @dnd-kit/core
vi.mock("@dnd-kit/core", () => ({
  useDroppable: () => ({
    setNodeRef: vi.fn(),
    isOver: false,
  }),
}));

// Mock @dnd-kit/sortable
vi.mock("@dnd-kit/sortable", () => ({
  SortableContext: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  verticalListSortingStrategy: vi.fn(),
}));

// Mock KanbanCard component
vi.mock("@/components/KanbanCard", () => ({
  KanbanCard: ({ card, onDelete }: { card: Card; onDelete: (id: string) => void }) => (
    <div data-testid={`mock-card-${card.id}`}>
      <h4>{card.title}</h4>
      <button onClick={() => onDelete(card.id)} aria-label={`Delete ${card.title}`}>
        Delete
      </button>
    </div>
  ),
}));

// Mock NewCardForm component
vi.mock("@/components/NewCardForm", () => ({
  NewCardForm: ({ onAdd }: { onAdd: (title: string, details: string) => void }) => (
    <div data-testid="new-card-form">
      <button onClick={() => onAdd("New Card", "Details")}>Add Card</button>
    </div>
  ),
}));

const mockColumn: Column = {
  id: "test-column",
  title: "Test Column",
  cardIds: ["card-1", "card-2"],
};

const mockCards: Card[] = [
  { id: "card-1", title: "Card One", details: "Details one" },
  { id: "card-2", title: "Card Two", details: "Details two" },
];

const mockOnRename = vi.fn();
const mockOnAddCard = vi.fn();
const mockOnDeleteCard = vi.fn();

describe("KanbanColumn", () => {
  beforeEach(() => {
    mockOnRename.mockClear();
    mockOnAddCard.mockClear();
    mockOnDeleteCard.mockClear();
  });

  it("renders column title and card count", () => {
    render(
      <KanbanColumn
        column={mockColumn}
        cards={mockCards}
        onRename={mockOnRename}
        onAddCard={mockOnAddCard}
        onDeleteCard={mockOnDeleteCard}
      />
    );

    expect(screen.getByDisplayValue("Test Column")).toBeInTheDocument();
    expect(screen.getByText("2 cards")).toBeInTheDocument();
  });

  it("renders cards in the column", () => {
    render(
      <KanbanColumn
        column={mockColumn}
        cards={mockCards}
        onRename={mockOnRename}
        onAddCard={mockOnAddCard}
        onDeleteCard={mockOnDeleteCard}
      />
    );

    expect(screen.getByTestId("mock-card-card-1")).toBeInTheDocument();
    expect(screen.getByTestId("mock-card-card-2")).toBeInTheDocument();
  });

  it("renders empty state when no cards", () => {
    render(
      <KanbanColumn
        column={{ ...mockColumn, cardIds: [] }}
        cards={[]}
        onRename={mockOnRename}
        onAddCard={mockOnAddCard}
        onDeleteCard={mockOnDeleteCard}
      />
    );

    expect(screen.getByText("Drop a card here")).toBeInTheDocument();
    expect(screen.getByText("0 cards")).toBeInTheDocument();
  });

  it("calls onRename when title is changed", async () => {
    const user = userEvent.setup();
    render(
      <KanbanColumn
        column={mockColumn}
        cards={mockCards}
        onRename={mockOnRename}
        onAddCard={mockOnAddCard}
        onDeleteCard={mockOnDeleteCard}
      />
    );

    const titleInput = screen.getByLabelText("Column title");
    await user.clear(titleInput);
    await user.type(titleInput, "New Column Title");

    expect(mockOnRename).toHaveBeenCalled();
    expect(mockOnRename).toHaveBeenCalledWith("test-column", expect.any(String));
  });

  it("renders NewCardForm component", () => {
    render(
      <KanbanColumn
        column={mockColumn}
        cards={mockCards}
        onRename={mockOnRename}
        onAddCard={mockOnAddCard}
        onDeleteCard={mockOnDeleteCard}
      />
    );

    expect(screen.getByTestId("new-card-form")).toBeInTheDocument();
  });

  it("has correct test id", () => {
    render(
      <KanbanColumn
        column={mockColumn}
        cards={mockCards}
        onRename={mockOnRename}
        onAddCard={mockOnAddCard}
        onDeleteCard={mockOnDeleteCard}
      />
    );

    expect(screen.getByTestId("column-test-column")).toBeInTheDocument();
  });

  it("applies correct CSS classes", () => {
    render(
      <KanbanColumn
        column={mockColumn}
        cards={mockCards}
        onRename={mockOnRename}
        onAddCard={mockOnAddCard}
        onDeleteCard={mockOnDeleteCard}
      />
    );

    const column = screen.getByTestId("column-test-column");
    expect(column).toHaveClass(
      "flex",
      "min-h-[520px]",
      "flex-col",
      "rounded-3xl",
      "border",
      "border-[var(--stroke)]",
      "bg-[var(--surface-strong)]",
      "p-4",
      "shadow-[var(--shadow)]",
      "transition"
    );
  });

  it("renders with different column data", () => {
    const differentColumn: Column = {
      id: "different-column",
      title: "Different Column",
      cardIds: ["single-card"],
    };

    const singleCard: Card[] = [
      { id: "single-card", title: "Single Card", details: "Only one" },
    ];

    render(
      <KanbanColumn
        column={differentColumn}
        cards={singleCard}
        onRename={mockOnRename}
        onAddCard={mockOnAddCard}
        onDeleteCard={mockOnDeleteCard}
      />
    );

    expect(screen.getByDisplayValue("Different Column")).toBeInTheDocument();
    expect(screen.getByText("1 cards")).toBeInTheDocument();
    expect(screen.getByTestId("mock-card-single-card")).toBeInTheDocument();
  });
});