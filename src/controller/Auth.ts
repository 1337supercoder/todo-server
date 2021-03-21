import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import { validate } from 'class-validator';
import User from '../entity/User';

class AuthController {
  static login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!(email && password)) {
      res.status(400).send();
    }

    const userRepository = getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneOrFail({ where: { email } });
    } catch (error) {
      res.status(401).send();
      return;
    }

    if (!user.checkIfUnencryptedPasswordIsValid(password)) {
      res.status(401).send();
      return;
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      `${process.env.JWT_SECRET_KEY}`,
      { expiresIn: '24h' },
    );

    res.send(token);
  };

  static registration = async (req: Request, res: Response) => {
    const { username, password, email } = req.body;

    const user = new User();
    user.username = username;
    user.password = password;
    user.email = email;

    const errors = await validate(user);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    user.hashPassword();

    const userRepository = getRepository(User);
    try {
      await userRepository.save(user);
    } catch (e) {
      res.status(409).send('email already in use');
      return;
    }

    res.status(201).send('User created');
  };
}

export default AuthController;
