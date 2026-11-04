import ScheduleTask from "./ScheduleTask";

export default function DayRow({ day, tasks }) {
  const sortedTasks = [...tasks].sort((a, b) =>
    a.whenToStart.localeCompare(b.whenToStart),
  );

  const rows = [];

  const positionedTasks = sortedTasks.map((task) => {
    const start =
      Number(task.whenToStart.split(":")[0]) +
      Number(task.whenToStart.split(":")[1]) / 60;

    const end = start + Number(task.taskDuration) / 60;

    let row = 0;

    while (rows[row] !== undefined && rows[row] > start) {
      row++;
    }

    rows[row] = end;

    return { ...task, row };
  });

  return (
    <div className="flex w-max border-b border-gray-300 last:border-b-0">
      {/* Sticky day column */}
      <div className="sticky left-0 z-20 w-32 shrink-0 border-r border-gray-300 bg-white p-3">
        <p className="font-medium">{day.label}</p>
        <p className="text-sm text-gray-500">{day.formattedDate}</p>
      </div>

      {/* Hours grid */}
      <div
        className="grid shrink-0"
        style={{
          gridTemplateColumns: "repeat(24, 120px)",
          gridAutoRows: "minmax(80px, auto)",
          gridAutoFlow: "row",
          backgroundImage:
            "linear-gradient(to right, transparent 119px, #d1d5db 119px)",
          backgroundSize: "120px 100%",
        }}
      >
        {positionedTasks.map((task) => (
          <ScheduleTask key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}
