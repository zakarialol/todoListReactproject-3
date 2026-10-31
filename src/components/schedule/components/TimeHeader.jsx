export default function TimeHeader() {
  const hours = Array.from(
    { length: 24 },
    (_, i) => `${String(i).padStart(2, "0")}:00`,
  );

  return (
    <div
      className="grid border-b border-gray-300"
      style={{
        gridTemplateColumns: "repeat(24, 120px)",
      }}
    >
      {hours.map((hour, index) => (
        <div
          key={hour}
          className={`py-3 text-center text-sm border-r border-gray-300 ${
            index === 23 ? "border-r-0" : ""
          }`}
        >
          {hour}
        </div>
      ))}
    </div>
  );
}
