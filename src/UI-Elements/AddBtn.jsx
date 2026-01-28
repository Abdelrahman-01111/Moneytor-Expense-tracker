export default function AddBtn({ onClick }) {
  return (
    <button
      className="absolute z-99 bottom-30 cursor-pointer bg-violet-700 w-17 h-17 rounded-xl flex justify-center items-center shadow-lg text-white right-4 active:bg-violet-600 hover:scale-[1.06] transition-transform "
      onClick={onClick}
    >
      <span className="material-symbols-outlined">add</span>
    </button>
  );
}
