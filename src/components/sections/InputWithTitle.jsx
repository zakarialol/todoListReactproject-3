import { useEffect } from "react";
function InputWithTitle({
  title,
  type,
  name,
  error,
  onblur,
  showError,
  // onChange,
  // value,
  ...props

  // ...props
}) {
  return (
    <>
      <div className="mb-4">
        <label className="block inputTitle">{title}</label>
        <input
          type={type}
          name={name}
          onBlur={onblur}
          {...props}
          className="registerInput"
        />

        <div
          className={`overflow-hidden transition-[max-height] duration-500 ${
            showError ? "max-h-20" : "max-h-0"
          }`}
        >
          {error.split(",").map((item) => {
            return (
              <p key={item} className="font-inter text-red-500 mr-4">
                {item}
              </p>
            );
          })}
        </div>
      </div>
    </>
  );
}
export default InputWithTitle;
