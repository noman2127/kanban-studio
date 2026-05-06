import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { AuthProvider } from '../../context/AuthContext';
import LoginPage from './page';

// Mock the Next.js app router for useRouter in the login page.
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

// Mock the useAuth hook to control its behavior in tests
const mockLogin = vi.fn();
const mockLogout = vi.fn();

vi.mock('../../context/AuthContext', () => ({
  AuthProvider: ({ children }: { children: any }) => <div>{children}</div>,
  useAuth: vi.fn(() => ({
    login: mockLogin,
    logout: mockLogout,
    user: null,
    isLoading: false,
  })),
}));

describe('LoginPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders login form with all required elements', () => {
    render(
      <AuthProvider>
        <LoginPage />
      </AuthProvider>
    );

    expect(screen.getByText('Kanban Studio')).toBeInTheDocument();
    expect(screen.getByText('Sign in to access your board')).toBeInTheDocument();
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument();
    expect(screen.getByText('Demo credentials:')).toBeInTheDocument();
    expect(screen.getByText('user / password')).toBeInTheDocument();
  });

  it('shows loading state during login', async () => {
    mockLogin.mockImplementation(() => new Promise(resolve => setTimeout(() => resolve(true), 100)));

    render(
      <AuthProvider>
        <LoginPage />
      </AuthProvider>
    );

    const usernameInput = screen.getByLabelText('Username');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByRole('button', { name: 'Sign In' });

    fireEvent.change(usernameInput, { target: { value: 'user' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.click(submitButton);

    expect(screen.getByText('Signing in...')).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
    expect(usernameInput).toBeDisabled();
    expect(passwordInput).toBeDisabled();
  });

  it('calls login with correct credentials', async () => {
    mockLogin.mockResolvedValue(true);

    render(
      <AuthProvider>
        <LoginPage />
      </AuthProvider>
    );

    const usernameInput = screen.getByLabelText('Username');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByRole('button', { name: 'Sign In' });

    fireEvent.change(usernameInput, { target: { value: 'user' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('user', 'password');
    });
  });

  it('shows error message for invalid credentials', async () => {
    mockLogin.mockResolvedValue(false);

    render(
      <AuthProvider>
        <LoginPage />
      </AuthProvider>
    );

    const usernameInput = screen.getByLabelText('Username');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByRole('button', { name: 'Sign In' });

    fireEvent.change(usernameInput, { target: { value: 'wrong' } });
    fireEvent.change(passwordInput, { target: { value: 'wrong' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Invalid username or password')).toBeInTheDocument();
    });
  });

  it('shows error message for login errors', async () => {
    mockLogin.mockRejectedValue(new Error('Network error'));

    render(
      <AuthProvider>
        <LoginPage />
      </AuthProvider>
    );

    const usernameInput = screen.getByLabelText('Username');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByRole('button', { name: 'Sign In' });

    fireEvent.change(usernameInput, { target: { value: 'user' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('An error occurred during login')).toBeInTheDocument();
    });
  });

  it('clears error message on new login attempt', async () => {
    mockLogin.mockResolvedValueOnce(false).mockResolvedValueOnce(true);

    render(
      <AuthProvider>
        <LoginPage />
      </AuthProvider>
    );

    const usernameInput = screen.getByLabelText('Username');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByRole('button', { name: 'Sign In' });

    // First attempt - invalid
    fireEvent.change(usernameInput, { target: { value: 'wrong' } });
    fireEvent.change(passwordInput, { target: { value: 'wrong' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Invalid username or password')).toBeInTheDocument();
    });

    // Second attempt - valid
    fireEvent.change(usernameInput, { target: { value: 'user' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.queryByText('Invalid username or password')).not.toBeInTheDocument();
    });
  });

  it('prevents form submission with empty fields', () => {
    render(
      <AuthProvider>
        <LoginPage />
      </AuthProvider>
    );

    const submitButton = screen.getByRole('button', { name: 'Sign In' });
    fireEvent.click(submitButton);

    // Form should not submit due to required fields
    expect(mockLogin).not.toHaveBeenCalled();
  });
});