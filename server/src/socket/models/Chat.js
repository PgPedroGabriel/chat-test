import Channel from './Channel';
import User from './User';

class Chat {
  constructor() {
    this.channels = {};
    this.users = {};
  }

  addChannel({ name }) {
    if (typeof this.channels[name] !== 'undefined') {
      throw new Error('Channel has created');
    }

    this.channels[name] = new Channel(name);
  }

  addUser({ username }) {
    if (this.containsUser(username)) {
      throw new Error('Invalid username');
    }

    this.users[username] = new User(username);
  }

  getChannelNames() {
    return Object.keys(this.channels);
  }

  getUsernames() {
    return Object.keys(this.users);
  }

  getNumUsers() {
    return Object.keys(this.users).length;
  }

  containsUser(username) {
    return typeof this.users[username] !== 'undefined';
  }

  removeUser(username) {
    if (this.containsUser(username)) {
      delete this.users[username];
    }
  }
}

export default Chat;
