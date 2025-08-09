import React, { useEffect, useState } from "react";
import API from "../../services/api"; // Adjust import path as needed

export default function Dashboard() {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPublishedSessions = async () => {
      try {
        const response = await API.get("session/sessions");
        setSessions(response.data);
      } catch (err) {
        console.error("Failed to fetch sessions:", err);
        setError("Failed to load sessions");
      } finally {
        setLoading(false);
      }
    };

    fetchPublishedSessions();
  }, []);

  if (loading) return <p>Loading sessions...</p>;
  if (error) return <p>{error}</p>;

  if (sessions.length === 0) return <p>No published sessions found.</p>;

  return (
    <div>
      <h2>Published Sessions</h2>
      <ul>
        {sessions.map((session) => (
          <li key={session._id}>
            <h3>{session.title}</h3>
            <p>Tags: {session.tags.join(", ")}</p>
            <a href={session.json_file_url} target="_blank" rel="noreferrer">
              View JSON
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
