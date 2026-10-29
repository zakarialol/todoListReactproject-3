import BinTableHeader from "./BinTableHeader";
import BinTableRow from "./BinTableRow";

function BinTable({
  tasks,
  selectedTasks,
  onSelect,
  onSelectAll,
  onRestore,
  onDelete,
}) {
  const allSelected = tasks.length > 0 && selectedTasks.length === tasks.length;

  return (
    <div className="w-full overflow-x-auto rounded-xl border border-gray-200">
      <table className="w-full min-w-[900px] text-sm">
        <BinTableHeader allSelected={allSelected} onSelectAll={onSelectAll} />

        <tbody>
          {tasks.map((task) => (
            <BinTableRow
              key={task.id}
              task={task}
              checked={selectedTasks.includes(task.id)}
              onSelect={onSelect}
              onRestore={onRestore}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BinTable;
