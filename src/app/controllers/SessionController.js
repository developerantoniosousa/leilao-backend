import * as yup from 'yup';
import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth';
import User from '../models/User';

class SessionController {
  async store(request, response) {
    const schema = yup.object().shape({
      email: yup.string().email().required(),
      password: yup.string().required().min(6),
    });
    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation fails' });
    }

    const { email, password } = request.body;
    const user = await User.findOne({ where: { email, active: true } });
    if (!user) {
      return response.status(401).json({ error: 'User does not exist' });
    }

    if (!(await user.checkPassword(password))) {
      return response.status(401).json({ error: 'Invalid password' });
    }

    const { id } = user;
    return response.json({
      user: { id, email },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
