import {
  createCard,
  deleteCard,
  fetchBoard,
  loginRequest,
  moveCard,
  updateColumn,
} from "@/lib/api";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const createMockResponse = (status: number, body: unknown) =>
  ({
    ok: status >= 200 && status < 300,
    status,
    text: async () => (body === null ? "" : JSON.stringify(body)),
  }) as Response;

describe("api client", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("sends login request payload and stores token", async () => {
    const fetchMock = vi.fn(async () =>
      createMockResponse(200, { access_token: "abc123", token_type: "bearer" })
    );
    vi.stubGlobal("fetch", fetchMock);

    const token = await loginRequest("user", "password");

    expect(token).toBe("abc123");
    expect(localStorage.getItem("kanban-token")).toBe("abc123");
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/auth/login",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({ username: "user", password: "password" }),
      })
    );
  });

  it("retries board fetch on transient 503", async () => {
    localStorage.setItem("kanban-token", "user-token");
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(createMockResponse(503, { detail: "busy" }))
      .mockResolvedValueOnce(
        createMockResponse(200, {
          id: 1,
          title: "Kanban Board",
          columns: [],
        })
      );
    vi.stubGlobal("fetch", fetchMock);

    const board = await fetchBoard();

    expect(board.id).toBe(1);
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(fetchMock).toHaveBeenNthCalledWith(
      1,
      "/api/boards/1",
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: "Bearer user-token",
        }),
      })
    );
  });

  it("formats card and column mutation requests correctly", async () => {
    localStorage.setItem("kanban-token", "user-token");
    const fetchMock = vi
      .fn()
      .mockResolvedValue(createMockResponse(200, { id: 1, title: "ok" }));
    vi.stubGlobal("fetch", fetchMock);

    await updateColumn(1, 3, "Review");
    await createCard(1, 3, "Card", "Details");
    await moveCard(1, 11, 4, 2);
    await deleteCard(1, 11);

    expect(fetchMock).toHaveBeenNthCalledWith(
      1,
      "/api/boards/1/columns/3",
      expect.objectContaining({
        method: "PUT",
        body: JSON.stringify({ title: "Review" }),
      })
    );
    expect(fetchMock).toHaveBeenNthCalledWith(
      2,
      "/api/boards/1/columns/3/cards",
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({ title: "Card", details: "Details" }),
      })
    );
    expect(fetchMock).toHaveBeenNthCalledWith(
      3,
      "/api/boards/1/cards/11/move",
      expect.objectContaining({
        method: "PUT",
        body: JSON.stringify({ target_column_id: 4, target_position: 2 }),
      })
    );
    expect(fetchMock).toHaveBeenNthCalledWith(
      4,
      "/api/boards/1/cards/11",
      expect.objectContaining({
        method: "DELETE",
      })
    );
  });
});
