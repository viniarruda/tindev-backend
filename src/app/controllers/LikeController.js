import Developer from '../models/Developer';

class LikeController {
  async store(req, res) {
    const { devId } = req.params;
    const { id } = req.body;

    const loggedDev = await Developer.findByPk(id);
    const targetDev = await Developer.findByPk(devId);

    if (!targetDev) {
      return res.status(400).json({ error: 'User not exists' });
    }

    if (targetDev.likes.includes(loggedDev.id)) {
      console.log('DEU MATCH');
    }

    const filteredLikes = [...loggedDev.likes, targetDev.id];

    await loggedDev.update({
      likes: [...new Set(filteredLikes)],
    });

    return res.json(loggedDev);
  }
}

export default new LikeController();
