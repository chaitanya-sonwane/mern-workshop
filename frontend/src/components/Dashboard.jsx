import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [stats, setStats] = useState({});
  const [participants, setParticipants] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios.get("/api/dashboard").then(res => setStats(res.data));
    axios.get("/api/participants").then(res => setParticipants(res.data));
  }, []);

  const filtered = participants.filter(p =>
    p?.fullName?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-slate-900 text-white min-h-screen p-6">
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card title="Total Registrations" value={stats?.totalRegistrations || 0} />
        <Card title="Present Students" value={stats?.present || 0} color="green" />
        <Card title="Absent Students" value={stats?.absent || 0} color="red" />
        <Card title="Attendance Rate" value={`${stats?.attendanceRate || 0}%`} />
      </div>

      {/* Search & Filter */}
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search..."
          className="bg-slate-800 p-2 rounded w-1/3"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div>
          <button className="px-3 py-1 bg-slate-700 rounded mr-2">All</button>
          <button className="px-3 py-1 bg-green-600 rounded mr-2">Present</button>
          <button className="px-3 py-1 bg-red-600 rounded">Absent</button>
        </div>
      </div>

      {/* Participants Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-800">
              <th>ID</th><th>Name</th><th>Email</th><th>Mobile</th>
              <th>Workshop</th><th>Status</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p._id} className="border-b border-slate-700">
                <td>{p.registrationId}</td>
                <td>{p.fullName}</td>
                <td>{p.email}</td>
                <td>{p.mobile}</td>
                <td>{p.workshopName}</td>
                <td className={p.attendanceStatus === "Present" ? "text-green-500" : "text-red-500"}>
                  {p.attendanceStatus}
                </td>
                <td>
                  <button className="text-blue-500 mr-2">Edit</button>
                  <button className="text-red-500">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Card = ({ title, value, color }) => (
  <div className={`p-4 rounded bg-slate-800 
      ${color === "green" ? "border-green-500" : ""} 
      ${color === "red" ? "border-red-500" : ""}`}>
    <h3 className="text-sm text-gray-400">{title}</h3>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

export default Dashboard;
