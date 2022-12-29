//front-end 자바 스크립트
//서버로부터 연결
const messageList = document.querySelector("ul");
const messageForm = document.querySelector("form");
const socket = new WebSocket(`ws://${window.location.host}`);

//function
function handleOpen() {
  console.log("Connected to Server!");
}
function handleMessage(message) {
  console.log("New message: ", message.data);
}
function handleClose() {
  console.log("Shotdown to Server!");
}
function handleSubmit(event) {
  event.preventDefault();
  const input = messageForm.querySelector("input");
  socket.send(input.value);
  input.value = "";
}

//메세지
socket.addEventListener("open", handleOpen);

socket.addEventListener("message", handleMessage);

socket.addEventListener("close", handleClose);

messageForm.addEventListener("submit", handleSubmit);
