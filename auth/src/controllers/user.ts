import { Controller, Post } from '@overnightjs/core';
import { User } from '@src/models/user';
import { Request, Response } from 'express';
import { BaseController } from '.';
import AuthService from '@src/services/auth';

@Controller('user')
export class UserController extends BaseController {
  @Post('')
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const user = new User(req.body);
      const newUser = await user.save();
      res.status(201).send(newUser);
    } catch (error) {
      this.sendCreateOrUpdateErrorResponse(res, error);
    }
  }
  @Post('authenticate')
  public async authenticate(req: Request, res: Response): Promise<void> {
    const { userEmail, userPassword } = req.body;
    const user = await User.findOne({ userEmail });
    if (!user) {
      res.status(401).send({
        code: 401,
        error: 'User not found',
      });
      return;
    }

    if (
      !(await AuthService.comparePasswords(userPassword, user.userPassword))
    ) {
      res.status(401).send({
        code: 401,
        error: 'User not found',
      });
      return;
    }

    const token = AuthService.generateToken(user.id);
    res.status(200).send({ token });
  }
}
