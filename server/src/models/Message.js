class Message {
  constructor(user, text, createdAt = null) {
    this.user = user;
    this.text = text;
    this.createdAt = createdAt === null ? new Date() : createdAt;
  }
}

export default Message;
