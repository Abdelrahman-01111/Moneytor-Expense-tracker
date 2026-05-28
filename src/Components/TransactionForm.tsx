import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { useState, useRef, type Dispatch, type SetStateAction } from "react";
import { db, Auth } from "../../firebase";
import FullScreenForm from "./FullScreenForm";

/** Shape of a single history entry used by the parent */
interface HistoryEntry {
  id: string | number;
  type: string;
  money: number;
  object: string;
  date: string;
  currentBalance?: number;
}

interface TransactionFormProps {
  /** "add" | "spend" | "" — empty string means closed */
  active: string;
  setActive: Dispatch<SetStateAction<string>>;
  setMoney: Dispatch<SetStateAction<number>>;
  money: number;
  setHistory: Dispatch<SetStateAction<HistoryEntry[]>>;
}

/** Persist a transaction to Firestore */
const handleTransaction = async (
  type: string,
  amount: number,
  object: string,
) => {
  try {
    await addDoc(collection(db, `/Users/${Auth.currentUser.uid}/history/`), {
      date: `${new Date().getDate()}/${new Date().getMonth() + 1}`,
      object,
      money: amount,
      type,
      createdAt: new Date().toISOString(),
    });
  } catch {
    /* Silently fail — mirrors original behaviour */
  }
};

export default function TransactionForm({
  active,
  setActive,
  setMoney,
  money,
  setHistory,
}: TransactionFormProps) {
  const [amount, setAmount] = useState(0);
  const [object, setObject] = useState("");
  const [type, setType] = useState<"expense" | "income">(
    active === "spend" ? "expense" : "income",
  );
  const objectRef = useRef<HTMLInputElement>(null);

  if (!active) return null;

  const confirm = () => {
    navigator.vibrate?.(200);

    if (!amount || !object) return;

    const transType = type === "expense" ? "spend" : "add";
    handleTransaction(transType, amount, object);

    if (transType === "spend") {
      setMoney((prev) => prev - amount);
      setDoc(doc(db, "Users", Auth.currentUser.uid), {
        balance: money - Number(amount),
      });
    } else {
      setMoney((prev) => prev + Number(amount));
      setDoc(doc(db, "Users", Auth.currentUser.uid), {
        balance: money + Number(amount),
      });
    }

    setHistory((prev) => [
      ...prev,
      {
        id: Date.now(),
        type: transType,
        money: amount,
        object,
        date: `${new Date().getDate()}/${new Date().getMonth() + 1}`,
        currentBalance: money,
      },
    ]);

    localStorage.setItem(
      "balance",
      String(transType === "spend" ? money - amount : money + Number(amount)),
    );

    setActive("");
  };

  const title = type === "expense" ? "Spend Money" : "Add Money";

  return (
    <FullScreenForm
      title={title}
      onClose={() => setActive("")}
      onConfirm={confirm}
    >
      {/* Income / Expense toggle */}
      <nav
        className="flex items-center gap-2 bg-gray-100 dark:bg-midnight p-1 rounded-full self-center"
        aria-label="Transaction type"
      >
        <button
          type="button"
          aria-pressed={type === "income"}
          onClick={() => {
            setType("income");
            setActive("add");
          }}
          className={`px-4 py-2 rounded-full transition-all text-sm flex items-center gap-2 ${
            type === "income"
              ? "bg-violet-600 text-white shadow"
              : "text-gray-600 dark:text-gray-300"
          }`}
        >
          <span className="material-symbols-outlined">arrow_downward</span>
          Income
        </button>
        <button
          type="button"
          aria-pressed={type === "expense"}
          onClick={() => {
            setType("expense");
            setActive("spend");
          }}
          className={`px-4 py-2 rounded-full transition-all text-sm flex items-center gap-2 ${
            type === "expense"
              ? "bg-violet-600 text-white shadow"
              : "text-gray-600 dark:text-gray-300"
          }`}
        >
          <span className="material-symbols-outlined">arrow_upward</span>
          Expense
        </button>
      </nav>

      {/* Amount input */}
      <input
        className="outline-none border-2 border-gray-300 dark:border-midnight-700 focus:border-gray-500 dark:focus:border-gray-300 p-3 rounded-xl w-full bg-white dark:bg-midnight"
        autoFocus
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            (e.currentTarget.nextElementSibling as HTMLElement)?.focus();
          }
        }}
        onChange={(e) => setAmount(Number(e.currentTarget.value))}
        type="number"
        placeholder="Enter amount..."
      />

      {/* Object / description input */}
      <input
        className="outline-none border-2 border-gray-300 dark:border-midnight-700 focus:border-gray-500 dark:focus:border-gray-300 p-3 rounded-xl w-full bg-white dark:bg-midnight"
        type="text"
        placeholder="Enter object..."
        onKeyDown={(e) => {
          if (e.key === "Enter") confirm();
        }}
        ref={objectRef}
        onChange={(e) => setObject(e.currentTarget.value)}
      />
    </FullScreenForm>
  );
}
