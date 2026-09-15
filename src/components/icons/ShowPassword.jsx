function showPassword({ width = "w-6", height = "h-6" }) {
  return (
    <svg
      className={`${width} ${height}`}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="#000000"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="miter"
    >
      <path d="M2,12S5,4,12,4s10,8,10,8-2,8-10,8S2,12,2,12Z"></path>
      <circle cx="12" cy="12" r="4"></circle>
    </svg>
  );
}
export default showPassword;
