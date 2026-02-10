import { useState } from "react";

export default function HistoryCell({ item }) {
  const [open, setOpen] = useState(false);

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

      <div className="relative">
        <button
          aria-expanded={open}
          onClick={() => {
            setOpen((s) => !s);
            navigator.vibrate?.(20);
          }}
          className="material-symbols-outlined p-2 rounded-full hover:bg-gray-100 dark:hover:bg-midnight-800"
        >
          more_vert
        </button>

        {!open ? null : (
          <div className="absolute right-0 top-full mt-2 w-44 bg-white dark:bg-midnight-900 border dark:border-midnight-700 rounded-lg shadow-lg z-40 py-2">
            <button
              onClick={() => {
                setOpen(false);
              }}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-midnight-800"
            >
              Edit
            </button>
            <button
              onClick={() => {
                setOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100 dark:hover:bg-midnight-800"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
