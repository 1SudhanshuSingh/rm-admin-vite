import { useEffect, useState, FC } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  Image,
  Text,
} from "@chakra-ui/react";

interface MyComponentProps {
  verifyUser?: boolean;
  onLogin: ({
    userName,
    password,
  }: {
    userName: string;
    password: string;
  }) => void;
}
const Login: FC<MyComponentProps> = ({
  verifyUser,
  onLogin,
}) => {
  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();


  useEffect(() => {
    if (verifyUser) {
      navigate("/admin/dashboard");
    }
  }, [verifyUser, navigate]);

  return (
    <Container
      maxW={"100%"}
      w={"full"}
      height={"100vh"}
      p={"10"}
      px={["28"]}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      bgGradient="linear(90deg, rgba(36,0,0,1) 0%, rgba(91,60,71,1) 34%, rgba(121,9,9,1) 92%)"
    >
      <Box
        display={"flex"}
        borderRadius={"xl"}
        height={"100%"}
        flexDirection={{
          base: "row",
        }}
      >
        <Box
          flex={"1"}
          p={"20"}
          bgColor="white"
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
        >
          <Text fontSize={"3xl"} mb={"10"}>
            Welcome To RoyalMatrimonial
          </Text>
          <form>
            <FormControl id="email" isRequired mb={4}>
              <FormLabel>UserName</FormLabel>
              <Input
                type="text"
                placeholder="Enter User Name"
                value={userName}
                onChange={(event) => setuserName(event.target.value)}
              />
            </FormControl>
            <FormControl id="password" isRequired mb={4}>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </FormControl>
            <Button
              colorScheme="blue"
              w={"100%"}
              onClick={() => onLogin({ userName, password })}
            >
              Login
            </Button>
          </form>
        </Box>
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          w={"50%"}
          height={"100%"}
        >
          <Image
            height={"100%"}
            objectFit={"cover"}
            src="https://img.freepik.com/premium-vector/user-login-with-character-concept-any-purpose-vector-line-certificate-icon-design_194782-640.jpg?size=626&ext=jpg&ga=GA1.1.232669346.1683532659&semt=sph"
            alt="Dan Abramov"
          />
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
