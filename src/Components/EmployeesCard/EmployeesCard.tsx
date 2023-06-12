import { Badge, Box, HStack, Heading, Icon, Image, Stack, Text } from '@chakra-ui/react'
import { useEffect, FC, useState } from 'react'
import { MdCall, MdMail } from 'react-icons/md';
import { UserData } from '../../Constant/Constant';
import { HiDotsHorizontal } from 'react-icons/hi';

import { Menu, MenuButton, MenuList, MenuItem, MenuDivider } from '@chakra-ui/react'



interface MyComponentProps {
    CreateuserArr: string[];
}

interface UserDataProps {
    _ID: string;
    name: string;
    userImage: string;
    Created_Date: string;
    Status: string;
    mobile_no: number;
    email: string;
}

const EmployeeCard: FC<MyComponentProps> = ({ CreateuserArr }) => {

    const [StatusOfEmployees, setStatusOfEmployees] = useState('')
    const [CompleteUserInfo, setCompleteUserInfo] = useState<UserDataProps[]>([]);

    const getUserInfoById = (id: string) => {
        return UserData.find((user) => user._ID === id);
    };

    useEffect(() => {
        const filteredUserArray = CreateuserArr.filter((id) => id !== undefined);
        const userInfoArray = filteredUserArray.map((id) => getUserInfoById(id)) as UserDataProps[];
        setCompleteUserInfo(userInfoArray);
    }, [CreateuserArr]);


    return (
        <>
            {CompleteUserInfo && CompleteUserInfo.map((user) => {
                return <>
                    <Stack bg={'white'} w={'64'} rounded={'xl'} position={'relative'} p={3} pt={5} key={user._ID} >
                        <Box display={'flex'} justifyContent={'center'} p={2} >
                            <Image
                                borderRadius='full'
                                boxSize='100px'
                                src={user?.userImage}
                                alt={user?.name}
                                objectFit={'cover'}
                                shadow={'lg'}
                            />
                            <Box position={'absolute'} display={'flex'} alignItems={'flex-start'} gap={1} justifyContent={'space-between'} w={'full'} px={2} top={2}>
                                <Badge variant='outline' colorScheme={StatusOfEmployees && StatusOfEmployees === "Active" ? "green" : 'red'}>
                                    {StatusOfEmployees}
                                </Badge>
                                <Menu closeOnSelect={false}  >
                                    <MenuButton>
                                        <Icon bg={'gray.50'} rounded={'2xl'} color={'gray.500'} cursor={'pointer'} as={HiDotsHorizontal} boxSize={6} />
                                    </MenuButton>
                                    <MenuList p={2} width={'40px'} >
                                        <MenuItem onClick={() => setStatusOfEmployees("Active")}>
                                            <Text fontWeight={'semibold'} fontSize={'sm'} >Active</Text>
                                        </MenuItem>
                                        <MenuDivider />
                                        <MenuItem onClick={() => setStatusOfEmployees("InActive")} >
                                            <Text fontWeight={'semibold'} fontSize={'sm'} >InActive</Text>
                                        </MenuItem>
                                    </MenuList>
                                </Menu>
                            </Box>
                        </Box>
                        <Heading size={'md'} textAlign={'center'} color={'gray.800'} textTransform={'capitalize'}>
                            {user?.name}
                        </Heading>

                        <Box bg={'green.50'} p={2} border='1px' borderColor='green.100'  >
                            <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
                                <Box>
                                    <Text color={'gray.400'} fontSize={'xs'} fontWeight={'semibold'} >Departement</Text>
                                    <Text color={'gray.600'} m={0} fontSize={'xs'} fontWeight={'semibold'} >{user?.Status === "Incomplete" ? "Design Team" : user?.Status === "Complete" ? "Frontend Team" : "Backend Team"}</Text>
                                </Box>
                                <Box>
                                    <Text color={'gray.400'} fontSize={'xs'} fontWeight={'semibold'} >Created Date</Text>
                                    <Text color={'gray.600'} fontSize={'xs'} fontWeight={'semibold'} m={0} >{user?.Created_Date}</Text>
                                </Box>
                            </Box>
                            <HStack mt={'2'} alignItems={'center'} fontSize={'sm'} color={'gray.600'} >
                                <Icon as={MdMail} />
                                <Text fontWeight={'semibold'}>{user?.email} </Text>
                            </HStack>
                            <HStack mt={'2'} alignItems={'center'} fontSize={'sm'} color={'gray.600'} >
                                <Icon as={MdCall} />
                                <Text fontWeight={'semibold'}>{user?.mobile_no} </Text>
                            </HStack>

                        </Box>
                    </Stack>
                </>
            })}

        </>
    )
}

export default EmployeeCard;