angular.module('WebChat').controller( 'ChatController', [ 'Events', 'Channels', '$scope', 'Users', function( Events, Channels, $scope, Users ) {
      var vm = this;
      vm.channel = Channels.activeChannel;

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
            if(vm.getIsTyping() !== newState) {
                  vm._typing = newState;
                  if(newState) {
                        Events.sendTypingNotification();
                  } else {
                        Events.sendStopTypingNotification();
                  }
            }
      }

      function messageIsValid(messageText) {
            return messageText.length > 0;
      }

      function didReachTypingTimeout(timeDifference, timeout, isTyping) {
            return timeDifference >= timeout && isTyping;
      }

      $scope.send = function send() {
            if(messageIsValid($scope.message.text)) {
                  vm.isTyping = false;
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
            vm.isTyping = true;
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
