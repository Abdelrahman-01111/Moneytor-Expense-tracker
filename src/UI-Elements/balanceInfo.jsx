import { NavLink } from "react-router";
export default function BalanceInfo({ money }) {
  return (
    <div className="main-info bg-black text-white h-42 rounded-2xl mx-auto w-full md:m-0">
      <div className="circle-1"></div>
      <div className="circle-2"></div>
      <div className="text-lg">Balance:</div>
      <h1 className="z-10 text-5xl mt-1">{money} $</h1>
    </div>
  );
}
