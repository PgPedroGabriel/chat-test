export const description = 'new message';

export const handler = (chat, socket, data) => {
  console.log(`New message channel:${data.channel}`);

  socket.broadcast.emit(description, {
    user: { name: socket.username },
    message: data.message,
    createdAt: new Date(),
    channel: data.channel,
  });
};
