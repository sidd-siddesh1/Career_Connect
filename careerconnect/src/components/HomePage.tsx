import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      className="h-screen flex flex-col items-center justify-center"
      style={{
        background: "radial-gradient(circle, #1b2735, #090a0f)", 
        color: "#fff",
        fontFamily: "'Roboto Slab', serif", 
      }}
    >
      <h1
        className="text-3xl font-bold mb-4 text-center"
        style={{
          fontFamily: "'Montserrat', sans-serif", 
          animation: "bounce 2s infinite",
        }}
      >
        We hope that your new journey with us will be exciting and fruitful !!
      </h1>
      <h2 className="text-xl font-semibold mb-8 text-center">
        Career Connect Dashboard
      </h2>
      <div className="flex space-x-6">
        <button
          className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => navigate("/students")}
          style={{
            transition: "transform 0.2s ease",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "translateY(-3px)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.transform = "translateY(0)")
          }
        >
          Student Details
        </button>
        <button
          className="px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600"
          onClick={() => navigate("/interviews")}
          style={{
            transition: "transform 0.2s ease",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "translateY(-3px)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.transform = "translateY(0)")
          }
        >
          Interview Details
        </button>
      </div>

      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&family=Roboto+Slab:wght@400;700&display=swap');

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

export default HomePage;
