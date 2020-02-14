angular.module('WebChat').controller( 'ChatController', [ 'Events', 'Channels', '$scope', '$http', '$location', 'Users', function( Events, Channels, $scope, $http, $location, Users ) {
      var vm = this;

      if (Object.keys(Users.getUser()).length == 0) {
            return $location.path('/');
      }


      vm.channel = Channels.activeChannel;

      $http({ method: 'get', url: 'http://localhost:3000/v1/channels/' + vm.channel.id }).then(function (res) {
        vm.channel.messages = res.data.map(m => {
          return new Message(m.text, m.user, new Date());
        }).reverse()
      })

      vm._typing = false;
      $scope.message = {};
      vm.typingTimeout = 1000;
      vm.lastTypingTime = 0;

      $scope.channels = Channels.channelCollection;

      $scope.currentUser = Users.getUser();

      $scope.users = Users.activeUsers;

      $scope.$watch(function() {
            return Channels.activeChannel;
      }, function() {
            vm.channel = Channels.activeChannel;
      });

      function getIsTyping() {
            return vm._typing;
      }

      function setIsTyping(newState) {
        if(getIsTyping() !== newState) {
          console.log('sending not typing');
          Events.sendStopTypingNotification();
          vm._typing = false;
        }
      }

      function messageIsValid(messageText) {
        return messageText && messageText.length > 0;
      }

      function didReachTypingTimeout(timeDifference, timeout, isTyping) {
            return timeDifference >= timeout && isTyping;
      }

      $scope.send = function send() {
        if(messageIsValid($scope.message.text)) {
          vm._typing = false;
          Events.sendStopTypingNotification();
          Events.sendMessage($scope.message.text);
          $scope.message = {};
        }
      }

      function _checkTyping() {
        const typingTimer = (new Date()).getTime();
        const duration = typingTimer - vm.lastTypingTime;

        if (didReachTypingTimeout(duration, vm.typingTimeout, getIsTyping())) {
          setIsTyping(false);
        }
      }

      $scope.textBoxDidUpdate = function textBoxDidUpdate() {

        if (!vm._typing){
          console.log('sending istyping');
          Events.sendTypingNotification();
        }

        vm._typing = true;
        vm.lastTypingTime = (new Date()).getTime();
        setTimeout(() => {_checkTyping()}, vm.typingTimeout);
      }

      $scope.isActive = function isActive(aChannel) {
        return vm.channel.id === aChannel.id;
      }

      $scope.toggleChannel = function toggleChannel(channel) {
        Channels.setChannelForChannelID(channel.id);
      }

}]);
