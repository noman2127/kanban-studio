import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AuthProvider, useAuth } from "./AuthContext";

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
});