import { Request, Response, NextFunction } from 'express';
import AuthModel from '../../infrastructure/database/postgresql/models/authentication.model';
import { StatusCodes } from '../../utils/http_status_codes';
import { InternalStatusCodes } from '../../utils/internal_status_codes';
import { validatePassword } from '../../utils/password';
import {
  authToken,
  decodeUserIdToken,
  refreshToken,
  validateRefreshToken
} from '../../utils/token';
import { UserState } from '../../utils/user_state';

class AuthController {
  public static async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const data = req.body;
      const auth = await AuthModel.findOne({ where: { email: data['email'] } });
      if (auth != null) {
        const decrypt_password: boolean = await validatePassword(
          auth.password,
          data['password']
        );
        if (decrypt_password) {
          const token: string = await authToken(
            auth.auth_id!,
            auth.user_type,
            auth.user_state
          );
          const _refresh_token: string = refreshToken(        
            auth.auth_id!
          );
          AuthModel.update(
            {
              refresh_token: _refresh_token
            },
            {
              where: {
                auth_id: auth.auth_id
              }
            }
          );
          res.status(StatusCodes.SuccessfulPost).json({
            status: InternalStatusCodes.OperationSuccessful,
            data: {
              access_token: token,
              refresh_token: _refresh_token
            }
          });
        } else {
          res.status(StatusCodes.SuccessfulPost).json({
            status: InternalStatusCodes.OperationError,
            data: {
              message: 'Incorrect Email or Password. Try again',
              code: InternalStatusCodes.PasswordEmailError
            }
          });
        }
      }
    } catch (error: any) {
      console.log(error);
      res
        .status(StatusCodes.BadRequest)
        .json({ status: InternalStatusCodes.QueryError });
      next(error);
    }
  }

  public static async refreshToken(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) {
        res
          .status(StatusCodes.BadRequest)
          .json({
            status: InternalStatusCodes.QueryError,
            message: 'Value is missing'
          });
      }      
      if (validateRefreshToken(refreshToken)) {
        const auth_id = decodeUserIdToken(refreshToken, 'auth_id');
        const user_auth = await AuthModel.findByPk(auth_id);
        if (user_auth) {
          if (
            user_auth.user_state != UserState.Deleted &&
            user_auth.user_state != UserState.Suspended
          ) {
            const new_access_token = authToken(
              user_auth.auth_id!,
              user_auth.user_type,
              user_auth.user_state
            );
            res
              .status(StatusCodes.SuccessfulPost)
              .json({
                status: InternalStatusCodes.OperationSuccessful,
                data: { 'access-token': new_access_token }
              });
          } else {
            res
              .send(StatusCodes.Unauthorized)
              .json({
                status: InternalStatusCodes.UserStateError,
                message: 'This account is suspended or deleted'
              });
          }
        } else {
          res
            .send(StatusCodes.SuccessfulPost)
            .json({
              status: InternalStatusCodes.DataNotFound,
              message: 'User not found'
            });
        }
      } else {
        res
          .send(StatusCodes.TokenError)
          .json({
            status: InternalStatusCodes.RefreshTokenExpired,
            message: 'Refresh token expired'
          });
      }
    } catch (error: any) {
      console.log(error);
      res
        .status(StatusCodes.BadRequest)
        .json({ status: InternalStatusCodes.QueryError });
      next(error);
    }
  }
}

export default AuthController;
