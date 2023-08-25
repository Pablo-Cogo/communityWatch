import { Controller, Middleware, Post, Put } from '@overnightjs/core';
import { User, userRole } from '@src/models/user';
import { Request, Response } from 'express';
import { BaseController } from '.';
import AuthService from '@src/services/auth';
import { authMiddlewareAdmin } from '@src/middlewares/auth';

@Controller('user')
export class UserController extends BaseController {
  @Post('')
  public async create(req: Request, res: Response): Promise<void> {
    const token = req.headers?.['x-access-token'];
    try {
      if (
        !token &&
        !isNaN(req.body.userRole) &&
        req.body.userRole !== userRole.user
      ) {
        res.status(401).send({
          code: 401,
          error: 'User not found',
        });
        return;
      }

      if (token) {
        const claims = AuthService.decodeToken(token as string);

        if (
          claims.role !== userRole.admin &&
          !isNaN(req.body.userRole) &&
          req.body.userRole !== userRole.user
        ) {
          res.status(403).send({
            code: 403,
            error: 'Forbiden',
          });
          return;
        }
      }
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

    const token = AuthService.generateToken(user.id, user.userRole);
    res.status(200).send({ token });
  }

  @Put('role')
  @Middleware(authMiddlewareAdmin)
  public async changeRole(req: Request, res: Response): Promise<void> {
    const { _id, userRole } = req.body;
    try {
      const user = await User.findOneAndUpdate({ _id }, { userRole });
      res.status(200).send(user);
    } catch (error) {
      this.sendCreateOrUpdateErrorResponse(res, error);
    }
  }
}
