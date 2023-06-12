import axios from "axios";
import { Dispatch } from "redux";
import {
  UserData,
  UserDataIF,
  GET_CUSTOMERS_REQUEST,
  GET_CUSTOMERS_SUCCESS,
  GET_CUSTOMERS_FAILURE,
  CustomerActionTypes,
} from "./types";

export const getCustomersRequest = () => ({
  type: GET_CUSTOMERS_REQUEST,
});

const getCustomersSuccess = (customers: UserData[]): CustomerActionTypes => ({
  type: GET_CUSTOMERS_SUCCESS,
  payload: customers,
});

const getCustomersFailure = (error: string): CustomerActionTypes => ({
  type: GET_CUSTOMERS_FAILURE,
  payload: error,
});


export const getCustomers = (fromDate: string, toDate: string) => {
  return async (dispatch: Dispatch<CustomerActionTypes>) => {
    try {
      const response = await axios.post<UserDataIF>(
        "https://beta.royalmatrimonial.com/api/admin/getAllCustomers",
        { fromDate, toDate }
      );
      if (response.data.status === 200) {
        const customers = response?.data.jsonResponse || [];
        dispatch(getCustomersSuccess(customers));
      } else {
        dispatch(getCustomersFailure(response.data.message));
      }
    } catch (error: any) {
      dispatch(getCustomersFailure(error.message));
    }
  };
};
