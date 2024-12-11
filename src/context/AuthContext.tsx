// Context quản lý trạng thái đăng nhập và xác thực người dùng
import React, { createContext, useState, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Định nghĩa kiểu dữ liệu
interface User {
  email: string;
  name?: string;
}

// Định nghĩa các hàm và state có trong context
interface AuthContextType {
  user: User | null;                                     // Thông tin người dùng hiện tại
  isLoading: boolean;                                    // Trạng thái loading
  login: (email: string, password: string) => Promise<boolean>;  // Hàm đăng nhập
  logout: () => Promise<void>;                           // Hàm đăng xuất
  forgotPassword: (email: string) => Promise<boolean>;   // Hàm quên mật khẩu
}

// Tạo context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  // STATE
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // HANDLERS
  // Xử lý đăng nhập
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Giả lập API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user = { email };
      await AsyncStorage.setItem('@user', JSON.stringify(user));
      setUser(user);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Xử lý đăng xuất
  const logout = async () => {
    await AsyncStorage.removeItem('@user');
    setUser(null);
  };

  // Xử lý quên mật khẩu
  const forgotPassword = async (email: string) => {
    // Giả lập gửi email
    await new Promise(resolve => setTimeout(resolve, 1000));
    return true;
  };

  // RENDER
  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, forgotPassword }}>
      {children}
    </AuthContext.Provider>
  );
}

// Thêm export cho hook useAuth
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}