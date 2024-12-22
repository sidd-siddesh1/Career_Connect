import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Interview {
  companyName: string;
  date: string;
  time: string;
  assignedStudents: AssignedInterview[];
}

interface AssignedInterview {
  studentName: string;
  studentEmail: string;
  placementStatus: string;
  resultStatus: string | null;
  updateStatus: boolean;
}

const InterviewDetails: React.FC = () => {
  const navigate = useNavigate();
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [students, setStudents] = useState<{ name: string; email: string; placementStatus: string }[]>([]);
  const [newInterview, setNewInterview] = useState({ companyName: "", date: "", time: "" });
  const [newAssignment, setNewAssignment] = useState<{ studentEmail: string; companyName: string }>({
    studentEmail: "",
    companyName: "",
  });

  useEffect(() => {
    const storedStudents = localStorage.getItem("students");
    if (storedStudents) setStudents(JSON.parse(storedStudents));
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, stateUpdater: Function) => {
    const { name, value } = e.target;
    stateUpdater((prevState: any) => ({ ...prevState, [name]: value }));
  };

  const addInterview = (e: React.FormEvent) => {
    e.preventDefault();
    setInterviews([...interviews, { ...newInterview, assignedStudents: [] }]);
    setNewInterview({ companyName: "", date: "", time: "" });
  };

  const assignInterview = (e: React.FormEvent) => {
    e.preventDefault();
    const student = students.find((s) => s.email === newAssignment.studentEmail);
    if (student) {
      setInterviews(
        interviews.map((interview) =>
          interview.companyName === newAssignment.companyName
            ? {
                ...interview,
                assignedStudents: [
                  ...interview.assignedStudents,
                  {
                    studentName: student.name,
                    studentEmail: student.email,
                    placementStatus: student.placementStatus || "Not Available",
                    resultStatus: null,
                    updateStatus: false,
                  },
                ],
              }
            : interview
        )
      );
    }
  };

  const updateInterviewStatus = (companyName: string, studentEmail: string, resultStatus: string) => {
    setInterviews(
      interviews.map((interview) =>
        interview.companyName === companyName
          ? {
              ...interview,
              assignedStudents: interview.assignedStudents.map((student) =>
                student.studentEmail === studentEmail ? { ...student, resultStatus, updateStatus: false } : student
              ),
            }
          : interview
      )
    );
  };

  const toggleUpdateStatus = (companyName: string, studentEmail: string) => {
    setInterviews(
      interviews.map((interview) =>
        interview.companyName === companyName
          ? {
              ...interview,
              assignedStudents: interview.assignedStudents.map((student) =>
                student.studentEmail === studentEmail ? { ...student, updateStatus: true } : student
              ),
            }
          : interview
      )
    );
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      localStorage.clear();
      navigate("/");
    }
  };

  return (
    <div
      className="min-h-screen p-6"
      style={{
        background: "radial-gradient(circle, #1b2735, #090a0f)", 
        color: "#fff", 
      }}
    >
      <h1 className="text-3xl font-bold mb-4 text-center">Interview Details</h1>
      <div className="mb-4 text-right">
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-1 rounded">
          Logout
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        
        <div className="bg-white bg-opacity-20 p-4 shadow rounded col-span-1">
          <h2 className="text-lg font-bold mb-2">Create Interview</h2>
          <form onSubmit={addInterview}>
            <input
              type="text"
              name="companyName"
              placeholder="Enter company name"
              value={newInterview.companyName}
              onChange={(e) => handleInputChange(e, setNewInterview)}
              className="w-full border p-1 rounded mb-2 text-black" 
            />
            <input
              type="date"
              name="date"
              value={newInterview.date}
              onChange={(e) => handleInputChange(e, setNewInterview)}
              className="w-full border p-1 rounded mb-2 text-black" 
            />
            <input
              type="time"
              name="time"
              value={newInterview.time}
              onChange={(e) => handleInputChange(e, setNewInterview)}
              className="w-full border p-1 rounded mb-4 text-black" 
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-1 rounded">
              Add Interview
            </button>
          </form>
          <h2 className="text-lg font-bold mt-6 mb-2">Assign Interview</h2>
          <form onSubmit={assignInterview}>
            <select
              name="studentEmail"
              value={newAssignment.studentEmail}
              onChange={(e) => handleInputChange(e, setNewAssignment)}
              className="w-full border p-1 rounded mb-2 text-black" 
            >
              <option value="">Select Student</option>
              {students.map((s, i) => (
                <option key={i} value={s.email}>
                  {s.email}
                </option>
              ))}
            </select>
            <select
              name="companyName"
              value={newAssignment.companyName}
              onChange={(e) => handleInputChange(e, setNewAssignment)}
              className="w-full border p-1 rounded mb-4 text-black" 
            >
              <option value="">Select Company</option>
              {interviews.map((int, i) => (
                <option key={i} value={int.companyName}>
                  {int.companyName}
                </option>
              ))}
            </select>
            <button type="submit" className="bg-green-500 text-white px-4 py-1 rounded">
              Assign Interview
            </button>
          </form>
        </div>
        <div className="col-span-2">
          {interviews.map((int, index) => (
            <div key={index} className="bg-white bg-opacity-20 p-4 shadow rounded mb-4">
              <h3 className="font-bold text-lg mb-2">{int.companyName}</h3>
              <p className="text-sm mb-4">{int.date} at {int.time}</p>
              {int.assignedStudents.length > 0 && (
                <table className="w-full border-collapse border">
                  <thead>
                    <tr>
                      <th className="border p-2">Student Name</th>
                      <th className="border p-2">Email</th>
                      <th className="border p-2">Placement Status</th>
                      <th className="border p-2">Result Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {int.assignedStudents.map((a, i) => (
                      <tr key={i}>
                        <td className="border p-2">{a.studentName}</td>
                        <td className="border p-2">{a.studentEmail}</td>
                        <td className="border p-2">{a.placementStatus}</td>
                        <td className="border p-2">
                          {a.resultStatus || (
                            a.updateStatus ? (
                              <select
                                onChange={(e) =>
                                  updateInterviewStatus(int.companyName, a.studentEmail, e.target.value)
                                }
                                className="border p-1 rounded text-black" 
                              >
                                <option value="">Select Result</option>
                                <option value="Pass">Pass</option>
                                <option value="Fail">Fail</option>
                              </select>
                            ) : (
                              <button
                                onClick={() => toggleUpdateStatus(int.companyName, a.studentEmail)}
                                className="bg-yellow-500 text-white px-4 py-1 rounded"
                              >
                                Update
                              </button>
                            )
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InterviewDetails;
