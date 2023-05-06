import { Request, Response, NextFunction } from 'express';
import AboutVetModel from '../../infrastructure/database/postgresql/models/about_vet.model';
import AdminModel from '../../infrastructure/database/postgresql/models/admin.model';
import AuthModel from '../../infrastructure/database/postgresql/models/authentication.model';
import LogModel from '../../infrastructure/database/postgresql/models/log.model';
import UserModel from '../../infrastructure/database/postgresql/models/user.model';
import VeterinaryModel from '../../infrastructure/database/postgresql/models/veterinary.model';
import VetServiceModel from '../../infrastructure/database/postgresql/models/vet_service.model';
import { StatusCodes } from '../../utils/http_status_codes';
import { InternalStatusCodes } from '../../utils/internal_status_codes';
import { encryptPassword } from '../../utils/password';
import { isValidUserState, UserState } from '../../utils/user_state';
import { UserTypes } from '../../utils/user_types';

const { Op } = require('sequelize');

class AdminController {
    public static async create(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try{
            const data = req.body;
            const [obj, created] = await AdminModel.findCreateFind({
                where: {
                    rut: data['rut'],                    
                    name: data['name'],
                    lastname: data['name'],
                    backup_email: data['email'],
                    phone: data['phone'], 
                },                
            });
            if(created){
                const hashValue: string = await encryptPassword(obj.rut);
                await AuthModel.create({
                    auth_id: obj.admin_id,
                    email: obj.backup_email,
                    password: hashValue,
                    user_type: UserTypes.SuperAdmin,
                    user_state: UserState.ToValidated,
                    refresh_token: ''
                });
                res
                  .status(StatusCodes.SuccessfulPost)
                  .json({status: InternalStatusCodes.OperationSuccessful});
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

    /**
     * 
     * @param req 
     * @param res 
     * @param next
     * 
     * admin can find pet owners by rut or name, also can adjust filters to get 
     * only pet owners with the following status:
     *  1. To Validated
     *  2. Active
     *  3. Suspended
     *  4. Deleted
     *  
     */

    public static async getPetOwner(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try{
            const petowner_name: string = (req.query.name as string) ?? '';
            const petowner_rut: string = (req.query.rut as string) ?? '';
            const page: number = req.query.page ? parseInt(req.query.page as string) : 1;
            const limit: number = req.query.limit ? parseInt(req.query.limit as string) : 10;
            const offset: number = (page - 1) * limit;
            let states: string[] = (req.query.status as string).split(',') ?? ['All'];            
            const validate_status:boolean = isValidUserState(states);
            if(validate_status){
                var user_data: any = {};
                if(petowner_name != ''){        
                    user_data['name'] = petowner_name;                    
                }
                if(petowner_rut != ''){
                    user_data['rut'] = petowner_rut;
                }
                if(states[0] == 'All'){
                    states = ['ToValidated', 'Active', 'Suspended', 'Deleted']
                }                
                const results: {
                rows: UserModel[],
                count: number;
                } = await UserModel.findAndCountAll({
                    limit, 
                    offset,
                    include: [
                        {
                            model: AuthModel,
                            required: true,
                            attributes: ['email', 'user_state'],
                            where: {
                                user_type: 'PetOwner'
                            }
                        }
                    ],
                    where: user_data
                });
                res
                  .status(StatusCodes.SuccessfulGet)
                  .json({status: InternalStatusCodes.OperationSuccessful, result: results})
            } else {
                res
                  .status(StatusCodes.SuccessfulGet)
                  .json({status: InternalStatusCodes.OperationSuccessful, result: []})
            }
                        
        } catch (error: any) {
            console.log(error);
            res
              .status(StatusCodes.BadRequest)
              .json({ status: InternalStatusCodes.QueryError });
            next(error);
        }
    }

    /**
     * 
     * @param req 
     * @param res 
     * @param next
     * 
     * admin can find vets by rut, name or services. Also can adjust filters 
     * to get only vets with the following status:
     *  1. Pending for review
     *  2. Accepted
     *  3. Suspended
     *  4. Deleted
     *  5. To validated
     *  
     */
    public static async getVets(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void>{
            try{
            const vet_name: string = (req.query.name as string) ?? '';
            const vet_rut: string = (req.query.rut as string) ?? '';
            const page: number = req.query.page ? parseInt(req.query.page as string) : 1;
            const limit: number = req.query.limit ? parseInt(req.query.limit as string) : 10;
            const offset: number = (page - 1) * limit;
            let states: string[] = (req.query.status as string).split(',') ?? ['All'];
            let services: string[] = (req.query.services as string).split(',') ?? ['All'];          
            const validate_status:boolean = isValidUserState(states);        
            if(validate_status){
                var user_data: any = {};
                if(vet_name != ''){        
                    user_data['name'] = vet_name;                    
                }
                if(vet_rut != ''){
                    user_data['rut'] = vet_rut;
                }
                if(states[0] == 'All'){
                    states = ['ToValidated', 'Active', 'Suspended', 'Deleted']
                }                
                const results: {
                rows: VeterinaryModel[],
                count: number;
                } = await VeterinaryModel.findAndCountAll({
                    limit, 
                    offset,
                    include: [
                        {
                            model: AuthModel,
                            required: true,
                            attributes: ['email', 'user_state'],
                            where: {
                                user_type: 'Veterinary',
                                user_state: states
                            }
                        },
                        {
                            model: VetServiceModel,
                            required: true,
                            attributes: ['name_service'],
                            where: {
                                name_service: services
                            }
                        }
                    ],
                    where: user_data
                });
                res
                  .status(StatusCodes.SuccessfulGet)
                  .json({status: InternalStatusCodes.OperationSuccessful, result: results})
            } else {
                res
                  .status(StatusCodes.SuccessfulGet)
                  .json({status: InternalStatusCodes.OperationSuccessful, result: []})
            }
                        
        } catch (error: any) {
            console.log(error);
            res
              .status(StatusCodes.BadRequest)
              .json({ status: InternalStatusCodes.QueryError });
            next(error);
        }
    }

    /**
     * 
     * admin can change user status for pet owners and vets if any internal proccess fails 
     * or a manual proccess are required. Only for admins
     * 
     */
    public static async changeUserStatus(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void>{
        try{
            const data = req.body;
            if(isValidUserState(data['user_state'])) {
                const result = await AuthModel.update(
                    {
                        user_state: data['user_state']
                    },
                    {
                        where: {
                            auth_id: data['auth_id']
                        }
                    }
                );            
                await LogModel.create({
                    auth_id: data['auth_id'],
                    reason: data['reason']
                })
                console.log(result);
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

    public static async getVetRequest(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try{            
            const page: number = req.query.page ? parseInt(req.query.page as string) : 1;
            const limit: number = req.query.limit ? parseInt(req.query.limit as string) : 10;
            const offset: number = (page - 1) * limit;
            const results: {
                rows: VeterinaryModel[],
                count: number;
            } = await VeterinaryModel.findAndCountAll({
                limit,
                offset,                
                include: [
                    {
                        model: AuthModel,
                        required: true,
                        where: {
                            user_state: ['ToValidated', 'PendingForReview']
                        }
                    },
                    {
                        model: AboutVetModel,
                        required: true
                    }
                ]
            });
            res
               .status(StatusCodes.SuccessfulGet)
               .json({status: InternalStatusCodes.OperationSuccessful, result: results});
        } catch (error: any) {
            console.log(error);
            res
              .status(StatusCodes.BadRequest)
              .json({ status: InternalStatusCodes.QueryError });
            next(error);
        }
    }

    /**
     * 
     * 
     * 
     */
    //public static async followVetAttention()

}

export default AdminController;