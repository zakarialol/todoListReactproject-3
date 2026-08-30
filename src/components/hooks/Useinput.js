import { useState } from "react";

function useInput({ initialValue = "", errors: {} }) {
  const [value, setValue] = useState(initialValue);
  function handleChange(e) {
    setValue(e.target.value);
  }
  return {
    value,
    year: "2020",
    onChange: handleChange,
  };
}

export default useInput;
