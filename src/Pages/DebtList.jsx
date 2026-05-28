import { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../Contexts";
import {
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { db, Auth } from "../../firebase";
import AddBtn from "../Components/AddBtn";
import FullScreenForm from "../Components/FullScreenForm";

export default function DebtList() {
  const { theme } = useContext(ThemeContext);
  const [debts, setDebts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [direction, setDirection] = useState("owe");
  const [note, setNote] = useState("");

  const isDark = theme === "dark";

  useEffect(() => {
    if (!Auth.currentUser) return;
    const q = query(
      collection(db, "Users", Auth.currentUser.uid, "debts"),
      orderBy("createdAt", "desc"),
    );
    const unsub = onSnapshot(q, (snap) => {
      setDebts(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, []);

  const handleAdd = async () => {
    if (!name.trim() || !amount) return;
    await addDoc(collection(db, "Users", Auth.currentUser.uid, "debts"), {
      name: name.trim(),
      amount: Number(amount),
      direction,
      note: note.trim(),
      paid: false,
      createdAt: new Date().toISOString(),
    });
    setName("");
    setAmount("");
    setNote("");
    setShowForm(false);
  };

  const togglePaid = async (debt) => {
    await updateDoc(doc(db, "Users", Auth.currentUser.uid, "debts", debt.id), {
      paid: !debt.paid,
    });
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "Users", Auth.currentUser.uid, "debts", id));
  };

  const totalOweAmount = debts
    .filter((d) => d.direction === "owe")
    .reduce((s, d) => s + d.amount, 0);

  const totalOwePaid = debts
    .filter((d) => d.direction === "owe" && d.paid)
    .reduce((s, d) => s + d.amount, 0);

  const totalLiabilities = totalOweAmount - totalOwePaid;

  const formatCurrency = (val) => {
    return (
      "$" +
      val.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    );
  };

  return (
    <div className="min-h-full bg-[#f8f9fc] dark:bg-midnight-950 p-4 sm:p-6 md:p-8 pb-32">
      <div className="max-w-4xl mx-auto">
        {/* Total Liabilities Card */}
        <div
          className={`rounded-2xl p-6 sm:p-8 mb-8 shadow-sm border ${isDark ? "bg-midnight-900 border-gray-800" : "bg-white border-violet-100"}`}
        >
          <p
            className={`text-sm font-medium mb-2 ${isDark ? "text-gray-400" : "text-gray-600"}`}
          >
            Total Depts
          </p>
          <p className="text-4xl sm:text-5xl font-bold text-[#5c17e5] dark:text-violet-400 mb-8">
            {formatCurrency(totalLiabilities)}
          </p>
        </div>

        <h2
          className={`text-2xl font-medium mb-6 ${isDark ? "text-white" : "text-gray-900"}`}
        >
          Active Depts
        </h2>

        {/* Debt Grid */}
        {debts.filter((d) => !d.paid).length === 0 ? (
          <p
            className={`text-center py-12 text-sm ${isDark ? "text-gray-500" : "text-gray-400"}`}
          >
            No active Depts, You're all caught up!
          </p>
        ) : (
          <div className="flex flex-col gap-4 sm:gap-6">
            {debts
              .filter((d) => !d.paid)
              .map((debt) => (
                <div
                  key={debt.id}
                  className={` md:min-w-105 p-5 sm:p-6 rounded-2xl border shadow-sm transition-colors relative group ${isDark ? "bg-midnight-900 border-gray-800 hover:border-gray-700" : "bg-white border-gray-200 hover:border-violet-200"}`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center ${isDark ? "bg-midnight-800 text-indigo-400" : "bg-indigo-100/50 text-indigo-600"}`}
                    >
                      <span className="material-symbols-outlined">
                        {debt.direction === "owe"
                          ? "credit_card"
                          : "account_balance"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {/* Action buttons appear on hover for desktop, always visible on mobile */}
                      <div className="opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity flex items-center gap-2 mr-2">
                        <button
                          onClick={() => togglePaid(debt)}
                          className="text-gray-400 hover:text-emerald-500 transition-colors"
                          title="Mark as Paid"
                        >
                          <span className="material-symbols-outlined text-xl">
                            check_circle
                          </span>
                        </button>
                        <button
                          onClick={() => handleDelete(debt.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                          title="Delete"
                        >
                          <span className="material-symbols-outlined text-xl">
                            delete
                          </span>
                        </button>
                      </div>
                      <span
                        className={`text-[11px] px-3 py-1 rounded-full font-medium ${isDark ? "bg-midnight-800 text-slate-300" : "bg-slate-100 text-slate-600"}`}
                      >
                        {debt.direction === "owe" ? "Liability" : "Asset"}
                      </span>
                    </div>
                  </div>

                  <h3
                    className={`text-lg font-medium mb-1 truncate ${isDark ? "text-gray-100" : "text-gray-900"}`}
                  >
                    {debt.name}
                  </h3>
                  <p
                    className={`text-xs font-medium mb-5 truncate ${isDark ? "text-red-400/80" : "text-red-500/80"}`}
                  >
                    {debt.note ||
                      (debt.direction === "owe"
                        ? "APR 19.99%"
                        : "Expected Return")}
                  </p>

                  <div
                    className={`border-t mb-4 ${isDark ? "border-gray-800" : "border-gray-100"}`}
                  ></div>

                  <div className="flex justify-between items-end">
                    <span
                      className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}
                    >
                      Current Balance
                    </span>
                    <span
                      className={`text-xl font-medium ${isDark ? "text-gray-100" : "text-gray-900"}`}
                    >
                      {formatCurrency(debt.amount)}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>

      {/* FAB */}
      <AddBtn onClick={() => setShowForm(true)} />
      {/* Add Debt Form — full screen */}
      {showForm && (
        <FullScreenForm
          title="Add Debt"
          onClose={() => setShowForm(false)}
          onConfirm={handleAdd}
        >
          {/* Direction Toggle */}
          <nav className="flex justify-center" aria-label="Debt direction">
            <div
              className={`flex items-center gap-1 p-1 rounded-full ${isDark ? "bg-gray-800" : "bg-gray-100"}`}
            >
              <button
                type="button"
                onClick={() => setDirection("owe")}
                className={`px-3 sm:px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 ${direction === "owe" ? "bg-red-500 text-white shadow" : isDark ? "text-gray-300" : "text-gray-600"}`}
              >
                <span className="material-symbols-outlined text-base">
                  arrow_upward
                </span>
                I Owe
              </button>
              <button
                type="button"
                onClick={() => setDirection("owed")}
                className={`px-3 sm:px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 ${direction === "owed" ? "bg-emerald-500 text-white shadow" : isDark ? "text-gray-300" : "text-gray-600"}`}
              >
                <span className="material-symbols-outlined text-base">
                  arrow_downward
                </span>
                Owes Me
              </button>
            </div>
          </nav>

          <input
            className={`outline-none border-2 p-3 rounded-xl w-full text-sm sm:text-base transition-colors ${isDark ? "bg-midnight border-midnight-700 focus:border-gray-500" : "bg-white border-gray-300 focus:border-gray-500"}`}
            type="text"
            placeholder="Person's name..."
            value={name}
            autoFocus
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" &&
              e.currentTarget.nextElementSibling?.focus()
            }
          />
          <input
            className={`outline-none border-2 p-3 rounded-xl w-full text-sm sm:text-base transition-colors ${isDark ? "bg-midnight border-midnight-700 focus:border-gray-500" : "bg-white border-gray-300 focus:border-gray-500"}`}
            type="number"
            placeholder="Amount..."
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" &&
              e.currentTarget.nextElementSibling?.focus()
            }
          />
          <input
            className={`outline-none border-2 p-3 rounded-xl w-full text-sm sm:text-base transition-colors ${isDark ? "bg-midnight border-midnight-700 focus:border-gray-500" : "bg-white border-gray-300 focus:border-gray-500"}`}
            type="text"
            placeholder="Note (optional)..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          />
        </FullScreenForm>
      )}
    </div>
  );
}
