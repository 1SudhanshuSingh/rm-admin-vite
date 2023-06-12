import { QueryKey, useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

const CreateEmployee = async (values: any) => {
  try {
    const response = await axios.post(
      `https://beta.royalmatrimonial.com/api/admin/createEmployee`,
      values
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to create new employee");
  }
};

export const useCreateEmployee = () => {
  const createEmployeemutations = useMutation(CreateEmployee);
  const queryKey: QueryKey = ["createEmp"];
  const useCreateEmpQuery = () => {
    const { data, isLoading, error } = useQuery(queryKey, () => CreateEmployee);

    return { data, isLoading, error };
  };
  return { createEmployeemutations, useCreateEmpQuery };
};
