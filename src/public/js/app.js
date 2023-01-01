//front-end 자바 스크립트
//서버로부터 연결
const messageList = document.querySelector("ul");
const nickNameForm = document.querySelector("#nick");
const messageForm = document.querySelector("#message");
const socket = new WebSocket(`ws://${window.location.host}`);

//function
function makeMessage(type, payload) {
  const msg = { type, payload };
  return JSON.stringify(msg);
}

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
  socket.send(makeMessage("new_message", input.value));
  input.value = "";
}
function handleNickSubmit(event) {
  event.preventDefault();
  const input = nickNameForm.querySelector("input");
  socket.send(makeMessage("nickname", input.value));
  input.value = "";
}

//메세지
socket.addEventListener("open", handleOpen);

socket.addEventListener("message", handleMessage);

socket.addEventListener("close", handleClose);

socket.addEventListener("message", (message) => {
  const li = document.createElement("li");
  li.innerText = message.data;
  messageList.append(li);
});

messageForm.addEventListener("submit", handleSubmit);
nickNameForm.addEventListener("submit", handleNickSubmit);
