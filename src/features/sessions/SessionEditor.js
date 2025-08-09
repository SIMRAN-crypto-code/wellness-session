import React, { useState, useEffect } from "react";
import API from "../../services/api"; // Your axios setup file
//import "./SessionEditor.css"; // We'll inline CSS below

export default function SessionEditor() {
  const [sessionId, setSessionId] = useState(null);

  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [json_file_url, setJsonUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  // Auto-save after 5s of inactivity
  useEffect(() => {
    if (!title && !tags && !json_file_url) return;
    const timeout = setTimeout(() => {
      saveDraft();
    }, 5000);
    return () => clearTimeout(timeout);
  }, [title, tags, json_file_url]);

  const saveDraft = async () => {
    try {
      setSaving(true);
      const response =await API.post("session/my-sessions/save-draft", {
        title,
        tags: tags.split(",").map((tag) => tag.trim()),
        json_file_url ,
      });
       setSessionId(response.data._id); 
      setMessage("Draft saved successfully ✅");
    } catch (err) {
      console.error("Error saving draft:", err);
      setMessage("Error saving draft ❌");
    } finally {
      setSaving(false);
    }
  };

  const publishSession = async () => {
   try {
    setSaving(true);
    if (!sessionId) {
      setMessage("No session selected to publish");
      setSaving(false);
      return;
    }
    await API.post("session/my-sessions/publish", { id: sessionId });
    setMessage("Session published successfully 🚀");
  } catch (err) {
    console.error("Error publishing session:", err);
    setMessage("Error publishing session ❌");
  } finally {
    setSaving(false);
  }
  };

  return (
    <div className="editor-container">
      <h2>Create / Edit Session</h2>
      <input
        type="text"
        placeholder="Session Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Tags (comma-separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <input
        type="text"
        placeholder="JSON File URL"
        value={json_file_url}
        onChange={(e) => setJsonUrl(e.target.value)}
      />

      <div className="button-group">
        <button onClick={saveDraft} disabled={saving}>
          Save as Draft
        </button>
        <button className="publish-btn" onClick={publishSession} disabled={saving}>
          Publish
        </button>
      </div>

      {message && <p className="status-message">{message}</p>}
    </div>
  );
}

/* ===== CSS (inline in same file for quick use) ===== */
const css = `
.editor-container {
  max-width: 500px;
  margin: auto;
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  font-family: Arial, sans-serif;
}
.editor-container h2 {
  text-align: center;
  margin-bottom: 20px;
}
.editor-container input {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 14px;
}
.button-group {
  display: flex;
  justify-content: space-between;
}
.button-group button {
  flex: 1;
  margin-right: 10px;
  padding: 10px;
  border-radius: 8px;
  border: none;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.3s ease;
}
.button-group button:last-child {
  margin-right: 0;
}
.button-group button:hover {
  background: #f0f0f0;
}
.publish-btn {
  background: #4cafef;
  color: white;
}
.publish-btn:hover {
  background: #2196f3;
}
.status-message {
  text-align: center;
  margin-top: 15px;
  font-weight: bold;
}
`;

// Dynamically inject CSS into the document
const style = document.createElement("style");
style.textContent = css;
document.head.appendChild(style);
