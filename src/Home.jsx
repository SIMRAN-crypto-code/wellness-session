import React, { useState } from "react";

export default function WellnessDashboard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [sessions, setSessions] = useState([
    { title: "Morning Yoga Session", tags: "yoga, wellness", status: "draft", url: "wqyc.pulllished" },
    { title: "Weekly Meditation Session", tags: "", status: "published" },
  ]);
  const [currentSession, setCurrentSession] = useState({
    title: "Morning Yoga Session",
    tags: "yoga, wellness",
    url: "",
  });
  const [draftSaved, setDraftSaved] = useState(false);

  // Placeholder login handler
  const handleLogin = (e) => {
    e.preventDefault();
    alert(`Login attempted with email: ${email}`);
  };

  // Placeholder save draft handler
  const saveDraft = () => {
    setDraftSaved(true);
    setTimeout(() => setDraftSaved(false), 2000);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen grid grid-cols-1 md:grid-cols-2 gap-6 font-sans">
      {/* Login */}
      <div className="bg-white p-6 rounded-lg shadow-md max-w-sm">
        <h2 className="text-xl font-bold mb-4">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
        <p className="mt-3 text-blue-600 cursor-pointer hover:underline">
          New user? Register here
        </p>
      </div>

      {/* Dashboard */}
      <div className="bg-white p-6 rounded-lg shadow-md max-w-sm">
        <h2 className="text-xl font-bold mb-4">Dashboard</h2>
        <h3 className="font-semibold mb-2">Published Sessions</h3>
        <div className="border border-gray-300 rounded p-3 mb-2 cursor-pointer hover:bg-gray-50">
          <p className="font-semibold">Morning Yoga Session</p>
          <p className="text-gray-600 text-sm">yoga, wellness</p>
        </div>
        <p className="text-blue-600 cursor-pointer hover:underline">Go to My Sessions</p>
      </div>

      {/* My Sessions */}
      <div className="bg-white p-6 rounded-lg shadow-md max-w-sm">
        <h2 className="text-xl font-bold mb-4">My Sessions</h2>
        <h3 className="font-semibold mb-2">My Sessions</h3>
        {sessions.map((session, idx) => (
          <div
            key={idx}
            className="border border-gray-300 rounded p-3 mb-2 flex justify-between items-center"
          >
            <div>
              <p className="font-semibold">{session.title}</p>
              <p className="text-gray-600 text-sm">{session.url || ""}</p>
            </div>
            <span className="text-gray-500 text-xs italic">{session.status}</span>
          </div>
        ))}
        <p className="text-blue-600 cursor-pointer hover:underline">Back to Dashboard</p>
      </div>

      {/* Session Editor */}
      <div className="bg-white p-6 rounded-lg shadow-md max-w-sm">
        <h2 className="text-xl font-bold mb-4">Session Editor</h2>
        <div className="mb-4">
          <label className="block mb-1 font-medium" htmlFor="title">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={currentSession.title}
            onChange={(e) =>
              setCurrentSession((prev) => ({ ...prev, title: e.target.value }))
            }
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium" htmlFor="tags">
            Tags (comma-separated)
          </label>
          <input
            id="tags"
            type="text"
            value={currentSession.tags}
            onChange={(e) =>
              setCurrentSession((prev) => ({ ...prev, tags: e.target.value }))
            }
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium" htmlFor="jsonUrl">
            JSON file URL
          </label>
          <input
            id="jsonUrl"
            type="text"
            value={currentSession.url}
            onChange={(e) =>
              setCurrentSession((prev) => ({ ...prev, url: e.target.value }))
            }
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div className="flex gap-4 items-center">
          <button
            onClick={saveDraft}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition"
          >
            Save Draft
          </button>
          <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded cursor-not-allowed" disabled>
            Publish
          </button>
        </div>
        {draftSaved && <p className="mt-2 text-green-600">Draft saved</p>}
      </div>
    </div>
  );
}
