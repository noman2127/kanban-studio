import type { BoardData } from "@/lib/kanban";

const API_BASE = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? "";
const tokenStorageKey = "kanban-token";
const RETRYABLE_STATUS_CODES = new Set([502, 503, 504]);

const getAuthHeaders = (): HeadersInit => {
  if (typeof window === "undefined") {
    return {};
  }

  const token = localStorage.getItem(tokenStorageKey);
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const buildUrl = (path: string) => {
  if (API_BASE) {
    return `${API_BASE}${path}`;
  }

  if (typeof window !== "undefined") {
    return path;
  }

  return `http://localhost:3000${path}`;
};

const handleResponse = async (response: Response) => {
  const content = await response.text();
  if (!response.ok) {
    try {
      const json = JSON.parse(content || "{}");
      throw new Error(json.detail || json.message || response.statusText);
    } catch {
      throw new Error(content || response.statusText);
    }
  }

  if (!content) {
    return null;
  }

  return JSON.parse(content);
};

const requestWithRetry = async (
  path: string,
  init: RequestInit,
  retries = 0
) => {
  let attempts = 0;
  while (true) {
    try {
      const response = await fetch(buildUrl(path), init);
      if (
        RETRYABLE_STATUS_CODES.has(response.status) &&
        attempts < retries
      ) {
        attempts += 1;
        continue;
      }
      return response;
    } catch (error) {
      if (attempts >= retries) {
        throw error;
      }
      attempts += 1;
    }
  }
};

export type ApiCard = {
  id: number;
  title: string;
  details: string;
  position: number;
};

export type ApiColumn = {
  id: number;
  title: string;
  position: number;
  cards: ApiCard[];
};

export type ApiBoard = {
  id: number;
  title: string;
  columns: ApiColumn[];
};

export const mapBoardResponse = (board: ApiBoard): BoardData => ({
  columns: board.columns.map((column) => ({
    id: String(column.id),
    title: column.title,
    cardIds: column.cards.map((card) => String(card.id)),
  })),
  cards: Object.fromEntries(
    board.columns.flatMap((column) =>
      column.cards.map((card) => [String(card.id), {
        id: String(card.id),
        title: card.title,
        details: card.details,
      }])
    )
  ),
});

export const loginRequest = async (username: string, password: string) => {
  const response = await requestWithRetry("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  const data = await handleResponse(response);
  if (!data || !data.access_token) {
    throw new Error("Authentication failed");
  }

  localStorage.setItem(tokenStorageKey, data.access_token);
  return data.access_token as string;
};

export const fetchBoard = async () => {
  const response = await requestWithRetry("/api/boards/1", {
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
  }, 2);

  return (await handleResponse(response)) as ApiBoard;
};

export const updateColumn = async (boardId: number, columnId: number, title: string) => {
  const response = await requestWithRetry(`/api/boards/${boardId}/columns/${columnId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify({ title }),
  });

  return (await handleResponse(response)) as { id: number; title: string };
};

export const createCard = async (
  boardId: number,
  columnId: number,
  title: string,
  details: string
) => {
  const response = await requestWithRetry(`/api/boards/${boardId}/columns/${columnId}/cards`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify({ title, details }),
  });

  return (await handleResponse(response)) as ApiCard;
};

export const deleteCard = async (boardId: number, cardId: number) => {
  const response = await requestWithRetry(`/api/boards/${boardId}/cards/${cardId}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  return await handleResponse(response);
};

export const moveCard = async (
  boardId: number,
  cardId: number,
  targetColumnId: number,
  targetPosition?: number
) => {
  const response = await requestWithRetry(`/api/boards/${boardId}/cards/${cardId}/move`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify({ target_column_id: targetColumnId, target_position: targetPosition }),
  });

  return await handleResponse(response);
};
