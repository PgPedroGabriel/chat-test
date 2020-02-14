class Message {
  constructor(sender, text, createdAt = null) {
    this.sender = sender;
    this.user = {
      name: sender,
    };
    this.text = text;
    this.createdAt = createdAt === null ? new Date() : createdAt;
  }
}

export default Message;
