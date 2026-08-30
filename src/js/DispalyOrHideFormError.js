function displayOrhideformErrors(ErrorsObj, setState) {
  setState((prev) => {
    const updated = { ...prev };
    for (const key in ErrorsObj) {
      updated[key] = {
        ...updated[key],
        showError: ErrorsObj[key],
      };
    }
    return updated;
  });
}
export default displayOrhideformErrors;
