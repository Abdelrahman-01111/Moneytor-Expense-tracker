import ContextMenu from "./ContextMenu";
import { useState } from "react";
export default function HistoryCell({ info, type, amount, date, docRef }) {
  const [menu, toggleMenu] = useState(true);
  return (
    <div className="parent text-[18px] lg:text-2xl p-2 lg:p-4 border-gray-300 dark:border-midnight-700 border-b-2 flex items-center relative">
      <h1 className="text-bold text-sm text-gray-400 mr-3">{date}</h1>

      <p className="flex-1">{info}</p>
      <h3 className={(type == "add" ? "text-blue-500 " : "text-red-500 ") + "mr-3"}>{type === "add" ? "+" : "-"}{amount}$</h3>
      <span className="cursor-pointer relative text-center material-symbols-outlined" onMouseOver={() => {
        toggleMenu(false); navigator.vibrate(200);
      }} onMouseLeave={() => toggleMenu(true)}><ContextMenu isHidden={menu} docRef={docRef} />more_vert</span>

    </div>
  );

}