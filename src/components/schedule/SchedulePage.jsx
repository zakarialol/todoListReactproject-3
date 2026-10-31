import { useState } from "react";
import { useTasks } from "../../context/tasksProvider";

import ScheduleHeader from "./components/ScheduleHeader";
import ScheduleCalendar from "./components/ScheduleCalendar";

function SchedulePage() {
  const { tasks, tasksLoading } = useTasks();

  const [selectedDate, setSelectedDate] = useState(new Date());

  if (tasksLoading) return <p>Loading schedule...</p>;

  // Exclude tasks inside the Bin
  const scheduledTasks = tasks.filter(
    (task) =>
      !task.deletedAt && task.taskDay && task.whenToStart && task.taskDuration,
  );

  return (
    <div className="p-6 mt-[80px]">
      <ScheduleHeader
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <ScheduleCalendar selectedDate={selectedDate} tasks={scheduledTasks} />
    </div>
  );
}

export default SchedulePage;
