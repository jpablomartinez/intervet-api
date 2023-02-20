import { Request, Response, NextFunction } from 'express';
import { request } from 'http';
import { where, WhereOptions } from 'sequelize';
import { Json } from 'sequelize/types/utils';
import AuthModel from '../../infrastructure/database/postgresql/models/authentication.model';
import UserModel from '../../infrastructure/database/postgresql/models/user.model';
import { StatusCodes } from '../../utils/http_status_codes';
import { InternalStatusCodes } from '../../utils/internal_status_codes';
import { encryptPassword } from '../../utils/password';
import { getUserStateByString, UserState } from '../../utils/user_state';
import { UserTypes } from '../../utils/user_types';
import UserClass from './class';
import User from './model';
const { Op } = require('sequelize');

class UserController {
  /**
   * @param req
   * @param res
   * @param next
   * function to create an user
   */
  public static async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const data = req.body;
      console.log(data);
      const hashValue: string = await encryptPassword(data['password']);
      const user: UserModel = await UserModel.create({
        name: data['name'],
        last_name: data['last_name'],
        rut: data['rut'],
        phone: data['phone'],
        address: data['address']
      });
      if (user) {
        await AuthModel.create({
          auth_id: user.user_id,
          email: data['email'],
          password: hashValue,
          user_type: UserTypes.PetOwner,
          user_state: UserState.ToValidated
        });
      }
      res
        .status(StatusCodes.SuccessfulPost)
        .json({ status: InternalStatusCodes.OperationSuccessful });
    } catch (error: any) {
      console.log(error);
      res
        .status(StatusCodes.BadRequest)
        .json({ status: InternalStatusCodes.QueryError, error: error });
      next(error);
    }
  }

  public static async getByParams(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const page: number = req.query.page
        ? parseInt(req.query.page as string)
        : 1;
      const limit: number = req.query.limit
        ? parseInt(req.query.limit as string)
        : 10;
      const _userState: string = (req.query.user_state as string) ?? 'Active';
      const _userType: string = (req.query.user_type as string) ?? 'PetOwner';
      const offset: number = (page - 1) * limit;
      const name: string = (req.query.name as string) ?? '';
      const results: {
        rows: UserModel[];
        count: number;
      } = await UserModel.findAndCountAll({
        order: [['createdAt', 'ASC']],
        where: {
          //user_type: _userType,
          //user_state: _userState,
          name: {
            [Op.iLike]: `${name}%`
          }
        },
        limit,
        offset
      });
      if (results.rows.length > 0) {
        const _users: UserModel[] = results.rows;
        const users: UserClass[] = _users.map((u: UserModel) => {
          const user: UserClass = new UserClass(u);
          return { ...user };
        });
        const total: number = results.count;
        res.status(StatusCodes.SuccessfulGet).json({
          status: InternalStatusCodes.OperationSuccessful,
          data: { result: users, items: total, page: page, limit: limit }
        });
      } else {
        res.status(StatusCodes.SuccessfulGet).json({
          status: InternalStatusCodes.DataNotFound
        });
      }
    } catch (error: any) {
      console.log(error);
      next(error);
    }
  }

  public static async getUserById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const id: string = (req.params.id as string) ?? '';
      const user = await UserModel.findByPk(id);
      if (user != null) {
        res.status(StatusCodes.SuccessfulGet).json({
          status: InternalStatusCodes.OperationSuccessful,
          data: { result: new UserClass(user) }
        });
      } else {
        res.status(StatusCodes.SuccessfulGet).json({
          status: InternalStatusCodes.DataNotFound
        });
      }
    } catch (error: any) {
      res
        .status(StatusCodes.BadRequest)
        .json({ status: InternalStatusCodes.QueryError });
      console.log(error);
      next(error);
    }
  }

  public static async updateUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user_id: string = (req.params.id as string) ?? '';
      const user: UserClass = req.body;
      await UserModel.update(
        {
          name: user.name,
          last_name: user.last_name,
          rut: user.rut,
          //email: user.email,
          phone: user.phone,
          address: user.address
        },
        {
          where: { user_id: user_id }
        }
      );
      res.status(StatusCodes.SuccessfulPatch).json({
        status: InternalStatusCodes.OperationSuccessful
      });
    } catch (error: any) {
      res
        .status(StatusCodes.BadRequest)
        .json({ status: InternalStatusCodes.QueryError });
      console.log(error);
      next(error);
    }
  }

  public static async ModifyUserAccount(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const _userState: UserState = getUserStateByString(req.body['userState']);
      if (_userState != UserState.Undefined) {
        const user_id: string = (req.params.id as string) ?? '';
        await UserModel.update(
          {
            //user_state: _userState
          },
          {
            where: { user_id: user_id }
          }
        );
        res.status(StatusCodes.SuccessfulPatch).json({
          status: InternalStatusCodes.OperationSuccessful
        });
      } else {
        res.status(StatusCodes.BadRequest).json({
          status: InternalStatusCodes.QueryError
        });
      }
    } catch (error: any) {
      res
        .status(StatusCodes.BadRequest)
        .json({ status: InternalStatusCodes.QueryError });
      console.log(error);
      next(error);
    }
  }
}

export default UserController;
