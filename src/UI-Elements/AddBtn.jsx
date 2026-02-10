import { useState, useEffect } from "react";
export default function AddBtn({ onClick, scrolling }) {
  return (
    <button
      id="add-btn"
      className={`fixed z-99 bottom-25 md:bottom-10 cursor-pointer bg-violet-700 w-17 h-17 rounded-xl flex justify-center items-center shadow-lg text-white right-4 active:bg-violet-600 hover:scale-[1.06] transition-transform ${scrolling ? "opacity-0" : "opacity-100"}`}
      onClick={onClick}
    >
      <span className="material-symbols-outlined">add</span>
    </button>
  );
}
