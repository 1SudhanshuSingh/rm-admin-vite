import { useState, FC, useEffect } from "react";
import {
    Badge,
    Box,
    HStack,
    Heading,
    Icon,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
} from "@chakra-ui/react";
import { HiDotsHorizontal } from "react-icons/hi";
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuGroup,
    MenuDivider,
} from "@chakra-ui/react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
} from "@chakra-ui/react";
import { AiFillEdit, AiOutlineDelete } from "react-icons/ai";
import { GrView } from "react-icons/gr";
import { MdArrowDropDown } from "react-icons/md";
import DateRangePicker from "rsuite/DateRangePicker";
import "rsuite/styles/index.less";
import subDays from "date-fns/subDays";
import addDays from "date-fns/addDays";
import startOfMonth from "date-fns/startOfMonth";
import endOfMonth from "date-fns/endOfMonth";
import addMonths from "date-fns/addMonths";
import Overlay from "../Overlay";
import { Loader, Placeholder } from "rsuite";
import { findKeyByValue } from "../../utils/findEnums";
import { PackageType } from "../../Constant/enums";

interface UserData {
    Name: string | null;
    RMID: string;
    RowID: number;
    Score: ScoreData | null;
    Mobile: number;
    User_ID: number;
    PackageID: number;
    Package_Endate: string | null;
    user_last_login: string | null;
    User_CreatedDate: string;
}

interface ScoreData {
    OS: number;
    P1: number;
    P2: number;
    P3: number;
    P4: number;
    P5: number;
    PP: number;
}
interface CustomerTableDataProps {
    UserdataJson: UserData[] | undefined;
    HandleDateRangeFilter: (val: [Date, Date]) => void;
    isloading: boolean;
    ApiError: null | string;
}

type DateRange = [Date, Date];

interface Range {
    label: React.ReactNode;
    value: DateRange;
    closeOverlay?: boolean;
    placement?: "bottom" | "left";
}

const startOfDay = new Date();
startOfDay.setHours(0, 0, 0, 0);

