class Channel {

      constructor(id, name = id) {
            this.id = id;
            this.name = name;

            if(name === 'general') {
                  this.isGeneral = true;
            }

            this.created = new Date();
            this.type = Channel.types().CHANNEL;
            this.messages = [];
            this.unreadCount = 0;
      }

      static types() {
            return {
                  CHANNEL: 0,
                   DM: 1
            };
      }

      get isChannel() {
            return this.type == Channel.types().CHANNEL;
      };

      get isDM() {
            return this.type == Channel.types().DM;
      };

      addMessage(message) {
            this.messages.push(message);
      }

      get conversationStatus() {
            if(this.status) {
                  return this.status;
            } else {
                  return '';
            }
      }

      get hasUnreadMessage() {
            return this.unreadCount > 0;
      }

      markAsRead() {
            this.unreadCount = 0;
      }
}
