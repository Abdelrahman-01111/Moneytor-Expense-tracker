import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useState } from "react";
import { deleteDoc, doc, updateDoc, getDoc } from "firebase/firestore";
import { Auth, db } from "../../firebase";

// Small, focused Context menu used by history items.
// Uses `reactjs-popup` to provide clean, minimal edit/delete dialogs.
const ContextMenu = ({ isHidden, setHidden, docID, setHistory }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editValues, setEditValues] = useState({ object: "", money: 0 });

  // Open confirm modal
  const handleDelete = () => setConfirmOpen(true);

  const performDelete = async () => {
    try {
      await deleteDoc(doc(db, "Users", Auth.currentUser.uid, "history", docID));
      setHistory((prev) => prev.filter((item) => item.id !== docID));
      setConfirmOpen(false);
      setHidden(true);
    } catch (err) {
      console.error("Failed to delete history item:", err);
      alert("Delete failed. See console for details.");
    }
  };

  // Open edit modal and preload values from Firestore
  const handleEdit = async () => {
    try {
      const snap = await getDoc(
        doc(db, "Users", Auth.currentUser.uid, "history", docID),
      );
      const d = snap.exists() ? snap.data() : {};
      setEditValues({ object: d.object || "", money: d.money || 0 });
      setEditOpen(true);
    } catch (err) {
      console.error("Failed to load entry for edit:", err);
      alert("Failed to load entry.");
    }
  };

  const performEdit = async () => {
    try {
      const { object, money } = editValues;
      if (typeof money !== "number" || isNaN(money)) {
        alert("Invalid amount");
        return;
      }
      const updates = {
        object: object?.trim() || "",
        money,
        updatedAt: new Date().toISOString(),
      };
      await updateDoc(
        doc(db, "Users", Auth.currentUser.uid, "history", docID),
        updates,
      );
      setHistory((prev) =>
        prev.map((item) =>
          item.id === docID ? { ...item, ...updates } : item,
        ),
      );
      setEditOpen(false);
      setHidden(true);
    } catch (err) {
      console.error("Failed to edit history item:", err);
      alert("Edit failed. See console for details.");
    }
  };

  return (
    <>
      <div
        role="menu"
        aria-hidden={isHidden}
        className={`${isHidden ? "hidden" : ""} text-[16px] w-44 flex flex-col gap-2 bg-white dark:bg-midnight-950 border border-midnight-700 rounded-lg p-2 shadow-lg absolute right-0 top-full z-50`}
      >
        <button
          type="button"
          role="menuitem"
          className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-midnight-800 transition"
          onClick={handleEdit}
        >
          <span className="material-symbols-outlined">edit</span>
          <span className="text-sm">Edit</span>
        </button>

        <button
          type="button"
          role="menuitem"
          className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-midnight-800 text-red-500 transition"
          onClick={handleDelete}
        >
          <span className="material-symbols-outlined">delete</span>
          <span className="text-sm">Delete</span>
        </button>
      </div>

      <Popup open={confirmOpen} modal onClose={() => setConfirmOpen(false)}>
        {(close) => (
          <div className="p-4 max-w-sm mx-auto rounded-2xl">
            <h3 className="text-lg font-semibold mb-2">Delete entry</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              This will permanently remove the entry from your history.
            </p>
            <div className="flex justify-end gap-2">
              <button
                className="px-3 py-1 rounded bg-gray-200"
                onClick={() => {
                  close();
                  setConfirmOpen(false);
                }}
              >
                Cancel
              </button>
              <button
                className="px-3 py-1 rounded bg-red-500 text-white"
                onClick={() => {
                  performDelete();
                  close();
                }}
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </Popup>

      <Popup open={editOpen} modal onClose={() => setEditOpen(false)}>
        {(close) => (
          <div className="p-4 max-w-md mx-auto rounded-2xl">
            <h3 className="text-lg font-semibold mb-2">Edit entry</h3>
            <label className="text-sm block mb-1">Description</label>
            <input
              value={editValues.object}
              onChange={(e) =>
                setEditValues((s) => ({ ...s, object: e.target.value }))
              }
              className="w-full p-2 border rounded mb-3 bg-white dark:bg-midnight"
            />
            <label className="text-sm block mb-1">Amount</label>
            <input
              type="number"
              value={editValues.money}
              onChange={(e) =>
                setEditValues((s) => ({ ...s, money: Number(e.target.value) }))
              }
              className="w-full p-2 border rounded mb-4 bg-white dark:bg-midnight"
            />
            <div className="flex justify-end gap-2">
              <button
                className="px-3 py-1 rounded bg-gray-200"
                onClick={() => {
                  close();
                  setEditOpen(false);
                }}
              >
                Cancel
              </button>
              <button
                className="px-3 py-1 rounded bg-violet-600 text-white"
                onClick={() => {
                  performEdit();
                  close();
                }}
              >
                Save
              </button>
            </div>
          </div>
        )}
      </Popup>
    </>
  );
};

export default ContextMenu;
