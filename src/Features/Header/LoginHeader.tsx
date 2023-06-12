import React, { useState } from "react";
import {
  HStack,
  VStack,
  Avatar,
  WrapItem,
  Text,
  Icon,
  useDisclosure,
  Box,
} from "@chakra-ui/react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
} from "@chakra-ui/react";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";

import { AiOutlineBars, AiOutlineBell } from "react-icons/ai";
import DashBoardLeft from "../DashBoard/DashBoardLeft";
import { Badge, Loader } from "rsuite";
import LoginHeaderProfile from "./HeaderProfile";
import Notifications from "./Notifications";

interface LoginHeaderProps {
  onLogout: () => void;
}
const LoginHeader: React.FC<LoginHeaderProps> = ({ onLogout }) => {
  const [badgeContentNotificaton, setBadgeContentNotificaton] = useState(true);
  const {
    isOpen: isDrawerOpen,
    onOpen: onDrawerOpen,
    onClose: onDrawerClose,
  } = useDisclosure();
  const {
    onOpen: onOpenProfile,
    onClose: onCloseProfile,
    isOpen: isOpenProfile,
  } = useDisclosure();
  const {
    onOpen: onOpenNotification,
    onClose: onCloseNotification,
    isOpen: isOpenNotification,
  } = useDisclosure();
  const [loading, setLoading] = useState(true);
  const [loadingNotification, setLoadingNotification] = useState(true);

  const LoadingProfile = () => {
    setTimeout(() => setLoading(false), 1000);
  };
  const LoadingNotifications = () => {
    setTimeout(() => setLoadingNotification(false), 1000);
    setBadgeContentNotificaton(false)
  };

  return (
    <HStack
      px={{ base: 4, md: 14 }}
      height={"20"}
      justifyContent={"space-between"}
    >
      <Icon
        as={AiOutlineBars}
        display={["block", "none"]}
        onClick={onDrawerOpen}
        w={8}
        h={"8"}
        color="red.500"
        bg="gray.50"
        rounded={"full"}
        p={1.5}
        cursor={"pointer"}
      />
      <Drawer
        placement="left"
        onClose={onDrawerClose}
        isOpen={isDrawerOpen}
        size={"xs"}
      >
        <DrawerOverlay />
        <DrawerContent w={"62% !important"}>
          <DrawerHeader borderBottomWidth="1px" py={4}>
            <img
              src="https://beta.royalmatrimonial.com/Images/Royal-Logo.png"
              width={"150px"}
              alt="logo_image"
            />
          </DrawerHeader>
          <DrawerCloseButton />
          <DrawerBody p={0} bg={"#f0eff3"}>
            <DashBoardLeft />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <VStack display={["none", "block"]}>
        <img
          src="https://beta.royalmatrimonial.com/Images/Royal-Logo.png"
          alt="logo_image"
        />
      </VStack>
      <HStack>
        <Popover
          // placement="top-start"
          isOpen={isOpenNotification}
          onOpen={onOpenNotification}
          onClose={onCloseNotification}>
          <PopoverTrigger>
            <WrapItem
              onClick={LoadingNotifications}
              display={"flex"}
              gap={"2"}
              alignItems={"center"}
              color={"red.400"}
              fontWeight={"semibold"}
              p={"1.5"}
              _hover={{ bg: "gray.50" }}
              rounded={"md"}
              cursor={"pointer"}
            >
              <Badge content={badgeContentNotificaton}>
                <Icon
                  as={AiOutlineBell}
                  w={8}
                  h={"8"}
                  color="red.500"
                  _hover={{ bg: "gray.50" }}
                  rounded={"full"}
                  p={1.5}
                  cursor={"pointer"}
                />
              </Badge>
            </WrapItem>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton border={'1px'} borderColor={'gray.100'} rounded={'md'} color={'gray.500'} fontWeight={'semibold'} />
            {loadingNotification ? (
              <HStack
                justifyContent={"center"}
                alignItems={"center"}
                minH={"44"}
              >
                <Loader content="Loading..." />
              </HStack>
            ) : (
              <>
                <PopoverHeader  ><Notifications /> </PopoverHeader>
              </>
            )}
          </PopoverContent>
        </Popover>
        <Popover
          placement="top-start"
          isOpen={isOpenProfile}
          onOpen={onOpenProfile}
          onClose={onCloseProfile}
        >
          <PopoverTrigger>
            <WrapItem
              onClick={LoadingProfile}
              display={"flex"}
              gap={"2"}
              alignItems={"center"}
              color={"red.400"}
              fontWeight={"semibold"}
              p={"1.5"}
              _hover={{ bg: "gray.50" }}
              rounded={"md"}
              cursor={"pointer"}
            >
              <Text fontSize="sm" display={["none", "inline"]}>
                RM Admin
              </Text>
              <Avatar
                name="RM Admin"
                size={"sm"}
                src="https://beta.royalmatrimonial.com/Images/Royal-Logo.png"
              />
            </WrapItem>
          </PopoverTrigger>
          <PopoverContent width={["250px", "xs"]} outline={"none"}>
            {loading ? (
              <HStack
                justifyContent={"center"}
                alignItems={"center"}
                minH={"20"}
              >
                <Loader content="Loading..." />
              </HStack>
            ) : (
              <>
                <PopoverHeader fontWeight="semibold">
                  <Box
                    display={"flex"}
                    flexDir={"row"}
                    alignItems={"center"}
                    gap={"2"}
                  >
                    <Avatar
                      name="RM Admin"
                      size={"md"}
                      src="https://bit.ly/dan-abramov.."
                    />
                    <Text> RM Admin</Text>
                  </Box>
                </PopoverHeader>
                <PopoverArrow />
                <PopoverCloseButton border={'1px'} borderColor={'gray.100'} rounded={'md'} color={'gray.500'} fontWeight={'semibold'} />
                <PopoverBody>
                  <LoginHeaderProfile
                    onClose={onCloseProfile}
                    onLogout={onLogout}
                  />
                </PopoverBody>
              </>
            )}
          </PopoverContent>
        </Popover>
      </HStack>
    </HStack>
  );
};

export default LoginHeader;
