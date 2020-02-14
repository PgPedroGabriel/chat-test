class Events {

      constructor(Users, socket, $http, SocketEvent, Notifications, Channels) {
            this.Users = Users;
            this.socket = socket;
            this.$http = $http;
            this.SocketEvent = SocketEvent;
            this.Notifications = Notifications;
            this.Channels = Channels;
            Channels.setChannelForChannelID('general');
            this.registerSocketEvents();
            this.getExistingActiveUsers();
      }

      registerSocketEvents() {
            const self = this;
            const socket = this.socket;
            const SocketEvent = this.SocketEvent;
            socket.on(SocketEvent.NEW_MESSAGE, function(data) {
                  self.receiveMessage(data);
            });

            socket.on(SocketEvent.USER_JOINED, function(data) {
                  self.userJoined(data);
            });

            socket.on(SocketEvent.USER_LEFT, function(data) {
                  self.userLeft(data);
            });

            socket.on(SocketEvent.USER_TYPING, function(data) {
                  self.userStartedTyping(data);
            });

            socket.on(SocketEvent.USER_STOPPED_TYPING, function(data) {
                  self.userStoppedTyping(data);
            });

            socket.on(SocketEvent.RECONNECT, function(data) {
                  console.log('Reconnected...');
            });
      }

      getExistingActiveUsers() {
            var self = this;
            this.$http({method: 'get', url: 'http://localhost:3000/v1/users'}).then(function successCallback(response) {
                  var users = response.data;
                  self.activeUsers = users;
                  self.hasDownloadUsers = true;
                  const currentUsername = self.Users.getUser().name;
                  users = users.filter(user => user != currentUsername);
                  self.Channels.addDMChannelsForUsers(users);
            });
      }

      sendTypingNotification() {
        const data = {channel: this.Channels.activeChannel.id, user: this.Users.getUser(), type: 'user_typing'};
        console.log(data);
        this.socket.emit(this.SocketEvent.USER_TYPING, data);
      };

      sendStopTypingNotification() {
            const data = {channel: this.Channels.activeChannel.id, user: this.Users.getUser(), type: 'user_stopped_typing'};
            this.socket.emit(this.SocketEvent.USER_STOPPED_TYPING, data);
      }

      sendMessage(text) {
            var self = this;
            const aMessage = new Message(text, this.Users.getUser());

            var serverMessage = {
                  message: {text: text}
            };

            self.$http({method: 'post', url: 'http://localhost:3000/v1/channels/' + self.Channels.activeChannel.id, data: {
                  text: text,
                  sender: self.Users.getUser().name,
                  all: aMessage
            } }).then(function successCallback(response) {
                  self.Channels.addMessageToChannelWithID(aMessage);
                  aMessage.setChannelID(self.Channels.activeChannel.id);
                  self.Notifications.send(response.data.user.name + ': ' + response.data.text);
                  response.data.channel = self.Channels.activeChannel.id;
                  self.socket.emit(self.SocketEvent.NEW_MESSAGE, response.data );
                  /*self.$http({method: 'get', url: 'http://localhost:3000/v1/channels/' + self.Channels.activeChannel.id }).then(function(res) {
                    self.Channels.activeChannel.messages = res.data.map(m => {
                          return new Message(m.text, m.user, new Date());
                    }).reverse()
                  })
                  */
            });

            serverMessage['channel'] = self.Channels.activeChannel.id;
      }

      receiveMessage(data) {
            console.log('Receiving Message');
            console.log(data);
            const text = data.text;
            const message = new Message(text, data.user, data.createdAt);

            this.Channels.addMessageToChannelWithID(message, data.channel);
            this.Notifications.send(message.user.name + ': ' + message.text);
      }

      showNotification(text) {
            const message =  new NotificationMessage(text);
            this.Channels.addMessageToChannelWithID(message);
            this.Notifications.send(text);
      }

      userJoined(data) {
            if(data.username !== this.Users.getUser().name) {
                  const joinedUser = new User(data.username);
                  this.Users.addUser(joinedUser);
                  const dmChannel = this.Channels.createDMChannelForUser(joinedUser);
                  this.Channels.addChannel(dmChannel);
                  var userJoinedMessage = data.username + ' joined'
                  this.showNotification(userJoinedMessage);
                  return true;
            } else {
                  return false;
            }
      }

      userLeft(data) {
            this.Users.removeUserWithUsername(data.username);
            const dmChannelID = DMChannel.idForUsernames(this.Users.user.name , data.username);
            this.Channels.removeChannelWithID(dmChannelID);
            const leftMessage = data.username + ' left';
            this.showNotification(leftMessage);
      }

      userStartedTyping(data) {
        console.log('START');
        console.log(data);
        const name = data.user.name;
        this.Channels.channels[data.channel].status = `${name} is typing...`;
      };

      userStoppedTyping(data) {
        console.log('STOP');
        console.log(data);
        this.Channels.channels[data.channel].status = '';
      };
}


angular.module('WebChat').service('Events', Events);
Events.$inject = ['Users', 'socket', '$http', 'SocketEvent','Notifications', 'Channels'];
