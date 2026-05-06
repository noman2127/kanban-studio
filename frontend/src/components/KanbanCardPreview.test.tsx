import { render, screen } from "@testing-library/react";
import { KanbanCardPreview } from "@/components/KanbanCardPreview";
import type { Card } from "@/lib/kanban";

const mockCard: Card = {
  id: "preview-card-1",
  title: "Preview Card",
  details: "Preview card details for testing",
};

describe("KanbanCardPreview", () => {
  it("renders card title and details", () => {
    render(<KanbanCardPreview card={mockCard} />);

    expect(screen.getByText("Preview Card")).toBeInTheDocument();
    expect(screen.getByText("Preview card details for testing")).toBeInTheDocument();
  });

  it("applies correct CSS classes", () => {
    render(<KanbanCardPreview card={mockCard} />);

    const card = screen.getByRole("article");
    expect(card).toHaveClass(
      "rounded-2xl",
      "border",
      "border-transparent",
      "bg-white",
      "px-4",
      "py-4",
      "shadow-[0_18px_32px_rgba(3,33,71,0.16)]"
    );
  });

  it("renders as an article element", () => {
    render(<KanbanCardPreview card={mockCard} />);

    expect(screen.getByRole("article")).toBeInTheDocument();
  });

  it("renders with different card data", () => {
    const differentCard: Card = {
      id: "different-preview",
      title: "Different Preview",
      details: "Different preview details",
    };

    render(<KanbanCardPreview card={differentCard} />);

    expect(screen.getByText("Different Preview")).toBeInTheDocument();
    expect(screen.getByText("Different preview details")).toBeInTheDocument();
  });

  it("does not render delete button (unlike KanbanCard)", () => {
    render(<KanbanCardPreview card={mockCard} />);

    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});