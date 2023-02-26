import { Request, Response, NextFunction } from 'express';
import ServiceModel from '../../infrastructure/database/postgresql/models/service.model';
import { StatusCodes } from '../../utils/http_status_codes';
import { InternalStatusCodes } from '../../utils/internal_status_codes';
import Service from './model';

class ServiceController {
    public static async create(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try{
            const data: Service = req.body;
            const [obj, created] = await ServiceModel.findOrCreate({
                where: {
                    name: data.name,
                    description: data.description,
                }                
            });
            if(created){
                res
                  .status(StatusCodes.SuccessfulPost)
                  .json({ status: InternalStatusCodes.OperationSuccessful });
            } else {
                res
                  .status(StatusCodes.SuccessfulPost)
                  .json({ status: InternalStatusCodes.AlreadyCreated });
            }            
        } catch (error: any) {
            res
              .status(StatusCodes.BadRequest)
              .json({ status: InternalStatusCodes.QueryError});              
              next(error);
        }
    }

    public static async getAll(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void>{
        try{
            const page: number = req.query.page ? parseInt(req.query.page as string) : 1;
            const limit: number = req.query.limit ? parseInt(req.query.limit as string) : 10;
            const offset: number = (page - 1) * limit;
            const services: {
                rows: ServiceModel[];
                count: number;
            } = await ServiceModel.findAndCountAll({
                order: [['createdAt', 'ASC']],
                limit,
                offset
            });
            res.status(StatusCodes.SuccessfulGet).json({
                status: InternalStatusCodes.OperationSuccessful,
                data: {result: services, items: services.count, page: page, limit: limit}
            })
        } catch (error: any) {
            res
              .status(StatusCodes.BadRequest)
              .json({ status: InternalStatusCodes.QueryError});              
              next(error);
        }
    }

    public static async update(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const service: Service = req.body;
            const response = await ServiceModel.update(
                {
                    name: service.name,
                    description: service.description,
                },
                {
                    where: {
                        service_id: service.service_id
                    }
                }
            );            
            res.status(StatusCodes.SuccessfulPatch).json({
                status: InternalStatusCodes.OperationSuccessful
            });
        } catch (error: any) {
            res
              .status(StatusCodes.BadRequest)
              .json({ status: InternalStatusCodes.QueryError});              
              next(error);
        }
    }

    public static async delete(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try{
            const service_id = req.params.service_id ?? '';
            if(service_id != ''){
                await ServiceModel.destroy({
                    where: {service_id: service_id}
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
            console.log(error);
            res
              .status(StatusCodes.BadRequest)
              .json({ status: InternalStatusCodes.QueryError });
              next(error);
        }
    }
}

export default ServiceController;