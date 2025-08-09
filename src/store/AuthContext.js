import React, { createContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token") || null);

  const [user, setUser] = useState(() => {
    try {
      const data = localStorage.getItem("user");
      return data && data !== "undefined" ? JSON.parse(data) : null;
    } catch (err) {
      console.error("Failed to parse stored user:", err);
      return null;
    }
  });

  const login = (token, user) => {
    setToken(token);
    setUser(user);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;

