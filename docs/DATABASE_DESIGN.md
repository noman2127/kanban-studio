# Database Schema Design for Kanban MVP

## Overview
This document defines the database design for the Kanban MVP backend. The schema is intentionally simple, normalized, and aligned with the current frontend data model:
- Users own boards
- Boards contain columns
- Columns contain cards

## Design Goals
- Keep the data model easy to query and maintain
- Support multiple boards per user
- Preserve explicit sort order for columns and cards
- Enable safe cascade deletes when a user, board, or column is removed
- Provide a clear migration path to a production-ready relational database

## Tables and Relationships

### `users`
Stores authenticated users.
- `id`: primary key
- `username`: unique login identifier
- `created_at`, `updated_at`: timestamps

### `boards`
Stores board metadata and ownership.
- `id`: primary key
- `user_id`: foreign key to `users.id`
- `title`: board name
- `created_at`, `updated_at`: timestamps

Relationship: `users` 1 → N `boards`

### `columns`
Stores each Kanban column for a board.
- `id`: primary key
- `board_id`: foreign key to `boards.id`
- `title`: column name
- `position`: integer used for ordering columns within a board
- `created_at`, `updated_at`: timestamps

Relationship: `boards` 1 → N `columns`

### `cards`
Stores cards inside a column.
- `id`: primary key
- `column_id`: foreign key to `columns.id`
- `title`: card summary
- `details`: longer description or body text
- `position`: integer used for ordering cards within a column
- `created_at`, `updated_at`: timestamps

Relationship: `columns` 1 → N `cards`

## Constraints and Indexing
- `users.username` is unique to prevent duplicate users
- `boards.user_id` indexed for fast retrieval of a user's boards
- `columns.board_id` indexed for fast column lookup per board
- `cards.column_id` indexed for fast card lookup per column
- `columns(board_id, position)` unique to protect against duplicate column order values per board
- `cards(column_id, position)` unique to protect against duplicate card order values per column

## Cascade Delete Behavior
- Deleting a `user` cascades to their `boards`
- Deleting a `board` cascades to its `columns`
- Deleting a `column` cascades to its `cards`

This keeps the system consistent and avoids orphaned child rows.

## Sample Frontend Data Shape
The backend schema is normalized for persistence, while the frontend can hydrate board state as nested objects:
- `board` contains `columns`
- each `column` contains a list of card IDs or an embedded card list

This design allows the UI to load a full board and render draggable columns and cards efficiently.

## Future Enhancements
- Add `password_hash` and authentication metadata to `users`
- Add `board.description` or `visibility` flags
- Add `card.labels`, `due_date`, or `assignee` fields
- Add soft delete or archival flags for boards and cards
- Introduce a dedicated `activity_logs` table for auditing changes
