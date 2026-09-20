import { useEffect } from "react";
import SvgButton from "../Ui/Svgbutton";
import HidePasswordicon from "../icons/HidePassword";
import ShowPasswordicon from "../icons/ShowPassword";
import showPassword from "../icons/ShowPassword";
function PasswordInput({
  type,
  title,
  name,
  onblur,
  error,
  focused,
  onfocuse,
  showPassword,
  setshowPassword,
  showError,
  passwordCon = "",
  ...props
}) {
  //
  //!obj for error condition
  const validPasswordCondition = [
    "upperCase",
    "specialCaracter",
    "moreThanEightLetters",
  ];
  //!
  const errormsgs = error.split(",");
  const msgError = errormsgs.map((item, index) => {
    return (
      <p
        className={` font-inter  mr-4 ${passwordCon[validPasswordCondition[index]] ? "text-green-500" : "text-red-500"} `}
        key={index}
      >
        {item}
      </p>
    );
  });
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
            onFocus={onfocuse}
            className="registerInput"
            {...props}
          />
          {focused && (
            <SvgButton
              type="button"
              className="h-4 w-4 absolute right-3 top-[calc(50%-8px)]"
              svg={
                showPassword ? (
                  <ShowPasswordicon width="w-full" height="h-full" />
                ) : (
                  <HidePasswordicon width="w-full" height="h-full" />
                )
              }
              onMouseDown={(e) => {
                e.preventDefault();
              }}
              onclick={() => {
                setshowPassword((prev) => !prev);
              }}
            />
          )}
        </div>

        <div
          className={`overflow-hidden transition-[max-height] duration-500 ${
            showError ? "max-h-20" : "max-h-0"
          }`}
        >
          {msgError}
        </div>
      </div>
    </>
  );
}
export default PasswordInput;
