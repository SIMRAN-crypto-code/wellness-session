import React from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function MainLayout() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      <header style={{ padding: 10, backgroundColor: "#222", color: "white" }}>
        <h1 style={{ display: "inline-block", marginRight: 20 }}>Arvyax</h1>
        <nav style={{ display: "inline-block" }}>
          <NavLink
            to="/"
            style={({ isActive }) => ({
              color: isActive ? "lightgreen" : "white",
              marginRight: 15,
              textDecoration: "none",
            })}
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/my-sessions"
            style={({ isActive }) => ({
              color: isActive ? "lightgreen" : "white",
              marginRight: 15,
              textDecoration: "none",
            })}
          >
            My Sessions
          </NavLink>
        </nav>
        <span style={{ float: "right" }}>
          {user?.email} |{" "}
          <button onClick={handleLogout} style={{ cursor: "pointer" }}>
            Logout
          </button>
        </span>
      </header>

      <main style={{ padding: 20 }}>
        <Outlet />
      </main>
    </div>
  );
}
