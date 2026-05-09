import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { AuthProvider, useAuth } from "./AuthContext";

const createFetchMock = () => {
  return vi.fn(async (_input: RequestInfo, init?: RequestInit) => {
    const body = init?.body ? JSON.parse(String(init.body)) : {};
    const ok = body.username === 'user' && body.password === 'password';
    return {
      ok,
      status: ok ? 200 : 401,
      text: async () =>
        JSON.stringify(
          ok
            ? { access_token: 'test-token', token_type: 'bearer' }
            : { detail: 'Invalid username or password' }
        ),
    } as unknown as Response;
  });
};

// Test component that uses the auth context
const TestComponent = () => {
  const { user, login, logout, isLoading } = useAuth();

  const handleLogin = async () => {
    await login('user', 'password');
  };

  const handleInvalidLogin = async () => {
    await login('wrong', 'wrong');
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {user ? (
        <div>
          <span data-testid="username">{user.username}</span>
          <button onClick={logout} data-testid="logout-btn">Logout</button>
        </div>
      ) : (
        <div>
          <button onClick={handleLogin} data-testid="login-btn">Login</button>
          <button onClick={handleInvalidLogin} data-testid="invalid-login-btn">Invalid Login</button>
        </div>
      )}
    </div>
  );
};

describe('AuthContext', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.stubGlobal('fetch', createFetchMock());
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('provides initial unauthenticated state', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId('login-btn')).toBeInTheDocument();
    expect(screen.queryByTestId('username')).not.toBeInTheDocument();
  });

  it('logs in with valid credentials', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    const loginBtn = screen.getByTestId('login-btn');
    fireEvent.click(loginBtn);

    await waitFor(() => {
      expect(screen.getByTestId('username')).toHaveTextContent('user');
    });

    expect(screen.getByTestId('logout-btn')).toBeInTheDocument();
  });

  it('rejects invalid credentials', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    const invalidLoginBtn = screen.getByTestId('invalid-login-btn');
    fireEvent.click(invalidLoginBtn);

    // Should still be unauthenticated
    await waitFor(() => {
      expect(screen.getByTestId('login-btn')).toBeInTheDocument();
    });

    expect(screen.queryByTestId('username')).not.toBeInTheDocument();
  });

  it('logs out successfully', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // Login first
    const loginBtn = screen.getByTestId('login-btn');
    fireEvent.click(loginBtn);

    await waitFor(() => {
      expect(screen.getByTestId('username')).toHaveTextContent('user');
    });

    // Then logout
    const logoutBtn = screen.getByTestId('logout-btn');
    fireEvent.click(logoutBtn);

    await waitFor(() => {
      expect(screen.getByTestId('login-btn')).toBeInTheDocument();
    });

    expect(screen.queryByTestId('username')).not.toBeInTheDocument();
  });

  it('persists authentication in localStorage', async () => {
    const { rerender } = render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // Login
    const loginBtn = screen.getByTestId('login-btn');
    fireEvent.click(loginBtn);

    await waitFor(() => {
      expect(screen.getByTestId('username')).toHaveTextContent('user');
    });

    // Re-render to simulate page reload
    rerender(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // Should still be authenticated
    await waitFor(() => {
      expect(screen.getByTestId('username')).toHaveTextContent('user');
    });
  });

  it('clears localStorage on logout', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // Login
    const loginBtn = screen.getByTestId('login-btn');
    fireEvent.click(loginBtn);

    await waitFor(() => {
      expect(screen.getByTestId('username')).toHaveTextContent('user');
    });

    // Check localStorage has user
    expect(localStorage.getItem('kanban-user')).toBeTruthy();

    // Logout
    const logoutBtn = screen.getByTestId('logout-btn');
    fireEvent.click(logoutBtn);

    await waitFor(() => {
      expect(screen.getByTestId('login-btn')).toBeInTheDocument();
    });

    // Check localStorage is cleared
    expect(localStorage.getItem('kanban-user')).toBeNull();
  });

  it('keeps token when restoring a saved session', async () => {
    localStorage.setItem(
      'kanban-user',
      JSON.stringify({ username: 'user', loginTime: Date.now() })
    );
    localStorage.setItem('kanban-token', 'saved-token');

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('username')).toHaveTextContent('user');
    });

    expect(localStorage.getItem('kanban-token')).toBe('saved-token');
  });
});
