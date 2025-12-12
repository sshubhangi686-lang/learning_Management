import React from "react";
import { useNavigate } from "react-router-dom";

/* Tile Component */
function Tile({ color, title, subtitle, icon, onClick }) {
  const tileStyle = {
    background: color,
    height: 180,
    width: 180,
    borderRadius: 12,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
    color: "white",
  };

  return (
    <div style={tileStyle} onClick={onClick}>
      <div style={{ fontSize: 48 }}>{icon}</div>
      <div style={{ marginTop: 10, fontSize: 20, fontWeight: 700 }}>{title}</div>
      <div style={{ marginTop: 6, fontSize: 14 }}>{subtitle}</div>
    </div>
  );
}

export default function Landing() {
  const navigate = useNavigate();

  const container = {
    display: "flex",
    flexDirection: "row",
    gap: 40,
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #A18CD1 0%, #FBC2EB 100%)",
        backgroundSize: "cover",
        paddingTop: 40,
      }}
    >
      {/* BANNER - slide-in only */}
      <div
        className="lg-banner lg-enter"
        style={{ textAlign: "center", marginBottom: 50, color: "white" }}
      >
        <div style={{ fontSize: 60 }}>📘</div>

        <h1 style={{ margin: 10, fontSize: 48, fontWeight: 800 }}>
          Welcome to <span style={{ color: "#FFD700" }}>Learning Guru</span>
        </h1>

        <p style={{ fontSize: 20, opacity: 0.9 }}>
          Your journey to smart learning starts here
        </p>
      </div>

      {/* TILES — always visible */}
      <div style={container}>
        <Tile
          color="#6C5CE7"
          title="ADMIN"
          subtitle="Manage courses & users"
          icon="👩‍💼"
          onClick={() => navigate("/login?role=admin")}
        />

        <Tile
          color="#00B894"
          title="STUDENT"
          subtitle="Login or Signup"
          icon="🎓"
          onClick={() => navigate("/login?role=student")}
        />
      </div>
    </div>
  );
}