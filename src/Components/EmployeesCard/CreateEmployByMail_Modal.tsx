import { FC } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Select,
} from '@chakra-ui/react'


interface MyComponentProps {
    isOpen: boolean;
    SelectedUserEmail: string;
    onClose: () => void;
    EmployeeData: {
        _ID: string;
        name: string;
        userImage: string;
        Created_Date: string;
        Status: string;
        mobile_no: number;
        email: string;
    }[];
    handleSelectChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    handleCreate: (selectedEmail: string) => void;
}


const CreateEmployeeModal: FC<MyComponentProps> = ({ EmployeeData, isOpen, onClose, SelectedUserEmail, handleSelectChange, handleCreate }) => {


    return (
        <>

            <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create employee Account</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Select Employees Email</FormLabel>
                            <Select value={SelectedUserEmail} onChange={handleSelectChange} placeholder='Select country'>
                                {EmployeeData && EmployeeData.map((user) => {
                                    return <option key={user._ID} value={user._ID} >{user.email} </option>
                                })}
                            </Select>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={() => handleCreate(SelectedUserEmail)} colorScheme='blue' mr={3}>
                            Create
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default CreateEmployeeModal;