import { useEffect } from "react";
import SvgButton from "../Ui/Svgbutton";
import HidePasswordicon from "../icons/HidePassword";
import ShowPasswordicon from "../icons/ShowPassword";
function InputWithTitle({
  type,
  title,
  name,
  error,
  onblur,
  showError,
  hideShowPassowrdBtn,
  focused,
  onfocus,
  showPassword,
  setshowPassword,
  passwordCon,
  ...props

  // ...props
}) {
  // about the error msg
  //!obj for error condition
  const validPasswordCondition = [
    "upperCase",
    "specialCaracter",
    "moreThanEightLetters",
  ];
  //!
  let errorMsg;
  if (name === "password") {
    console.log(passwordCon, "passwordCon");
    const errorsMsgs = error.split(",");
    errorMsg = errorsMsgs.map((item, index) => {
      return (
        <p
          className={` font-inter  mr-4 ${passwordCon[validPasswordCondition[index]] ? "text-green-500" : "text-red-500"} ${
            showError ? "max-h-20" : "max-h-0"
          }`}
          key={index}
        >
          {item}
        </p>
      );
    });
  } else {
    errorMsg = <p className="font-inter text-red-500 mr-4">{error}</p>;
  }
  //
  return (
    <>
      <div className="mb-4">
        <label className="block inputTitle">{title}</label>
        <div className="relative">
          <input
            type={type}
            name={name}
            onBlur={onblur}
            onFocus={onfocus}
            {...props}
            className="registerInput"
          />
          {focused && (
            <SvgButton
              type="button"
              className="h-4 w-4 absolute right-3 top-[calc(50%-8px)]"
              svg={
                showPassword[name] ? (
                  <ShowPasswordicon width="w-full" height="h-full" />
                ) : (
                  <HidePasswordicon width="w-full" height="h-full" />
                )
              }
              onclick={() => {
                setshowPassword((prev) => ({ ...prev, [name]: !prev[name] }));
              }}
              onMouseDown={(e) => {
                e.preventDefault();
              }}
            />
          )}
        </div>

        <div
          className={`overflow-hidden transition-[max-height] duration-500 ${
            showError ? "max-h-20" : "max-h-0"
          }`}
        >
          {errorMsg}
        </div>
      </div>
    </>
  );
}
export default InputWithTitle;
