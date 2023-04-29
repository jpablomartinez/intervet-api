import { Request, Response, NextFunction } from 'express';
import CreditCardModel from '../../infrastructure/database/postgresql/models/credit_card_model';
import { StatusCodes } from '../../utils/http_status_codes';
import { InternalStatusCodes } from '../../utils/internal_status_codes';

class CreditCardController {

    public static async create(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void>{
        try{
            const data = req.body;
            const credit_card = await CreditCardModel.create({
                user_id: data['user_id'],
                number: data['number'],
                expiration_date: data['expiration_date'],
                code: data['code'],
                propietary_name: data['propietary_name'],
                other_name: data['other_name']
            });
            if(credit_card != null){
                res            
                  .status(StatusCodes.SuccessfulPost)
                  .json({status: InternalStatusCodes.OperationSuccessful});
            } else {
                res            
                  .status(StatusCodes.BadRequest)
                  .json({status: InternalStatusCodes.OperationError});
            }       
        }  catch (error: any) {
            console.log(error);
            res
              .status(StatusCodes.BadRequest)
              .json({ status: InternalStatusCodes.QueryError });
            next(error);
        }
    }

    public static async getCCBasicInfo(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try{
            const user_id: string = req.params.user_id ?? '';
            if(user_id != ''){
                const credit_card = await CreditCardModel.findOne({
                    where: {
                        user_id: user_id
                    }
                });
                if(credit_card != null){
                    const l = credit_card.number.length;
                    const last_digits = credit_card.number.slice(l - 4);
                    res
                      .status(StatusCodes.SuccessfulGet)
                      .json({
                        status: InternalStatusCodes.OperationSuccessful, 
                        result: { number: `**** ${last_digits}`, expiration_date: credit_card.expiration_date, other_name: credit_card.other_name}
                      })
                }
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
        try{
            const data = req.body;
            if(data['credit_card_id'] != ''){
                await CreditCardModel.destroy({
                    where: { credit_card_id: data['credit_card_id'] }
                });
                res            
                  .status(StatusCodes.SuccessfulPatch)
                  .json({status: InternalStatusCodes.OperationSuccessful});
            } else {
                res            
                  .status(StatusCodes.BadRequest)
                  .json({status: InternalStatusCodes.QueryError});
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

export default CreditCardController;