import {Request, Response, NextFunction} from 'express';
import PetModel from '../../infrastructure/database/postgresql/models/pet';
import { StatusCodes } from '../../utils/http_status_codes';
import { InternalStatusCodes } from '../../utils/internal_status_codes';
import Pet from './model';


class PetController {
    public static async create(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {        
        try {
            const pet: Pet = req.body;
            const obj = await PetModel.create({
                user_id: pet.user_id,
                name: pet.name,
                specie: pet.specie,
                breed: pet.specie,
                birthdate: pet.birthdate,
                chip_number: pet.chip_number
            });
            if(obj != null){
                res
                  .status(StatusCodes.SuccessfulPost)
                  .json({ status: InternalStatusCodes.OperationSuccessful });
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

    public static async getAllByUserId(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const user_id = req.params.user_id ?? '';
            if(user_id != '') {
                const pets = PetModel.findAll({
                    where: {
                        user_id: user_id
                    }
                });
                res
                  .status(StatusCodes.SuccessfulGet)
                  .json({status: InternalStatusCodes.OperationSuccessful, result: {pets: pets}});
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

    public static async modify(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try{
            const pet: Pet = req.body;
            if(pet!= null){
                await PetModel.update(
                    {
                        name: pet.name,
                        specie: pet.specie,
                        breed: pet.breed,
                        birthdate: pet.birthdate,
                        chip_number: pet.chip_number
                    },
                    {
                        where: {pet_id: pet.pet_id}
                    }
                )
            }                        
        }  catch (error: any) {
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
            const pet_id: string = req.params.pet_id ?? '';
            if(pet_id != '') {
                await PetModel.destroy({
                    where : {
                        pet_id: pet_id
                    }
                });
                res
                  .status(StatusCodes.SuccessfulPatch)
                  .json({ status: InternalStatusCodes.OperationSuccessful });
            } else {
                res
                  .status(StatusCodes.BadRequest)
                  .json({status: InternalStatusCodes.OperationError})
            }
        }  catch (error: any) {
            console.log(error);
            res
              .status(StatusCodes.BadRequest)
              .json({ status: InternalStatusCodes.QueryError });
            next(error);
        }
    }
}

export default PetController;