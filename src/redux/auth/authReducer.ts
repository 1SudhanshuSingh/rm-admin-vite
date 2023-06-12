interface AuthState {
  user: null | User;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: { msg: string } | null;
}

interface User {
  verifyUser?: boolean;
  id: number;
  name: string;
}

interface Login {
  email: string;
  password: string;
}

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT = "LOGOUT";

interface LoginRequestAction {
  type: typeof LOGIN_REQUEST;
  payload: Login;
}

interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  payload: User;
}

interface LoginFailureAction {
  type: typeof LOGIN_FAILURE;
  payload: { msg: string };
}

interface LogoutAction {
  type: typeof LOGOUT;
}

type AuthActionTypes =
  | LoginRequestAction
  | LoginSuccessAction
  | LoginFailureAction
  | LogoutAction;

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const authReducer = (
  state = initialState,
  action: AuthActionTypes
): AuthState => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        error: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export default authReducer;
