import { Request, Response, NextFunction } from 'express';
import SpecialityModel from '../../infrastructure/database/postgresql/models/speciality.model';
import { StatusCodes } from '../../utils/http_status_codes';
import { InternalStatusCodes } from '../../utils/internal_status_codes';
import Speciality from './model';

class SpecialityController {
  public static async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const speciality: Speciality = req.body;
      const [obj, created] = await SpecialityModel.findOrCreate({
        where: {
          name: speciality.name,
          description: speciality.description
        }
      });
      if (created) {
        res
          .status(StatusCodes.SuccessfulPost)
          .json({ status: InternalStatusCodes.OperationSuccessful });
      } else {
        res
          .status(StatusCodes.SuccessfulPost)
          .json({ status: InternalStatusCodes.AlreadyCreated });
      }
    } catch (error: any) {
      console.log(error);
      res
        .status(StatusCodes.BadRequest)
        .json({ status: InternalStatusCodes.QueryError });
      next(error);
    }
  }

  public static async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const page: number = req.query.page
        ? parseInt(req.query.page as string)
        : 1;
      const limit: number = req.query.page
        ? parseInt(req.query.page as string)
        : 10;
      const offset: number = (page - 1) * limit;
      const specialties: {
        rows: SpecialityModel[];
        count: number;
      } = await SpecialityModel.findAndCountAll({
        order: [['createdAt', 'ASC']],
        limit,
        offset
      });
      res.status(StatusCodes.SuccessfulGet).json({
        status: InternalStatusCodes.OperationSuccessful,
        data: {
          result: specialties,
          items: specialties.count,
          page: page,
          limit: limit
        }
      });
    } catch (error: any) {
      console.log(error);
      res
        .status(StatusCodes.BadRequest)
        .json({ status: InternalStatusCodes.QueryError });
      next(error);
    }
  }

  public static async update(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const speciality: Speciality = req.body;
      await SpecialityModel.update(
        {
          name: speciality.name,
          description: speciality.description
        },
        {
          where: {
            speciality_id: speciality.speciality_id
          }
        }
      );
      res
        .status(StatusCodes.SuccessfulPatch)
        .json({ status: InternalStatusCodes.OperationSuccessful });
    } catch (error: any) {
      console.log(error);
      res
        .status(StatusCodes.BadRequest)
        .json({ status: InternalStatusCodes.QueryError });
      next(error);
    }
  }

  public static async delete(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const speciality_id: string = req.params.speciality_id ?? '';
      if (speciality_id != '') {
        await SpecialityModel.destroy({
          where: {
            speciality_id: speciality_id
          }
        });
        res
          .status(StatusCodes.SuccessfulPatch)
          .json({ status: InternalStatusCodes.OperationSuccessful });
      } else {
        res.status(StatusCodes.BadRequest).json({
          status: InternalStatusCodes.QueryError
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

export default SpecialityController;
