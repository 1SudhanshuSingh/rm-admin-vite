import { Box, Container, Text, VStack } from '@chakra-ui/react'
import { FC, useState } from 'react'
import { BsPersonLinesFill } from "react-icons/bs"
import { AiOutlineHome, } from "react-icons/ai"
import { HiUserGroup } from "react-icons/hi"
import { NavLink } from 'react-router-dom'
import { MdOutlineErrorOutline } from 'react-icons/md'

interface DashBoardLeftProps {
    nextPage?: (a: number) => void;
}

const DashBoardLeft: FC<DashBoardLeftProps> = () => {

    const [isActive, setisActive] = useState<string>(window.location.pathname.split("/")[1]);
    const links = [
        {
            title: 'Dashboard',
            links: [
                {
                    name: 'dashboard',
                    icon: <AiOutlineHome />,
                },
            ],
        },

        {
            title: 'Pages',
            links: [
                {
                    name: 'employees',
                    icon: <BsPersonLinesFill />,
                },
                {
                    name: 'customers',
                    icon: <HiUserGroup />,
                },
                {
                    name: 'errors',
                    icon: <MdOutlineErrorOutline />,
                },
            ],
        },
    ]





    return (
        <Container m={0} >
            <Box >
                {links.map((item) => (
                    <div key={item.title}>
                        <Text color='gray.400' my={4} textTransform={"uppercase"}>
                            {item.title}
                        </Text>
                        <VStack gap={1} justifyContent={"flex-start"} alignItems={"baseline"}>
                            {item.links.map((link) => (
                                <NavLink
                                    to={`/admin/${link.name}`}
                                    key={link.name}
                                    style={{
                                        backgroundColor: isActive === link.name ? "white" : '',
                                        boxShadow: isActive === link.name ? '2xl' : '',
                                        display: "flex",
                                        gap: "10px",
                                        textAlign: "left",
                                        alignItems: "center",
                                        textTransform: "capitalize",
                                        padding: "0.4rem",
                                        paddingLeft: "2rem",
                                        justifyContent:'flex-start',
                                        width: "-webkit-fill-available",
                                        borderRadius: "7px",
                                    }}
                                    onClick={() => setisActive(link.name)}
                                >
                                    {link.icon}
                                    <span >{link.name}</span>
                                </NavLink>
                            ))}
                        </VStack>
                    </div>
                ))}
            </Box>
        </Container>
    )
}

export default DashBoardLeft