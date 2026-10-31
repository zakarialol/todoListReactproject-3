import DayRow from "./DayRow";
import TimeHeader from "./TimeHeader";

export default function ScheduleCalendar({ selectedDate, tasks }) {
  // Generate 7 days starting from selectedDate
  const days = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(selectedDate);

    date.setDate(date.getDate() + index);

    return {
      date: [
        date.getFullYear(),
        String(date.getMonth() + 1).padStart(2, "0"),
        String(date.getDate()).padStart(2, "0"),
      ].join("-"),

      label: date.toLocaleDateString("en-US", {
        weekday: "long",
      }),

      formattedDate: date.toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
      }),
    };
  });

  return (
    <div className="overflow-x-clip">
      <div className="w-max rounded-lg border border-gray-300">
        {/* Header */}
        <div className="sticky top-[80px] z-30 flex bg-white">
          <div className="w-32 shrink-0 border-b border-r border-gray-300 bg-white" />

          <TimeHeader />
        </div>

        {/* Days */}
        {days.map((day) => (
          <DayRow
            key={day.date}
            day={day}
            tasks={tasks.filter((task) => task.taskDay === day.date)}
          />
        ))}
      </div>
    </div>
  );
}
