import validTextArea from "./validTextArea";
import displayError from "./displayError";
function livinTextArea(e, setErrors) {
  const name = e.target.name;
  const message = e.target.value;

  const isvalid = validTextArea(message);
  displayError(setErrors, name, isvalid);
}
export default livinTextArea;
