class Channel {
  constructor(name) {
    this.messages = [];
    this.name = name;
  }

  addMessage(message) {
    this.messages.unshift(message);
  }
}

export default Channel;
