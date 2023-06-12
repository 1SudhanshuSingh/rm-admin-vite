import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Components/Login";
import Employee from "../DashBoardRight/Employees";
import Customer from "../DashBoardRight/Customer";
import DashBoardHome from "../DashBoardRight/DashBoardHome";
import Errors from "../DashBoardRight/Errors";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux/es/exports";
import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
} from "../../redux/auth/authReducer";
import { authAdmin } from "../../Constant/authD";
import { RootState } from "../../redux/rootReducers";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";

const HomePage = () => {
  const dispatch = useDispatch();
  const { user, error } = useSelector(
    (state: RootState) => state.auth
  );
  const queryClient = new QueryClient();
  const onLogin = ({
    userName,
    password,
  }: {
    userName: string;
    password: string;
  }) => {
    dispatch({ type: LOGIN_REQUEST, payload: { userName, password } });
   
    if (userName === authAdmin.username && password === authAdmin.password) {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { msg: "OK", verifyUser: true },
      });
    } else {
      dispatch({
        type: LOGIN_FAILURE,
        payload: { msg: "Auth Fail", verifyUser: false },
      });
    }
  };

  const router = createBrowserRouter([
    {
      path: "/admin/",
      element: <Login verifyUser={user?.verifyUser} onLogin={onLogin} />,
    },
    {
      path: "/admin/dashboard",
      element: <DashBoardHome verifyUser={user?.verifyUser} />,
    },
    {
      path: "/admin/employees",
      element: <Employee verifyUser={user?.verifyUser} />,
    },
    {
      path: "/admin/customers",
      element: <Customer verifyUser={user?.verifyUser} />,
    },
    {
      path: "/admin/errors",
      element: <Errors verifyUser={user?.verifyUser} />,
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      {error && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error?.msg}</AlertDescription>
        </Alert>
      )}
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default HomePage;
