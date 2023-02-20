import { Request, Response, NextFunction } from 'express';
import { resourceLimits } from 'worker_threads';
import WorkingHoursModel from '../../infrastructure/database/postgresql/models/working_hours.model';
import { StatusCodes } from '../../utils/http_status_codes';
import { InternalStatusCodes } from '../../utils/internal_status_codes';
import { getWorkday } from '../../utils/working_day';
import WorkingHour from './model';

class WorkingHourController {
  public static async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const data: WorkingHour = req.body;
      console.log(data)      
      await WorkingHoursModel.create({
        vet_id: data.vet_id,
        start_at: data.start_at,
        end_at: data.end_at,
        day: data.day
      });
      res
        .status(StatusCodes.SuccessfulPost)
        .json({ status: InternalStatusCodes.OperationSuccessful });
    } catch (error: any) {
      res
        .status(StatusCodes.BadRequest)
        .json({ status: InternalStatusCodes.QueryError });
      console.log(error);
      next(error);
    }
  }

  public static async update(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const data: WorkingHour = req.body;
      await WorkingHoursModel.update(
        {
          day: getWorkday(data.day),
          start_at: data.start_at,
          end_at: data.end_at
        },
        {
          where: { working_hour_id: data.working_hour_id }
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

  public static async delete(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      if (req.params.id != '') {
        await WorkingHoursModel.destroy({
          where: {
            working_hour_id: req.params.id
          }
        });
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

export default WorkingHourController;
