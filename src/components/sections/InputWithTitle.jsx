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
  // useEffect(() => {
  //   console.log(props, "props");
  //   console.log(...props, "...props");
  //   console.log(value, "value line 14");
  //   console.log(onChange, "onChange line 16");
  // }, [value]);
  // console.log(value, "value line 14");
  // console.log(onChange, "onChange line 16");
  // console.log({ ...props }, "props line number 11");
  //
  return (
    <>
      <div className="mb-4">
        <label htmlFor={title} className="block inputTitle">
          {title}
        </label>
        <input
          type={type}
          name={name}
          onBlur={onblur}
          {...props}
          id={title}
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
