
import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const [user, setUser] = useState(null);

    // Function to store token in local storage
    const storeTokenInLS = (serverToken, userInfo) => {
        setToken(serverToken);
        localStorage.setItem("token", serverToken);
        localStorage.setItem("user", JSON.stringify(userInfo));
    };

    // Check login status
    const isLoggedIn = !!token;

    // Logout function
    const LogoutUser = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken("");
        setUser(null);
      };

    // Authenticate user and fetch user data using the stored token
    const userAuthentication = async () => {
        if (!token) return;

        try {
            const response = await fetch("http://localhost:3005/api/auth/user", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const data = await response.json();
                setUser(data.userInfo); // Ensure the role is included in userInfo
            } else {
                console.error("Error fetching user data");
                LogoutUser();
            }
        } catch (error) {
            console.error("Authentication error:", error);
            LogoutUser();
        }
    };

    // Load user from local storage on page load if token exists
    useEffect(() => {
        if (token) {
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        }
    }, [token]); // Runs when token changes


    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
          setToken(storedToken); // Restore token on refresh
          userAuthentication(); // Fetch user data again
        }
      }, []); // Empty dependency array = runs once on mount

    useEffect(() => {
        userAuthentication();
    }, [token]); // Runs when token changes

    return (
        <AuthContext.Provider value={{ isLoggedIn, storeTokenInLS, LogoutUser, user }}>
            {children}
        </AuthContext.Provider>
    );
};
export const useAuth = () => {
    const authContextValue = useContext(AuthContext);
    if (!authContextValue) {
        throw new Error("useAuth used outside of the Provider");
    }
    return authContextValue;
};

// export const AuthProvider = ({ children }) => {
//     const [token, setToken] = useState(localStorage.getItem("token") || "");
//     const [user, setUser] = useState(null);

//     // Function to store token in local storage
//     const storeTokenInLS = (serverToken, userInfo) => {
//         setToken(serverToken);
//         localStorage.setItem("token", serverToken);
//         localStorage.setItem("user", JSON.stringify(userInfo));
//     };

//     // Check login status
//     const isLoggedIn = !!token;

//     // Logout function
//     const LogoutUser = () => {
//         setToken("");
//         setUser(null);
//         localStorage.removeItem("token");
//         localStorage.removeItem("user");
//     };

//     // Authenticate user and fetch user data using the stored token
//     const userAuthentication = async () => {
//         if (!token) return;

//         try {
//             const response = await fetch("http://localhost:3005/api/auth/user", {
//                 method: "GET",
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                     "Content-Type": "application/json",
//                 },
//             });

//             if (response.ok) {
//                 const data = await response.json();
//                 setUser(data.userInfo);
//             } else {
//                 console.error("Error fetching user data");
//                 LogoutUser();
//             }
//         } catch (error) {
//             console.error("Authentication error:", error);
//             LogoutUser();
//         }
//     };

//     // Load user from local storage on page load if token exists
//     useEffect(() => {
//         if (token) {
//             const storedUser = localStorage.getItem("user");
//             if (storedUser) {
//                 setUser(JSON.parse(storedUser));
//             }
//         }
//     }, [token]); // Runs when token changes

//     useEffect(() => {
//         userAuthentication();
//     }, [token]); // Runs when token changes

//     return (
//         <AuthContext.Provider value={{ isLoggedIn, storeTokenInLS, LogoutUser, user }}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

