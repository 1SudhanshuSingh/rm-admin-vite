import { FC } from 'react'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight, MdOutlineKeyboardDoubleArrowLeft, MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import {
    Box,
    Button,
    HStack,
    Input,
    Text,
} from "@chakra-ui/react";
import { Tooltip, Whisper } from "rsuite";


interface MyComponentProps {
    currentPage: number;
    totalPages: number | undefined;
    handlePageChange: (val: number) => void;
}

const CustomerPagination: FC<MyComponentProps> = ({ currentPage, totalPages, handlePageChange }) => {
    return (
        <HStack w={"full"} justifyContent={'space-between'} gap={0}>
            <HStack>
                <Text fontWeight={'semibold'} color={'gray.400'} fontSize={'sm'} >Total Page  : {totalPages}</Text>
            </HStack>
            <HStack>
                <Whisper placement="top" trigger="hover" speaker={<Tooltip>First page </Tooltip>}>
                    <Button
                        variant={"ghost"}
                        fontSize={"sm"}
                        fontWeight={"semibold"}
                        isDisabled={currentPage === 1 && true}
                        size={'xs'}
                        onClick={() =>
                            handlePageChange(
                                currentPage > 1 ? 1 : currentPage
                            )
                        }
                    >
                        <MdOutlineKeyboardDoubleArrowLeft />
                    </Button>
                </Whisper>
                <Whisper placement="top" trigger="hover" speaker={<Tooltip>Prev page </Tooltip>}>
                    <Button
                        variant={"ghost"}
                        fontSize={"sm"}
                        fontWeight={"semibold"}
                        isDisabled={currentPage === 1 && true}
                        size={'xs'}
                        onClick={() =>
                            handlePageChange(
                                currentPage > 1 ? currentPage - 1 : currentPage
                            )
                        }
                    >
                        <MdKeyboardArrowLeft />
                    </Button>
                </Whisper>
                <Box display={"flex"} gap={"3"} overflowX={"auto"}>
                    {Array.from(
                        { length: totalPages ?? 0 },
                        (_, index) => index + 1
                    )
                        .filter(
                            (page) =>
                                page === currentPage - 1 ||
                                page === currentPage ||
                                page === currentPage + 1
                        )
                        .map((page) => (
                            <Button
                                key={page}
                                variant={"ghost"}
                                rounded={"full"}
                                bgColor={page === currentPage ? "green.300" : "gray.200"}
                                size="xs"
                                onClick={() => handlePageChange(page)}
                                disabled={true}
                                _hover={{
                                    bg: `${page === currentPage ? "blackAlpha.600" : ""}`,
                                    shadow: `${page === currentPage ? "xl" : ""}`,
                                }}
                            >
                                {page}
                            </Button>
                        ))}
                </Box>
                <Whisper placement="top" trigger="hover" speaker={<Tooltip>Next page </Tooltip>}>
                    <Button
                        variant={"ghost"}
                        fontSize={"sm"}
                        fontWeight={"semibold"}
                        isDisabled={currentPage === totalPages && true}
                        size={'xs'}
                        onClick={() =>
                            handlePageChange(
                                currentPage < (totalPages || 0)
                                    ? currentPage + 1
                                    : currentPage
                            )
                        }
                    >
                        <MdKeyboardArrowRight />
                    </Button>
                </Whisper>
                <Whisper placement="top" trigger="hover" speaker={<Tooltip>Last page </Tooltip>}>
                    <Button
                        variant={"ghost"}
                        fontSize={"sm"}
                        fontWeight={"semibold"}
                        isDisabled={currentPage === totalPages && true}
                        size={'xs'}
                        onClick={() =>
                            handlePageChange(currentPage < (totalPages || 0) ? totalPages ?? 0 : currentPage)
                        }
                    >
                        <MdOutlineKeyboardDoubleArrowRight />
                    </Button>
                </Whisper>
                <Box>
                    <Text fontSize={'xs'} display={'inline-block'} mr={'2'}>
                        Go to
                    </Text>
                    <Input rounded={'md'} type={'number'} size={'xs'} width={12}
                        onBlur={(e) => {
                            handlePageChange(+e.target.value);
                            e.target.value = '';
                        }} />
                </Box>
            </HStack>
        </HStack>
    )
}

export default CustomerPagination