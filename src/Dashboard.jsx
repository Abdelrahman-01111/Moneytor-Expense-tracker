import React, { useState } from "react";
import { Outlet } from "react-router";
import NavBar from "./Components/NavBar.jsx";
import { HistoryContext } from "./Contexts.jsx";
export default function Dashboard() {
  const [historyData, setHistoryData] = useState([]);
  return (
    <div className="flex flex-col md:flex-row-reverse max-h-screen overflow-hidden h-[100svh]">
      <main className="flex-1 overflow-hidden relative">
        <div className="h-full overflow-y-auto transition-all">
          <HistoryContext.Provider
            value={{ history: historyData, setHistory: setHistoryData }}
          >
            <Outlet />
          </HistoryContext.Provider>
        </div>
      </main>
      <NavBar />
    </div>
  );
}
