import { Request, Response, NextFunction } from 'express';
import AuthModel from '../../infrastructure/database/postgresql/models/authentication.model';
import UserModel from '../../infrastructure/database/postgresql/models/user.model';
import { StatusCodes } from '../../utils/http_status_codes';
import { InternalStatusCodes } from '../../utils/internal_status_codes';
import { validatePassword } from '../../utils/password';
import {authToken, refreshToken} from '../../utils/token';

class AuthController {
  
  public static async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>{
    try{
      const data = req.body;
      const auth = await AuthModel.findOne({where: {email: data['email']}});      
      if(auth != null){
        const decrypt_password: boolean = await validatePassword(auth.password, data['password']);
        if(decrypt_password){          
          const token: string = await authToken(auth.user_id, auth.user_type, auth.user_state);
          const _refresh_token: string = refreshToken(auth.user_id);
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
          res
            .status(StatusCodes.SuccessfulPost)
            .json({
              status: InternalStatusCodes.OperationSuccessful,
              data: {
                'access_token': token,
                'refresh_token': _refresh_token
              }
          });
        }
        else {
          res
            .status(StatusCodes.SuccessfulPost)
            .json({
                status: InternalStatusCodes.OperationError,
                data: {
                  'message': 'Incorrect Email or Password. Try again',
                  'code': InternalStatusCodes.PasswordEmailError
                }
            })            
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
}

export default AuthController;
