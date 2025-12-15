 import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

/* Tile Component */
function Tile({ color, title, subtitle, icon, onClick }) {
  const tileStyle = {
    background: color,
    height: 130,
    width: 140,
    borderRadius: 12,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    color: "white",
    transition: "transform 0.2s ease",
  };

  return (
    <div
      style={tileStyle}
      onClick={onClick}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <div style={{ fontSize: 36 }}>{icon}</div>
      <div style={{ marginTop: 8, fontSize: 18, fontWeight: 700 }}>{title}</div>
      <div style={{ marginTop: 4, fontSize: 12 }}>{subtitle}</div>
    </div>
  );
}

export default function Landing() {
  const navigate = useNavigate();
  const location = useLocation();

  // Read query param ?mode=login or ?mode=signup
  const params = new URLSearchParams(location.search);
  const mode = params.get("mode") || "login"; // default to login

  const container = {
    display: "flex",
    flexDirection: "row",
    gap: 30,
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <div
      style={{
        minHeight: "83vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #A18CD1 0%, #FBC2EB 100%)",
      }}
    >
      {/* Centered Card */}
      <div
        style={{
          background: "rgba(255,255,255,0.1)",
          borderRadius: 20,
          padding: 40,
          textAlign: "center",
          maxWidth: 500,
          width: "90%",
          boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
        }}
      >
        {/* Banner */}
        <div style={{ marginBottom: 30, color: "white" }}>
          <div style={{ fontSize: 50 }}>📘</div>
          <h1 style={{ margin: 10, fontSize: 32, fontWeight: 800 }}>
            {mode === "login" ? "Login to" : "Signup for"}{" "}
            <span style={{ color: "#FFD700" }}>TPA</span>
          </h1>
          <p style={{ fontSize: 16, opacity: 0.9 }}>
            {mode === "login"
              ? "Choose your role to continue"
              : "Create your account as Admin or Student"}
          </p>
        </div>

        {/* Tiles */}
        <div style={container}>
          <Tile
            color="#6C5CE7"
            title="ADMIN"
            subtitle={mode === "login" ? "Admin Login" : "Admin Signup"}
            icon="👩‍💼"
            onClick={() =>
              navigate(`/${mode}?role=admin`) // /login?role=admin or /signup?role=admin
            }
          />
          <Tile
            color="#00B894"
            title="STUDENT"
            subtitle={mode === "login" ? "Student Login" : "Student Signup"}
            icon="🎓"
            onClick={() =>
              navigate(`/${mode}?role=student`) // /login?role=student or /signup?role=student
            }
          />
        </div>
      </div>
    </div>
  );
}
