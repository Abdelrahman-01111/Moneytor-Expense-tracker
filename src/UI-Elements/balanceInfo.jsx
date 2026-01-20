import { NavLink } from "react-router";
export default function BalanceInfo({ money }) {
  return (
    <div className="main-info bg-black text-white h-72 mx-auto w-full md:h-1/2 md:m-0 border-4">
      <div className="flex justify-between items-center absolute w-full p-3 z-20">
        <h1 className="text-xl">Welcome, Abdelrahman.</h1>
        <NavLink to="/settings">
          <span className="material-symbols-outlined settings cursor-pointer ">
            dehaze
          </span>
        </NavLink>
      </div>
      <div className="circle-1"></div>
      <div className="circle-2"></div>

      <p className="z-10 text-gray-300 text-3xl">Balance</p>
      <h1 className="z-10 text-5xl">{money}$</h1>
    </div>
  );
}
