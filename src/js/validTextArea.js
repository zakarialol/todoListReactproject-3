function validTextArea(message) {
  return message.trim().length >= 10 && message.trim().length <= 3000;
}
export default validTextArea;
