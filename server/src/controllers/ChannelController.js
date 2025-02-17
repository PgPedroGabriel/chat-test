import Channel from '../models/Channel';
import Message from '../models/Message';

class ChannelController {
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
    const { sender, text, createdAt } = req.body;

    const { chat } = req;

    if (!channel) {
      return res.status(400).send('invalid channel');
    }
    if (!sender || !text) {
      return res.status(400).send('invalid parameters');
    }

    if (!chat.containsChannel(channel)) {
      chat.addChannel(new Channel(channel));
    }

    const channelObject = chat.getChannel(channel);

    const message = new Message(sender, text, createdAt);

    channelObject.addMessage(message);

    return res.send(message);
  }

  getChannel(req, res) {
    const { channel } = req.params;

    const { chat } = req;

    if (!channel) {
      return res.status(400).send('invalid channel');
    }

    const next = parseInt(req.query.next, 10) || 0;

    if (typeof next !== 'number') {
      return res.status(400).send('invalid next param');
    }

    const pageSize = process.env.PAGE_SIZE || 20;

    const channelObj = chat.getChannel(channel);

    const messages = channelObj.getLatestMessages(next, pageSize);

    return res.send(messages);
  }
}

export default new ChannelController();
