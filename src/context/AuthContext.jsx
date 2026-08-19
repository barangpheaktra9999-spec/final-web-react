import { createContext, useContext, useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useToast } from "./ToastContext";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorage("pannalay-user", null);
  const { showToast } = useToast();

  const login = ({ email }) => {
    const profile = user || { name: "អ្នកអានថ្មី", email, phone: "", address: "", avatar: "" };
    setUser({ ...profile, email, isLoggedIn: true });
    showToast("ចូលគណនីបានជោគជ័យ។");
    return true;
  };

  const register = ({ name, email, phone }) => {
    setUser({ name, email, phone, address: "", avatar: "", isLoggedIn: true });
    showToast("បង្កើតគណនីបានជោគជ័យ។");
    return true;
  };

  const updateProfile = (profile) => {
    setUser((current) => ({ ...current, ...profile }));
    showToast("បានរក្សាទុកព័ត៌មានផ្ទាល់ខ្លួន។");
  };

  const logout = () => {
    setUser(null);
    showToast("បានចាកចេញពីគណនី។", "info");
  };

  const value = useMemo(() => ({ user, login, register, updateProfile, logout }), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
