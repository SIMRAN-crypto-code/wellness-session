import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import Dashboard from "./features/dashboard/Dashboard";
//import Dashboard from "./features/sessions/Dashboard";

import MySessions from "./features/sessions/MySessions";
import SessionEditor from "./features/sessions/SessionEditor";
import NotFound from "./pages/NotFound";

import MainLayout from "./layouts/MainLayout";
import { useAuth } from "./hooks/useAuth";

export default function App() {
  const { token } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={!token ? <Login /> : <Navigate to="/" />} />
        <Route path="/register" element={!token ? <Register /> : <Navigate to="/" />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={token ? <MainLayout /> : <Navigate to="/login" />}
        >
          <Route index element={<Dashboard />} />
          <Route path="my-sessions" element={<MySessions />} />
          <Route path="session-editor/:id?" element={<SessionEditor />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

