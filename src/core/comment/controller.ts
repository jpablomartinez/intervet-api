import {Request, Response, NextFunction} from 'express';
import CommentModel from '../../infrastructure/database/postgresql/models/comment.model';
import { StatusCodes } from '../../utils/http_status_codes';
import { InternalStatusCodes } from '../../utils/internal_status_codes';
import { decodeUserIdToken } from '../../utils/token';

class CommentController {
    public static async create(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void>{
        try{            
            const authorization: string = req.headers['authorization'] ?? '';
            if(authorization != ''){                           
                const user_id: string = decodeUserIdToken(authorization.split(' ')[1], 'user_id');
                const data = req.body;
                await CommentModel.create({
                    user_id: user_id,
                    vet_id: data['vet_id'],
                    comment: data['comment'],
                    rating: data['rating'] > 5 || data['rating'] < 1 ? 1 : data['rating']
                });
                res
                  .status(StatusCodes.SuccessfulPost)
                  .json({status: InternalStatusCodes.OperationSuccessful});      
            }
            //
        } catch (error: any) {
            console.log(error);
            res
                .status(StatusCodes.BadRequest)
                .json({ status: InternalStatusCodes.QueryError });
            next(error);
        }
    }

    public static async getUserComments(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void>{
        try{
            const authorization: string = req.headers['authorization'] ?? '';
            if(authorization != ''){
                const user_id: string = decodeUserIdToken(authorization.split(' ')[1], 'user_id');
                const page: number = req.query.page ? parseInt(req.query.page as string) : 1;
                const limit: number = req.query.limit ? parseInt(req.query.limit as string) : 10;
                const offset: number = (page - 1) * limit;
                const results : {
                    rows: CommentModel[];
                    count: number;
                } = await CommentModel.findAndCountAll({
                    attributes: [
                        'comment',
                        'rating',
                        'createdAt'
                    ],
                    limit,
                    offset,
                    where: {
                        user_id: user_id
                    }
                });
                res
                  .status(StatusCodes.SuccessfulPost)
                  .json({status: InternalStatusCodes.OperationSuccessful, data: results})
            } else {
                res
                  .status(StatusCodes.BadRequest)
                  .json({status: InternalStatusCodes.QueryError, result: 'missing token'});
            }
        } catch (error: any) {
            console.log(error);
            res
                .status(StatusCodes.BadRequest)
                .json({ status: InternalStatusCodes.QueryError });
            next(error);
        }
    }

    public static async getCommentsForVet(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void>{
        try{
            const authorization: string = req.headers['authorization'] ?? '';            
            if(authorization != ''){
                const vet_id: string = decodeUserIdToken(authorization.split(' ')[1], 'user_id');
                const page: number = req.query.page ? parseInt(req.query.page as string) : 1;
                const limit: number = req.query.limit ? parseInt(req.query.limit as string) : 10;
                const offset: number = (page - 1) * limit;
                const results: {
                    rows: CommentModel[];
                    count: number;
                } = await CommentModel.findAndCountAll({
                    attributes: [
                        'comment',
                        'rating',
                        'createdAt'
                    ],
                    limit,
                    offset,
                    where: {
                        vet_id: vet_id
                    }
                });
                res
                  .status(StatusCodes.SuccessfulPost)
                  .json({status: InternalStatusCodes.OperationSuccessful, result: results});
            } else {
                res
                  .status(StatusCodes.BadRequest)
                  .json({status: InternalStatusCodes.QueryError, result: 'missing token'});
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

export default CommentController;