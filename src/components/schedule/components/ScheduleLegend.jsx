const categories = [
  { type: "Health", color: "#7990F8" },
  { type: "Work", color: "#46CF8B" },
  { type: "Mental Health", color: "#BC5EAD" },
  { type: "Education", color: "#034078" },
  { type: "Debts", color: "#000501" },
  { type: "Others", color: "#908986" },
];

export default function ScheduleLegend() {
  return (
    <div className="flex flex-wrap items-center gap-x-5 gap-y-3 mb-5">
      {categories.map((category) => (
        <div key={category.type} className="flex items-center gap-2">
          <span
            className="h-3 w-3 rounded-sm shrink-0"
            style={{ backgroundColor: category.color }}
          />

          <span className="text-sm text-gray-600">{category.type}</span>
        </div>
      ))}
    </div>
  );
}
