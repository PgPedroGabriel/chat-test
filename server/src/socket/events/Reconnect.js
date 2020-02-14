export const description = 'reconnect';

export const handler = socket => {
  socket.broadcast.emit(description);
};

export default handler;