const predefinedRanges: Range[] = [
    {
        label: "Today",
        value: [startOfDay, new Date()],
        closeOverlay: false,
        placement: "left",
    },
    {
        label: "Yesterday",
        value: [addDays(new Date(), -1), addDays(new Date(), -1)],
        closeOverlay: false,
        placement: "left",
    },
    {
        label: "Last 30 days",
        value: [subDays(new Date(), 29), new Date()],
        closeOverlay: false,
        placement: "left",
    },
    {
        label: "This month",
        value: [startOfMonth(new Date()), new Date()],
        closeOverlay: false,
        placement: "left",
    },
    {
        label: "Last month",
        value: [
            startOfMonth(addMonths(new Date(), -1)),
            endOfMonth(addMonths(new Date(), -1)),
        ],
        closeOverlay: false,
        placement: "left",
    },
    {
        label: "This year",
        value: [new Date(new Date().getFullYear(), 0, 1), new Date()],
        closeOverlay: false,
        placement: "left",
    },
    {
        label: "Last year",
        value: [
            new Date(new Date().getFullYear() - 1, 0, 1),
            new Date(new Date().getFullYear(), 0, 0),
        ],
        closeOverlay: false,
        placement: "left",
    },
    {
        label: "All time",
        value: [new Date(new Date().getFullYear() - 1, 0, 1), new Date()],
        placement: "left",
        closeOverlay: false,
    },
    {
        label: "Last week",
        closeOverlay: false,
        placement: "bottom",
        value: [
            new Date(
                new Date().getFullYear(),
                new Date().getMonth(),
                new Date().getDate() - 7
            ),
            new Date(
                new Date().getFullYear(),
                new Date().getMonth(),
                new Date().getDate() - 1
            ),
        ],
    },
    // {
    //     label: 'Next week',
    //     closeOverlay: false,
    //     placement: 'bottom',
    //     value: [new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1), new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 7)]
    // }
];
export const CustomerTableData: FC<CustomerTableDataProps> = ({
    UserdataJson,
    HandleDateRangeFilter,
    isloading,
}) => {
    const [allUserData, setAllUserData] = useState<UserData[] | undefined>(
        UserdataJson
    );
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isDatePickerOpen, setDatePickerOpen] = useState(false);
    const [SelectedUser, setSelectedUser] = useState<UserData | null>(null);
    const [filterDateValue, setfilterDateValue] = useState<[Date, Date] | null>();
    useEffect(() => {
        setAllUserData(UserdataJson);
    }, [UserdataJson, isloading]);

    const HandleModalOpen = (id: any) => {
        const selectedUserData =
            allUserData && allUserData?.find((user: UserData) => user.User_ID === id);
        if (selectedUserData) {
            setSelectedUser(selectedUserData);
            onOpen();
        }
    };
    const handleDateRangeChange = (value: [Date, Date]) => {
        HandleDateRangeFilter(value);
        setfilterDateValue(value);
        setDatePickerOpen(false);
    };

    const packageType = findKeyByValue(SelectedUser?.PackageID, PackageType);
    return (
        <TableContainer w={"full"} minH={"sm"}>
            <Table size={'sm'} colorScheme={"blackAlpha"}>
                <Thead bg={"gray.50"}>
                    <Tr>
                        <Th>_ID</Th>
                        <Th>RM_ID</Th>
                        <Th>Name</Th>
                        <Th isNumeric>Mobile No</Th>
                        <Th >Package id</Th>
                        <Th cursor={"pointer"} onClick={() => setDatePickerOpen(true)}>
                            Created Date
                            <Icon
                                bg={"gray.50"}
                                rounded={"2xl"}
                                color={"gray.500"}
                                as={MdArrowDropDown}
                                boxSize={5}
                            />
                            {isDatePickerOpen && (
                                <Overlay>
                                    <DateRangePicker
                                        placement={"bottomEnd"}
                                        ranges={predefinedRanges}
                                        showOneCalendar
                                        onOk={handleDateRangeChange}
                                        size="xs"
                                        onChange={setfilterDateValue}
                                        value={filterDateValue}
                                        placeholder="Select Range To Filter"
                                        style={{
                                            visibility: "hidden",
                                            position: "absolute",
                                            left: "50vw",
                                            top: "50vh",
                                            transform: "translateX(-50vw),translateY(-50vh)",
                                            zIndex: "12",
                                        }}
                                        defaultOpen
                                        onClose={() => setDatePickerOpen(false)}
                                    />
                                </Overlay>
                            )}
                        </Th>
                        <Th> ped</Th>
                        <Th >p1</Th>
                        <Th >p2</Th>
                        <Th >p3</Th>
                        <Th >p4</Th>
                        <Th >p5</Th>
                        <Th >pp</Th>
                        <Th textAlign={'center'}>os</Th>
                        <Th>Action</Th>
                    </Tr>
                </Thead>
                <Tbody >
                    {isloading && (
                        <Tr>
                            <Td colSpan={8} textAlign="center">
                                <Placeholder.Paragraph rows={8} />
                                <Loader backdrop content="Loading..." vertical />
                            </Td>
                        </Tr>
                    )}
                    {allUserData &&
                        allUserData?.map((user: UserData, i: number) => {
                            return (
                                <>
                                    <Tr letterSpacing={1} key={`${i}${user.User_ID}${user.RMID}`}>
                                        <Td>{user.User_ID} </Td>
                                        <Td>{user.RMID} </Td>
                                        <Td>{`${user.Name ? user.Name : "NA"}`}</Td>
                                        <Td >{user.Mobile && (
                                            <>
                                                {'X'.repeat(7)}{user.Mobile.toString().slice(7)}
                                            </>
                                        )} </Td>
                                        <Td textAlign={'center'}>{findKeyByValue(user?.PackageID, PackageType)} </Td>
                                        <Td>
                                            {new Date(user.User_CreatedDate).toLocaleDateString()}
                                        </Td>
                                        <Td textAlign={'center'}>{user.Package_Endate ? new Date(user.Package_Endate).toLocaleDateString() : 'Free'} </Td>
                                        <Td >{user.Score?.P1 ? user.Score.P1 * 100 : '0'}%</Td>
                                        <Td >{user.Score?.P2 ? user.Score.P2 * 100 : '0'}%</Td>
                                        <Td >{user.Score?.P3 ? user.Score.P3 * 100 : '0'}%</Td>
                                        <Td >{user.Score?.P4 ? user.Score.P4 * 100 : '0'}%</Td>
                                        <Td >{user.Score?.P5 ? user.Score.P5 * 100 : '0'}%</Td>
                                        <Td >{user.Score?.PP ? user.Score.PP * 100 : '0'}%</Td>
                                        {/* <Td>{user.Score?.OS ? user.Score.OS * 100 : '0'}%</Td> */}
                                        <Td textAlign={'right'}><Badge colorScheme={user && (user?.Score?.OS === 1 ? "green" : user.Score?.OS && user?.Score?.OS > 0.1 ? 'yellow' : 'red')} >
                                            {user && (user?.Score?.OS === 1 ? "Complete" : user.Score?.OS && user?.Score?.OS > 0.1 ? 'pending' : 'Incomplete')}
                                        </Badge></Td>
                                        <Td>
                                            <Menu closeOnSelect={false}>
                                                <MenuButton>
                                                    <Icon
                                                        bg={"gray.50"}
                                                        rounded={"2xl"}
                                                        color={"gray.500"}
                                                        cursor={"pointer"}
                                                        as={HiDotsHorizontal}
                                                        boxSize={6}
                                                    />
                                                </MenuButton>
                                                <MenuList p={2}>
                                                    <MenuGroup title="Profile">
                                                        <HStack px={5}>
                                                            <span>{user.Name}</span>
                                                        </HStack>
                                                    </MenuGroup>
                                                    <MenuDivider />
                                                    <MenuItem>
                                                        <Icon
                                                            mr={"2"}
                                                            color={"gray.500"}
                                                            cursor={"pointer"}
                                                            as={AiFillEdit}
                                                        />
                                                        <Text fontWeight={"semibold"} fontSize={"sm"}>
                                                            Edit
                                                        </Text>
                                                    </MenuItem>
                                                    <MenuItem>
                                                        <Icon
                                                            mr={"2"}
                                                            color={"gray.500"}
                                                            cursor={"pointer"}
                                                            as={AiOutlineDelete}
                                                        />
                                                        <Text fontWeight={"semibold"} fontSize={"sm"}>
                                                            Delete
                                                        </Text>
                                                    </MenuItem>
                                                    <MenuItem
                                                        onClick={() => HandleModalOpen(user.User_ID)}
                                                    >
                                                        <Icon
                                                            mr={"2"}
                                                            color={"gray.500"}
                                                            cursor={"pointer"}
                                                            as={GrView}
                                                        />
                                                        <Text fontWeight={"semibold"} fontSize={"sm"}>
                                                            View
                                                        </Text>
                                                    </MenuItem>
                                                </MenuList>
                                            </Menu>
                                        </Td>
                                    </Tr >
                                </>
                            );
                        })}
                </Tbody>
            </Table >
            {
                SelectedUser && (
                    <Modal
                        closeOnOverlayClick={false}
                        onClose={onClose}
                        isOpen={isOpen}
                        isCentered
                    >
                        <ModalOverlay
                            bg="blackAlpha.300"
                            backdropFilter="blur(10px) hue-rotate(90deg)"
                        />
                        <ModalContent>
                            <ModalHeader>Customer Details</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody pb={6}>
                                <Box
                                    display={"flex"}
                                    flexDirection={["column", "row"]}
                                    alignItems={["center"]}
                                    gap={[3]}
                                >
                                    <Box p={3} pt={1} alignItems={"flex-start"} textAlign={"left"}>
                                        <Heading color={"gray.600"} mb={"4"} fontSize={"xl"}>
                                            {SelectedUser.Name}
                                            <span color={"gray.400"}> ({SelectedUser.RMID})</span>
                                        </Heading>
                                        <Text>Phone No: {SelectedUser.Mobile && (<>{'X'.repeat(7)}{SelectedUser.Mobile.toString().slice(7)}</>)} </Text>
                                        <Text>User Created: {SelectedUser.User_CreatedDate} </Text>
                                        <Text>
                                            Package Type: <b>{packageType}</b>
                                        </Text>
                                        <Text>
                                            User Last Login:{" "}
                                            {SelectedUser.user_last_login ??
                                                SelectedUser.User_CreatedDate}
                                        </Text>
                                        <Text>
                                            Overall Score: <b>{(SelectedUser.Score?.OS || 0) * 100}%</b>
                                        </Text>
                                    </Box>
                                </Box>
                            </ModalBody>
                        </ModalContent>
                    </Modal>
                )
            }
        </TableContainer >
    );
};
