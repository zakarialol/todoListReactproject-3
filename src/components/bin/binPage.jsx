import { useState } from "react";

import BinTable from "./components/BinTable";
import BinActions from "./components/BinActions";
import DeleteConfirmation from "./components/DeleteConfirmation";
import { useTasks } from "../../context/tasksProvider";
import { updateDoc, doc, collection, writeBatch } from "firebase/firestore";
import { auth, db } from "../../Firebase/firebase";

function BinPage() {
  const user = auth.currentUser;
  const { tasks, setTasks, tasksLoading } = useTasks();
  console.log("tasks inside the binPage", tasks);
  // let [binTasks, setBinTasks] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState([]);

  // Confirmation popup
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  if (tasksLoading) return <>...loading</>;
  const binTasks = tasks.filter((task) => task.deletedAt);
  // Select / deselect one task
  function handleSelect(taskId) {
    setSelectedTasks((prev) =>
      prev.includes(taskId)
        ? prev.filter((id) => id !== taskId)
        : [...prev, taskId],
    );
  }

  // Select / deselect all tasks
  function handleSelectAll() {
    if (selectedTasks.length === binTasks.length) {
      setSelectedTasks([]);
    } else {
      setSelectedTasks(binTasks.map((task) => task.id));
    }
  }

  // Restore tasks (temporary)
  function handleRestore(taskIds) {
    //---------------------------
    async function updateFireBaseTasks() {
      try {
        // Update ui Tasks
        setTasks((prev) =>
          prev.map((task) =>
            taskIds.includes(task.id) ? { ...task, deletedAt: null } : task,
          ),
        );
        const batch = writeBatch(db);

        taskIds.forEach((id) => {
          const taskRef = doc(db, "users", user.uid, "tasks", id);

          batch.update(taskRef, {
            deletedAt: null,
          });
        });

        // Send all updates to Firestore
        await batch.commit();
        // Clear restored tasks from selection
        setSelectedTasks((prev) => prev.filter((id) => !taskIds.includes(id)));
      } catch (error) {
        console.error("Error restoring tasks:", error);
      }
    }
    updateFireBaseTasks();
  }

  // Open delete confirmation
  function handleDelete(taskIds) {
    setSelectedTasks(taskIds);
    setShowDeletePopup(true);
  }
  // Confirm permanent deletion
  function deteTasksPremananent(selectedTasksIds) {
    async function PermanentDelete() {
      try {
        // Update local shared state
        setTasks((prev) =>
          prev.filter((task) => !selectedTasksIds.includes(task.id)),
        );
        // Clear selection
        setSelectedTasks((prev) =>
          prev.filter((id) => !selectedTasksIds.includes(id)),
        );
        //
        const batch = writeBatch(db);

        selectedTasksIds.forEach((id) => {
          const taskRef = doc(db, "users", user.uid, "tasks", id);

          batch.delete(taskRef);
        });

        await batch.commit();
      } catch (error) {
        console.error("Error deleting tasks:", error);
      }
    }
    PermanentDelete();
  }
  function confirmDelete() {
    deteTasksPremananent(selectedTasks);
    setShowDeletePopup(false);
  }

  // Bulk restore
  function handleRestoreSelected() {
    handleRestore(selectedTasks);
  }

  return (
    <div className="w-full space px-6 flex-1 mt-[80px]">
      {/* Tasks table */}
      {binTasks.length > 0 ? (
        <>
          {/* Heading */}
          <div className="mb-5">
            <h1 className="text-2xl font-semibold text-gray-800">
              Recently Deleted
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Tasks are permanently deleted after 30 days.
            </p>
          </div>

          {/* Bulk actions */}
          <BinActions
            selectedCount={selectedTasks.length}
            onRestore={handleRestoreSelected}
            onDelete={() => handleDelete(selectedTasks)}
          />

          <BinTable
            tasks={binTasks}
            selectedTasks={selectedTasks}
            onSelect={handleSelect}
            onSelectAll={handleSelectAll}
            onRestore={(taskId) => handleRestore([taskId])}
            onDelete={(taskId) => handleDelete([taskId])}
          />
        </>
      ) : (
        <>
          <div className="min-h-[350px] flex flex-col items-center justify-center text-center bg-white border border-slate-100 rounded-2xl p-8">
            <div className="w-20 h-20 rounded-3xl bg-slate-50 flex items-center justify-center mb-5">
              <svg
                width="38"
                height="38"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#94A3B8"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 6h18" />
                <path d="M8 6V4h8v2" />
                <path d="M19 6l-1 14H6L5 6" />
                <path d="M10 11v5M14 11v5" />
              </svg>
            </div>

            <h2 className="text-lg font-semibold text-slate-700">
              Your bin is empty
            </h2>

            <p className="text-sm text-slate-400 mt-2 max-w-xs">
              Deleted tasks will appear here. You can restore them whenever you
              need.
            </p>
          </div>
        </>
      )}

      {/* Delete confirmation */}
      <DeleteConfirmation
        open={showDeletePopup}
        count={selectedTasks.length}
        onCancel={() => setShowDeletePopup(false)}
        onConfirm={confirmDelete}
      />
    </div>
  );
}

export default BinPage;
