import React, { useState } from "react";
import { Outlet } from "react-router";
import NavBar from "./UI-Elements/NavBar.jsx";

export default function Dashboard() {
  const [data, setData] = useState([]);

  return (
    <div className="dashboard flex flex-col md:flex-row-reverse max-h-screen h-screen">
      <main className="dashboard-content flex-1">
        <div className="dashboard-grid max-h-screen overflow-y-scroll transition-all">
          <Outlet />
        </div>
      </main>
      <NavBar />
    </div>
  );
}
