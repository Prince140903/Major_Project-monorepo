const connectedUsers = {}; // Key: userId, Value: socketId
const jwt = require("jsonwebtoken");
const SECRET = process.env.JSON_WEB_TOKEN_SECRET_KEY;

const setupSocket = (io) => {
  io.on("connection", (socket) => {
    const token = socket.handshake.auth.token;
    console.log("New client connected:", socket.id);

    socket.on("register", (token) => {
      console.log("Received token:", token);
      try {
        const decoded = jwt.verify(token, SECRET);
        const userId = decoded.id;

        if (!connectedUsers[userId]) {
          connectedUsers[userId] = new Set();
        }
        connectedUsers[userId].add(socket.id);
        console.log(`User ${userId} registered with socket ${socket.id}`);
      } catch (err) {
        console.log("Invalid token on socket register:", err.message);
        socket.disconnect(); // kick invalid clients
      }
    });

    socket.on("disconnect", () => {
      for (const [userId, socketIds] of Object.entries(connectedUsers)) {
        if (socketIds.has(socket.id)) {
          socketIds.delete(socket.id);
          console.log(`User ${userId} disconnected from socket ${socket.id}`);

          if (socketIds.size === 0) {
            delete connectedUsers[userId];
            console.log(`No more active sockets for user ${userId}`);
          }

          break;
        }
      }
    });
  });
};

module.exports = {
  setupSocket,
  connectedUsers,
};
