import { Table, Pagination, Popover, Dropdown, Whisper, IconButton } from 'rsuite';
import { UserData } from '../../Constant/Constant';
import { useCallback, useState } from 'react';
import { HiDotsHorizontal } from 'react-icons/hi';
import { Box, InputGroup, InputRightElement, Stack, Text, Input, Icon } from '@chakra-ui/react';
import { Search2Icon } from '@chakra-ui/icons';
import { AiFillEdit, AiOutlineDelete } from 'react-icons/ai';
import { GrView } from 'react-icons/gr';


const { Column, HeaderCell, Cell } = Table;
const defaultData = UserData;
interface User {
    _ID: string;
    name: string;
    userImage: string;
    Created_Date: string;
    Status: string;
    mobile_no: number;
    email: string;
}
type RenderMenuProps = {
    onClose: () => void;
    className: string;
};

interface ActionCellProps {
    rowData?: User;
    dataKey: string;
}
export const TableD = () => {
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);

    const handleChangeLimit = (dataKey: number) => {
        setPage(1);
        setLimit(dataKey);
    };

    const data = defaultData.filter((_, i) => {
        const start = limit * (page - 1);
        const end = start + limit;
        return i >= start && i < end;
    });

    const ImageCell = ({ rowData, dataKey, ...props }: any) => (
        <Cell {...props} style={{ padding: 0 }}>
            <div
                style={{
                    width: 40,
                    height: 40,
                    background: '#f5f5f5',
                    borderRadius: "50%",
                    marginTop: 2,
                    overflow: 'hidden',
                    display: 'inline-block'
                }}
            >
                <img src={rowData[dataKey]} alt={rowData.name} width="40" />
            </div>
        </Cell>
    );

    const renderMenu = ({ onClose, className }: RenderMenuProps, ref: React.Ref<HTMLDivElement>) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const handleSelect = (eventKey: string | undefined, _event: React.SyntheticEvent<Element, Event>) => {
            onClose();
            console.log(eventKey);
        };
        return (
            <Popover ref={ref} className={className} full>
                <Dropdown.Menu onSelect={handleSelect}>
                    <Dropdown.Item eventKey={1}>
                        <Box display={'flex'} alignItems={'center'} >
                            <Icon mr={'2'} color={'gray.500'} cursor={'pointer'} as={AiFillEdit} />
                            <Text fontWeight={'semibold'} fontSize={'sm'} >Edit</Text>
                        </Box>
                    </Dropdown.Item>
                    <Dropdown.Item eventKey={2}>
                        <Box display={'flex'} alignItems={'center'} >
                            <Icon mr={'2'} color={'gray.500'} cursor={'pointer'} as={AiOutlineDelete} />
                            <Text fontWeight={'semibold'} fontSize={'sm'} >Delete</Text>
                        </Box>
                    </Dropdown.Item>
                    <Dropdown.Item eventKey={3}>
                        <Box display={'flex'} alignItems={'center'} >
                            <Icon mr={'2'} color={'gray.500'} cursor={'pointer'} as={GrView} />
                            <Text fontWeight={'semibold'} fontSize={'sm'} >View</Text>
                        </Box>
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Popover>
        );
    };

    const ActionCell = ({ rowData, ...props }: ActionCellProps) => {
        const renderMenuWrapper = useCallback(
            ({ onClose, className }: RenderMenuProps, ref: React.Ref<HTMLDivElement>) =>
                renderMenu({ onClose, className }, ref),
            []
        );

        return (
            <Cell {...props} className="link-group">
                <Whisper placement="autoVerticalEnd" trigger="click" speaker={renderMenuWrapper}>
                    <IconButton appearance="subtle" icon={<HiDotsHorizontal />} />
                </Whisper>
            </Cell>
        );
    };



    return (
        <Box bg={'white'} rounded={'lg'} >
            <Stack bg={'white'} gap={4} w={'full'} px={3} pt={[0, 3]} display={'flex'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'baseline'} mb={5} >
                <Text fontWeight={'semibold'} fontSize={'sm'} w={'-moz-fit-content'} color={'gray.600'} >Total User {data.length} </Text>
                <InputGroup justifyContent={'flex-end'} width={'auto'}>
                    <Input onChange={(e) => console.log(e.target.value)} placeholder='search by name' px={1} variant='flushed' size='sm' w={'44'} color={'gray.700'} fontWeight={'semibold'} />
                    <InputRightElement pointerEvents='none' alignItems={'center'} pb={2}>
                        <Search2Icon color='gray.300' fontSize={'sm'} />
                    </InputRightElement>
                </InputGroup>
            </Stack>
            <Table hover={false} height={500} data={data}>
                <Column width={100} align="center" fixed>
                    <HeaderCell>Id</HeaderCell>
                    <Cell dataKey="_ID" />
                </Column>

                <Column width={100} align="center">
                    <HeaderCell>Avartar</HeaderCell>
                    <ImageCell dataKey="userImage" />
                </Column>

                <Column width={140}>
                    <HeaderCell>Name</HeaderCell>
                    <Cell dataKey="name" />
                </Column>

                <Column width={100}>
                    <HeaderCell>Phone Number</HeaderCell>
                    <Cell dataKey="mobile_no" />
                </Column>
                <Column width={230} >
                    <HeaderCell>Email</HeaderCell>
                    <Cell dataKey="email" />
                </Column>
                <Column width={100} >
                    <HeaderCell>Created Date</HeaderCell>
                    <Cell dataKey="Created_Date" />
                </Column>
                <Column width={100}>
                    <HeaderCell>Status</HeaderCell>
                    <Cell dataKey="Status" />
                </Column>
                <Column width={100}>
                    <HeaderCell>
                        Action
                    </HeaderCell>
                    <ActionCell dataKey="id" />
                </Column>
            </Table>
            <div style={{ padding: 20 }}>
                <Pagination
                    prev
                    next
                    first
                    last
                    ellipsis
                    boundaryLinks
                    maxButtons={5}
                    size="xs"
                    layout={['total', '-', 'limit', '|', 'pager', 'skip']}
                    total={defaultData.length}
                    limitOptions={[10, 30, 50]}
                    limit={limit}
                    activePage={page}
                    onChangePage={setPage}
                    onChangeLimit={handleChangeLimit}
                />
            </div>
        </Box>
    );
};
