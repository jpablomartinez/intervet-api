import { Request, Response, NextFunction } from 'express';
import VetServiceModel from '../../infrastructure/database/postgresql/models/vet_service.model';
import { StatusCodes } from '../../utils/http_status_codes';
import { InternalStatusCodes } from '../../utils/internal_status_codes';
import VetService from './model';

class VetServiceController {
  public static async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const vet_service: VetService = req.body;
      if (vet_service.vet_id != '' && vet_service.vet_id != '') {
        const [obj, created] = await VetServiceModel.findOrCreate({
          where: {
            vet_id: vet_service.vet_id,
            name_service: vet_service.name_service,
            price: vet_service.price
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
      const limit: number = req.query.limit
        ? parseInt(req.query.limit as string)
        : 10;
      const offset: number = (page - 1) * limit;
      const vet_services: {
        rows: VetServiceModel[];
        count: number;
      } = await VetServiceModel.findAndCountAll({
        order: [['createdAt', 'ASC']],
        limit,
        offset
      });
      res.status(StatusCodes.SuccessfulGet).json({
        status: InternalStatusCodes.OperationSuccessful,
        data: {
          result: vet_services,
          items: vet_services.count,
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

  public static async getVetServicesByVetId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const vet_id: string = (req.params.vet_id as string) ?? '';
      console.log(vet_id);
      if (vet_id != '') {
        const vet = {};
        if (vet != null) {
          res.status(StatusCodes.SuccessfulGet).json({
            status: InternalStatusCodes.OperationSuccessful,
            result: vet
          });
        } else {
          res
            .status(StatusCodes.SuccessfulGet)
            .json({ status: InternalStatusCodes.DataNotFound });
        }
      } else {
        res
          .status(StatusCodes.BadRequest)
          .json({ status: InternalStatusCodes.QueryError });
      }
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
      const vet_service: VetService = req.body;
      await VetServiceModel.update(
        {
          price: vet_service.price,
          name_service: vet_service.name_service
        },
        {
          where: {
            vet_id: vet_service.vet_id
          }
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

  public static async delete(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const vet_service_id: string = req.params.vet_service_id ?? '';
      if (vet_service_id != '') {
        await VetServiceModel.destroy({
          where: {
            vet_service_id: vet_service_id
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

export default VetServiceController;
