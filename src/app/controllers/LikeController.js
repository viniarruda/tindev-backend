import Developer from '../models/Developer';

class LikeController {
  async store(req, res) {
    const { devId } = req.params;
    const { user } = req.headers;

    const loggedDev = await Developer.findByPk(user);
    const targetDev = await Developer.findByPk(devId);

    if (!targetDev) {
      return res.status(400).json({ error: 'User not exists' });
    }

    if (targetDev.likes.includes(loggedDev.id)) {
      const loggedSocket = req.connectedUsers[user];
      const targetSocket = req.connectedUsers[devId];

      if (loggedSocket) {
        req.io.to(loggedSocket).emit('match', targetDev);
      }

      if (targetSocket) {
        req.io.to(targetSocket).emit('match', loggedDev);
      }
    }

    const filteredLikes = [...loggedDev.likes, targetDev.id];

    await loggedDev.update({
      likes: [...new Set(filteredLikes)],
    });

    return res.json(loggedDev);
  }
}

export default new LikeController();
