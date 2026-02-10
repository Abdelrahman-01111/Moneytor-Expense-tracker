import HistoryCell from "../UI-Elements/HistoryCell";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";
import { collection, getDocs, query, orderBy, doc } from "firebase/firestore";
import { db, Auth } from "/firebase"; // Adjust the import based on your firebase configuration
import { SignInContext, HistoryContext } from "../Contexts";
import { onAuthStateChanged } from "firebase/auth";
const handleData = async () => {
  const q = query(
    collection(db, "Users", Auth.currentUser.uid, "history"),
    orderBy("createdAt", "desc"),
  );
  return await getDocs(q);
};
const History = () => {
  const { history } = useContext(HistoryContext);
  const [mounted, setMounted] = useState(false);
  const [unmounting, setUnmounting] = useState(false);

  const { isSignedIn } = useContext(SignInContext);
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(Auth, (user) => {
      if (!user) {
        navigate("/auth");
      } else {
        if (history.length == 0) {
          // if the user reloads the history page, fetch data from firestore
          handleData().then((userHistory) => {
            setHistory(
              userHistory.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              })),
            );
          });
        }
      }
    });
  }, []);

  return (
    <div className="bg-white dark:bg-midnight min-h-screen p-3 shadow-lg dark:shadow-none ">
      <h1 className="p-5 text-center text-2xl">History</h1>
      {history.length > 0 ? (
        history.map((doc) => <HistoryCell key={doc.id} item={doc} />)
      ) : (
        <h1 className="text-center text-gray-400">No history found</h1>
      )}
    </div>
  );
};

export default History;
