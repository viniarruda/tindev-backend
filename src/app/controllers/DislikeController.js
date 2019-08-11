import Developer from '../models/Developer';

class DislikeController {
  async store(req, res) {
    const { devId } = req.params;
    const { id } = req.body;

    const loggedDev = await Developer.findByPk(id);
    const targetDev = await Developer.findByPk(devId);

    if (!targetDev) {
      return res.status(400).json({ error: 'User not exists' });
    }

    const filteredDislikes = [...loggedDev.dislikes, targetDev.id];

    await loggedDev.update({
      dislikes: [...new Set(filteredDislikes)],
    });

    return res.json(loggedDev);
  }
}

export default new DislikeController();
