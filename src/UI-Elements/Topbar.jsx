import { NavLink } from "react-router";
export default function Topbar() {
  return (
    <div className="flex justify-between items-center w-full p-3 z-20">
      <h1 className="text-xl">Welcome, Abdelrahman.</h1>
      <NavLink to="/settings">
        <span className="material-symbols-outlined settings cursor-pointer ">
          dehaze
        </span>
      </NavLink>
    </div>
  );
}
