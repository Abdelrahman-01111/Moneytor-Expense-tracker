import { useState } from "react";
import { NavLink } from "react-router";
import { motion } from "motion/react";
const navItems = [
  { name: "Home", icon: "home", to: "/" },
  { name: "History", icon: "history", to: "/history" },
  { name: "Settings", icon: "settings", to: "/settings" },
];

export default function NavBar() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <nav
      className={`bottom-0 left-0 dark:bg-midnight-700 w-full md:w-fit md:h-full fixed md:static shadow-2xs border-2 border-gray-200 dark:border-0 md:rounded-none flex flex-row md:flex-col items-center md:items-start justify-between md:justify-start p-2 md:p-4 transition-all`}
    >
      {/* Collapse toggle - desktop only */}
      <button
        onClick={() => setCollapsed((s) => !s)}
        className="hidden md:flex items-center justify-center w-8 h-8 mb-4 ml-2 rounded-md bg-white/10 dark:text-white hover:bg-white/20 transition"
        aria-label="Toggle sidebar"
      >
        {collapsed ? "›" : "‹"}
      </button>

      <div className="flex md:flex-col w-full justify-around items-center">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.to}
            className={({ isActive }) => {
              const base =
                "flex flex-col md:flex-row md:gap-5 md:px-5 justify-start p-2 w-full items-center text-lg rounded-xl transition";
              const themeText = "text-gray-700 dark:text-white";
              const hover = "hover:text-violet-600 dark:hover:text-violet-400";
              const active = isActive
                ? "bg-violet-100 text-violet-700 dark:bg-violet-900 dark:text-violet-300 font-semibold"
                : "";
              return `${base} ${themeText} ${hover} ${active}`;
            }}
          >
            <span className="text-2xl material-symbols-outlined ">
              {item.icon}
            </span>
            <span
              className={`text-xs md:text-xl ${collapsed ? "md:hidden" : ""}`}
            >
              {item.name}
            </span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
