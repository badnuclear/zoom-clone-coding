//프론트엔드 JS
//서버로부터 연결
const socket = new WebSocket(`ws://${window.location.host}`);

//메세지
socket.addEventListener("open", () => {
  console.log("Connected to Server!");
});

socket.addEventListener("message", (message) => {
  console.log("New message: ", message.data);
});

socket.addEventListener("close", () => {
  console.log("Shotdown to Server!");
});

setTimeout(() => {
  socket.send("hello from the Brower");
}, 10000);
