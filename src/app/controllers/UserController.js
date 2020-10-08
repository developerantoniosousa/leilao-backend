import * as yup from 'yup';

import User from '../models/User';

class UserController {
  async store(request, response) {
    const schema = yup.object().shape({
      email: yup.string().email().required(),
      password: yup.string().required().min(6),
    });
    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation fails' });
    }

    const { email } = request.body;
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return response.status(400).json({ error: 'User already exists' });
    }

    const { id } = await User.create(request.body);
    return response.json({ id, email });
  }
}

export default new UserController();
