import { Request, Response, NextFunction } from 'express';
import UserModel from '../../infrastructure/database/postgresql/models/user.model';
import { StatusCodes } from '../../utils/http_status_codes';
import { encryptPassword } from '../../utils/password';
import { UserState } from '../../utils/user_state';
import { UserTypes } from '../../utils/user_types';
import User from './model';

class UserController {
  public static async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const data: User = req.body;
      const hashValue = await encryptPassword(data['password']);
      const response = await UserModel.create({
        name: data['name'],
        last_name: data['last_name'],
        rut: data['rut'],
        email: data['email'],
        phone: data['phone'],
        address: data['address'],
        user_type: UserTypes.PetOwner,
        user_state: UserState.Active,
        password: hashValue
      });
      console.log(response);
      res
        .status(StatusCodes.SuccessfulPost)
        .json({ status: 'data create', data: true });
    } catch (error: any) {
      console.error(error);
      next(error);
    }
  }
}

export default UserController;
