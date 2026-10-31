// const typeObject = {
//   health: "#7990F8",
//   work: "#46CF8B",
//   mental_health: "#BC5EAD",
//   education: "#034078",
//   debts: "#000501",
//   others: "#908986",
// };

// export default function ScheduleTask({ task }) {
//   const [hours] = task.whenToStart.split(":").map(Number);

//   // Convert duration from minutes to hours
//   const durationInHours = Number(task.taskDuration) / 60;

//   return (
//     <div
//       className="box-border min-w-0 p-1"
//       style={{
//         gridColumn: `${hours + 1} / span ${durationInHours}`,
//       }}
//     >
//       <div
//         className="h-full w-full rounded-md p-2"
//         style={{
//           backgroundColor: typeObject[task.type] || typeObject.others,
//         }}
//       >
//         <p className="whitespace-normal break-words text-sm">{task.task}</p>
//       </div>
//     </div>
//   );
// }

const typeObject = {
  health: "#7990F8",
  work: "#46CF8B",
  mental_health: "#BC5EAD",
  education: "#034078",
  debts: "#000501",
  others: "#908986",
};

export default function ScheduleTask({ task }) {
  const textColor =
    task.type === "debts" || task.type === "education" ? "#FFFFFF" : "#1F2937";
  const [hours, minutes] = task.whenToStart.split(":").map(Number);

  const start = hours + minutes / 60;
  const durationInHours = Number(task.taskDuration) / 60;

  return (
    <div
      className="box-border min-w-0 p-1"
      style={{
        gridColumn: `${start + 1} / span ${durationInHours}`,
        gridRow: task.row + 1,
      }}
    >
      <div
        className="h-full w-full rounded-md p-2"
        style={{
          backgroundColor: typeObject[task.type] || typeObject.others,
        }}
      >
        <p
          className="whitespace-normal break-words text-sm"
          style={{ color: textColor }}
        >
          {task.task}
        </p>
      </div>
    </div>
  );
}
