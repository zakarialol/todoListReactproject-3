export default function TimeHeader({ scrollLeft }) {
  const hours = Array.from(
    { length: 24 },
    (_, i) => `${String(i).padStart(2, "0")}:00`,
  );

  return (
    <div className="sticky top-[80px] z-30 flex bg-white">
      {/* Day column space */}
      <div className="w-32 shrink-0 border-b border-r border-gray-300 bg-white" />

      {/* Hours */}
      <div className="min-w-0 flex-1 overflow-hidden border-b border-gray-300">
        <div
          className="grid w-max"
          style={{
            gridTemplateColumns: "repeat(24, 120px)",
            transform: `translateX(-${scrollLeft}px)`,
          }}
        >
          {hours.map((hour, index) => (
            <div
              key={hour}
              className={`border-r border-gray-300 py-3 text-center text-sm ${
                index === 23 ? "border-r-0" : ""
              }`}
            >
              {hour}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
