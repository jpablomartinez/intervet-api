import { UserState } from '../../utils/user_state';
import { UserTypes } from '../../utils/user_types';

class Auth {
  auth_id?: string;
  email: string;
  password: string;
  user_type: UserTypes;
  user_state: UserState;  
  refresh_token: string;

  constructor(
    id: string,
    email: string,
    password: string,
    user_type: UserTypes,
    user_state: UserState,    
    refresh_token: string
  ) {
    this.auth_id = id;
    this.email = email;
    this.password = password;
    this.user_type = user_type;
    this.user_state = user_state;  
    this.refresh_token = refresh_token;
  }
}

export default Auth;
