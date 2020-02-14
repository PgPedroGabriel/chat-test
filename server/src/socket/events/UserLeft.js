export const description = 'user left';

export const handler = (socket, chat) => {
  chat.removeUser(socket.username);
  chat.removeChannel(socket.username);

  socket.broadcast.emit(description, {
    username: socket.username,
  });
};
