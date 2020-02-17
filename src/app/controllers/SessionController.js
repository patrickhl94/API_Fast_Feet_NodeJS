import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import authConfig from '../../config/auth';
import UserAdmin from '../models/UserAdmin';

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password_hash: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ erro: 'Validation fails' });
    }

    const { password_hash, email } = req.body;

    const userAdmin = await UserAdmin.findOne({ where: { email } });

    if (!userAdmin) {
      return res.status(401).json({ erro: 'User not found' });
    }

    const passwordConfered = await userAdmin.checkPassword(password_hash);

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
