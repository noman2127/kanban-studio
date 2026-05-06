import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { AuthProvider } from '../context/AuthContext';
import ProtectedRoute from './ProtectedRoute';

// Mock Next.js router
const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

// Mock the useAuth hook
const mockLogin = vi.fn();
const mockLogout = vi.fn();
let mockUser: any = null;
let mockIsLoading = false;

vi.mock('../context/AuthContext', () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  useAuth: vi.fn(() => ({
    user: mockUser,
    isLoading: mockIsLoading,
    login: mockLogin,
    logout: mockLogout,
  })),
}));

const TestChild = () => <div data-testid="protected-content">Protected Content</div>;

describe('ProtectedRoute', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUser = null;
    mockIsLoading = false;
  });

  it('shows loading state while checking authentication', () => {
    mockIsLoading = true;

    render(
      <AuthProvider>
        <ProtectedRoute>
          <TestChild />
        </ProtectedRoute>
      </AuthProvider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument();
  });

  it('renders children when user is authenticated', () => {
    mockUser = { username: 'testuser', loginTime: Date.now() };
    mockIsLoading = false;

    render(
      <AuthProvider>
        <ProtectedRoute>
          <TestChild />
        </ProtectedRoute>
      </AuthProvider>
    );

    expect(screen.getByTestId('protected-content')).toBeInTheDocument();
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  });

  it('redirects to login when user is not authenticated', async () => {
    mockUser = null;
    mockIsLoading = false;

    render(
      <AuthProvider>
        <ProtectedRoute>
          <TestChild />
        </ProtectedRoute>
      </AuthProvider>
    );

    // Should redirect to login
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/login');
    });

    // Should not render protected content
    expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument();
  });

  it('does not render children during redirect', () => {
    mockUser = null;
    mockIsLoading = false;

    render(
      <AuthProvider>
        <ProtectedRoute>
          <TestChild />
        </ProtectedRoute>
      </AuthProvider>
    );

    // Should not render protected content immediately
    expect(screen.queryByTestId('protected-content')).not.toBeInTheDocument();
  });
});