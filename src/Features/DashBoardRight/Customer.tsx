import {
    Box,
    Button,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
    Text,
    VStack,
} from "@chakra-ui/react";
import { useEffect, FC, useState, ElementType } from "react";
import SetterDrawer from "../../HOCs/SetterDrawer";
import { FaUsers } from "react-icons/fa";
import { BsHourglassSplit } from "react-icons/bs";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { RiRestartFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
// import { UserData } from '../../Constant/Constant';
// import CustomerTable from '../../Components/CustomerTable';
import { Search2Icon } from "@chakra-ui/icons";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { CustomerTableData } from "../../Components/Tables/CustomerTableData";
import { Tooltip, Whisper } from "rsuite";
import { IconType } from "react-icons";
import { useDispatch } from "react-redux";
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from "../../redux/rootReducers";
import { getCustomers } from "../../redux/customer/actions";
import { AnyAction } from "redux";
import CustomerPagination from "../../Components/Customer/Pagination";
import CustomerCard from "../../Components/Customer/CustomerCard";




interface MyComponentProps {
    verifyUser?: boolean;
}

export interface UserDataIF {
    jsonResponse: UserData[] | undefined;
    message: string;
    output?: number;
    status?: number;
}

export interface UserData {
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

export interface ScoreData {
    OS: number;
    P1: number;
    P2: number;
    P3: number;
    P4: number;
    P5: number;
    PP: number;
}
// type AppDispatch = ThunkDispatch<RootState, undefined, AnyAction>;
const Customers: FC<MyComponentProps> = ({ verifyUser }) => {
    const fetchCustomers = (
        fromDate: string,
        toDate: string
    ): Promise<UserDataIF> =>
        axios
            .post(`https://beta.royalmatrimonial.com/api/admin/getAllCustomers`, {
                fromDate,
                toDate,
            })
            .then((response: any) => response.data);

    const { data, isLoading, error } = useQuery({
        queryKey: ["Customers"],
        queryFn: () => fetchCustomers(fromDateVal, toDateVal),
    });

    // const Alldata = useSelector(selectAlldata);


    const [UserdataJson, setUserdataJson] = useState<UserDataIF | undefined>(
        undefined
    );

    const dispatch = useDispatch<ThunkDispatch<RootState, undefined, AnyAction>>();



    useEffect(() => {
        if (!isLoading) {
            setUserdataJson({
                jsonResponse: data?.jsonResponse,
                message: data?.message || "",
                output: data?.output,
                status: data?.status,
            });

        }
    }, [data, isLoading]);
    const fromDateVal = "2021-05-01T18:30:00.000Z";
    const toDateVal = new Date().toISOString();
    // const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const totalItems = UserdataJson?.jsonResponse?.length;
    const totalPages = totalItems && Math.ceil(totalItems / itemsPerPage);
    console.log(totalPages, 'totalPages');


    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    useEffect(() => {
        dispatch(getCustomers(fromDateVal, toDateVal));
        // dispatch(getCustomersRequest());
    }, [dispatch]);


    const currentItems =
        UserdataJson && UserdataJson?.jsonResponse?.slice(startIndex, endIndex);


    const CustomerCardData = [
        {
            BoxIcon: FaUsers,
            BoxColor: "blue.50",
            IconColor: "blue.500",
            NumberOFHeding: data?.jsonResponse?.length || 0,
            Main_Heading: "Total Customers",
            TooltipContent: `${data?.jsonResponse?.length || 0} number of customers who successfully registered.`,
        },
        {
            BoxIcon: BsHourglassSplit,
            BoxColor: "yellow.50",
            IconColor: "yellow.500",
            NumberOFHeding: data?.jsonResponse?.filter((item) => item.Score !== null && item.Score.OS <= 0.99 && item.Score.OS >= 0.01)
                .length || 0,
            Main_Heading: "Pending Profile",
            TooltipContent: "Customers whose overall score is between 0.01 and 0.99",
        },
        {
            BoxIcon: IoCheckmarkDoneCircleOutline,
            BoxColor: "green.50",
            IconColor: "green.500",
            NumberOFHeding: data?.jsonResponse?.filter((item) => item.Score !== null && item.Score.OS === 1)
                .length || 0,
            Main_Heading: "Completed Profile",
            TooltipContent: "The Complete Profile Of Customers Whose Overall Score Is 1",
        },
        {
            BoxIcon: RiRestartFill,
            BoxColor: "red.50",
            IconColor: "red.500",
            NumberOFHeding: data?.jsonResponse?.filter((item) => item.Score === null || item.Score.OS <= 0.1)
                .length || 0,
            Main_Heading: "Only Registrations",
            TooltipContent: "Customers Whose Overall Score is Below 0.1",
        },
    ]



    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const navigate = useNavigate();
    useEffect(() => {
        if (!verifyUser) {
            navigate("/");
        }
    }, [verifyUser, navigate]);

    const HandleSearchByName = (query: any) => {

        const searchData = data?.jsonResponse?.filter((user) =>
            user?.Name?.toLowerCase().includes(query.toLowerCase()) || user?.RMID?.toLowerCase().includes(query.toLowerCase()) || user.Mobile.toString().includes(query)
        );
        setCurrentPage(1);
        setUserdataJson({
            jsonResponse: searchData,
            message: data?.message || '',
            output: data?.output,
            status: data?.status
        });
    };

    const HandleDateRangeFilter = (val: [Date, Date]) => {
        const utcDates = val.map((date) => date.toISOString());
        const startDate = utcDates[0];
        const endDate = utcDates[1];

        const filteredData = data?.jsonResponse?.filter((user) => {
            const createdDate = user.User_CreatedDate;
            return createdDate >= startDate && createdDate <= endDate;
        });

        if (UserdataJson) {
            setUserdataJson({
                ...UserdataJson,
                jsonResponse: filteredData || UserdataJson.jsonResponse,
            });
        }
        setCurrentPage(1);
    };

    return (
        <>
            <VStack gap={4} w={"full"} height={"full"} overflowX={'hidden'}>
                <Box
                    display={"flex"}
                    flexDirection={"row"}
                    flexWrap={["wrap"]}
                    justifyContent={"space-between"}
                    w={"full"}
                    gap={[3, 1]}
                >
                    {CustomerCardData.map((card, i) => {
                        return (
                            <Whisper key={card.IconColor + i} followCursor placement={'auto'} preventOverflow={false} speaker={<Tooltip>{card.TooltipContent} </Tooltip>}>
                                <Button cursor={'default'} m={0} p={0} w={['45%', '-webkit-fit-content']} h={'-webkit-fit-content'} _hover={{
                                    bg: 'transparent',
                                    shaddow: 'none'
                                }} >
                                    <CustomerCard
                                        BoxIcon={card.BoxIcon as ElementType<any> | IconType}
                                        BoxColor={card.BoxColor}
                                        IconColor={card.IconColor}
                                        NumberOFHeding={card.NumberOFHeding}
                                        Main_Heading={card.Main_Heading}
                                    />
                                </Button>
                            </Whisper>
                        )
                    })}


                </Box>

                <Stack
                    display={"flex"}
                    alignItems={"baseline"}
                    flexDirection={"column"}
                    p={3}
                    pt={0}
                    rounded={"xl"}
                    bg={"white"}
                    w={"full"}
                    gap={[3, 4]}
                    scrollBehavior={"smooth"}
                    minH={"md"}
                >
                    <Stack
                        bg={"white"}
                        gap={4}
                        w={"full"}
                        pt={[0, 3]}
                        display={"flex"}
                        flexDirection={"row"}
                        justifyContent={"space-between"}
                        alignItems={"baseline"}
                    >
                        <Text
                            fontWeight={"semibold"}
                            fontSize={"sm"}
                            w={"-moz-fit-content"}
                            color={"gray.600"}
                        >
                            Total User {UserdataJson?.jsonResponse?.length}{" "}
                        </Text>
                        <InputGroup justifyContent={"flex-end"} width={"auto"}>
                            <Input
                                onChange={(e) => HandleSearchByName(e.target.value)}
                                placeholder="search by name"
                                px={1}
                                variant="flushed"
                                size="sm"
                                w={"44"}
                                color={"gray.700"}
                                fontWeight={"semibold"}
                            />
                            <InputRightElement
                                pointerEvents="none"
                                alignItems={"center"}
                                pb={2}
                            >
                                <Search2Icon color="gray.300" fontSize={"sm"} />
                            </InputRightElement>
                        </InputGroup>
                    </Stack>

                    <CustomerTableData
                        UserdataJson={currentItems}
                        HandleDateRangeFilter={HandleDateRangeFilter}
                        isloading={isLoading}
                        ApiError={error as string | null}
                    />

                    <CustomerPagination totalPages={totalPages} currentPage={currentPage} handlePageChange={handlePageChange} />

                </Stack>
            </VStack>
        </>
    );
};

export default SetterDrawer(Customers);
