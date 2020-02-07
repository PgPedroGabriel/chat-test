class Channel {
  constructor(name) {
    this.messages = [];
    this.name = name;
  }

  addMessage(message) {
    this.messages.push(message);
  }
}

export default Channel;
