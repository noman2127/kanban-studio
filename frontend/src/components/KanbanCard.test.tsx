import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { KanbanCard } from "@/components/KanbanCard";
import type { Card } from "@/lib/kanban";

// Mock @dnd-kit/sortable
vi.mock("@dnd-kit/sortable", () => ({
  useSortable: () => ({
    attributes: { "aria-describedby": "sortable" },
    listeners: { onClick: vi.fn() },
    setNodeRef: vi.fn(),
    transform: null,
    transition: null,
    isDragging: false,
  }),
}));

const mockCard: Card = {
  id: "test-card-1",
  title: "Test Card",
  details: "Test card details",
};

const mockOnDelete = vi.fn();

describe("KanbanCard", () => {
  beforeEach(() => {
    mockOnDelete.mockClear();
  });

  it("renders card title and details", () => {
    render(<KanbanCard card={mockCard} onDelete={mockOnDelete} />);

    expect(screen.getByText("Test Card")).toBeInTheDocument();
    expect(screen.getByText("Test card details")).toBeInTheDocument();
  });

  it("renders delete button with correct aria-label", () => {
    render(<KanbanCard card={mockCard} onDelete={mockOnDelete} />);

    const deleteButton = screen.getByRole("button", { name: /delete test card/i });
    expect(deleteButton).toBeInTheDocument();
    expect(deleteButton).toHaveTextContent("Remove");
  });

  it("calls onDelete when delete button is clicked", async () => {
    const user = userEvent.setup();
    render(<KanbanCard card={mockCard} onDelete={mockOnDelete} />);

    const deleteButton = screen.getByRole("button", { name: /delete test card/i });
    await user.click(deleteButton);

    expect(mockOnDelete).toHaveBeenCalledWith("test-card-1");
    expect(mockOnDelete).toHaveBeenCalledTimes(1);
  });

  it("has correct test id", () => {
    render(<KanbanCard card={mockCard} onDelete={mockOnDelete} />);

    expect(screen.getByTestId("card-test-card-1")).toBeInTheDocument();
  });

  it("applies correct CSS classes", () => {
    render(<KanbanCard card={mockCard} onDelete={mockOnDelete} />);

    const card = screen.getByTestId("card-test-card-1");
    expect(card).toHaveClass(
      "rounded-2xl",
      "border",
      "border-transparent",
      "bg-white",
      "px-4",
      "py-4",
      "shadow-[0_12px_24px_rgba(3,33,71,0.08)]",
      "transition-all",
      "duration-150"
    );
  });

  it("renders with different card data", () => {
    const differentCard: Card = {
      id: "different-card",
      title: "Different Title",
      details: "Different details here",
    };

    render(<KanbanCard card={differentCard} onDelete={mockOnDelete} />);

    expect(screen.getByText("Different Title")).toBeInTheDocument();
    expect(screen.getByText("Different details here")).toBeInTheDocument();
    expect(screen.getByTestId("card-different-card")).toBeInTheDocument();
  });
});