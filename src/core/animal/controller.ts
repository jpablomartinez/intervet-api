import { Request, Response, NextFunction } from 'express';
import { where } from 'sequelize';
import AnimalModel from '../../infrastructure/database/postgresql/models/animal_model';
import { StatusCodes } from '../../utils/http_status_codes';
import { InternalStatusCodes } from '../../utils/internal_status_codes';
import Animal from './model';


class AnimalController {
    public static async create(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void>{
        try{
            const animal = req.body;
            if(animal != null){
                const [obj, created] = await AnimalModel.findOrCreate({
                    where: {specie: animal['specie']}
                });
                if(created){
                    res
                    .status(StatusCodes.SuccessfulPost)
                    .json({status: InternalStatusCodes.OperationSuccessful});
                } else {
                    res
                    .status(StatusCodes.SuccessfulPost)
                    .json({status: InternalStatusCodes.AlreadyCreated});
                }
            } else {
                res
                  .status(StatusCodes.BadRequest)
                  .json({status: InternalStatusCodes.QueryError});
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
        try{
            const animals = AnimalModel.findAll();
            res 
              .status(StatusCodes.SuccessfulGet)
              .json({status: InternalStatusCodes.OperationSuccessful, result: animals})
        } catch (error: any) {
            console.log(error);
            res
                .status(StatusCodes.BadRequest)
                .json({ status: InternalStatusCodes.QueryError });
            next(error);
        }
    }

    public static async modify(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void>{
        try{
            const animal_id: string = req.params.animal_id ?? '';
            if(animal_id != ''){
                const animal: Animal = req.body;
                await AnimalModel.update(
                    {
                        specie: animal.specie
                    },
                    {
                        where: {animal_id: animal_id}
                    }
                );
                res
                  .status(StatusCodes.SuccessfulPatch)
                  .json({status: InternalStatusCodes.OperationSuccessful});
            } else {
                res
                  .status(StatusCodes.BadRequest)
                  .json({status: InternalStatusCodes.QueryError});
            }
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
        try{
            const animal_id: string = req.params.animal_id ?? '';
            if(animal_id != ''){
                await AnimalModel.destroy(
                    {
                        where: {animal_id: animal_id}
                    }
                );
                res
                  .status(StatusCodes.SuccessfulPatch)
                  .json({status: InternalStatusCodes.OperationSuccessful});
            } else {
                res
                  .status(StatusCodes.BadRequest)
                  .json({status: InternalStatusCodes.QueryError});
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

export default AnimalController;