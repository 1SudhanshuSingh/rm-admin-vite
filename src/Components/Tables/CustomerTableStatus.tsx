import { useState, FC } from 'react'
import { Box, HStack, Heading, Icon, Image, Text, useDisclosure } from '@chakra-ui/react'
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
} from '@chakra-ui/react'
import { HiDotsHorizontal } from 'react-icons/hi';
import { Menu, MenuButton, MenuList, MenuItem, MenuGroup, MenuDivider } from '@chakra-ui/react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import { AiFillEdit, AiOutlineDelete } from 'react-icons/ai';
import { GrView } from 'react-icons/gr';
import { MdArrowDropDown } from 'react-icons/md';
import DateRangePicker from 'rsuite/DateRangePicker';
import 'rsuite/styles/index.less';
import subDays from 'date-fns/subDays';
import startOfWeek from 'date-fns/startOfWeek';
import endOfWeek from 'date-fns/endOfWeek';
import addDays from 'date-fns/addDays';
import startOfMonth from 'date-fns/startOfMonth';
import endOfMonth from 'date-fns/endOfMonth';
import addMonths from 'date-fns/addMonths';
import Overlay from '../Overlay';

interface UserData {
    _ID: string;
    name: string;
    userImage: string;
    Created_Date: string;
    Status: string;
    mobile_no: number;
    email: string;
}

interface CustomerTableProps {
    UserdataJson: {
        _ID: string;
        name: string;
        userImage: string;
        Created_Date: string;
        Status: string;
        mobile_no: number;
        email: string;
    }[];
    HandleStatusFilter: (staus: string) => void;
    HandleDateRangeFilter: (val: [Date, Date]) => void;
}


type DateRange = [Date, Date];

interface Range {
    label: React.ReactNode;
    value: DateRange;
    closeOverlay?: boolean;
    placement?: 'bottom' | 'left';
}

const predefinedRanges: Range[] = [
    {
        label: 'Today',
        value: [new Date(), new Date()],
        closeOverlay: false,
        placement: 'left'
    },
    {
        label: 'Yesterday',
        value: [addDays(new Date(), -1), addDays(new Date(), -1)],
        closeOverlay: false,
        placement: 'left'
    },
    {
        label: 'This week',
        value: [startOfWeek(new Date()), endOfWeek(new Date())],
        closeOverlay: false,
        placement: 'left'
    },
    {
        label: 'Last 30 days',
        value: [subDays(new Date(), 29), new Date()],
        closeOverlay: false,
        placement: 'left'
    },
    {
        label: 'This month',
        value: [startOfMonth(new Date()), new Date()],
        closeOverlay: false,
        placement: 'left'
    },
    {
        label: 'Last month',
        value: [startOfMonth(addMonths(new Date(), -1)), endOfMonth(addMonths(new Date(), -1))],
        closeOverlay: false,
        placement: 'left'
    },
    {
        label: 'This year',
        value: [new Date(new Date().getFullYear(), 0, 1), new Date()],
        closeOverlay: false,
        placement: 'left'
    },
    {
        label: 'Last year',
        value: [new Date(new Date().getFullYear() - 1, 0, 1), new Date(new Date().getFullYear(), 0, 0)],
        closeOverlay: false,
        placement: 'left'
    },
    {
        label: 'All time',
        value: [new Date(new Date().getFullYear() - 1, 0, 1), new Date()],
        placement: 'left',
        closeOverlay: false,
    },
    {
        label: 'Last week',
        closeOverlay: false,
        placement: 'bottom',
        value: [new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 7), new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 1)]
    },
    // {
    //     label: 'Next week',
    //     closeOverlay: false,
    //     placement: 'bottom',
    //     value: [new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1), new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 7)]
    // }
];

