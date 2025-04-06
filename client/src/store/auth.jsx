import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

// Helper function for safe localStorage operations
const safeGetItem = (key) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error(`Error reading ${key} from localStorage:`, error);
    return null;
  }
};

const safeSetItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error writing ${key} to localStorage:`, error);
    return false;
  }
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        await userAuthentication(storedToken);
      }
      setIsLoading(false);
    };
    initializeAuth();
  }, []);

  // Store token and user info
  const storeTokenInLS = (serverToken, userInfo) => {
    if (!serverToken || !userInfo) {
      console.error("Invalid token or user info provided");
      return false;
    }

    setToken(serverToken);
    setUser(userInfo);
    
    localStorage.setItem("token", serverToken);
    safeSetItem("user", userInfo);
    
    return true;
  };

  // Check login status
  const isLoggedIn = !!token;

  // Logout function
  const LogoutUser = () => {
    setToken("");
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  // Authenticate user
  const userAuthentication = async (authToken = token) => {
    if (!authToken) {
      LogoutUser();
      return;
    }

    try {
      const response = await fetch("http://localhost:3005/api/auth/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (!data?.userInfo) {
        throw new Error("Invalid user data received");
      }

      setUser(data.userInfo);
      safeSetItem("user", data.userInfo);
    } catch (error) {
      console.error("Authentication error:", error);
      LogoutUser();
    }
  };

  // Provide auth context
  return (
    <AuthContext.Provider 
      value={{ 
        isLoggedIn, 
        storeTokenInLS, 
        LogoutUser, 
        user,
        isLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return authContextValue;
};

