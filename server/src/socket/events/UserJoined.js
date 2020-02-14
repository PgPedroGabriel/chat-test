export const description = 'user joined';

export const handler = socket => {
  socket.broadcast.emit(description, {
    username: socket.username,
  });
};
