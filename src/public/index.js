const socket = io();
function send() {
  let input = document.getElementById("msgInput");
  let message = input.value;
  socket.emit("message", message);
  input.value = "";
}
socket.on("welcome", (msg) => {
  let textContainer = document.getElementById("textContainer");
  let textElement = document.createElement("p");
  textElement.textContent = msg;
  textContainer.appendChild(textElement);
});
socket.on("chat", (message) => {
  var textContainer = document.getElementById("textContainer");
  var textElement = document.createElement("p");
  textElement.textContent = message;
  textContainer.appendChild(textElement);
});
