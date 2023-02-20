import { Request, Response, NextFunction } from 'express';
import VetsHistoriesModel from '../../infrastructure/database/postgresql/models/history_vet.model';
import VeterinaryModel from '../../infrastructure/database/postgresql/models/veterinary.model';
import { StatusCodes } from '../../utils/http_status_codes';
import { InternalStatusCodes } from '../../utils/internal_status_codes';
import VetHistory from './model';
import VetsHistories from './model';

class VetHistoryController {
  public static async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const data: VetHistory = req.body;
      await VetsHistoriesModel.create({
        vet_id: (req.query.id as string) ?? '',
        base_university: data['base_university'],
        speciality_university: data['speciality_university'],
        speciality: data['speciality'],
        experience_years: data['experience_years'],
        work_history: data['work_history']
      });
      res
        .status(StatusCodes.SuccessfulPost)
        .json({ status: InternalStatusCodes.OperationSuccessful });
    } catch (error: any) {
      console.log(error);
      res
        .status(StatusCodes.BadRequest)
        .json({ status: InternalStatusCodes.QueryError });
      next(error);
    }
  }

  public static async getVetHistoryById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const vet_id: string = (req.params.vet_history_id as string) ?? '';
      const vet_history = await VetsHistoriesModel.findByPk(vet_id);
      if (vet_history != null) {
        res.status(StatusCodes.SuccessfulGet).json({
          status: InternalStatusCodes.OperationSuccessful,
          data: { result: vet_history }
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
      next(error);
    }
  }

  public static async updateVetHistory(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const vet_history_id: string =
        (req.params.vet_history_id as string) ?? '';
      const vet_history: VetHistory = req.body;
      await VetsHistoriesModel.update(
        {
          base_university: vet_history.base_university,
          speciality: vet_history.speciality,
          speciality_university: vet_history.speciality_university,
          experience_years: vet_history.experience_years,
          work_history: vet_history.work_history
        },
        {
          where: { history_vet_id: vet_history_id }
        }
      );
      res
        .status(StatusCodes.SuccessfulPatch)
        .json({ status: InternalStatusCodes.OperationSuccessful });
    } catch (error: any) {
      res
        .status(StatusCodes.BadRequest)
        .json({ status: InternalStatusCodes.QueryError });
      next(error);
    }
  }

  public static async getVetByName(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
    } catch (error: any) {
      console.log(error);
      next(error);
    }
  }
}

export default VetHistoryController;
