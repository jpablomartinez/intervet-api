import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from '../../utils/http_status_codes';
import { InternalStatusCodes } from '../../utils/internal_status_codes';
import { env } from '../configuration/environment';
import { validateAccessToken, decodeToken, AuthToken } from '../../utils/token';

class AuthMiddleware {
  public static async PetOwnerAccess(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    var pet_owner_token: string =
      req.headers['authorization']?.split(' ')[1] ?? '';
    if (pet_owner_token != '') {
      try {
        if (validateAccessToken(pet_owner_token)) {
          const { user_id, user_type, user_status }: AuthToken =
            decodeToken(pet_owner_token);
          if (
            user_type == 'PetOwner' &&
            (user_status == 'ToValidated' || user_status == 'Active')
          ) {
            next();
          } else {
            res
              .status(StatusCodes.Unauthorized)
              .json({
                status: InternalStatusCodes.UserStateError,
                message: 'Credentials are not correct'
              });
          }
        }
      } catch (error: any) {
        res
          .status(StatusCodes.BadRequest)
          .json({
            status: InternalStatusCodes.TokenExpired,
            message: 'Token expired'
          });
      }
    } else {
      res
        .status(StatusCodes.BadRequest)
        .json({
          status: InternalStatusCodes.TokenMissing,
          message: 'Token is missing'
        });
    }
  }

  public static async VeterinaryMinimumAccess(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    var vet_token: string = req.headers['authorization']?.split(' ')[1] ?? '';
    if (vet_token != '') {
      try {
        if (validateAccessToken(vet_token)) {
          const { user_id, user_type, user_status }: AuthToken =
            decodeToken(vet_token);
          if (
            user_type == 'Veterinary' &&
            (user_status == 'ToValidated' || user_status == 'PendingForReview')
          ) {
            next();
          } else {
            res
              .status(StatusCodes.Unauthorized)
              .json({
                status: InternalStatusCodes.UserStateError,
                message: 'Credentials are not correct'
              });
          }
        }
      } catch (error: any) {
        res
          .status(StatusCodes.BadRequest)
          .json({
            status: InternalStatusCodes.TokenExpired,
            message: 'Token expired'
          });
      }
    } else {
      res
        .status(StatusCodes.BadRequest)
        .json({
          status: InternalStatusCodes.TokenMissing,
          message: 'Token is missing'
        });
    }
  }

  public static async VeterinaryAllAccess(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    var vet_token: string = req.headers['authorization']?.split(' ')[1] ?? '';
    if (vet_token != '') {
      try {
        if (validateAccessToken(vet_token)) {
          const { user_id, user_type, user_status }: AuthToken =
            decodeToken(vet_token);
          if (
            user_type == 'Veterinary' &&
            (user_status == 'Active' ||
              user_status == 'ToValidated' ||
              user_status == 'PendingForReview')
          ) {
            next();
          } else {
            res
              .status(StatusCodes.Unauthorized)
              .json({
                status: InternalStatusCodes.UserStateError,
                message: 'Credentials are not correct'
              });
          }
        }
      } catch (error: any) {
        res
          .status(StatusCodes.BadRequest)
          .json({
            status: InternalStatusCodes.TokenExpired,
            message: 'Token expired'
          });
      }
    } else {
      res
        .status(StatusCodes.BadRequest)
        .json({
          status: InternalStatusCodes.TokenMissing,
          message: 'Token is missing'
        });
    }
  }

  public static async AdminAccess(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    var admin_token: string = req.headers['authorization']?.split(' ')[1] ?? '';
    if (admin_token != '') {
      try {
        if (validateAccessToken(admin_token)) {
          const { user_id, user_type, user_status }: AuthToken =
            decodeToken(admin_token);
          if (user_type == 'Admin' && user_status == 'Active') {
            next();
          } else {
            res
              .status(StatusCodes.Unauthorized)
              .json({
                status: InternalStatusCodes.UserStateError,
                message: 'Credentials are not correct'
              });
          }
        } else {
          res
            .status(StatusCodes.BadRequest)
            .json({
              status: InternalStatusCodes.TokenExpired,
              message: 'Token expired'
            });
        }
      } catch (error: any) {
        res
          .status(StatusCodes.BadRequest)
          .json({
            status: InternalStatusCodes.TokenExpired,
            message: 'Token expired'
          });
      }
    } else {
      res
        .status(StatusCodes.BadRequest)
        .json({
          status: InternalStatusCodes.TokenMissing,
          message: 'Token is missing'
        });
    }
  }
}

export default AuthMiddleware;
