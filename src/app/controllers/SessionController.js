import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth';
import UserAdmin from '../models/UserAdmin';

class SessionController {
  async store(req, res) {
    const { password, email } = req.body;

    const userAdmin = await UserAdmin.findOne({ where: { email } });

    if (!userAdmin) {
      return res.status(401).json({ erro: 'User not found' });
    }

    const passwordConfered = await userAdmin.checkPassword(password);

    if (!passwordConfered) {
      return res.status(401).json({ error: 'Incorrect password ' });
    }

    const { id, name } = userAdmin;

    const token = jwt.sign({ id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });

    return res.json({
      userAdmin: {
        id,
        name,
        email,
      },
      token,
    });
  }
}
export default new SessionController();
