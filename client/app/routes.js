angular.module('WebChat').config(function($routeProvider) {
$routeProvider.
      when('/', {
            redirectTo: '/login'
      })

      .when('/chat', {
            templateUrl: "app/chat/chat.html",
            controller: "ChatController",
            controllerAs: 'chatCtrl'
      })

      .when('/login', {
            templateUrl: "app/login/login.html",
            controller: "LoginController",
            controllerAs: 'loginCtrl'
      });

});
