import { CustomerState, CustomerActionTypes, GET_CUSTOMERS_REQUEST, GET_CUSTOMERS_SUCCESS, GET_CUSTOMERS_FAILURE } from './types';

const initialState: CustomerState = {
  customers: null,
  isLoading: false,
  error: null,
};

const customerReducer = (state = initialState, action: CustomerActionTypes): CustomerState => {
  switch (action.type) {
    case GET_CUSTOMERS_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case GET_CUSTOMERS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        customers: action.payload,
      };
    case GET_CUSTOMERS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default customerReducer;
