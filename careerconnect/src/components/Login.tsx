import React from "react";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/home");
  };

  return (
    <div
      className="h-screen flex flex-col items-center justify-center"
      style={{
        backgroundColor: "#d3d3d3", 
        fontFamily: "'Roboto Slab', serif", 
        color: "#333",
      }}
    >
      <h1
        className="text-4xl font-bold mb-6"
        style={{
          fontFamily: "'Pacifico', cursive", 
        }}
      >
        Login
      </h1>
      <form
        className="flex flex-col space-y-4 p-6 rounded"
        style={{
          backgroundColor: "rgba(255, 182, 193, 0.9)", 
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
          width: "300px",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.transform = "scale(1.05)";
          (e.currentTarget as HTMLElement).style.boxShadow =
            "0 12px 30px rgba(0, 0, 0, 0.4)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.transform = "scale(1)";
          (e.currentTarget as HTMLElement).style.boxShadow =
            "0 8px 20px rgba(0, 0, 0, 0.2)";
        }}
        onSubmit={handleLogin}
      >
        <input
          type="email"
          placeholder="Email"
          className="border px-4 py-2 rounded w-full"
          style={{
            outline: "none",
            transition: "box-shadow 0.3s ease",
          }}
          onFocus={(e) =>
            (e.currentTarget.style.boxShadow = "0 0 10px rgba(255, 105, 180, 0.5)")
          }
          onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="border px-4 py-2 rounded w-full"
          style={{
            outline: "none",
            transition: "box-shadow 0.3s ease",
          }}
          onFocus={(e) =>
            (e.currentTarget.style.boxShadow = "0 0 10px rgba(255, 105, 180, 0.5)")
          }
          onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
          required
        />
        <button
          type="submit"
          className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
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
          Login
        </button>
      </form>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Pacifico&family=Roboto+Slab:wght@400;700&display=swap');
        `}
      </style>
    </div>
  );
};

export default Login;
