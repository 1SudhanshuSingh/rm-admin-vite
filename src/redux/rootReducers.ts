import { combineReducers } from "redux";
import authReducer from "./auth/authReducer";
import customerReducer from "./customer/reducerCustomer";
// import customerReducer from "./customer/customerReducer";

export type RootState = ReturnType<typeof rootReducer>;

const rootReducer = combineReducers({
  auth: authReducer,
  customer: customerReducer,
});


export default rootReducer;
