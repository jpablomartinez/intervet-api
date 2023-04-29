import {Request, Response, NextFunction} from 'express';
import FavoriteVetModel from '../../infrastructure/database/postgresql/models/favorite_vet_model';
import VeterinaryModel from '../../infrastructure/database/postgresql/models/veterinary.model';
import { StatusCodes } from '../../utils/http_status_codes';
import { InternalStatusCodes } from '../../utils/internal_status_codes';


class FavoritePetController {
    public static async create(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void>{
        try{
            const user_id: string = req.params.user_id ?? '';
            if(user_id != ''){
                const vet_id: string = req.body['vet_id'];
                const [obj, created] = await FavoriteVetModel.findOrCreate({
                    where: {
                        user_id: user_id,
                        vet_id: vet_id
                    }
                });
                if(created){
                    res
                      .status(StatusCodes.SuccessfulPost)
                      .json({status: InternalStatusCodes.OperationSuccessful});
                } else {
                    res
                      .status(StatusCodes.BadRequest)
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

    public static async getFavoriteVetsByUserId(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void>{
        try{
            const user_id: string = req.params.user_id ?? '';
            if(user_id != ''){
                const page: number = req.query.page ? parseInt(req.query.page as string) : 1;
                const limit: number = req.query.limit ? parseInt(req.query.page as string) : 10;
                const offset: number = (page - 1) * limit;
                const results: {
                    rows: FavoriteVetModel[];
                    count: number;
                } = await FavoriteVetModel.findAndCountAll({
                    order: [['createdAt', 'ASC']],
                    attributes: [
                        'createdAt'
                    ],
                    where: {
                        user_id: user_id
                    },
                    include: [
                        {
                            model: VeterinaryModel,
                            required: true,
                            attributes: ['vet_id', 'name', 'last_name'],
                            as: 'vet'
                        }
                    ],
                    limit,
                    offset
                });
                res
                  .status(StatusCodes.SuccessfulPost)
                  .json({status: InternalStatusCodes.OperationSuccessful, result: results});
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

    public static async countFavoritesByVetId(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void>{
        try{

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

        } catch (error: any) {
            console.log(error);
            res
                .status(StatusCodes.BadRequest)
                .json({ status: InternalStatusCodes.QueryError });
            next(error);
        }
    }

}

export default FavoritePetController;