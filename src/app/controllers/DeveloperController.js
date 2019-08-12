import * as Yup from 'yup';
import axios from 'axios';
import Sequelize, { Op } from 'sequelize';

import Developer from '../models/Developer';

class DeveloperController {
  async store(req, res) {
    const schema = Yup.object().shape({
      username: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'username is required' });
    }

    const { username } = req.body;
    try {
      const response = await axios.get(
        `https://api.github.com/users/${username}`
      );

      const { name, bio, avatar_url: avatar } = response.data;

      const userExists = await Developer.findOne({
        where: {
          user: username,
        },
      });

      if (userExists) {
        return res.json(userExists);
      }
      const dev = await Developer.create({
        name,
        user: username,
        bio,
        avatar,
      });

      return res.json(dev);
    } catch (e) {
      return res.status(404).json({ error: 'User not found' });
    }
  }

  async index(req, res) {
    const { user } = req.headers;

    const loggedDev = await Developer.findByPk(user);

    const users = await Developer.findAll({
      where: {
        [Op.and]: [
          {
            id: {
              [Op.ne]: loggedDev.id,
              [Op.notIn]: [...loggedDev.likes, ...loggedDev.dislikes],
            },
          },
        ],
      },
      order: [Sequelize.fn('RANDOM')],
    });

    return res.json(users);
  }
}

export default new DeveloperController();
