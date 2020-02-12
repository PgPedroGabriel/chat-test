describe('Notifications Service', function() {

      var Notifications;

      // Before each test load our web chat module
      beforeEach(angular.mock.module('WebChat'));

      // Before each test set our injected Messages factory (_Messages_) to our local Messages variable
       beforeEach(inject(function(_Notifications_) {
         Notifications = _Notifications_;
       }));

       // A simple test to verify the Messages factory exists
       it('should exist', function() {
             expect(Notifications).toBeDefined();
      });
});
