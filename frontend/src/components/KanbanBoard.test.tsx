import { render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import { KanbanBoard } from "@/components/KanbanBoard";

const boardResponse = {
  id: 1,
  title: "Kanban Board",
  columns: [
    { id: 1, title: "Backlog", position: 1, cards: [] },
    { id: 2, title: "Discovery", position: 2, cards: [] },
    { id: 3, title: "In Progress", position: 3, cards: [] },
    { id: 4, title: "Review", position: 4, cards: [] },
    { id: 5, title: "Done", position: 5, cards: [] },
  ],
};

const createFetchMock = () => {
  return vi.fn(async (input: RequestInfo, init?: RequestInit) => {
    const url = String(input);
    const method = init?.method ?? "GET";

    if (url.endsWith("/api/boards/1") && method === "GET") {
      return {
        ok: true,
        status: 200,
        text: async () => JSON.stringify(boardResponse),
      } as unknown as Response;
    }

    if (method === "PUT" && /\/api\/boards\/1\/columns\/\d+$/.test(url)) {
      const body = init?.body ? JSON.parse(String(init.body)) : {};
      const columnId = Number(url.split("/").at(-1));
      return {
        ok: true,
        status: 200,
        text: async () => JSON.stringify({ id: columnId, title: body.title }),
      } as unknown as Response;
    }

    if (method === "POST" && /\/api\/boards\/1\/columns\/\d+\/cards$/.test(url)) {
      const body = init?.body ? JSON.parse(String(init.body)) : {};
      return {
        ok: true,
        status: 201,
        text: async () =>
          JSON.stringify({ id: 999, title: body.title, details: body.details, position: 1 }),
      } as unknown as Response;
    }

    if (method === "DELETE" && /\/api\/boards\/1\/cards\/\d+$/.test(url)) {
      return {
        ok: true,
        status: 200,
        text: async () => JSON.stringify({ detail: "Card deleted" }),
      } as unknown as Response;
    }

    if (method === "PUT" && /\/api\/boards\/1\/cards\/\d+\/move$/.test(url)) {
      return {
        ok: true,
        status: 200,
        text: async () => JSON.stringify({ detail: "Card moved" }),
      } as unknown as Response;
    }

    return {
      ok: false,
      status: 404,
      text: async () => JSON.stringify({ detail: "Not Found" }),
    } as unknown as Response;
  });
};

// Mock the useAuth hook
vi.mock('../context/AuthContext', () => ({
  useAuth: () => ({
    user: { username: 'testuser', loginTime: Date.now() },
    logout: vi.fn(),
  }),
}));

describe("KanbanBoard", () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', createFetchMock());
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders five columns", async () => {
    render(<KanbanBoard />);
    const columns = await screen.findAllByTestId(/column-/i);
    expect(columns).toHaveLength(5);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("displays welcome message and logout button", async () => {
    render(<KanbanBoard />);
    expect(await screen.findByText("Welcome, testuser")).toBeInTheDocument();
    expect(await screen.findByRole("button", { name: "Logout" })).toBeInTheDocument();
  });

  it("renames a column", async () => {
    render(<KanbanBoard />);
    const columns = await screen.findAllByTestId(/column-/i);
    const column = columns[0];
    const input = within(column).getByLabelText("Column title");
    await userEvent.clear(input);
    await userEvent.type(input, "New Name");
    expect(input).toHaveValue("New Name");
  });

  it("adds and removes a card", async () => {
    render(<KanbanBoard />);
    const columns = await screen.findAllByTestId(/column-/i);
    const column = columns[0];
    const addButton = within(column).getByRole("button", {
      name: /add a card/i,
    });
    await userEvent.click(addButton);

    const titleInput = within(column).getByPlaceholderText(/card title/i);
    await userEvent.type(titleInput, "New card");
    const detailsInput = within(column).getByPlaceholderText(/details/i);
    await userEvent.type(detailsInput, "Notes");

    await userEvent.click(within(column).getByRole("button", { name: /add card/i }));

    expect(within(column).getByText("New card")).toBeInTheDocument();

    const deleteButton = within(column).getByRole("button", {
      name: /delete new card/i,
    });
    await userEvent.click(deleteButton);

    expect(within(column).queryByText("New card")).not.toBeInTheDocument();
  });

  it("shows backend error message when board load fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => ({
        ok: false,
        status: 500,
        text: async () => JSON.stringify({ detail: "backend down" }),
      })) as unknown as typeof fetch
    );

    render(<KanbanBoard />);

    const errors = await screen.findAllByText("Unable to load board from backend.");
    expect(errors.length).toBeGreaterThan(0);
  });
});
