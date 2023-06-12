export interface CustomerState {
  customers: UserData[] | null;
  isLoading: boolean;
  error: string | null;
}

export interface UserDataIF {
  jsonResponse: UserData[] | undefined;
  message: string;
  output?: number;
  status?: number;
}

export interface UserData {
  Name: string | null;
  RMID: string;
  RowID: number;
  Score: ScoreData | null;
  Mobile: number;
  User_ID: number;
  PackageID: number;
  Package_Endate: string | null;
  user_last_login: string | null;
  User_CreatedDate: string;
}

export interface ScoreData {
  OS: number;
  P1: number;
  P2: number;
  P3: number;
  P4: number;
  P5: number;
  PP: number;
}

export const GET_CUSTOMERS_REQUEST = "GET_CUSTOMERS_REQUEST";
export const GET_CUSTOMERS_SUCCESS = "GET_CUSTOMERS_SUCCESS";
export const GET_CUSTOMERS_FAILURE = "GET_CUSTOMERS_FAILURE";

interface GetCustomersRequestAction {
  type: typeof GET_CUSTOMERS_REQUEST;
}

interface GetCustomersSuccessAction {
  type: typeof GET_CUSTOMERS_SUCCESS;
  payload: UserData[];
}

interface GetCustomersFailureAction {
  type: typeof GET_CUSTOMERS_FAILURE;
  payload: string;
}

export type CustomerActionTypes =
  | GetCustomersRequestAction
  | GetCustomersSuccessAction
  | GetCustomersFailureAction;
