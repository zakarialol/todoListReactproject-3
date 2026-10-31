function ScheduleHeader({ selectedDate, setSelectedDate }) {
  function changeWeek(amount) {
    const nextDate = new Date(selectedDate);

    nextDate.setDate(nextDate.getDate() + amount * 7);

    setSelectedDate(nextDate);
  }

  return (
    <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
      <h2 className="text-xl font-semibold">Schedule</h2>

      <div className="flex items-center gap-3">
        <button
          onClick={() => changeWeek(-1)}
          className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600 active:scale-95"
        >
          Previous
        </button>

        <button
          onClick={() => setSelectedDate(new Date())}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 active:scale-95"
        >
          Today
        </button>

        <button
          onClick={() => changeWeek(1)}
          className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600 active:scale-95"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ScheduleHeader;
