class Channels {

      constructor(Users) {
            this.presetChannels = ['general'];
            this.activeChannel = {};

            this.channels = {};
            this.channelCollection = [];
            this.Users = Users;
            this.addChannelsWithNames(this.presetChannels);
      }

      addChannelsWithNames(names) {
            names.forEach((name) => {
                  const channel = new Channel(name, name);
                  this.addChannel(channel);
            });
      }

      hasChannelWithID(id) {
            return this.channels.hasOwnProperty(id);
      }

      setChannelForChannelID(channelID) {
            this.activeChannel = this.channels[channelID];
            if(this.activeChannel) {
                  this.activeChannel.markAsRead();
            }
      }

      createDMChannelForUser(user) {
            return new DMChannel(this.Users.getUser(), user);
      }

      addDMChannelsForUsers(users) {
            const self = this;
            users.forEach((user) => {
                  var userChannel = self.createDMChannelForUser(new User(user.name));
                  self.addChannel(userChannel);
            });
      }

      addChannel(channel) {
            this.channels[channel.id] = channel;
            this.channelCollection.push(this.channels[channel.id]);
      }

      removeChannelWithID(channelID) {
            delete this.channels[channelID];
            for(var i = 0; i < this.channelCollection.length; i++) {
                  if(this.channelCollection[i].id === channelID) {
                        this.channelCollection.splice(i, 1);
                        break;
                  }
            }
      }

      addMessageToChannelWithID(message, channelID = this.activeChannel.id) {
            this.channels[channelID].addMessage(message);
            if(this.activeChannel.id !== channelID) {
                  this.channels[channelID].unreadCount += 1;
            }
      }

}

angular.module('WebChat').service( 'Channels', Channels);
Channels.$inject = ['Users'];
