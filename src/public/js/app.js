//프론트엔드 JS
//서버로부터 연결
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

//메세지
socket.addEventListener("open", handleOpen);

socket.addEventListener("message", handleMessage);

socket.addEventListener("close", handleClose);

setTimeout(() => {
  socket.send("hello from the Brower");
}, 10000);
