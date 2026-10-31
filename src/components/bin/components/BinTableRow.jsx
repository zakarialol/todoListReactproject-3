import { RotateCcw, Trash2 } from "lucide-react";
import CustomeCheckBox from "../../sections/customCheckBox";
import ReplaceSpace from "../../../js/replaceSpace.js";
function BinTableRow({ task, checked, onSelect, onRestore, onDelete }) {
  const typeObject = {
    health: "#7990F8",
    work: "#46CF8B",
    mental_health: "#BC5EAD",
    education: "#034078",
    debts: "#000501",
    others: "#908986",
  };
  return (
    <tr className="border-b border-gray-200 hover:bg-gray-50">
      {/* Checkbox */}
      <td className="p-4">
        <CustomeCheckBox
          checked={checked}
          onClick={() => onSelect(task.id)}
          id={task.id}
        />
      </td>

      {/* Task */}
      <td className="p-4 font-medium text-gray-700 ">{task.task}</td>

      {/* Created At */}
      <td className="p-4 text-gray-500  whitespace-nowrap text-center">
        {task.date}
      </td>

      {/* Type */}
      <td
        className="p-4 capitalize text-center whitespace-nowrap"
        style={{ color: typeObject[ReplaceSpace(task.type)] }}
      >
        {task.type}
      </td>

      {/* Task Day */}
      <td className="p-4 text-gray-500 whitespace-nowrap text-center">
        {task.taskDay || "—"}
      </td>

      {/* whenToStart */}
      <td className="p-4 text-gray-500 text-center">
        {task.whenToStart || "—"}
      </td>

      {/* Duration */}
      <td className="p-4 text-gray-500 text-center">
        {task.taskDuration ? `${task.taskDuration + " min"}` : "—"}{" "}
      </td>

      {/* Actions */}
      <td className="p-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => onRestore(task.id)}
            title="Restore task"
            className="text-blue-500 hover:text-blue-700"
          >
            <RotateCcw size={19} />
          </button>

          <button
            type="button"
            onClick={() => onDelete(task.id)}
            title="Delete permanently"
            className="text-red-500 hover:text-red-700"
          >
            <Trash2 size={19} />
          </button>
        </div>
      </td>
    </tr>
  );
}

export default BinTableRow;
