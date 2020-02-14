export const description = 'new message';

export const handler = (chat, socket, data) => {
  socket.broadcast.emit(description, {
    user: { name: socket.username },
    text: data.text,
    createdAt: new Date(),
    channel: data.channel,
  });
};
