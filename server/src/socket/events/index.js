import AddUserHandler from './handles/AddUser';
import UserJoinedHandler from './handles/UserJoined';
import UserLeftHandler from './handles/UserLeft';
import UserTypingHandler from './handles/UserTyping';
import UserStoppedTypingHandler from './handles/UserStoppedTyping';
import ReconnectHandler from './handles/Reconnect';
import NewMessageHandler from './handles/NewMessage';

const events = {
  ADD_USER: {
    description: 'add user',
    handler: AddUserHandler,
  },
  USER_JOINED: {
    description: 'user joined',
    handler: UserJoinedHandler,
  },
  NEW_MESSAGE: {
    description: 'new message',
    handler: NewMessageHandler,
  },
  USER_LEFT: {
    description: 'user left',
    handler: UserLeftHandler,
  },
  USER_TYPING: {
    description: 'user typing',
    handler: UserTypingHandler,
  },
  USER_STOPPED_TYPING: {
    description: 'stop typing',
    handler: UserStoppedTypingHandler,
  },
  RECONNECT: {
    description: 'reconnect',
    handler: ReconnectHandler,
  },
};

export default events;
