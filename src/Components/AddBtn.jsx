export default function AddBtn({ onClick }) {
  return (
    <button
      onClick={() => onClick()}
      className="fixed bottom-24 right-6 md:bottom-8 md:right-8 w-16 h-16 bg-[#5c17e5] hover:bg-violet-800 text-white rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105 z-40"
    >
      <span className="material-symbols-outlined text-3xl">add</span>
    </button>
  );
}
