import { Request, Response, NextFunction } from 'express';
import AboutVetModel from '../../infrastructure/database/postgresql/models/about_vet.model';
import { StatusCodes } from '../../utils/http_status_codes';
import { InternalStatusCodes } from '../../utils/internal_status_codes';

class AboutVetController {
    public static async modify(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {                        
            const about_vet: AboutVetModel = req.body;
            await AboutVetModel.update(
                {
                    about_me: about_vet.about_me
                },
                {
                    where: {
                        about_me: about_vet.about_vet_id
                    }
                }
            );
        } catch (error: any) {
            console.log(error);
            res
              .status(StatusCodes.BadRequest)
              .json({ status: InternalStatusCodes.QueryError });
            next(error);
        }
    }
}

export default AboutVetController;