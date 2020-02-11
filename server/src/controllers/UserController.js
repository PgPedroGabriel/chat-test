import User from '../models/User';

class UserController {
  join(req, res) {
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({ error: 'invalid parameters' });
    }

    const { chat } = req;

    chat.addUser(new User(username));

    return res.json({
      numUsers: chat.getNumUsers(),
      users: chat.getUsernames(),
    });
  }

  list(req, res) {
    return res.json(req.chat.getUsernames());
  }

  left(req, res) {
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({ error: 'invalid parameters' });
    }
    const { chat } = req;

    if (!chat.containsUser(username)) {
      return res.status(404).json({ error: 'username not found' });
    }

    chat.removeUser(username);

    return res.json({
      numUsers: chat.getNumUsers(),
      users: chat.getUsernames(),
    });
  }

  checkAvaliable(req, res) {
    const { username } = req.query;

    if (!username) {
      return res.status(400).json({ error: 'invalid parameters' });
    }

    return res.json({
      isAvailable: !req.chat.containsUser(username),
    });
  }
}

export default new UserController();
