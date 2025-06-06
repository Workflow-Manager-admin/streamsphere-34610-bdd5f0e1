import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

// PUBLIC_INTERFACE
export const useAuth = () => {
  /**
   * Hook to access authentication context
   * Returns the authentication context value
   */
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// PUBLIC_INTERFACE
export const AuthProvider = ({ children }) => {
  /**
   * Authentication provider component that manages user authentication state
   * Provides login, logout, and user management functionality
   */
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock user data for demonstration
  const mockUsers = [
    {
      id: 1,
      username: 'user@example.com',
      password: 'password123',
      name: 'John Doe',
      avatar: null,
      subscribers: 1200,
      subscriptions: ['2', '3']
    },
    {
      id: 2,
      username: 'creator@example.com',
      password: 'password123',
      name: 'Jane Smith',
      avatar: null,
      subscribers: 45000,
      subscriptions: ['1', '3']
    }
  ];

  useEffect(() => {
    // Check for stored user data on app load
    const storedUser = localStorage.getItem('streamSphereUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // Mock authentication - in real app, this would be an API call
      const foundUser = mockUsers.find(
        u => u.username === email && u.password === password
      );
      
      if (foundUser) {
        const { password: _, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword);
        localStorage.setItem('streamSphereUser', JSON.stringify(userWithoutPassword));
        return { success: true };
      } else {
        return { success: false, error: 'Invalid credentials' };
      }
    } catch (error) {
      return { success: false, error: 'Login failed' };
    }
  };

  const register = async (userData) => {
    try {
      // Mock registration - in real app, this would be an API call
      const newUser = {
        id: Date.now(),
        username: userData.email,
        name: userData.name,
        avatar: null,
        subscribers: 0,
        subscriptions: []
      };
      
      setUser(newUser);
      localStorage.setItem('streamSphereUser', JSON.stringify(newUser));
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Registration failed' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('streamSphereUser');
  };

  const updateProfile = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem('streamSphereUser', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    login,
    register,
    logout,
    updateProfile,
    loading,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
