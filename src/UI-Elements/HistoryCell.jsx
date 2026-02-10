import { use, useState } from "react";
import ContextMenu from "./ContextMenu";
import { HistoryContext } from "../Contexts";
import { useContext } from "react";
export default function HistoryCell({ item }) {
  const [open, setOpen] = useState(false);
  const { setHistory } = useContext(HistoryContext);
  return (
    <div className="parent text-[18px] lg:text-2xl p-3 lg:p-4 border-gray-300 dark:border-midnight-700 border-b-2 flex items-center relative">
      <h1 className="text-bold text-sm text-gray-400 mr-3">{item.date}</h1>

      <p className="flex-1">{item.object}</p>
      <h3
        className={
          (item.type == "add" ? "text-blue-500 " : "text-red-500 ") + "mr-3"
        }
      >
        {item.type === "add" ? "+" : "-"}
        {item.money}$
      </h3>

      <div
        className="relative"
        onMouseEnter={() => {
          setOpen(true);
        }}
        onMouseLeave={() => {
          setOpen(0);
        }}
      >
        <button
          aria-expanded={open}
          className="material-symbols-outlined p-2 rounded-full dark:hover:bg-midnight-800"
        >
          more_vert
        </button>

        <ContextMenu
          isHidden={!open}
          setHidden={setOpen}
          docID={item.id}
          setHistory={setHistory}
        />
      </div>
    </div>
  );
}
