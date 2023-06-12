import { FunctionComponent } from "react";
import LoginHeader from "../Features/Header/LoginHeader";
import { Box, Container, Divider } from "@chakra-ui/react";
import DashBoardLeft from "../Features/DashBoard/DashBoardLeft";
import { useDispatch } from "react-redux/es/exports";
import { LOGOUT } from "../redux/auth/authReducer";
import { persistor } from "../redux/store";

type SetterDrawerHOCProps = {
  // Props for the component being wrapped
};

const SetterDrawer = <P extends SetterDrawerHOCProps>(
  WrappedComponent: FunctionComponent<P>
): FunctionComponent<P> => {
  const HeaderDrawerHOC: FunctionComponent<P> = (props) => {
    const dispatch = useDispatch();
    const onLogout = () => {
      dispatch({ type: LOGOUT });
      persistor.purge();
    };
    return (
      <>
        <LoginHeader onLogout={onLogout} />
        <Container
          maxW={"100%"}
          w={"full"}
          minH={"100vh"}
          bgGradient="linear(90deg, rgba(36,27,0,1) 0%, rgba(91,60,82,1) 34%, rgba(121,9,9,1) 92%)"
        >
          <Box display={"flex"} h={"full"} alignItems={"flex-start"}>
            <Box
              minH={"2xl"}
              h={"full"}
              w={["20%"]}
              bg={"#f0eff3"}
              display={["none", "block"]}
              p={[5, 5, 1, 10]}
              pt={5}
            >
              <DashBoardLeft />
            </Box>
            <Divider orientation="vertical" />
            <Box
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"start"}
              p={[4, 10]}
              pt={[10]}
              width={["100%", "62%", "80%"]}
              minH={"auto"}
              alignItems={"center"}
              color={"black"}
              bg={"#f0eff3"}
              marginStart={0}
            >
              <WrappedComponent {...props} />
            </Box>
          </Box>
        </Container>
      </>
    );
  };

  return HeaderDrawerHOC;
};

export default SetterDrawer;
