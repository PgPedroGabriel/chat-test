class Notifications {

      constructor() {}

      send(text) {
             if (!("Notification" in window)) {
               alert("This browser does not support desktop notification");
             }

             else if (Notification.permission === "granted") {
                   var notification = new Notification(text);
             }

             else if (Notification.permission !== 'denied') {
                   Notification.requestPermission(function (permission) {
                        if (permission === "granted") {
                              var notification = new Notification(text);
                        }
                  });
            }
      }
}
angular.module('WebChat').service( 'Notifications', Notifications);
