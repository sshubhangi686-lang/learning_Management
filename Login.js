import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";

/* localStorage keys */
const LS_USERS_KEY = "lms_users";
const LS_AUTH_KEY = "lms_auth";

/* Helpers */
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
function saveAuth(auth) {
  localStorage.setItem(LS_AUTH_KEY, JSON.stringify(auth));
}

/* Demo admin credentials (fixed) */
const DEMO_ADMIN_EMAIL = "admin@lms.com";
const DEMO_ADMIN_PASSWORD = "admin123";

export default function Login() {
  const navigate = useNavigate();
  const params = new URLSearchParams(useLocation().search);
  const role = params.get("role") || "student"; // 'admin' or 'student'

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Ensure demo admin exists in localStorage users list (optional convenience)
  useEffect(() => {
    const users = loadUsers();
    const hasAdmin = users.some((u) => u.email?.toLowerCase() === DEMO_ADMIN_EMAIL);
    if (!hasAdmin) {
      users.push({
        firstName: "Admin",
        lastName: "User",
        email: DEMO_ADMIN_EMAIL,
        password: DEMO_ADMIN_PASSWORD,
        isAdmin: true,
      });
      saveUsers(users);
    }
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    // ---------- ADMIN: fixed credentials ----------
    if (role === "admin") {
      if (
        email.trim().toLowerCase() === DEMO_ADMIN_EMAIL &&
        password === DEMO_ADMIN_PASSWORD
      ) {
        // success: save auth and go to admin dashboard
        saveAuth({ email: DEMO_ADMIN_EMAIL, name: "Admin User", isAdmin: true });
        navigate("/admin");
        return;
      } else {
        setError("Invalid admin username or password");
        return;
      }
    }

    // ---------- STUDENT: validate against stored users ----------
    const users = loadUsers();
    const user = users.find((u) => u.email?.toLowerCase() === email.trim().toLowerCase());
    if (!user) {
      setError("No account found with this email. Please signup.");
      return;
    }
    if (user.password !== password) {
      setError("Wrong password. Please try again.");
      return;
    }

    // student success: save auth and go to home
    saveAuth({ email: user.email, name: `${user.firstName} ${user.lastName}`, isAdmin: !!user.isAdmin });
    navigate("/home");
  }

  return (
    <div style={{ minHeight: "80vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div style={{ width: 360, padding: 24, borderRadius: 8, boxShadow: "0 8px 30px rgba(0,0,0,0.08)", background: "white" }}>
        <h2 style={{ marginBottom: 8 }}>{role === "admin" ? "Admin Login" : "Student Login"}</h2>
        <p style={{ marginTop: 0, marginBottom: 12, color: "#666", fontSize: 14 }}>
          {role === "admin" ? "Enter admin credentials" : "Login to access your courses"}
        </p>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
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

          {error && <div style={{ color: "red", fontSize: 13 }}>{error}</div>}

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 6 }}>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <button type="submit" style={{ padding: "8px 14px", borderRadius: 6, background: "#4caf50", color: "white", border: "none" }}>
                Login
              </button>
            </div>

            <div style={{ fontSize: 13 }}>
              <button type="button" onClick={() => alert("Forgot password demo")} style={{ background: "none", border: "none", textDecoration: "underline", cursor: "pointer" }}>
                Forgot password
              </button>

              {role === "student" && (
                <Link to="/signup" style={{ marginLeft: 10, textDecoration: "underline" }}>Signup</Link>
              )}
            </div>
          </div>
        </form>

        {role === "admin" && <div style={{ marginTop: 12, fontSize: 12, color: "#555" }}>Demo admin: <strong>admin@lms.com</strong> / <strong>admin123</strong></div>}
      </div>
    </div>
  );
}