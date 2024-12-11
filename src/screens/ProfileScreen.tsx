// Component màn hình Tài khoản
// Xử lý đăng nhập, đăng xuất và quên mật khẩu
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';

export default function ProfileScreen() {
  // HOOKS & STATE
  // Lấy các hàm xử lý auth từ context
  const { login, isLoading, user, logout, forgotPassword } = useAuth();
  // State quản lý form đăng nhập
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isValid, setIsValid] = useState({ email: true, password: true });

  // HANDLERS
  // Kiểm tra email hợp lệ
  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Xử lý đăng nhập
  const handleLogin = async () => {
    // Kiểm tra tính hợp lệ của form
    const emailValid = validateEmail(email);
    const passwordValid = password.length >= 6;
    
    setIsValid({ 
      email: emailValid, 
      password: passwordValid 
    });

    // Thực hiện đăng nhập nếu form hợp lệ
    if (emailValid && passwordValid) {
      const success = await login(email, password);
      if (!success) {
        Alert.alert('Lỗi', 'Đăng nhập không thành công');
      }
    }
  };

  // Xử lý quên mật khẩu
  const handleForgotPassword = async () => {
    if (!validateEmail(email)) {
      Alert.alert('Lỗi', 'Vui lòng nhập email hợp lệ');
      return;
    }
    const success = await forgotPassword(email);
    if (success) {
      Alert.alert('Thành công', 'Vui lòng kiểm tra email của bạn');
    }
  };

  // RENDER
  // Hiển thị màn hình khi đã đăng nhập
  if (user) {
    return (
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Xin chào, {user.email}</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Text style={styles.buttonText}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Hiển thị form đăng nhập
  return (
    <View style={styles.container}>
      {/* Form container */}
      <View style={styles.formContainer}>
        <Text style={styles.title}>Đăng nhập</Text>
        
        {/* Input email */}
        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={24} color="#666" />
          <TextInput
            style={[styles.input, !isValid.email && styles.inputError]}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        {!isValid.email && (
          <Text style={styles.errorText}>Email không hợp lệ</Text>
        )}

        {/* Input mật khẩu */}
        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={24} color="#666" />
          <TextInput
            style={[styles.input, !isValid.password && styles.inputError]}
            placeholder="Mật khẩu"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
        {!isValid.password && (
          <Text style={styles.errorText}>Mật khẩu phải có ít nhất 6 ký tự</Text>
        )}

        {/* Nút đăng nhập */}
        <TouchableOpacity 
          style={styles.loginButton}
          onPress={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.buttonText}>Đăng nhập</Text>
          )}
        </TouchableOpacity>

        {/* Nút quên mật khẩu */}
        <TouchableOpacity 
          style={styles.forgotButton}
          onPress={handleForgotPassword}
        >
          <Text style={styles.forgotButtonText}>Quên mật khẩu?</Text>
        </TouchableOpacity>

        {/* Nút đăng nhập với Google */}
        <TouchableOpacity style={styles.socialButton}>
          <Ionicons name="logo-google" size={24} color="#DB4437" />
          <Text style={styles.socialButtonText}>Đăng nhập với Google</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// STYLES
const styles = StyleSheet.create({
  // Container chính
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },

  // Styles cho form container
  formContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  // Styles cho tiêu đề và text
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  welcomeText: {
    fontSize: 20,
    marginBottom: 20,
  },

  // Styles cho input
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  input: {
    flex: 1,
    padding: 12,
    marginLeft: 10,
  },
  inputError: {
    borderColor: '#ff4444',
  },
  errorText: {
    color: '#ff4444',
    fontSize: 12,
    marginBottom: 10,
  },

  // Styles cho các nút
  loginButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  logoutButton: {
    backgroundColor: '#ff4444',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  forgotButton: {
    marginTop: 15,
    alignItems: 'center',
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },

  // Styles cho text trong nút
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  forgotButtonText: {
    color: '#666',
    fontSize: 14,
  },
  socialButtonText: {
    marginLeft: 10,
    color: '#666',
    fontSize: 16,
  },
});