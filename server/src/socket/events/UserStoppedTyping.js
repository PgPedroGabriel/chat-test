export const description = 'stop typing';

export const handler = (socket, data) => {
  socket.broadcast.emit(description, data);
};
