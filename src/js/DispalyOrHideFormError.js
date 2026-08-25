function displayOrhideformErrors(ErrorsObj, setState) {
  for (const key in ErrorsObj) {
    setState((prev) => {
      const updated = { ...prev };
      updated[key] = {
        ...updated[key],
        showError: ErrorsObj[key],
      };
      return updated;
    });
  }
}
export default displayOrhideformErrors;
