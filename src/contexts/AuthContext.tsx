"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { User, LoginResponse } from "@/types";
import { getCookie } from "@/utils/client/getCookie";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthContextType extends AuthState {
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  const router = useRouter();

  // Initialize auth state on mount
  useEffect(() => {
    const initAuth = () => {
      try {
        // Check localStorage for user data and cookies for token
        const storedUser = localStorage.getItem("swim_user");
        const token = getCookie("token");

        if (token && storedUser) {
          setAuthState({
            user: JSON.parse(storedUser),
            isAuthenticated: true,
            isLoading: false,
          });
        } else {
          setAuthState({
            user: null,
            isAuthenticated: false,
            isLoading: false,
          });
        }
      } catch (error) {
        console.error("Auth init error:", error);
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }
    };

    initAuth();
  }, []);

  const login = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; message?: string }> => {
    try {
      setAuthState((prev) => ({ ...prev, isLoading: true }));

      // Import login service dynamically to avoid circular dependency
      const { login: loginService } = await import("@/services/auth/api");
      const response = await loginService(email, password);

      // Check if response is successful (statusCode 200)
      if (response.data.statusCode === 200) {
        const { accessToken, user, featured_image } = response.data.data;

        // Create user object with all necessary data
        const userData: User = {
          id:
            user.id ||
            user._id ||
            response.data.data.id ||
            response.data.data._id,
          _id: user._id || response.data.data._id,
          email: user.email,
          username: user.username || response.data.data.username,
          phone: user.phone || response.data.data.phone,
          role: user.role || response.data.data.role || [],
          role_front: user.role_front || response.data.data.role_front || [],
          role_system: user.role_system || response.data.data.role_system,
          featured_image: featured_image || user.featured_image,
        };

        // Store auth data in localStorage for UI state
        localStorage.setItem("swim_user", JSON.stringify(userData));

        // Set cookies for API authentication (matching config/axios.ts)
        document.cookie = `token=${accessToken}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/; secure; SameSite=Strict`;
        document.cookie = `refreshToken=${accessToken}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/; secure; SameSite=Strict`;

        // Update state
        setAuthState({
          user: userData,
          isAuthenticated: true,
          isLoading: false,
        });

        return { success: true, message: "Đăng nhập thành công" };
      } else {
        setAuthState((prev) => ({ ...prev, isLoading: false }));
        return {
          success: false,
          message: response.data.message || "Đăng nhập thất bại",
        };
      }
    } catch (error: any) {
      console.error("Login error:", error);
      setAuthState((prev) => ({ ...prev, isLoading: false }));
      return {
        success: false,
        message: "Có lỗi xảy ra khi đăng nhập",
      };
    }
  };

  const logout = async () => {
    try {
      setAuthState((prev) => ({ ...prev, isLoading: true }));

      // Call real API logout
      try {
        const { logout: apiLogout } = await import("@/services/auth/api");
        await apiLogout();
      } catch (apiError) {
        // Proceed to clear client state even if API call fails
        console.error("API logout error:", apiError);
      }

      // Clear auth data from localStorage
      localStorage.removeItem("swim_user");

      // Clear cookies
      document.cookie =
        "token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;";
      document.cookie =
        "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;";

      // Update state
      setAuthState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });

      // Redirect to home
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
