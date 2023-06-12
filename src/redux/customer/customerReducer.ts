import { RootState } from "../rootReducers";

export const selectAlldata = (state: RootState) => state.customer;
export const selectCustomers = (state: RootState) => state.customer.customers;
export const selectLoading = (state: RootState) => state.customer.isLoading;
export const selectError = (state: RootState) => state.customer.error;