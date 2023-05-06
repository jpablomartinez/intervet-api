import {Request, Response, NextFunction} from 'express';
import AnimalVetModel from '../../infrastructure/database/postgresql/models/animal_vet.model';
import { StatusCodes } from '../../utils/http_status_codes';
import { InternalStatusCodes } from '../../utils/internal_status_codes';

class AnimalVetController {
    public static async create(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try{
            const vet_id: string = req.params.vet_id ?? '';
            const animal_ids: string[] = req.body['animal_ids'] ?? [];
            if(vet_id != '' && animal_ids.length > 0){
                let preferences = [];
                for(var i of animal_ids){
                    preferences.push({'vet_id': vet_id, 'animal_id': i})
                }
                const animalVet = await AnimalVetModel.bulkCreate(preferences);
                if(animalVet != null){
                    res
                      .status(StatusCodes.SuccessfulPost)
                      .json({status: InternalStatusCodes.OperationSuccessful});
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

    public static async delete(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void>{
        try{
            const vet_id: string = req.params.vet_id ?? '';
            const animal_id: string = req.body['animal_id'] ?? '';
            if(vet_id != '' && animal_id != ''){
                await AnimalVetModel.destroy({
                    where: {
                        vet_id: vet_id,
                        animal_id: animal_id
                    }
                });
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

export default AnimalVetController;