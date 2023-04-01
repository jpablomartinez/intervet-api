import { env } from '../infrastructure/configuration/environment';

var jwt = require('jsonwebtoken');

export const authToken = async (user_id: string, user_type: string, user_status: string):Promise<string> => {
    console.log(env.access_token)
    console.log(env.refresh_token)
    return await jwt.sign(
        {
            'user_id': user_id,
            'user_type': user_type,
            'user_status': user_status
        }, 
        env.access_token,
        {             
            expiresIn: '2h'
        },    
    );
}

export const refreshToken = (user_id: string) : string => {
    return jwt.sign(
        {
            'user_id': user_id
        },
        env.refresh_token,
        {           
            expiresIn: '365d'
        },
    )
}