import { Request, Response, NextFunction } from 'express';
import BankAccountModel from '../../infrastructure/database/postgresql/models/bank_account_model';
import { StatusCodes } from '../../utils/http_status_codes';
import { InternalStatusCodes } from '../../utils/internal_status_codes';
import BankAccount from './model';

class BankAccountController {
    public static async create(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try{
            const data = req.body;
            const [obj, created] = await BankAccountModel.findOrCreate({
                where: {
                    account_number: data['account_number']
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
        } catch (error: any) {
            console.log(error);
            res
                .status(StatusCodes.BadRequest)
                .json({ status: InternalStatusCodes.QueryError });
            next(error);
        }
    }

    public static async getByUserId(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try{
            const user_id: string = req.params.id ?? '';
            if(user_id != ''){
                const bank_account = await BankAccountModel.findOne({
                    where: {
                        user_id: user_id
                    }
                });
                if(bank_account != null){
                    res
                      .status(StatusCodes.BadRequest)
                      .json({ status: InternalStatusCodes.QueryError });                      
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

    public static async modify(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try{
            const data: BankAccount = req.body;
            if(data.account_number != '' && data.account_type != '' && data.bank != '' && data.bank_account_id != ''){
                await BankAccountModel.update(
                    {
                        account_type: data.account_type,
                        account_number: data.account_number,
                        bank: data.bank
                    },
                    {
                        where: {
                            bank_account_id: data['bank_account_id']
                        }
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
            const data = req.body;
            if(data['bank_account_id'] != ''){
                await BankAccountModel.destroy({
                    where: { bank_account_id: data['bank_account_id'] }
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

export default BankAccountController;