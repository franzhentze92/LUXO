import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Address, PaymentMethod, Order } from '@/lib/types';
import { mockAddresses, mockPaymentMethods, mockOrders } from '@/lib/data';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  addresses: Address[];
  addAddress: (address: Omit<Address, 'id'>) => void;
  updateAddress: (id: string, address: Partial<Address>) => void;
  deleteAddress: (id: string) => void;
  setDefaultAddress: (id: string) => void;
  paymentMethods: PaymentMethod[];
  addPaymentMethod: (method: Omit<PaymentMethod, 'id'>) => void;
  deletePaymentMethod: (id: string) => void;
  setDefaultPaymentMethod: (id: string) => void;
  orders: Order[];
  updateProfile: (data: Partial<User>) => void;
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (open: boolean) => void;
  isSignupModalOpen: boolean;
  setIsSignupModalOpen: (open: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });
  const [isLoading, setIsLoading] = useState(false);
  const [addresses, setAddresses] = useState<Address[]>(mockAddresses);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(mockPaymentMethods);
  const [orders] = useState<Order[]>(mockOrders);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (email && password.length >= 6) {
      setUser({
        id: 'user-1',
        email,
        name: email.split('@')[0],
        phone: '+52 55 1234 5678'
      });
      setIsLoading(false);
      setIsLoginModalOpen(false);
      return true;
    }
    setIsLoading(false);
    return false;
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (name && email && password.length >= 6) {
      setUser({
        id: 'user-' + Date.now(),
        email,
        name
      });
      setIsLoading(false);
      setIsSignupModalOpen(false);
      return true;
    }
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const addAddress = (address: Omit<Address, 'id'>) => {
    const newAddress: Address = {
      ...address,
      id: 'addr-' + Date.now()
    };
    if (address.isDefault) {
      setAddresses(prev => prev.map(a => ({ ...a, isDefault: false })));
    }
    setAddresses(prev => [...prev, newAddress]);
  };

  const updateAddress = (id: string, data: Partial<Address>) => {
    setAddresses(prev =>
      prev.map(addr => (addr.id === id ? { ...addr, ...data } : addr))
    );
  };

  const deleteAddress = (id: string) => {
    setAddresses(prev => prev.filter(addr => addr.id !== id));
  };

  const setDefaultAddress = (id: string) => {
    setAddresses(prev =>
      prev.map(addr => ({ ...addr, isDefault: addr.id === id }))
    );
  };

  const addPaymentMethod = (method: Omit<PaymentMethod, 'id'>) => {
    const newMethod: PaymentMethod = {
      ...method,
      id: 'pm-' + Date.now()
    };
    if (method.isDefault) {
      setPaymentMethods(prev => prev.map(m => ({ ...m, isDefault: false })));
    }
    setPaymentMethods(prev => [...prev, newMethod]);
  };

  const deletePaymentMethod = (id: string) => {
    setPaymentMethods(prev => prev.filter(m => m.id !== id));
  };

  const setDefaultPaymentMethod = (id: string) => {
    setPaymentMethods(prev =>
      prev.map(m => ({ ...m, isDefault: m.id === id }))
    );
  };

  const updateProfile = (data: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...data });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
        addresses,
        addAddress,
        updateAddress,
        deleteAddress,
        setDefaultAddress,
        paymentMethods,
        addPaymentMethod,
        deletePaymentMethod,
        setDefaultPaymentMethod,
        orders,
        updateProfile,
        isLoginModalOpen,
        setIsLoginModalOpen,
        isSignupModalOpen,
        setIsSignupModalOpen
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
