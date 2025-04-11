const connectedUsers = {}; // Key: userId, Value: socketId

const setupSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);

    socket.on("register", (userId) => {
      connectedUsers[userId] = socket.id;
      console.log(`User ${userId} registered with socket ${socket.id}`);
    });

    socket.on("disconnect", () => {
      for (const [userId, socketId] of Object.entries(connectedUsers)) {
        if (socketId === socket.id) {
          delete connectedUsers[userId];
          console.log(`User ${userId} disconnected`);
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
