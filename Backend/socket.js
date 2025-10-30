const { socket } = require("socket.io");
const {text}=require("express")

function registerSocketHandlers(io) {
  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    const userId = socket.handshake?.query?.userId;

    if (userId) {
      socket.join(`user:${userId}`);
      socket.data.userId = userId;

      console.log(`${socket.id} joined room user:${userId}`);
    }

    socket.on("send-notification", (payload = {}, ack) => {
      const notification = {
        id: genId(),
        text: payload.text ?? "",
        meta: payload.meta ?? {},
        from: socket.data.userId ?? null,
        ts: Date.now(),
      };

      console.log("New notification:", notification);

      // Send notification to the specific user room
      if (payload.toUserId) {
        io.to(`user:${payload.toUserId}`).emit("receive-notification", notification);
      }
     else if(payload.room){
        io.to(payload.room).emit("receive-notification", notification);
     }
     else{
        io.emit("receive-notification", notification);  
     }
      // Acknowledge to sender
      if (typeof ack === "function") {
        ack({ status: "ok", notification });
      }
    });

    socket.on("join_room", ( room,ask) => {
        if(!room) return;
        socket.join(room);
        if (typeof ack === "function") {
            ack({ status: "ok", notification });
          }
     
    });
    socket.on("leave_room", ( room,ask) => {
        if(!room) return;
        socket.leave(room);
        if (typeof ack === "function") {
            ack({ status: "ok", notification });
          }
     
    });
    socket.on("disconnect", ( reason) => {
       console.log("disconnected",socket.id,reason); 
    })

  });
  function genId() {
    return Math.random().toString(36).slice(2) + Date.now().toString(36);
  }
  
}

module.exports = { registerSocketHandlers };
