import { Request, Response, NextFunction } from 'express';
import VeterinaryModel from '../../infrastructure/database/postgresql/models/veterinary.model';
import { getContactMethodByOption } from '../../utils/contact_method';
import { StatusCodes } from '../../utils/http_status_codes';
import { InternalStatusCodes } from '../../utils/internal_status_codes';
import WorkingHoursModel from '../../infrastructure/database/postgresql/models/working_hours.model';
import AuthModel from '../../infrastructure/database/postgresql/models/authentication.model';
import { encryptPassword } from '../../utils/password';
import { UserTypes } from '../../utils/user_types';
import { UserState } from '../../utils/user_state';
import AttentionAreaModel from '../../infrastructure/database/postgresql/models/attention_area.model';

const { Op } = require('sequelize');

class VetController {
  public static async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const data = req.body;
      const veterinary = await VeterinaryModel.create({
        name: data['name'],
        last_name: data['last_name'],
        rut: data['rut'],
        work_phone: data['work_phone'],
        about_me: data['about_me'],
        to_home_value: data['to_home_value'],
        po_to_home_value: data['po_to_home_value']
      });
      if (veterinary != null) {
        const hashValue: string = await encryptPassword(data['password']);
        AuthModel.create({
          auth_id: veterinary.vet_id,
          email: data['email'],
          password: hashValue,
          user_type: UserTypes.Veterinary,
          user_state: UserState.ToValidated
        });
      }
      res
        .status(StatusCodes.SuccessfulPost)
        .json({ status: InternalStatusCodes.OperationSuccessful });
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
    try {
      const vets = await VeterinaryModel.findAll();
      res.status(StatusCodes.SuccessfulGet).json({
        status: InternalStatusCodes.OperationSuccessful,
        data: { result: vets }
      });
    } catch (error: any) {
      console.log(error);
      next(error);
    }
  }

  public static async getVets(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try{
      const region: string = req.query.region as string ?? 'Metropolitana de Santiago';
      /*const commune: string = req.query.commune as string ?? '';
      const day = parseInt(req.query.day as string) ?? 1;      
      const start_at: string = req.query.start_at as string ?? '00:00';
      const end_at: string = req.query.end_at as string ?? '23:59';*/
      const vet_to_home_min = req.query.vet_to_home_min ?? 0;
      const vet_to_home_max = req.query.vet_to_home_max ?? 200000;
      const owner_to_vet_min = req.query.owner_to_vet_min ?? 0;
      const owner_to_vet_max = req.query.owner_to_vet_max ?? 200000;
      const rating = req.query.rating ?? 0;      
      const page: number = req.query.page
        ? parseInt(req.query.page as string)
        : 1;
      const limit: number = req.query.limit
        ? parseInt(req.query.limit as string)
        : 10;
      const offset: number = (page - 1) * limit;            
      const results: {
        rows: VeterinaryModel[];
        count: number;
      } = await VeterinaryModel.findAndCountAll({ 
        attributes: ['vet_id', 'name', 'last_name', 'rating', 'about_me', 'to_home_value', 'po_to_home_value', 'favorites_amount', 'best_comment'],
        where : {
          po_to_home_value: {
            [Op.between]: [owner_to_vet_min, owner_to_vet_max]
          },
          to_home_value: {
            [Op.between]: [vet_to_home_min, vet_to_home_max]
          },        
          rating: {
            [Op.gte]: rating
          }
        }, 
        include:  [
          { 
            model: WorkingHoursModel, 
            required: true, 
            attributes: ['day', 'start_at', 'end_at'],                         
          },
          {
            model: AttentionAreaModel, 
            required: true, 
            attributes: ['region', 'commune'],
            where: {
              region: region              
            }            
          } 
        ]        
      });
      res.status(StatusCodes.SuccessfulGet).json({
        status: InternalStatusCodes.OperationSuccessful,
        data: { result: results }
      });
      
    } catch (error: any) {
      console.log(error);
      res
        .status(StatusCodes.BadRequest)
        .json({ status: InternalStatusCodes.QueryError });
      next(error);
    }
  }

  /*public static async getVetsByAreaAndWorkingHours(

  )*/

}

export default VetController;
