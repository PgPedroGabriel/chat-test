export const description = 'user typing';

export const handler = (socket, data) => {
  socket.broadcast.emit(description, data);
};
