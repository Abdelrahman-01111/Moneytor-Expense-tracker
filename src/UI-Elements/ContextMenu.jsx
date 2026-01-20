import { deleteDoc, doc } from "firebase/firestore";
import { Auth, db } from "../../firebase";

const ContextMenu = ({ isHidden, setHidden, docID, setHistory }) => {
    return (
        <div className={isHidden ? "hidden" : "" + "text-[20px] flex flex-col gap-2 border-2 bg-midnight-950 border-midnight-700 rounded-2xl p-4 shadow-lg absolute right-0 top-full z-50"}>
            <div className="pb-2 hover:bg-midnight-700 border-b-2 border-midnight-700 cursor-pointer">Edit</div>
            <div className="hover:bg-midnight-700 cursor-pointer " onClick={(e) => {
                e.currentTarget.closest(".parent").remove();


                deleteDoc(doc(db, "Users", Auth.currentUser.uid, "history", docID));
                setHistory(prev => prev.filter(item => item.docID !== docID));
            }}>Delete</div>

        </div>
    );
};

export default ContextMenu;