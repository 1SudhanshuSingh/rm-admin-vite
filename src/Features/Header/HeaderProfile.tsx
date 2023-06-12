import { Box, Icon, Stack, Text } from "@chakra-ui/react";
import { FC } from "react";
import { AiOutlineRight } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineLogout } from "react-icons/md";

interface MyComponentProps {
  onClose: () => void;
  onLogout: () => void;
}

const LoginHeaderProfile: FC<MyComponentProps> = ({ onLogout }) => {
  // Add your component logic and JSX here

  return (
    <Stack w={"full"}>
      <Box
        display={"flex"}
        p={1}
        alignItems={"center"}
        justifyContent={"space-between"}
        _hover={{ bg: "gray.50" }}
        cursor={"pointer"}
      >
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
          gap={5}
        >
          <Icon
            as={FaUserAlt}
            w={8}
            h={"8"}
            bg={"gray.100"}
            rounded={"full"}
            p={1.5}
          />
          <Text fontWeight={"semibold"}>Edit Profile</Text>
        </Box>
        <Icon
          as={AiOutlineRight}
          w={6}
          h={"6"}
          rounded={"full"}
          p={1.5}
          color={"gray.500"}
        />
      </Box>
      <Box
        display={"flex"}
        p={1}
        alignItems={"center"}
        justifyContent={"space-between"}
        _hover={{ bg: "gray.50" }}
        cursor={"pointer"}
      >
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
          gap={5}
        >
          <Icon
            as={IoSettingsOutline}
            w={8}
            h={"8"}
            bg={"gray.100"}
            rounded={"full"}
            p={1.5}
          />
          <Text fontWeight={"semibold"}>Setting</Text>
        </Box>
        <Icon
          as={AiOutlineRight}
          w={6}
          h={"6"}
          rounded={"full"}
          p={1.5}
          color={"gray.500"}
        />
      </Box>
      <Box
        display={"flex"}
        p={1}
        alignItems={"center"}
        justifyContent={"space-between"}
        _hover={{ bg: "gray.50" }}
        cursor={"pointer"}
        onClick={onLogout}
      >
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
          gap={5}
        >
          <Icon
            as={MdOutlineLogout}
            w={8}
            h={"8"}
            bg={"gray.100"}
            rounded={"full"}
            p={1.5}
          />
          <Text fontWeight={"semibold"} >
            Logout
          </Text>
        </Box>
        <Icon
          as={AiOutlineRight}
          w={6}
          h={"6"}
          rounded={"full"}
          p={1.5}
          color={"gray.500"}
        />
      </Box>
    </Stack>
  );
};

export default LoginHeaderProfile;
