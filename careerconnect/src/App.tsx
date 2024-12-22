import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WelcomePage from "./components/WelcomePage";
import Login from "./components/Login";
import Signup from "./components/Signup";
import HomePage from "./components/HomePage";
import StudentDetails from "./components/StudentDetails";
import InterviewDetails from "./components/InterviewDetails";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/students" element={<StudentDetails />} />
        <Route path="/interviews" element={<InterviewDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
