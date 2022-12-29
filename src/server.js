//back-end 자바 스크립트
import express from "express";
import WebSocket from "ws";
import http from "http";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));
const handleListen = () => console.log("Listening on http://localhost:3000/!!");

//http와 웹 소켓 서버 연결
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

function onSocketClose() {
  console.log("Shotdown to Brower!");
}

function onSocketMessage(message) {
  console.log(message.toString("utf8"));
}

//socket은 서버와 브라우져의 연결
const sockets = [];

wss.on("connection", (socket) => {
  sockets.push(socket);
  console.log("Connected to Brower!");
  socket.on("close", onSocketClose);
  socket.on("message", (message) => {
    sockets.forEach((aSocket) => aSocket.send(message.toString("utf8")));
  });
});

//포트 번호 3000
server.listen(3000, handleListen);
