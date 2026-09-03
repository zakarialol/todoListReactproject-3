function displayError(setErrors, name, isvalid) {
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
