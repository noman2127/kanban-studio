# Detailed Implementation Plan - Project Management MVP

> Testing note: Aim for 80% coverage only when it adds meaningful value. Prefer high-value unit and integration tests over coverage chasing.

## Part 1: Planning & Documentation
**Objective**: Create comprehensive, detailed plan with substeps, test criteria, and success conditions. Document the existing frontend codebase.

### Substeps:
- [x] Enrich PLAN.md with detailed substeps, test criteria, and success conditions for Parts 1-9 (THIS FILE)
- [x] Create frontend/AGENTS.md documenting existing frontend code, architecture, components, and state management
- [x] User reviews and approves the enriched plan
- [x] User approves frontend AGENTS.md documentation

### Test Criteria:
- Plan includes at least 3 substeps per part
- Plan includes clear success criteria for each part
- Plan includes specific test requirements (unit tests, integration tests, e2e tests)
- Frontend documentation is accurate and reflects current codebase

### Success Criteria:
- ✅ PLAN.md is detailed and actionable
- ✅ Frontend AGENTS.md accurately describes existing code
- ✅ User confirms plan is ready to execute
- ✅ No ambiguity about what each part should accomplish


## Part 2: Frontend Build & Serve
**Objective**: Set up backend infrastructure to statically build and serve the Next.js frontend at /.

### Substeps:
- [x] Create Python FastAPI backend project structure in backend/
- [x] Scaffold FastAPI with ASGI server configuration
- [x] Set up Next.js build pipeline (npm run build → .next/ output)
- [x] Create FastAPI endpoint to serve static frontend files from .next/
- [x] Test that navigating to / displays the Kanban board correctly
- [x] Verify all frontend assets load (CSS, JS, fonts)
- [x] Add frontend unit tests to verify UI components render correctly
- [x] Add integration test: app loads at / and displays Kanban board
- [x] Create backend README documenting setup and build process

### Test Criteria:
- Unit tests: All React components pass rendering tests
- Integration test: GET / returns HTML with Kanban board
- Verify: No console errors in browser
- Verify: Drag-and-drop functionality works
- Verify: All colors and fonts display correctly (per design system)

### Success Criteria:
- ✅ FastAPI server starts successfully
- ✅ Frontend builds without errors
- ✅ GET / serves the frontend correctly
- ✅ Kanban board displays at / with full functionality
- ✅ All tests pass (unit + integration)

---

## Part 3: Authentication Layer
**Objective**: Add login/logout flow with dummy credentials ("user", "password").

### Substeps:
- [x] Create Auth context in frontend (store current user)
- [x] Create Login page component with form (username/password fields)
- [x] Add client-side auth validation (email/password required)
- [x] Create protected route wrapper for Kanban board
- [x] Redirect unauthenticated users from / to /login
- [x] Implement logout button (clears auth state, redirects to /login)
- [x] Add success toast/feedback on login
- [x] Add error handling for invalid credentials
- [x] Create tests: Login with valid credentials → see Kanban
- [x] Create tests: Login with invalid credentials → see error
- [x] Create tests: Logout → redirected to /login
- [x] Create tests: Direct access to / without auth → redirected to /login
- [x] Verify session persists on page reload (localStorage/cookie)

### Test Criteria:
- Unit tests: Auth context manages state correctly
- Unit tests: Login validation works
- E2E tests: Full login/logout flow
- E2E tests: Protected route redirects work
- Verify: No auth errors in console

### Success Criteria:
- ✅ / redirects to /login if not authenticated
- ✅ Login with "user"/"password" succeeds
- ✅ Invalid credentials show error message
- ✅ Kanban displays after login
- ✅ Logout button works, clears session
- ✅ Session persists on page reload
- ✅ All auth tests pass

---

## Part 4: Database Schema Design
**Objective**: Design and document the database schema for Kanban persistence.

### Substeps:
- [x] Design User table schema (id, username, created_at, updated_at)
- [x] Design Kanban Board table schema (id, user_id, title, created_at, updated_at)
- [x] Design Column table schema (id, board_id, title, position, created_at, updated_at)
- [x] Design Card table schema (id, column_id, title, details, position, created_at, updated_at)
- [x] Document relationships (User → Board → Column → Card)
- [x] Create docs/DATABASE_SCHEMA.json with full schema in JSON format
- [x] Document indexing strategy (user_id, board_id, column_id for query performance)
- [x] Document constraints (foreign keys, unique constraints, cascade deletes)
- [x] Create docs/DATABASE_DESIGN.md explaining design decisions
- [x] Create sample JSON showing a complete Kanban board structure

