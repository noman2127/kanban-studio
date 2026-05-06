import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NewCardForm } from "@/components/NewCardForm";

const mockOnAdd = vi.fn();

describe("NewCardForm", () => {
  beforeEach(() => {
    mockOnAdd.mockClear();
  });

  it("renders add card button initially", () => {
    render(<NewCardForm onAdd={mockOnAdd} />);

    expect(screen.getByRole("button", { name: /add a card/i })).toBeInTheDocument();
    expect(screen.queryByPlaceholderText("Card title")).not.toBeInTheDocument();
  });

  it("opens form when add card button is clicked", async () => {
    const user = userEvent.setup();
    render(<NewCardForm onAdd={mockOnAdd} />);

    const addButton = screen.getByRole("button", { name: /add a card/i });
    await user.click(addButton);

    expect(screen.getByPlaceholderText("Card title")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Details")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /add card/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /cancel/i })).toBeInTheDocument();
  });

  it("closes form when cancel button is clicked", async () => {
    const user = userEvent.setup();
    render(<NewCardForm onAdd={mockOnAdd} />);

    // Open form
    await user.click(screen.getByRole("button", { name: /add a card/i }));

    // Cancel
    await user.click(screen.getByRole("button", { name: /cancel/i }));

    expect(screen.queryByPlaceholderText("Card title")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: /add a card/i })).toBeInTheDocument();
  });

  it("submits form with title and details", async () => {
    const user = userEvent.setup();
    render(<NewCardForm onAdd={mockOnAdd} />);

    // Open form
    await user.click(screen.getByRole("button", { name: /add a card/i }));

    // Fill form
    await user.type(screen.getByPlaceholderText("Card title"), "New Card Title");
    await user.type(screen.getByPlaceholderText("Details"), "Card details here");

    // Submit
    await user.click(screen.getByRole("button", { name: /add card/i }));

    expect(mockOnAdd).toHaveBeenCalledWith("New Card Title", "Card details here");
    expect(mockOnAdd).toHaveBeenCalledTimes(1);

    // Form should close after submission
    expect(screen.queryByPlaceholderText("Card title")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: /add a card/i })).toBeInTheDocument();
  });

  it("trims whitespace from title and details", async () => {
    const user = userEvent.setup();
    render(<NewCardForm onAdd={mockOnAdd} />);

    // Open form
    await user.click(screen.getByRole("button", { name: /add a card/i }));

    // Fill form with whitespace
    await user.type(screen.getByPlaceholderText("Card title"), "  New Card Title  ");
    await user.type(screen.getByPlaceholderText("Details"), "  Card details  ");

    // Submit
    await user.click(screen.getByRole("button", { name: /add card/i }));

    expect(mockOnAdd).toHaveBeenCalledWith("New Card Title", "Card details");
  });

  it("does not submit when title is empty", async () => {
    const user = userEvent.setup();
    render(<NewCardForm onAdd={mockOnAdd} />);

    // Open form
    await user.click(screen.getByRole("button", { name: /add a card/i }));

    // Fill only details
    await user.type(screen.getByPlaceholderText("Details"), "Some details");

    // Try to submit
    await user.click(screen.getByRole("button", { name: /add card/i }));

    expect(mockOnAdd).not.toHaveBeenCalled();

    // Form should still be open
    expect(screen.getByPlaceholderText("Card title")).toBeInTheDocument();
  });

  it("does not submit when title is only whitespace", async () => {
    const user = userEvent.setup();
    render(<NewCardForm onAdd={mockOnAdd} />);

    // Open form
    await user.click(screen.getByRole("button", { name: /add a card/i }));

    // Fill title with only whitespace
    await user.type(screen.getByPlaceholderText("Card title"), "   ");
    await user.type(screen.getByPlaceholderText("Details"), "Some details");

    // Try to submit
    await user.click(screen.getByRole("button", { name: /add card/i }));

    expect(mockOnAdd).not.toHaveBeenCalled();

    // Form should still be open
    expect(screen.getByPlaceholderText("Card title")).toBeInTheDocument();
  });

  it("resets form state after submission", async () => {
    const user = userEvent.setup();
    render(<NewCardForm onAdd={mockOnAdd} />);

    // Open form
    await user.click(screen.getByRole("button", { name: /add a card/i }));

    // Fill form
    await user.type(screen.getByPlaceholderText("Card title"), "Test Card");
    await user.type(screen.getByPlaceholderText("Details"), "Test details");

    // Submit
    await user.click(screen.getByRole("button", { name: /add card/i }));

    // Re-open form
    await user.click(screen.getByRole("button", { name: /add a card/i }));

    // Check inputs are empty
    expect(screen.getByPlaceholderText("Card title")).toHaveValue("");
    expect(screen.getByPlaceholderText("Details")).toHaveValue("");
  });

  it("resets form state when cancelled", async () => {
    const user = userEvent.setup();
    render(<NewCardForm onAdd={mockOnAdd} />);

    // Open form
    await user.click(screen.getByRole("button", { name: /add a card/i }));

    // Fill form
    await user.type(screen.getByPlaceholderText("Card title"), "Test Card");
    await user.type(screen.getByPlaceholderText("Details"), "Test details");

    // Cancel
    await user.click(screen.getByRole("button", { name: /cancel/i }));

    // Re-open form
    await user.click(screen.getByRole("button", { name: /add a card/i }));

    // Check inputs are empty
    expect(screen.getByPlaceholderText("Card title")).toHaveValue("");
    expect(screen.getByPlaceholderText("Details")).toHaveValue("");
  });

  it("has correct form structure", async () => {
    const user = userEvent.setup();
    render(<NewCardForm onAdd={mockOnAdd} />);

    // Open form
    await user.click(screen.getByRole("button", { name: /add a card/i }));

    const form = document.querySelector("form");
    expect(form).toBeInTheDocument();

    const titleInput = screen.getByPlaceholderText("Card title");
    expect(titleInput).toHaveAttribute("required");

    const detailsTextarea = screen.getByPlaceholderText("Details");
    expect(detailsTextarea).toHaveAttribute("rows", "3");
  });
});