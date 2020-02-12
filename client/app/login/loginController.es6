class LoginController {

      constructor(Users, $scope, $location, $http) {
            this.Users = Users;
            this.username = '';
            this.$location = $location;
            this.$http = $http;
      }

      attemptToLogin(username) {
            const self = this;
            this.$http({method: 'get', url: '/users/available?username=' + username}).then(function successCallback(response) {
                  if(response.data.isAvailable) {
                        self.login(username);
                  } else {
                        self.info = 'username is not available. Try something else';
                  }
            });
      }

      login(username) {
            this.Users.setUser(username);
            this.$location.path('/chat');
      }

      processLogin(shouldGenerateUsername) {
            if(shouldGenerateUsername) {
                  this.attemptToLogin(this.Users.randomID());
            } else {
                  const username = this.username;
                  this.attemptToLogin(username);
            }
      }
}

angular.module('WebChat').controller( 'LoginController', LoginController);
LoginController.$inject = ['Users', '$scope', '$location', '$http'];
