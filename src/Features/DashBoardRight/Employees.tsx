import { Box, Input, InputGroup, InputLeftElement, Text, VStack,  } from '@chakra-ui/react'
import { useEffect, FC } from 'react'
import SetterDrawer from '../../HOCs/SetterDrawer';
import { useNavigate } from 'react-router-dom';
// import EmployeeCard from '../../Components/EmployeesCard/EmployeesCard';
import { Search2Icon } from '@chakra-ui/icons';
import CreateEmployeeCard from '../../Components/EmployeesCard/CreateEmployeeCard';
import 'rsuite/dist/rsuite.min.css';


interface MyComponentProps {
    verifyUser?: boolean;
}
const Employee: FC<MyComponentProps> = ({
    verifyUser,
}) => {

    // const [CreateuserArr, setCreateuserArr] = useState<string[]>([]);

    const handleModifyCreateUserArray = (data: string) => {
        // setCreateuserArr((prev) => [...prev, id]);
        alert(data)
    };

    const navigate = useNavigate();
    useEffect(() => {
        if (!verifyUser) {
            navigate("/");
        }
    }, [verifyUser, navigate]);

    return (
        <>
            <VStack gap={4} w={'full'} height={'full'} minH={'37rem'}>
                <Box w={'full'} py={2} display={'flex'} alignItems={'center'} flexDirection={'row'} justifyContent={'space-between'} >
                    <Text fontWeight={'semibold'} w={'full'} fontSize={['md', '2xl']} color={'gray.700'} >
                        32 Employees
                    </Text>
                    <InputGroup justifyContent={'flex-end'} width={'auto'}>
                        <InputLeftElement pointerEvents='none' alignItems={'center'} pb={2}>
                            <Search2Icon color='gray.300' fontSize={'sm'} />
                        </InputLeftElement>
                        <Input placeholder='Search Team Member' px={1} variant='flushed' size='sm' color={'gray.700'} fontWeight={'semibold'} />
                    </InputGroup>
                </Box>
                <Box display={'flex'} justifyContent={['center', 'flex-start']} w={'full'} flexDirection={'row'} gap={'5'} flexWrap={'wrap'} >
                    <CreateEmployeeCard handleModifyCreateUserArray={handleModifyCreateUserArray} />
                    {/* <EmployeeCard CreateuserArr={CreateuserArr} /> */}
                </Box>
            </VStack>
        </>
    )
}

export default SetterDrawer(Employee);