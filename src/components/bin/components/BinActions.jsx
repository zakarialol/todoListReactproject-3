import { RotateCcw, Trash2 } from "lucide-react";

function BinActions({ selectedCount, onRestore, onDelete }) {
  const disabled = selectedCount === 0;

  return (
    <div className="flex items-center justify-end gap-3">
      <span className="mr-auto font-inter ">{selectedCount} selected</span>

      <button
        type="button"
        disabled={disabled}
        onClick={onRestore}
        className="flex items-center gap-2 rounded-lg border border-blue-200 px-3 py-2 text-blue-600 hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <RotateCcw size={17} />
        Restore
      </button>

      <button
        type="button"
        disabled={disabled}
        onClick={onDelete}
        className="flex items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-red-500 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <Trash2 size={17} />
        Delete
      </button>
    </div>
  );
}

export default BinActions;
