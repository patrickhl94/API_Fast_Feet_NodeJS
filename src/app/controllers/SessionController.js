import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import UserAdmin from '../models/UserAdmin';
import Recipients from '../models/Recipients';

class SessionController {
  async store(req, res) {
    const { password, email } = req.body;

    const userAdmin = await UserAdmin.findOne({ where: { email } });

    console.log(userAdmin);

    if (!userAdmin) {
      return res.status(401).json({ erro: 'User not found' });
    }

    // const passwordConfered = bcrypt.compare(req.password);
    // console.log();

    return res.json(req.body);
  }
}
export default new SessionController();
