function displayError(setErrors, name, isvalid) {
  console.log("isvalid", isvalid);
  setErrors((prev) => ({
    ...prev,
    [name]: {
      ...prev[name],
      touched: true,
      showError: !isvalid,
    },
  }));
}

export default displayError;
