import { Request, Response, NextFunction } from 'express';
import { where } from 'sequelize';
import AttentionAreaModel from '../../infrastructure/database/postgresql/models/attention_area.model';
import { StatusCodes } from '../../utils/http_status_codes';
import { InternalStatusCodes } from '../../utils/internal_status_codes';
import AttentionArea from './model';

class AttentionAreasController {
  public static async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const data: AttentionArea = req.body;
      const vet_id: string = (req.params.vet_id as string) ?? '';
      if (data.region == 'Metropolitana de Santiago') {
        if (
          data.commune == 'Providencia' ||
          data.commune == 'Nunoa' ||
          data.commune == 'Las Condes'
        ) {
          const [object, response] = await AttentionAreaModel.findOrCreate({
            where: {
              vet_id: vet_id,
              region: data.region,
              commune: data.commune
            }
          });
          if (response) {
            res
              .status(StatusCodes.SuccessfulPost)
              .json({ status: InternalStatusCodes.OperationSuccessful });
          } else {
            res
              .status(StatusCodes.SuccessfulPost)
              .json({ status: InternalStatusCodes.AlreadyCreated });
          }
        }
      } else {
        res
          .status(StatusCodes.BadRequest)
          .json({ status: InternalStatusCodes.OperationError });
      }
    } catch (error: any) {
      console.log(error);
      res
        .status(StatusCodes.BadRequest)
        .json({ status: InternalStatusCodes.QueryError });
      next(error);
    }
  }

  public static async getAttentionAreasByVet(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const vet_id: string = (req.query.vet_id as string) ?? '';
      if (vet_id != '') {
        const response = await AttentionAreaModel.findAll({
          where: { vet_id: vet_id }
        });
        if (response != null) {
          res.status(StatusCodes.SuccessfulGet).json({
            status: InternalStatusCodes.OperationSuccessful,
            data: response
          });
        } else {
          res.status(StatusCodes.SuccessfulGet).json({
            status: InternalStatusCodes.DataNotFound
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

  public static async updateAttentionArea(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const vet_id = (req.params.vet_id as string) ?? '';
      const attention_area_id = (req.params.attention_area_id as string) ?? '';
      if (vet_id != '') {
        const response = await AttentionAreaModel.update(
          {
            region: req.body['region'],
            commune: req.body['commune']
          },
          {
            where: { vet_id: vet_id, attention_area_id: attention_area_id }
          }
        );
        if (response != null) {
          res.status(StatusCodes.SuccessfulPatch).json({
            status: InternalStatusCodes.OperationSuccessful
          });
        }
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

  public static async deleteAttentionArea(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const vet_id: string = (req.params.vet_id as string) ?? '';
      const attention_area_id: string =
        (req.params.attention_area_id as string) ?? '';
      if (vet_id != '' && attention_area_id != '') {
        const response = await AttentionAreaModel.destroy({
          where: { vet_id: vet_id, attention_area_id: attention_area_id }
        });
        if (response != null) {
          res.status(StatusCodes.SuccessfulPatch).json({
            status: InternalStatusCodes.OperationSuccessful
          });
        }
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

export default AttentionAreasController;
