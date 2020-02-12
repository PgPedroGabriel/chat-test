class Message {

      constructor(text, user, createdAt) {
            this.text = text;
            this.user = user;
            if(createdAt === undefined) {
                  this.createdAt = new Date();
            }

            this.createdAt = createdAt;
      }

      get type() {
            return 'message';
      }

      get isUserMessage() {
            return true;
      }

      setChannelID(channelID) {
            this.channel = channelID;
            return this;
      }
}

class NotificationMessage extends Message {

      constructor(text) {
            const systemUser = {name: 'System'};
            super(text, systemUser);
      }

      get isNotification() {
            return true;
      }

      get isUserMessage() {
            return false;
      }

      get type() {
            return 'notification';
      }
}
