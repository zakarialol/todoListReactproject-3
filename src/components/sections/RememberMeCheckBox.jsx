import { useState } from "react";
//icons
import CheckIcon from "../icons/checkIcon";
function RememberMeCheckBox({ remmberMe, setRememberMe, text }) {
  return (
    <div className="flex gap-2 items-center">
      <div>
        <div>
          <label
            onClick={() => {
              setRememberMe(!remmberMe);
            }}
            className="w-5 h-5 block border border-[#7d7c7a] rounded relative"
            htmlFor="rememberMe"
          >
            <CheckIcon
              className={`absolute top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2 ${remmberMe ? "block" : "hidden"}`}
              width="20px"
              height="20px"
            />
          </label>
        </div>
        <input
          className="hidden"
          type="checkbox"
          name="rememberMe"
          id="rememberMe"
        />
      </div>
      <button
        className="inputTitle mb-0 text-xs"
        onClick={() => {
          setRememberMe(!remmberMe);
        }}
      >
        {text}
      </button>
    </div>
  );
}
export default RememberMeCheckBox;
