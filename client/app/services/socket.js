angular.module('WebChat').factory('socket',
function(socketFactory) {
      return socketFactory({
        ioSocket: io.connect('http://localhost:3000')
      });
});
