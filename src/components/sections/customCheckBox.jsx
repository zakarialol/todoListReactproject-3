import CheckIcon from "../icons/checkIcon";

function CustomeCheckBox({ checked, onClick, id }) {
  return (
    <label
      htmlFor={id}
      className="w-5 h-5 block border border-[#7d7c7a] rounded relative cursor-pointer shrink-0"
    >
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onClick}
        className="sr-only"
      />

      <CheckIcon
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none ${
          checked ? "block" : "hidden"
        }`}
        width="20px"
        height="20px"
      />
    </label>
  );
}

export default CustomeCheckBox;
