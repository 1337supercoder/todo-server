import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import User from '../entity/User';

class UserController {
  static getMe = async (req: Request, res: Response) => {
    const { id } = res.locals.jwtPayload;

    const userRepository = getRepository(User);

    const user = await userRepository.findOneOrFail(id, {
      select: ['username', 'email'],
    });

    res.send(user);
  };
}

export default UserController;
