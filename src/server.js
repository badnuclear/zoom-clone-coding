//back-end 자바 스크립트
import express from "express";
import SocketIO from "socket.io";
import http from "http";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

//http와 웹 소켓 서버 연결
const httpServer = http.createServer(app);
const wsServer = SocketIO(httpServer);

wsServer.on("connection", (socket) => {
  socket.on("enter_room", (msg, done) => {
    console.log(msg);
    setTimeout(() => {
      done();
    }, 10000);
  });
});

//socket은 서버와 브라우져의 연결
/* const sockets = [];

wss.on("connection", (socket) => {
  sockets.push(socket);
  socket["nickname"] = "Anon";
  console.log("Connected to Brower!");
  socket.on("close", onSocketClose);
  socket.on("message", (msg) => {
    const message = JSON.parse(msg);
    switch (message.type) {
      case "new_message":
        sockets.forEach((aSocket) =>
          aSocket.send(
            `${socket.nickname}: ${message.payload.toString("utf8")}`
          )
        );
        break;
      case "nickname":
        socket["nickname"] = message.payload;
    }
  });
});
*/
//포트 번호 3000
const handleListen = () => console.log("Listening on http://localhost:3000/");
httpServer.listen(3000, handleListen);
