class DMChannel extends Channel {

      constructor(currentUser, user) {
            const username1 = currentUser.name;
            const username2 = user.name;
            let id;
            if(username1 < username2) {
                  id = username1 + '-' + username2;
            } else {
                  id = username2 + '-' + username1;
            }

            super(id, user.name);
            this.type = Channel.types().DM;
            this.user = user;
      }

      static idForUsernames(username1, username2) {
            if(username1 < username2) {
                  return username1 + '-' + username2;
            } else {
                  return username2 + '-' + username1;
            }
      }
}
