angular.module('WebChat').constant('SocketEvent', {
      'ADD_USER':'add user',
      'USER_JOINED':'user joined',
      'NEW_MESSAGE':'new message',
      'USER_LEFT': 'user left',
      'USER_TYPING': 'user typing',
      'USER_STOPPED_TYPING': 'stop typing',
      'RECONNECT': 'reconnect'
});
