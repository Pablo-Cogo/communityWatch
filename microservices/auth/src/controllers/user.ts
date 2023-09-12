import { Controller, Get, Middleware, Post, Put } from '@overnightjs/core';
import { User, userRole } from '@src/models/user';
import { Request, Response } from 'express';
import { BaseController } from '.';
import AuthService from '@src/services/auth';
import { authMiddlewareAdmin } from '@src/middlewares/auth';
import GoogleAuthService from '@src/services/google';

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
          error: 'Usuário não encontrado.',
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
        error: 'Usuário não encontrado.',
      });
      return;
    }
    const comparePasswords = await AuthService.comparePasswords(
      userPassword,
      user.userPassword
    );
    if (!comparePasswords) {
      res.status(401).send({
        code: 401,
        error: 'Usuário não encontrado.',
      });
      return;
    }
    const token = AuthService.generateToken(user.id, user.userRole);
    res.status(200).send({
      userEmail,
      userName: user.userName,
      userImage: user.userImage,
      token,
    });
  }

  @Get('auth/google/url')
  public async getAuthUrl(_: Request, res: Response) {
    const url = await GoogleAuthService.getAuthUrl();
    res.status(200).send({ url });
  }

  @Post('auth/google')
  public async authGoogle(req: Request, res: Response): Promise<void> {
    try {
      const access_token = await GoogleAuthService.getAccessToken(
        req.body.code
      );
      const response = await GoogleAuthService.getUserData(access_token);
      const user = await User.findOne({ userEmail: response.email });
      if (!user) {
        res.status(401).send({
          code: 401,
          error: 'Usuário não encontrado.',
        });
        return;
      }
      const token = AuthService.generateToken(user.id, user.userRole);
      res.status(200).send({
        userEmail: user.userEmail,
        userName: user.userName,
        userImage: response.picture,
        token,
      });
    } catch (err) {
      console.log('Error logging in with OAuth2 user', err);
    }
  }

  @Get('validate')
  public async validate(req: Request, res: Response): Promise<void> {
    try {
      const token = req.headers?.['x-access-token'];
      if (token) {
        const verify = AuthService.decodeToken(token as string);
        if (verify) {
          const user = await User.findOne({ _id: verify.sub });
          console.log(user);
          if (user) {
            res.status(200).send({
              userEmail: user.userEmail,
              userName: user.userName,
              userImage: user.userImage,
            });
            return;
          }
        }
      }
      res.status(200).send(false);
    } catch (error) {
      this.sendCreateOrUpdateErrorResponse(res, error);
    }
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
