import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const LS_USERS_KEY = "lms_users";
const LS_AUTH_KEY = "lms_auth";

function loadUsers() {
  try {
    return JSON.parse(localStorage.getItem(LS_USERS_KEY) || "[]");
  } catch {
    return [];
  }
}
function saveUsers(users) {
  localStorage.setItem(LS_USERS_KEY, JSON.stringify(users));
}
function saveAuth(user) {
  localStorage.setItem(LS_AUTH_KEY, JSON.stringify(user));
}

export default function Signup() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!firstName || !lastName || !email || !password || !confirm) {
      setError("Please fill all fields.");
      return;
    }
    if (password !== confirm) {
      setError("Password and Confirm Password do not match.");
      return;
    }

    const users = loadUsers();
    if (users.find((u) => u.email.toLowerCase() === email.toLowerCase())) {
      setError("This email is already registered. Please login.");
      return;
    }

    const isAdmin = email.trim().toLowerCase() === "admin@lms.com";
    const newUser = { firstName, lastName, email, password, isAdmin };
    users.push(newUser);
    saveUsers(users);

    // Auto-login: store minimal auth info
    saveAuth({ email, firstName, isAdmin });

    // Redirect to home
    navigate("/");
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f7fa",
        padding: 24,
      }}
    >
      <div
        style={{
          width: 420,
          padding: 24,
          borderRadius: 8,
          background: "white",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >
        <h2 style={{ marginBottom: 6 }}>Create account</h2>
        <p style={{ marginTop: 0, marginBottom: 14, color: "#666" }}>
          Fill details to create your student/admin account
        </p>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ display: "flex", gap: 8 }}>
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First name"
              style={{ flex: 1, padding: 10, borderRadius: 6, border: "1px solid #ddd" }}
            />
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last name"
              style={{ flex: 1, padding: 10, borderRadius: 6, border: "1px solid #ddd" }}
            />
          </div>

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            style={{ padding: 10, borderRadius: 6, border: "1px solid #ddd" }}
          />

          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            style={{ padding: 10, borderRadius: 6, border: "1px solid #ddd" }}
          />

          <input
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="Confirm password"
            type="password"
            style={{ padding: 10, borderRadius: 6, border: "1px solid #ddd" }}
          />

          {error && <div style={{ color: "red", fontSize: 13 }}>{error}</div>}

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
            <button
              type="submit"
              style={{
                padding: "8px 16px",
                borderRadius: 6,
                background: "#4caf50",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
            >
              Signup
            </button>

            <div style={{ fontSize: 13 }}>
              Already have an account?{" "}
              <Link to="/login" style={{ textDecoration: "underline" }}>
                Login
              </Link>
            </div>
          </div>
        </form>

        <div style={{ marginTop: 12, fontSize: 12, color: "#666" }}>
          <strong>Note:</strong> Signing up with <code>admin@lms.com</code> will mark the account as admin
          (demo rule).
        </div>
      </div>
    </div>
  );
}