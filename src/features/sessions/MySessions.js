import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";

export default function MySessions() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchSessions() {
      try {
        const response = await API.get("/session/my");
        setSessions(response.data);
      } catch (error) {
        console.error("Failed to load sessions", error);
      } finally {
        setLoading(false);
      }
    }
    fetchSessions();
  }, []);

  const handleEdit = (id) => {
    navigate(`/session-editor/${id}`);
  };

  return (
    <div>
      <h2>My Wellness Sessions</h2>
      {loading ? (
        <p>Loading...</p>
      ) : sessions.length === 0 ? (
        <p>You have no saved sessions.</p>
      ) : (
        <ul>
          {sessions.map((session) => (
            <li key={session.id} style={{ marginBottom: 10 }}>
              <strong>{session.title}</strong> - {session.status}
              <button
                style={{ marginLeft: 10 }}
                onClick={() => handleEdit(session.id)}
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
      )}
      <button onClick={() => navigate("/session-editor")}>Create New Session</button>
    </div>
  );
}
