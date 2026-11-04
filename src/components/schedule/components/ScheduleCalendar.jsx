import { useState } from "react";
import DayRow from "./DayRow";
import TimeHeader from "./TimeHeader";

export default function ScheduleCalendar({ selectedDate, tasks }) {
  const [scrollLeft, setScrollLeft] = useState(0);

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
    <div className="w-full">
      <TimeHeader scrollLeft={scrollLeft} />

      <div
        className="w-full overflow-x-auto"
        onScroll={(e) => setScrollLeft(e.currentTarget.scrollLeft)}
      >
        <div className="w-max rounded-lg border border-gray-300">
          {days.map((day) => (
            <DayRow
              key={day.date}
              day={day}
              tasks={tasks.filter(
                (task) => task.taskDay === day.date && !task.completed,
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
