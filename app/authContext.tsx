import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from './firebaseConfig'; // تأكد من الاستيراد الصحيح
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from 'firebase/auth'; // استيراد الدوال المطلوبة

// تحديد نوع الـ Context
interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

// إنشاء الـ Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider: يقدم الـ Context لجميع العناصر الداخلية (children)
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // مراقبة حالة التوثيق للمستخدم
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // هنا بنحدث حالة الـ user لو حصل تغيير
    });

    // إرجاع الـ unsubscribe عند التدمير
    return () => unsubscribe();
  }, []);

  // دالة لتسجيل الدخول
  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
    } catch (error) {
      console.error('Login error', error);
    }
  };

  // دالة لتسجيل الخروج
  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook لاستخدام الـ Context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
