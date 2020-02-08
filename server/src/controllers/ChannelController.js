import Channel from '../socket/models/Channel';
import Message from '../socket/models/Message';

class UserController {
  create(req, res) {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'invalid parameters' });
    }

    const { chat } = req;

    const channel = new Channel(name);

    chat.addChannel(channel);

    return res.json(channel);
  }

  list(req, res) {
    return res.json(req.chat.getChannels());
  }

  addMessage(req, res) {
    const { channel } = req.params;
    const { user, text, createdAt } = req.body;

    const { chat } = req;

    if (!channel || !chat.containsChannel(channel)) {
      return res.status(400).send('invalid channel');
    }

    if (!user || !text) {
      return res.status(400).send('invalid parameters');
    }

    const channelObject = chat.getChannel(channel);

    const message = new Message(user, text, createdAt);

    channelObject.addMessage(message);

    return res.send(message);
  }
}

export default new UserController();
