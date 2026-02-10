import { useEffect, useState, useContext } from "react";
import { useNavigate, NavLink } from "react-router";
import BalanceInfo from "../UI-Elements/balanceInfo";
import Payment from "../UI-Elements/payment";
import {
  doc,
  getDoc,
  setDoc,
  collection,
  getDocs,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { HistoryContext } from "../Contexts";
import { db, Auth } from "/firebase";
import { onAuthStateChanged } from "firebase/auth";
import LatestLogs from "../UI-Elements/LatestLogs";

import Graph from "../UI-Elements/Graph";
import Topbar from "../UI-Elements/Topbar";
import AddBtn from "../UI-Elements/AddBtn";
function Home() {
  const [active, setActive] = useState(""); // can be "add" or "spend" or "" , drilled down to Payment component
  const [money, setMoney] = useState(0);
  const [scrolling, setScrolling] = useState(false);
  const { history, setHistory } = useContext(HistoryContext);
  const navigate = useNavigate();

  async function getUserInfo() {
    const docSnap = await getDoc(doc(db, "Users", Auth.currentUser.uid));

    if (docSnap.exists()) {
      if (docSnap.data().balance) {
        setMoney(docSnap.data().balance);
        localStorage.setItem("balance", docSnap.data().balance);
      } else {
        localStorage.setItem("balance", 0);
        setDoc(doc(db, "Users", Auth.currentUser.uid), { balance: 0 });
        setMoney(0);
      }
      getDocs(
        query(
          collection(db, "Users", Auth.currentUser.uid, "history"),
          orderBy("createdAt", "desc"),
        ),
      ).then((userHistory) => {
        setHistory(
          userHistory.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          })),
        );
      });
    }
  }

  useEffect(() => {
    const unSub = onAuthStateChanged(Auth, (user) => {
      //same session
      money == 0 && setMoney(Number(localStorage.getItem("balance")) || 0);
      onSnapshot(
        collection(db, "Users", Auth.currentUser.uid, "history"),
        () => {
          getUserInfo();
        },
      );

      if (!user) {
        //not signed in

        navigate("/auth");
      }
    });
    return () => {
      unSub();
    };
  }, []);

  // add mounted class to trigger animation after mount

  return (
    <main className="p-2 bg-white overflow-y-scroll dark:bg-midnight">
      <Topbar />
      <BalanceInfo money={money} />

      <div className="">
        <Graph
          data={history
            .slice(history.length - 10)
            .reverse()
            .map((item, index) => ({
              name: item.date,
              uv: item.money,
            }))}
        />

        <AddBtn onClick={() => setActive("add")} scrolling={scrolling} />
        <LatestLogs history={history} />
        <Payment
          active={active}
          setActive={setActive}
          setMoney={setMoney}
          money={money}
          setHistory={setHistory}
        />
      </div>
    </main>
  );
}

export default Home;
