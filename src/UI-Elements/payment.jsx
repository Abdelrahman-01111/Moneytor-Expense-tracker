import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { useContext, useState, useRef } from "react";
import { db } from "/firebase";
import { Auth } from "../../firebase";
import { SignInContext } from "../Contexts";
import { AnimatePresence, motion } from "motion/react";
const handleTransaction = async (type, amount, object) => {
  try {
    await addDoc(collection(db, `/Users/${Auth.currentUser.uid}/history/`), {
      date: new Date().getDate() + "/" + (new Date().getMonth() + 1),
      object: object,
      money: amount,
      type: type,
      createdAt: new Date().toISOString(),
    });
  } catch (e) {}
};
export default function Payment({
  active,
  setActive,
  setMoney,
  money,
  setHistory,
}) {
  const [amount, setAmount] = useState(0);
  const [object, setObject] = useState("");
  const [type, setType] = useState(active === "spend" ? "expense" : "income");
  const objectRef = useRef(null);

  return (
    <AnimatePresence>
      {active && (
        <>
          {" "}
          <motion.div
            className="bg-black/30 fixed top-0 left-0 w-full h-full z-40"
            key="layer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          ></motion.div>
          <motion.div
            key="payment"
            initial={{ y: 500 }}
            animate={{ y: 0 }}
            exit={{ y: 500 }}
            className={
              "z-150 fixed bg-white dark:bg-midnight-950 rounded-t-3xl left-0 md:left-1/2 md:translate-x-[-50%] bottom-0 w-full md:w-2/3   p-5 shadow-lg dark:shadow-none border-t border-gray-200 dark:border-midnight-700 "
            }
          >
            <div
              className="rounded-full hover:scale-105 transition-all bg-gray-200 dark:bg-midnight-700 p-3 w-10 h-10 flex justify-center items-center absolute cursor-pointer shadow-md dark:shadow-none"
              onClick={() => {
                setActive("");
              }}
            >
              <span className="material-symbols-outlined ">close</span>
            </div>
            <h1 className="text-center m-10 text-2xl">
              {type === "expense" ? "Spend" : "Add"} Money
            </h1>
            <div className="mb-4 flex flex-col items-center">
              <div className="flex items-center gap-2 bg-gray-100 dark:bg-midnight p-1 rounded-full">
                <button
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
                  <span className="material-symbols-outlined">
                    arrow_downward
                  </span>
                  Income
                </button>
                <button
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
                  <span className="material-symbols-outlined">
                    arrow_upward
                  </span>
                  Expense
                </button>
              </div>
            </div>
            <div>
              <input
                className="outline-none border-2 border-gray-300 dark:border-midnight-700 focus:border-gray-500 dark:focus:border-gray-300 p-3 rounded-xl w-full mb-5 bg-white dark:bg-midnight"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.currentTarget.nextElementSibling.focus();
                  }
                }}
                onChange={(e) => {
                  setAmount(Number(e.currentTarget.value));
                }}
                type="number"
                placeholder="Enter amount..."
              />
              <input
                className="outline-none border-2 border-gray-300 dark:border-midnight-700 focus:border-gray-500 dark:focus:border-gray-300 p-3 rounded-xl w-full bg-white dark:bg-midnight mb-7"
                type="text"
                placeholder="Enter object..."
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.currentTarget.nextElementSibling.click();
                  }
                }}
                ref={objectRef}
                onChange={(e) => {
                  setObject(e.currentTarget.value);
                }}
              />
              <div className="mb-6 flex justify-center">
                <button
                  aria-label="Use microphone to fill object"
                  className="w-14 h-14 rounded-full bg-gradient-to-b from-violet-500 to-violet-700 text-white flex items-center justify-center shadow-xl hover:scale-105 transition-transform"
                  onClick={async () => {
                    navigator.vibrate?.(50);
                    try {
                      const SpeechRecognition =
                        window.SpeechRecognition ||
                        window.webkitSpeechRecognition;
                      if (!SpeechRecognition) {
                        objectRef.current?.focus();
                        return;
                      }
                      const recog = new SpeechRecognition();
                      recog.lang = "en-US";
                      recog.interimResults = false;
                      recog.maxAlternatives = 1;
                      recog.start();
                      recog.onresult = (ev) => {
                        const transcript = ev.results[0][0].transcript;
                        setObject(transcript);
                        if (objectRef.current)
                          objectRef.current.value = transcript;
                      };
                      recog.onerror = () => {
                        if (objectRef.current) objectRef.current.focus();
                      };
                    } catch (e) {
                      if (objectRef.current) objectRef.current.focus();
                    }
                  }}
                >
                  <span className="material-symbols-outlined text-3xl">
                    mic
                  </span>
                </button>
              </div>
              <button
                className="bg-violet-600 hover:scale-101 transition-all text-white w-full p-3 rounded-xl cursor-pointer"
                onClick={(e) => {
                  navigator.vibrate(200);
                  if (amount && object) {
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
                    setHistory((prevHistory) => [
                      ...prevHistory,
                      {
                        id: Date.now(),
                        type: transType,
                        money: amount,
                        object: object,
                        date:
                          new Date().getDate() +
                          "/" +
                          (new Date().getMonth() + 1),
                        currentBalance: money,
                      },
                    ]);
                    localStorage.setItem(
                      "balance",
                      transType == "spend"
                        ? money - amount
                        : money + Number(amount),
                    );
                    setActive("");
                  }
                }}
              >
                Confirm
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
