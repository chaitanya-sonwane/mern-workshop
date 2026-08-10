  import React, { useEffect, useState } from "react";

  function Dashboard() {
    const [stats, setStats] = useState({});
    const [participants, setParticipants] = useState([]);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("home"); // default view

    // ✅ Fetch dashboard stats
    useEffect(() => {
      fetch("http://localhost:5000/api/dashboard")
        .then(res => res.json())
        .then(data => setStats(data))
        .catch(err => console.error("Stats fetch error:", err));
    }, []);

    // ✅ Fetch participants list
    useEffect(() => {
      fetch("http://localhost:5000/api/dashboard/participants")
        .then(res => res.json())
        .then(data => setParticipants(data))
        .catch(err => console.error("Participants fetch error:", err));
    }, []);

    // ✅ Update attendance
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

    // ✅ Logout
    const handleLogout = () => {
      localStorage.removeItem("adminToken");
      window.location.href = "/login";
    };

    // ✅ Search + Filter logic
    const filteredParticipants = participants.filter(p => {
      const matchesSearch =
        p.fullName.toLowerCase().includes(search.toLowerCase()) ||
        p.email.toLowerCase().includes(search.toLowerCase()) ||
        p.workshopName.toLowerCase().includes(search.toLowerCase());

      if (filter === "present") return matchesSearch && p.attendanceStatus === "Present";
      if (filter === "absent") return matchesSearch && p.attendanceStatus === "Absent";
      if (filter === "registered") return matchesSearch && !p.attendanceStatus;
      return matchesSearch;
    });

    return (
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-64 bg-indigo-700 text-white p-4">
          <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
          <ul className="space-y-4">
            <li><button onClick={() => setFilter("home")} className="hover:text-yellow-300">Home</button></li>
            <li><button onClick={() => setFilter("registered")} className="hover:text-yellow-300">Total Registered</button></li>
            <li><button onClick={() => setFilter("present")} className="hover:text-yellow-300">Present Students</button></li>
            <li><button onClick={() => setFilter("absent")} className="hover:text-yellow-300">Absent Students</button></li>
            <li><button onClick={handleLogout} className="hover:text-red-400 ">Logout</button></li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-gray-100">
          {/* Header with Search */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <input
              type="text"
              placeholder="Search participant..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="border p-2 rounded w-1/3"
            />
          </div>

          {/* Stats Cards */}
          <div className=" grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div onClick={() => setFilter("registered")} className=" hover:text-gray-800 hover:bg-green-200 bg-white p-4 rounded shadow cursor-pointer">
              Total Registrations: {stats.totalRegistrations}
            </div>
            <div onClick={() => setFilter("present")} className=" hover:text-gray-800 hover:bg-green-200  bg-white p-4 rounded shadow cursor-pointer">
              Present: {stats.present}
            </div>
            <div onClick={() => setFilter("absent")} className=" hover:text-gray-800 hover:bg-green-200 bg-white p-4 rounded shadow cursor-pointer">
              Absent: {stats.absent}
            </div>
            <div className=" hover:text-gray-800 hover:bg-green-200 bg-white p-4 rounded shadow">
              Attendance Rate: {stats.attendanceRate}%
            </div>
          </div>

          {/* Participants Table */}
          <table className="w-full bg-white rounded shadow">
            <thead>
              <tr className="bg-gray-300">
                <th className="p-2">Name</th>
                <th className="p-2">Email</th>
                <th className="p-2">Workshop</th>
                <th className="p-2">Attendance</th>
              </tr>
            </thead>
            <tbody>
              {filteredParticipants.map(p => (
                <tr key={p._id} className="border-t">
                  <td className="p-2">{p.fullName}</td>
                  <td className="p-2">{p.email}</td>
                  <td className="p-2">{p.workshopName}</td>
                  <td className="p-2">
                    <select
                      value={p.attendanceStatus || ""}
                      onChange={e => handleAttendance(p._id, e.target.value)}
                      className="border rounded p-1"
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
        </main>
      </div>
    );
  }

  export default Dashboard;
