import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Student {
  name: string;
  email: string;
  batch: string;
  college: string;
  dsaScore: number;
  webDevScore: number;
  reactScore: number;
  placementStatus: string;
}

const StudentDetails: React.FC = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState<Student[]>([]);
  const [newStudent, setNewStudent] = useState<Student>({
    name: "",
    email: "",
    batch: "",
    college: "",
    dsaScore: 0,
    webDevScore: 0,
    reactScore: 0,
    placementStatus: "None",
  });

  useEffect(() => {
    const savedStudents = localStorage.getItem("students");
    if (savedStudents) {
      setStudents(JSON.parse(savedStudents));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewStudent((prev) => ({
      ...prev,
      [name]: ["dsaScore", "webDevScore", "reactScore"].includes(name)
        ? Number(value)
        : value,
    }));
  };

  const addStudent = (e: React.FormEvent) => {
    e.preventDefault();
    setStudents([...students, newStudent]);
    setNewStudent({
      name: "",
      email: "",
      batch: "",
      college: "",
      dsaScore: 0,
      webDevScore: 0,
      reactScore: 0,
      placementStatus: "None",
    });
  };

  return (
    <div
      className="p-6"
      style={{
        background: "radial-gradient(circle, #1b2735, #090a0f)", 
        color: "#fff",
      }}
    >
      <h1 className="text-3xl font-bold mb-6 text-center">Student Details</h1>
      <div className="flex justify-between mb-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => navigate("/interviews")}
        >
          Go to Interview Details
        </button>
      </div>
      <div className="grid lg:grid-cols-3 gap-6">
        <form onSubmit={addStudent} className="bg-white bg-opacity-20 p-4 shadow rounded">
          <h2 className="text-lg font-bold mb-2">Add Student</h2>
          <label className="block text-sm mb-1">Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter student name"
            value={newStudent.name}
            onChange={handleChange}
            className="w-full border p-2 rounded mb-2 text-black" 
            required
          />
          <label className="block text-sm mb-1">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter student email"
            value={newStudent.email}
            onChange={handleChange}
            className="w-full border p-2 rounded mb-2 text-black" 
            required
          />
          <label className="block text-sm mb-1">Batch</label>
          <input
            type="text"
            name="batch"
            placeholder="Enter batch"
            value={newStudent.batch}
            onChange={handleChange}
            className="w-full border p-2 rounded mb-2 text-black" 
            required
          />
          <label className="block text-sm mb-1">College</label>
          <input
            type="text"
            name="college"
            placeholder="Enter college"
            value={newStudent.college}
            onChange={handleChange}
            className="w-full border p-2 rounded mb-2 text-black" 
            required
          />
          <label className="block text-sm mb-1">DSA Score</label>
          <input
            type="number"
            name="dsaScore"
            value={newStudent.dsaScore}
            onChange={handleChange}
            className="w-full border p-2 rounded mb-2 text-black" 
            required
          />
          <label className="block text-sm mb-1">Web Development Score</label>
          <input
            type="number"
            name="webDevScore"
            value={newStudent.webDevScore}
            onChange={handleChange}
            className="w-full border p-2 rounded mb-2 text-black" 
            required
          />
          <label className="block text-sm mb-1">React Score</label>
          <input
            type="number"
            name="reactScore"
            value={newStudent.reactScore}
            onChange={handleChange}
            className="w-full border p-2 rounded mb-2 text-black" 
            required
          />
          <label className="block text-sm mb-1">Placement Status</label>
          <select
            name="placementStatus"
            value={newStudent.placementStatus}
            onChange={handleChange}
            className="w-full border p-2 rounded mb-4 text-black" 
          >
            <option value="None">None</option>
            <option value="Placed">Placed</option>
            <option value="Not Placed">Not Placed</option>
            <option value="On Hold">On Hold</option>
          </select>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Student
          </button>
        </form>
        <div className="bg-white bg-opacity-20 p-4 shadow rounded lg:col-span-2 overflow-auto">
          <h2 className="text-lg font-bold mb-2">Student List</h2>
          <table className="w-full border-collapse text-left">
            <thead>
              <tr>
                {["Name", "Email", "Batch", "College", "DSA", "Web Dev", "React", "Placement"].map(
                  (header) => (
                    <th key={header} className="border px-2 py-1 text-sm">
                      {header}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={index} className="text-sm">
                  <td className="border px-2 py-1">{student.name}</td>
                  <td className="border px-2 py-1">{student.email}</td>
                  <td className="border px-2 py-1">{student.batch}</td>
                  <td className="border px-2 py-1">{student.college}</td>
                  <td className="border px-2 py-1">{student.dsaScore}</td>
                  <td className="border px-2 py-1">{student.webDevScore}</td>
                  <td className="border px-2 py-1">{student.reactScore}</td>
                  <td className="border px-2 py-1">{student.placementStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;
