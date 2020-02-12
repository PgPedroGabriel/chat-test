export const description = 'new message';

export const handler = (chat, socket, data) => {
  socket.broadcast.emit(description, {
    user: { name: socket.username },
    message: data.message,
    createdAt: new Date(),
    channel: data.channel,
  });
};
