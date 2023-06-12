import { Box, HStack, Heading, } from '@chakra-ui/react'
import { useEffect, FC } from 'react'
import SetterDrawer from '../../HOCs/SetterDrawer';
import { useNavigate } from 'react-router-dom';
import 'rsuite/dist/rsuite.min.css';
import LogsTable from '../../Components/Tables/LogsTable';



interface MyComponentProps {
    verifyUser?: boolean;
}
const Errors: FC<MyComponentProps> = ({
    verifyUser,
}) => {


    const navigate = useNavigate();
    useEffect(() => {
        if (!verifyUser) {
            navigate("/");
        }
    }, [verifyUser, navigate]);

    return (
        <>
            <Box gap={4} w={'full'} height={'full'} minH={'37rem'}>
                <HStack bg={'whiteAlpha.800'} shadow={'sm'} p={2} w={'full'} >
                    <Heading size={'sm'}>Log Error Files</Heading>
                </HStack>
                <LogsTable />
            </Box>
        </>
    )
}

export default SetterDrawer(Errors);