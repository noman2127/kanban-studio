# Frontend Codebase Documentation

## Overview
The frontend is a Next.js 16 application with React 19 that implements a functional demo Kanban board. It uses drag-and-drop functionality for card movement, supports card editing, column renaming, and persistent client-side state management.

## Tech Stack
- **Framework**: Next.js 16.1.6
- **UI Library**: React 19.2.3
- **Styling**: Tailwind CSS 4 with PostCSS
- **Drag & Drop**: @dnd-kit (core, sortable, utilities)
- **Testing**: 
  - Unit/Component: Vitest 3.2.4 with React Testing Library 16.3.2
  - E2E: Playwright 1.58.0
- **Code Quality**: ESLint 9

## Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── layout.tsx        # Root layout with fonts and metadata
│   │   ├── page.tsx          # Home page (displays KanbanBoard)
│   │   └── globals.css       # Global styles
│   ├── components/
│   │   ├── KanbanBoard.tsx   # Main board component with drag-and-drop
│   │   ├── KanbanColumn.tsx  # Individual column component
│   │   ├── KanbanCard.tsx    # Individual card component
│   │   ├── KanbanCardPreview.tsx  # Drag overlay preview
│   │   ├── NewCardForm.tsx   # Form for adding new cards
│   │   └── KanbanBoard.test.tsx  # Component tests
│   ├── lib/
│   │   ├── kanban.ts         # Core Kanban logic and types
│   │   └── kanban.test.ts    # Logic tests
│   └── test/
│       └── [test utilities if any]
├── e2e/
│   └── kanban.spec.ts        # E2E tests with Playwright
├── public/                   # Static assets
├── package.json
├── tsconfig.json
├── next.config.ts
├── tailwind.config.js
└── vitest.config.ts
```

## Core Components

### KanbanBoard.tsx
The main component that orchestrates the entire board.
- **State**: Manages board data (columns + cards), active card during drag
- **Features**: 
  - Drag-and-drop using @dnd-kit
  - Column renaming
  - Card creation/deletion
  - Card editing
- **Key Functions**:
  - `handleDragStart()` / `handleDragEnd()`: Manage drag operations
  - `handleRenameColumn()`: Update column title
  - `handleAddCard()`: Create new card
  - `handleDeleteCard()`: Remove card
  - `handleEditCard()`: Update card content

### KanbanColumn.tsx
Renders a single column with its cards.
- **Props**: columnId, cards, onRename, onAddCard, onDeleteCard, onEditCard
- **Features**: 
  - Rename input with enter/escape handling
  - New card form toggle
  - Displays card count

### KanbanCard.tsx
Renders a draggable card with edit capability.
- **Props**: card, columnId, onDelete, onEdit
- **Features**:
  - Draggable via @dnd-kit
  - Inline editing with modal
  - Delete button

### KanbanCardPreview.tsx
Drag overlay component that shows a preview of the card being dragged.
- Used with `<DragOverlay>` from @dnd-kit
- Mirrors KanbanCard styling

### NewCardForm.tsx
Form component for adding new cards to a column.
- **Props**: columnId, onAdd, onCancel
- **Fields**: Title (required), Details (optional)

## Data Types (lib/kanban.ts)

```typescript
type Card = {
  id: string;
  title: string;
  details: string;
};

type Column = {
  id: string;
  title: string;
  cardIds: string[];  // Array of card IDs in this column
};

type BoardData = {
  columns: Column[];
  cards: Record<string, Card>;  // Card lookup table by ID
};
```

## Key Utilities (lib/kanban.ts)

- `createId(prefix)`: Generates unique IDs with prefix (e.g., "card-123")
- `initialData`: Demo board with 5 columns and 8 cards
- `moveCard(columns, cardId, targetId)`: Moves card between columns or reorders within column
- `isColumnId(columns, id)`: Checks if ID is a column
- `findColumnId(columns, cardId)`: Finds which column contains a card

## Styling & Design System

### Fonts
- **Display**: Space Grotesk (headings, titles)
- **Body**: Manrope (body text, UI labels)
- Configured in CSS variables `--font-display` and `--font-body`

### Colors (from AGENTS.md in project root)
- **Accent Yellow**: #ecad0a (highlights, accents)
- **Blue Primary**: #209dd7 (links, key sections)
- **Purple Secondary**: #753991 (buttons, important actions)
- **Dark Navy**: #032147 (headings)
- **Gray Text**: #888888 (supporting text, labels)

### Tailwind
Uses Tailwind CSS 4 with custom colors and fonts defined in `tailwind.config.js`

## Testing

### Unit Tests (Vitest)
- `src/components/KanbanBoard.test.tsx`: Component rendering and interactions
- `src/lib/kanban.test.ts`: Utility function logic (ID creation, card movement)
- Run with: `npm run test:unit` or `npm run test:unit:watch`

### E2E Tests (Playwright)
- `e2e/kanban.spec.ts`: Full user workflows
- Test scenarios: board loads, cards drag, cards edit, cards delete
- Run with: `npm run test:e2e`

### Coverage
- Generate coverage with: `npm run test:unit` (uses @vitest/coverage-v8)
- Coverage output in: `coverage/`

## Build & Deployment

### Development
```bash
npm install
npm run dev        # Start dev server at localhost:3000
npm run lint       # Run ESLint
npm run test:all   # Run all tests
```

### Production Build
```bash
npm run build       # Builds Next.js app to .next/ directory
npm run start       # Runs production server
```

The `.next/` directory contains the static build output that will be served by the FastAPI backend.

## Current Limitations (Demo Only)
- All state is in-memory (lost on page refresh)
- No backend persistence
- No authentication
- Hardcoded initial data
- No conversation history or AI features

## Next Steps (Per PLAN.md)
1. Backend will serve this frontend statically at /
2. Auth layer will be added
3. Database persistence will be implemented
4. API integration will replace in-memory state
5. AI chat features will be added via backend

## Important Notes for Agents

1. **State Management**: Currently uses React `useState` only. When connecting to backend in Part 6, this will be replaced with API calls.

2. **Drag & Drop**: Uses @dnd-kit library. The `moveCard()` logic handles both:
   - Moving cards between columns
   - Reordering cards within the same column

3. **ID Format**: IDs use prefix notation (e.g., "col-backlog", "card-1"). This pattern should be consistent with backend IDs.

4. **Form Handling**: Escape key cancels forms, Enter submits. This UX pattern should be maintained.

5. **Responsive Design**: Currently optimized for desktop. Mobile responsiveness should be considered in future iterations.

6. **Accessibility**: Current implementation uses semantic HTML but should enhance with ARIA labels and keyboard navigation when auth layer is added.
