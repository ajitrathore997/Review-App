/* eslint-disable no-unused-vars */
import {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { toast } from "sonner";
import API from "../api/axiosConfig";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    () => JSON.parse(localStorage.getItem("user")) || null
  );

  const getUser = useCallback(async () => {
    try {
      if (user) {
        const { data } = await API.get("/users/get-user", { silent: true });
        setUser(data?.user);
        localStorage.setItem("user", JSON.stringify(data?.user));
      }
    } catch {
      logoutUser();
    }
  }, []);

  const registerUser = async (userData) => {
    try {
      const { data } = await API.post("/users/register", userData);
      toast.success(data?.message || "User Registered Successfully!");
      return data?.user;
    } catch (error) {
      return null;
    }
  };

  const loginUser = async (userData) => {
    try {
      const { data } = await API.post("/users/login", userData);
      setUser(data?.user);
      localStorage.setItem("user", JSON.stringify(data?.user));
      toast.success(data?.message || "Login successful!");
      return data?.user;
    } catch (error) {
      return null;
    }
  };

  const logoutUser = async () => {
    try {
      await API.post("/users/logout");
      setUser(null);
      localStorage.removeItem("user");
    } catch (error) {
      return null;
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, registerUser, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