const CustomerTable: FC<CustomerTableProps> = ({ UserdataJson, HandleStatusFilter, HandleDateRangeFilter }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isDatePickerOpen, setDatePickerOpen] = useState(false);
    const [SelectedUser, setSelectedUser] = useState<UserData | null>(null);
    const [filterDateValue, setfilterDateValue] = useState<[Date, Date] | null>()


    const HandleModalOpen = (id: string) => {
        const selectedUserData = UserdataJson.find(user => user._ID === id);
        if (selectedUserData) {
            setSelectedUser(selectedUserData);
            onOpen();
        }
    };

    const handleDateRangeChange = (value: [Date, Date]) => {
        HandleDateRangeFilter(value);
        setfilterDateValue(value);
        const utcDates = value.map(date => date.toISOString());
        console.log(utcDates, 'utcDates');

        setDatePickerOpen(false);
    };


    return (
        <TableContainer w={'full'} minH={'sm'}>
            <Table variant={'striped'} colorScheme={'blackAlpha'}  >
                <Thead bg={'gray.50'} >
                    <Tr>
                        <Th >_ID</Th>
                        <Th >Name</Th>
                        <Th isNumeric>Mobile No</Th>
                        <Th >Email</Th>
                        <Th cursor={'pointer'} onClick={() => setDatePickerOpen(true)}>Created Date
                            <Icon
                                bg={'gray.50'}
                                rounded={'2xl'}
                                color={'gray.500'}
                                as={MdArrowDropDown}
                                boxSize={5}
                            />
                            {isDatePickerOpen && (
                                <Overlay>
                                    <DateRangePicker
                                        placement={'bottomEnd'}
                                        ranges={predefinedRanges}
                                        showOneCalendar
                                        onOk={handleDateRangeChange}
                                        size="xs"
                                        onChange={setfilterDateValue}
                                        value={filterDateValue}
                                        placeholder="Select Range To Filter"
                                        style={{
                                            visibility: 'hidden',
                                            position: 'absolute',
                                            left: "50%",
                                            top: "20%",
                                            transform: "translateX(-50%),translateY(-50%)",
                                            zIndex: '12'
                                        }}
                                        defaultOpen
                                        onClose={() => setDatePickerOpen(false)}
                                    />
                                </Overlay>

                            )}</Th>
                        <Th >
                            Status
                            <Menu closeOnSelect={true} >
                                <MenuButton>
                                    <Icon bg={'gray.50'} rounded={'2xl'} color={'gray.500'} cursor={'pointer'} as={MdArrowDropDown} boxSize={5} />
                                </MenuButton>
                                <MenuList p={2}>
                                    <MenuGroup title='Filter By'  >
                                        <MenuItem onClick={() => HandleStatusFilter("Complete")} >
                                            <Text fontWeight={'semibold'} fontSize={'sm'} >Complete</Text>
                                        </MenuItem>
                                        <MenuItem onClick={() => HandleStatusFilter("Incomplete")}>
                                            <Text fontWeight={'semibold'} fontSize={'sm'} >Incomplete</Text>
                                        </MenuItem>
                                        <MenuItem onClick={() => HandleStatusFilter("Registration")}>
                                            <Text fontWeight={'semibold'} fontSize={'sm'} >Registration</Text>
                                        </MenuItem>
                                        <MenuItem onClick={() => HandleStatusFilter("removefilter")}>
                                            <Text fontWeight={'semibold'} fontSize={'sm'} >Remove Filter</Text>
                                        </MenuItem>
                                    </MenuGroup>
                                </MenuList>
                            </Menu>  </Th>
                        <Th >Action</Th>
                    </Tr>
                </Thead>
                <Tbody position={'relative'} >
                    {UserdataJson.map((user, i) => {
                        return <>
                            <Tr key={`${i}${user._ID}`}>
                                <Td>{user._ID} </Td>
                                <Td display={'flex'} gap={1} alignItems={'center'}  > <Image
                                    borderRadius='full'
                                    boxSize='30px'
                                    src={user.userImage}
                                    alt={user.name}
                                /> {user.name}</Td>
                                <Td isNumeric>{user.mobile_no} </Td>
                                <Td >{user.email}</Td>
                                <Td >{user.Created_Date}</Td>
                                <Td > <Text py={1} px={2} bg={user.Status === "Complete" ? 'green.50' : user.Status === "Incomplete" ? 'yellow.100' : 'red.100'} rounded={'lg'} fontWeight={'semibold'} fontSize={'md'} textAlign={'center'} color={user.Status === "Complete" ? 'green.500' : user.Status === "Incomplete" ? 'yellow.500' : 'red.500'} >{user.Status}</Text> </Td>
                                <Td >
                                    <Menu closeOnSelect={false}>
                                        <MenuButton>
                                            <Icon bg={'gray.50'} rounded={'2xl'} color={'gray.500'} cursor={'pointer'} as={HiDotsHorizontal} boxSize={6} />
                                        </MenuButton>
                                        <MenuList p={2}>
                                            <MenuGroup title='Profile'>
                                                <HStack px={5}>
                                                    <Image
                                                        boxSize='2rem'
                                                        borderRadius='full'
                                                        src={user.userImage}
                                                        alt='Fluffybuns the destroyer'
                                                        mr='12px'
                                                    />
                                                    <span>{user.name}</span>
                                                </HStack>
                                            </MenuGroup>
                                            <MenuDivider />
                                            <MenuItem >
                                                <Icon mr={'2'} color={'gray.500'} cursor={'pointer'} as={AiFillEdit} />
                                                <Text fontWeight={'semibold'} fontSize={'sm'} >Edit</Text>
                                            </MenuItem>
                                            <MenuItem >
                                                <Icon mr={'2'} color={'gray.500'} cursor={'pointer'} as={AiOutlineDelete} />
                                                <Text fontWeight={'semibold'} fontSize={'sm'} >Delete</Text>
                                            </MenuItem>
                                            <MenuItem onClick={() => HandleModalOpen(`${user._ID}`)} >
                                                <Icon mr={'2'} color={'gray.500'} cursor={'pointer'} as={GrView} />
                                                <Text fontWeight={'semibold'} fontSize={'sm'} >View</Text>
                                            </MenuItem>
                                        </MenuList>
                                    </Menu>
                                </Td>
                            </Tr >
                        </>
                    })}
                </Tbody>
            </Table>
            {
                SelectedUser && <Modal closeOnOverlayClick={false} onClose={onClose} isOpen={isOpen} isCentered>
                    <ModalOverlay
                        bg='blackAlpha.300'
                        backdropFilter='blur(10px) hue-rotate(90deg)'
                    />
                    <ModalContent>
                        <ModalHeader>Customer Details</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                            <Box display={'flex'} flexDirection={['column', 'row']} alignItems={['center']} gap={[3]}>
                                <Box>
                                    <Image src={SelectedUser.userImage} alt={SelectedUser.name} h={44} w={44} />
                                </Box>
                                <Box p={3} pt={1} alignItems={'flex-end'} textAlign={'right'}>
                                    <Heading color={'gray.600'} mb={'4'} fontSize={'xl'} >{SelectedUser.name}</Heading>
                                    <Text>{SelectedUser.email} </Text>
                                    <Text>{SelectedUser.mobile_no} </Text>
                                    <Text>{SelectedUser.Status} </Text>
                                </Box>
                            </Box>
                        </ModalBody>
                    </ModalContent>
                </Modal>
            }
        </TableContainer >
    )
}

export default CustomerTable