### Test Criteria:
- Schema includes all required fields
- Relationships are properly defined
- JSON schema is valid and well-formed
- Design document explains rationale for each table

### Success Criteria:
- ✅ docs/DATABASE_SCHEMA.json is complete and valid
- ✅ docs/DATABASE_DESIGN.md explains all design decisions
- ✅ User reviews and approves schema
- ✅ Schema supports all features from Part 1 requirements

---

## Part 5: Backend API & Database
**Objective**: Build API routes and SQLite database for persistent Kanban operations.

### Substeps:
- [ ] Initialize SQLite database (create if doesn't exist on startup)
- [ ] Set up SQLAlchemy ORM with database models (User, Board, Column, Card)
- [ ] Create database initialization script that creates tables on startup
- [ ] Implement POST /api/auth/login endpoint (validate credentials, return token)
- [ ] Implement GET /api/boards/:boardId endpoint (return board with all columns/cards)
- [ ] Implement POST /api/boards/:boardId/columns endpoint (create new column)
- [ ] Implement PUT /api/boards/:boardId/columns/:columnId endpoint (rename column)
- [ ] Implement POST /api/boards/:boardId/columns/:columnId/cards endpoint (create card)
- [ ] Implement PUT /api/boards/:boardId/cards/:cardId endpoint (update card)
- [ ] Implement DELETE /api/boards/:boardId/cards/:cardId endpoint (delete card)
- [ ] Implement PUT /api/boards/:boardId/cards/:cardId/move endpoint (move card between columns)
- [ ] Add middleware to validate auth token on protected routes
- [ ] Create seed script with test user and sample board data
- [ ] Write backend unit tests for each endpoint (mock database)
- [ ] Write integration tests that create/read/update/delete data
- [ ] Test database persists data across server restarts

### Test Criteria:
- Unit tests: Each endpoint returns correct status codes (200, 201, 400, 401, 404)
- Unit tests: Invalid requests are rejected with appropriate errors
- Integration tests: Full CRUD operations work end-to-end
- Integration tests: Database correctly stores and retrieves data
- Verify: No SQL injection vulnerabilities
- Verify: Auth token validation works correctly

### Success Criteria:
- ✅ All API endpoints implemented
- ✅ SQLite database created and populated on startup
- ✅ All backend tests pass (unit + integration)
- ✅ Database persists data correctly
- ✅ Auth middleware protects endpoints
- ✅ Error handling is consistent and informative

---

## Part 6: Frontend + Backend Integration
**Objective**: Connect frontend to backend API so Kanban state persists.

### Substeps:
- [ ] Replace hardcoded board data with API calls (useEffect in KanbanBoard)
- [ ] Implement GET /boards/:boardId to fetch initial board state
- [ ] Create API client utilities for all CRUD operations
- [ ] Update card creation to call POST /boards/:boardId/cards
- [ ] Update card deletion to call DELETE /boards/:boardId/cards/:cardId
- [ ] Update card move to call PUT /boards/:boardId/cards/:cardId/move
- [ ] Update column rename to call PUT /boards/:boardId/columns/:columnId
- [ ] Add loading states (show spinner while API calls complete)
- [ ] Add error handling (show toast on API errors, retry logic)
- [ ] Add optimistic UI updates (update UI before API response)
- [ ] Test all CRUD operations persist correctly
- [ ] Test error recovery (network failure, invalid data)
- [ ] Test concurrent updates don't cause race conditions
- [ ] E2E test: Complete workflow from login → modify board → refresh page → changes persist

### Test Criteria:
- Unit tests: API client methods format requests correctly
- Integration tests: Frontend API calls succeed and update state
- E2E tests: Full user workflows work (create/edit/move/delete cards)
- Verify: No duplicate API calls
- Verify: Errors are handled gracefully
- Verify: UI stays in sync with backend

### Success Criteria:
- ✅ Frontend fetches board from backend on load
- ✅ All card operations persist to database
- ✅ Changes visible after page refresh
- ✅ Loading states provide good UX
- ✅ Errors are handled gracefully
- ✅ All tests pass

---

## Part 7: AI Connectivity
**Objective**: Test API connection to OpenRouter and verify AI responses.

### Substeps:
- [ ] Create backend/services/ai_service.py for OpenRouter integration
- [ ] Implement function to call OpenRouter with gpt-oss-120b model
- [ ] Create POST /api/ai/test endpoint for testing connectivity
- [ ] Test endpoint: Send "2+2" to AI and verify response is "4"
- [ ] Test endpoint: Verify API returns proper error handling
- [ ] Add timeout handling (30 second timeout for AI calls)
- [ ] Add retry logic for transient failures
- [ ] Log all AI API calls (request/response/latency)
- [ ] Create unit tests for AI service error cases
- [ ] Create integration test: Full call to OpenRouter and back
- [ ] Document AI integration in backend README

### Test Criteria:
- Unit tests: AI service handles API errors
- Unit tests: Timeout handling works
- Unit tests: Retry logic works
- Integration test: Successfully calls OpenRouter and gets response
- Verify: API key is read from .env correctly
- Verify: No API key is logged or exposed

### Success Criteria:
- ✅ POST /api/ai/test endpoint works
- ✅ "2+2" test returns correct response
- ✅ Error handling is robust
- ✅ Timeout and retry logic work
- ✅ All tests pass

---

## Part 8: AI Context & Structured Outputs
**Objective**: Extend AI calls to include Kanban board context and return structured updates.

### Substeps:
- [ ] Create AI response schema with Structured Outputs (response text + optional board updates)
- [ ] Update AI service to accept board context JSON
- [ ] Implement POST /api/boards/:boardId/ai-ask endpoint
- [ ] Send user question + full board JSON + conversation history to AI
- [ ] Parse AI Structured Output response (text + optional card operations)
- [ ] Implement card creation from AI response
- [ ] Implement card update from AI response
- [ ] Implement card move from AI response
- [ ] Implement card delete from AI response
- [ ] Add conversation history storage (store messages in database)
- [ ] Create unit tests: AI schema validation
- [ ] Create unit tests: Board context formatting
- [ ] Create integration tests: Full AI → board update flow
- [ ] Test AI response with no board updates (conversation only)
- [ ] Test AI response with multiple card operations
- [ ] Test error handling when AI response is invalid

### Test Criteria:
- Unit tests: AI schema parses correctly
- Unit tests: Board context JSON is formatted correctly
- Integration tests: AI responses update board correctly
- Integration tests: Conversation history is stored
- Verify: Board state is correct after AI updates
- Verify: Invalid AI responses don't corrupt board

### Success Criteria:
- ✅ POST /api/boards/:boardId/ai-ask endpoint works
- ✅ AI receives full board context
- ✅ AI responses parsed into card operations
- ✅ Board updates applied correctly
- ✅ Conversation history stored
- ✅ All tests pass

---

## Part 9: AI Chat Sidebar UI
**Objective**: Build beautiful sidebar widget for full AI chat experience with auto-refresh on board updates.

### Substeps:
- [ ] Create ChatSidebar component (right-side panel)
- [ ] Create MessageList component (displays conversation history)
- [ ] Create ChatInput component (text input + send button)
- [ ] Implement typing indicator while AI is responding
- [ ] Call POST /api/boards/:boardId/ai-ask on message send
- [ ] Display AI response in chat
- [ ] Parse and apply board updates from AI response
- [ ] Auto-refresh Kanban board when AI makes updates (real-time feel)
- [ ] Add error state (show error message if AI call fails)
- [ ] Add loading skeleton for empty chat
- [ ] Implement scroll-to-bottom on new messages
- [ ] Add markdown support for AI responses (if needed)
- [ ] Create responsive design (sidebar visible on desktop, collapsible on mobile)
- [ ] Add close/collapse button for sidebar
- [ ] Create unit tests: ChatSidebar renders correctly
- [ ] Create unit tests: MessageList displays messages
- [ ] Create unit tests: ChatInput sends message correctly
- [ ] Create E2E tests: Full chat flow (ask question → see response → see board update)
- [ ] Create E2E tests: Multiple messages in conversation
- [ ] Verify styling matches design system (colors, fonts, spacing)

### Test Criteria:
- Unit tests: Components render correctly
- Unit tests: Message input/output works
- E2E tests: Full chat conversation works
- E2E tests: Board updates visible in real-time
- Verify: UI is responsive
- Verify: No console errors
- Verify: Styling matches design system

### Success Criteria:
- ✅ ChatSidebar displays on all pages after login
- ✅ Users can type messages and send to AI
- ✅ AI responses display in chat
- ✅ Board updates visible immediately when AI makes changes
- ✅ UI is beautiful and matches design system
- ✅ All tests pass
- ✅ MVP is complete and functional