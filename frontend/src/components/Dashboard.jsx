import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

useEffect(() => {
  const token = localStorage.getItem("adminToken");
  if (!token) {
    alert("Please login first to access the dashboard!");
    navigate("/login", { replace: true });
  }
}, []);




  const [stats, setStats] = useState({});
  const [participants, setParticipants] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("home");

  useEffect(() => {
    fetch("http://localhost:5000/api/dashboard")
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error("Stats fetch error:", err));
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/api/dashboard/participants")
      .then(res => res.json())
      .then(data => setParticipants(data))
      .catch(err => console.error("Participants fetch error:", err));
  }, []);

  const handleAttendance = async (id, status) => {
    await fetch(`http://localhost:5000/api/dashboard/attendance/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ attendanceStatus: status })
    });
    const updated = participants.map(p =>
      p._id === id ? { ...p, attendanceStatus: status } : p
    );
    setParticipants(updated);
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    window.location.href = "/login";
  };

  const filteredParticipants = participants.filter(p => {
    const matchesSearch =
      p.fullName.toLowerCase().includes(search.toLowerCase()) ||
      p.email.toLowerCase().includes(search.toLowerCase()) ||
      p.workshopName.toLowerCase().includes(search.toLowerCase());

    if (filter === "present") return matchesSearch && p.attendanceStatus === "Present";
    if (filter === "absent") return matchesSearch && p.attendanceStatus === "Absent";
    if (filter === "registered") return matchesSearch;
    if (filter === "home") return matchesSearch;
    return matchesSearch;
  });

  const displayedParticipants =
    filter === "home"
      ? filteredParticipants.slice(0, 10)
      : filteredParticipants;

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-indigo-700 text-white p-4 flex flex-col justify-between">
        <div>
          <h2 className="  text-lg md:text-xl font-bold mb-6 text-center md:text-left">Admin Panel</h2>
          <ul className="space-y-3 md:space-y-4 flex md:block justify-around md:justify-start">
            <li><button onClick={() => setFilter("home")} className="hover:text-yellow-300">Home</button></li>
            <li><button onClick={() => setFilter("registered")} className="hover:text-yellow-300">Registered</button></li>
            <li><button onClick={() => setFilter("present")} className="hover:text-yellow-300">Present</button></li>
            <li><button onClick={() => setFilter("absent")} className="hover:text-yellow-300">Absent</button></li>
          </ul>
        </div>
        <button onClick={handleLogout} className="hover:text-red-400 mt-6 border-t border-indigo-500 pt-4 text-center md:text-left hidden md:block">
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6 bg-gray-100 overflow-x-auto">
        <div className=" flex flex-col md:flex-row justify-between items-center mb-6 gap-3">
          <h1 className="text-xl md:text-2xl font-bold">Admin Dashboard</h1>
          <input
            type="text"
            placeholder="Search participant..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border p-2 rounded w-full md:w-1/3"
          />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div onClick={() => setFilter("registered")} className="bg-white p-4 rounded shadow cursor-pointer hover:bg-green-200">
            Total Registrations: {stats.totalRegistrations}
          </div>
          <div onClick={() => setFilter("present")} className="bg-white p-4 rounded shadow cursor-pointer hover:bg-green-200">
            Present: {stats.present}
          </div>
          <div onClick={() => setFilter("absent")} className="bg-white p-4 rounded shadow cursor-pointer hover:bg-green-200">
            Absent: {stats.absent}
          </div>
          <div className="bg-white p-4 rounded shadow hover:bg-green-200">
            Attendance Rate: {stats.attendanceRate}%
          </div>
        </div>

        {/* Participants Table */}
        {(filter === "registered" || filter === "present" || filter === "absent" || filter === "home") && (
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded shadow text-sm md:text-base">
              <thead>
                <tr className="bg-gray-300">
                  <th className="p-2">Name</th>
                  <th className="p-2">Email</th>
                  <th className="p-2">Workshop</th>
                  <th className="p-2">Attendance</th>
                </tr>
              </thead>
              <tbody>
                {displayedParticipants.map(p => (
                  <tr key={p._id} className="border-t">
                    <td className="p-2">{p.fullName}</td>
                    <td className="p-2">{p.email}</td>
                    <td className="p-2">{p.workshopName}</td>
                    <td className="p-2">
                      <select
                        value={p.attendanceStatus || ""}
                        onChange={e => handleAttendance(p._id, e.target.value)}
                        className="border rounded p-1 hover:bg-indigo-100 focus:bg-indigo-200 cursor-pointer"
                      >
                        <option value="">Select</option>
                        <option value="Present">Present</option>
                        <option value="Absent">Absent</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
             <button
  onClick={handleLogout}
  className="md:hidden mt-6 mx-auto bg-indigo-700 text-white font-semibold py-2 px-6 rounded-full border border-indigo-500 hover:bg-indigo-800 transition-colors duration-200"
>
  Logout
</button>

          </div>
          
        )}
      </main>
    </div>
    
  );
}

export default Dashboard;
