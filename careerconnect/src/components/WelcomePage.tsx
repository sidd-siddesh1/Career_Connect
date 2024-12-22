import React from "react";
import { useNavigate } from "react-router-dom";

const WelcomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      className="h-screen flex flex-col items-center justify-center"
      style={{
        background: "radial-gradient(circle, #3e4a61, #1b2735, #090a0f)",
        color: "#fff",
        fontFamily: "'Orbitron', sans-serif",
      }}
    >
      <h1
        className="text-5xl font-bold mb-8 text-center"
        style={{
          animation: "bounce 2s infinite",
          fontFamily: "'Russo One', sans-serif",
          letterSpacing: "2px",
          textShadow:
            "0 0 10px rgba(0, 255, 255, 0.6), 0 0 20px rgba(0, 255, 255, 0.4)",
        }}
      >
        Welcome to Career Connect !!!
      </h1>
      <div className="flex space-x-6">
        <button
          className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-300"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
        <button
          className="px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600 transition-colors duration-300"
          onClick={() => navigate("/signup")}
        >
          Signup
        </button>
      </div>

      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Russo+One&display=swap');

          @keyframes bounce {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-10px);
            }
          }
        `}
      </style>
    </div>
  );
};

export default WelcomePage;
