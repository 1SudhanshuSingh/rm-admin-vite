import { Heading, Icon, Stack, useDisclosure } from '@chakra-ui/react'
import { FC, useState } from 'react'
// import SetterDrawer from '../../HOCs/SetterDrawer';
// import { useNavigate } from 'react-router-dom';
import { IoAddSharp } from 'react-icons/io5';
import { UserData } from '../../Constant/Constant';
// import CreateEmployeeModal from './CreateEmployByMail_Modal';
import CreateEmployeeByDetailsModal from './CreateEmployeeByDetails_modal';



interface MyComponentProps {
    handleModifyCreateUserArray: (id: string) => void;
}
const CreateEmployeeCard: FC<MyComponentProps> = ({ handleModifyCreateUserArray }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const [SelectedUserEmail, setSelectedUserEmail] = useState('');
    const [EmployeeData] = useState(UserData);

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedUserEmail(event.target.value);
    };

    const handleCreate = (selectedEmail: string) => {
        onClose();
        handleModifyCreateUserArray(selectedEmail);
        setSelectedUserEmail('');
    };

    return (
        <>
            <Stack onClick={onOpen} cursor={'pointer'} _hover={{ shadow: "lg" }} bg={'transparent'} w={'64'} rounded={'xl'} border='2px' flexDirection={'column'} display={'flex'} alignItems={'center'} justifyContent={'center'} borderColor='gray.200' p={3} minH={'72'}  >
                <Icon as={IoAddSharp} w={12} h={12} color='blue.400' />
                <Heading size={'md'} color={'blue.400'}>
                    Add Team Meamber
                </Heading>
            </Stack>
            {/* <CreateEmployeeModal handleCreate={handleCreate} handleSelectChange={handleSelectChange} SelectedUserEmail={SelectedUserEmail} isOpen={isOpen} onClose={onClose} EmployeeData={EmployeeData} /> */}
            <CreateEmployeeByDetailsModal handleCreate={handleCreate} handleSelectChange={handleSelectChange} SelectedUserEmail={SelectedUserEmail} isOpen={isOpen} onClose={onClose} EmployeeData={EmployeeData} />
        </>
    )
}

export default CreateEmployeeCard;