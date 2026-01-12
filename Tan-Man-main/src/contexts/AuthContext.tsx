import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define User Type
export type User = {
  id: string;
  name: string;
  email: string;
  subscription: 'free' | 'monthly' | 'quarterly' | 'yearly' | null;
  subscriptionEndDate: Date | null;
};

// Define Context Type
type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateSubscription: (plan: 'free' | 'monthly' | 'quarterly' | 'yearly') => void;
};

// Create Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data - in a real app, this would come from a database
const MOCK_USERS = [
  {
    id: '1',
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123',
    subscription: null,
    subscriptionEndDate: null,
  },
];

// Provider Component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Check for existing session on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('tanman_user');
    
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser.subscriptionEndDate) {
          parsedUser.subscriptionEndDate = new Date(parsedUser.subscriptionEndDate);
        }
        setUser(parsedUser);
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('tanman_user');
      }
    }
    
    setIsInitialized(true);
  }, []);

  // Signup function
  const signup = async (name: string, email: string, password: string) => {
    // Check if email already exists
    const existingUser = MOCK_USERS.find(u => u.email === email);
    if (existingUser) {
      throw new Error('Email already exists');
    }

    // Create new user
    const newUser: User = {
      id: String(MOCK_USERS.length + 1),
      name,
      email,
      subscription: 'free',
      subscriptionEndDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
    };

    // In a real app, you would save to database here
    MOCK_USERS.push({ ...newUser, password });

    // Save to local storage and update state
    localStorage.setItem('tanman_user', JSON.stringify(newUser));
    setUser(newUser);

    return Promise.resolve();
  };

  // Login function
  const login = async (email: string, password: string) => {
    // Find user
    const foundUser = MOCK_USERS.find(u => u.email === email && u.password === password);
    
    if (!foundUser) {
      throw new Error('Invalid email or password');
    }

    const userData: User = {
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
      subscription: foundUser.subscription as any,
      subscriptionEndDate: foundUser.subscriptionEndDate ? new Date(foundUser.subscriptionEndDate) : null,
    };

    // Save to local storage and update state
    localStorage.setItem('tanman_user', JSON.stringify(userData));
    setUser(userData);

    return Promise.resolve();
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('tanman_user');
    setUser(null);
  };

  // Update subscription
  const updateSubscription = (plan: 'free' | 'monthly' | 'quarterly' | 'yearly') => {
    if (!user) return;

    let endDate: Date;
    const now = new Date();

    switch (plan) {
      case 'free':
        endDate = new Date(now.getTime() + 10 * 24 * 60 * 60 * 1000); // 10 days
        break;
      case 'monthly':
        endDate = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days
        break;
      case 'quarterly':
        endDate = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000); // 90 days
        break;
      case 'yearly':
        endDate = new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000); // 365 days
        break;
    }

    const updatedUser = {
      ...user,
      subscription: plan,
      subscriptionEndDate: endDate,
    };

    // Update localStorage and state
    localStorage.setItem('tanman_user', JSON.stringify(updatedUser));
    setUser(updatedUser);

    // In a real app, you would also update this in your database
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated: !!user, 
        isInitialized,
        login, 
        signup, 
        logout,
        updateSubscription,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};