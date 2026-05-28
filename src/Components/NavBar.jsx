import { useState } from "react";
import { NavLink } from "react-router";
const navItems = [
  { name: "Home", icon: "home", to: "/" },
  { name: "History", icon: "history", to: "/history" },
  { name: "Debts", icon: "payments", to: "/debts" },
  { name: "Settings", icon: "settings", to: "/settings" },
];

export default function NavBar() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <nav
      className={`bottom-0 left-0 bg-white/90 dark:bg-midnight w-full md:w-fit md:h-full fixed md:static shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.1)] dark:shadow-none border-t border-gray-200 dark:border-t-0 md:border-r md:border-t-0 md:border-gray-200 dark:border-gray-800 flex flex-row md:flex-col items-center md:items-start justify-between md:justify-start p-2 md:p-4 transition-all z-50`}
    >
      {/* Collapse toggle - desktop only */}
      <button
        onClick={() => setCollapsed((s) => !s)}
        className="hidden md:flex items-center justify-center w-8 h-8 mb-4 ml-2 rounded-md bg-white/10 dark:text-white hover:bg-white/20 transition"
        aria-label="Toggle sidebar"
      >
        {collapsed ? "›" : "‹"}
      </button>

      <div className="flex md:flex-col w-full justify-evenly items-center">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.to}
            className={({ isActive }) => {
              const base =
                "flex flex-col md:flex-row md:gap-5 justify-start p-2 md:p-4 md:mb-5 w-full items-center text-lg rounded-xl transition";
              const themeText = "text-gray-700 dark:text-white";
              const hover = "hover:bg-violet-100 hover:dark:bg-violet-900/50";
              const active = isActive
                ? "bg-main text-white dark:bg-main-dark dark:text-violet-300 font-semibold"
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
