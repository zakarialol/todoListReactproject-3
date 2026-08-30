import { useState } from "react";

function useInput({ initialValue = "", errors: {} }) {
  const [value, setValue] = useState(initialValue);
  function handleChange(e) {
    console.log("onchange...");
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange,
  };
}

export default useInput;
