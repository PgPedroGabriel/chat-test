class Channel {
  constructor(name) {
    this.messages = [];
    this.name = name;
  }

  addMessage(message) {
    this.messages.unshift(message);
  }

  getLatestMessages(next, pageSize) {
    const nextNumber = parseInt(next, 10);
    const pageSizeNumber = parseInt(pageSize, 10);
    return this.messages.slice(nextNumber, nextNumber + pageSizeNumber);
  }
}

export default Channel;
