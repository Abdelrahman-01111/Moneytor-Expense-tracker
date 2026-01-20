import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { useContext, useState } from "react";
import { db } from "/firebase";
import { Auth } from "../../firebase";
import { SignInContext } from "../Contexts";
const handleTransaction = async (type, amount, object) => {
  try {
    await addDoc(collection(db, `/Users/${Auth.currentUser.uid}/history/`), {
      date: (new Date().getDate()) + "/" + (new Date().getMonth() + 1),
      object: object,
      money: amount,
      type: type,
      createdAt: new Date().toISOString()
    });

  } catch (e) {

  }
}
export default function Payment({ active, setActive, setMoney, money, setHistory }) {

  const [amount, setAmount] = useState(0);
  const [object, setObject] = useState("");

  return (
    <div className={"transition-all z-15 absolute bg-white dark:bg-midnight-950 rounded-t-3xl left-0 bottom-0 w-full h-100 p-5 shadow-lg dark:shadow-none border-t border-gray-200 dark:border-midnight-700 "} >
      <div className="rounded-full bg-gray-200 dark:bg-midnight-700 p-3 w-10 h-10 flex justify-center items-center absolute cursor-pointer shadow-md dark:shadow-none" onClick={() => { setActive("") }}><span className="material-symbols-outlined ">close</span></div>
      <h1 className="text-center m-10 text-2xl">{active == "spend" ? "Spend" : "Add"} Money</h1>
      <div>
        <input className="outline-none border-2 border-gray-300 dark:border-midnight-700 focus:border-gray-500 dark:focus:border-gray-300 p-3 rounded-xl w-full mb-5 bg-white dark:bg-midnight" autoFocus onKeyDown={
          (e) => {
            if (e.key === 'Enter') {
              e.currentTarget.nextElementSibling.focus();
            }
          }} onChange={(e) => {

            setAmount(Number(e.currentTarget.value));

          }} type="number" placeholder="Enter amount..." />
        <input className="outline-none border-2 border-gray-300 dark:border-midnight-700 focus:border-gray-500 dark:focus:border-gray-300 p-3 rounded-xl w-full bg-white dark:bg-midnight mb-7" type="text" placeholder="Enter object..." onKeyDown={
          (e) => {
            if (e.key === 'Enter') {
              e.currentTarget.nextElementSibling.click();
            }
          }} onChange={(e) => { setObject(e.currentTarget.value); }} />
        <button className="bg-violet-600 text-white w-full p-3 rounded-xl cursor-pointer" onClick={(e) => {



          navigator.vibrate(200);
          if (amount && object) {
            handleTransaction(active, amount, object);
            if (active == "spend") {
              setMoney((prev) => prev - amount);

              setDoc((doc(db, "Users", Auth.currentUser.uid)), { balance: money - Number(amount) });
            } else {
              setMoney((prev) => prev + Number(amount));
              setDoc((doc(db, "Users", Auth.currentUser.uid)), { balance: money + Number(amount) });
            }
            setHistory((prevHistory) => ([...prevHistory, { id: Date.now(), type: active, money: amount, object: object, date: (new Date().getDate()) + "/" + (new Date().getMonth() + 1), currentBalance: money }]));
            localStorage.setItem("balance", active == "spend" ? money - amount : money + Number(amount));
            setActive("");
          }





        }} >Confirm</button>
      </div>

    </ div >
  )
}