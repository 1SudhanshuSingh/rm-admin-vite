import { FC, useState } from 'react'
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
    Input,
    InputGroup,
    Select,
    Stack,
    InputLeftAddon,
    InputRightElement,
} from '@chakra-ui/react'
import { useFormik } from 'formik';
import { useCreateEmployee } from '../../Hooks/Employee/useCreateEmployee';


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


const CreateEmployeeByDetailsModal: FC<MyComponentProps> = ({ isOpen, onClose }) => {
    const [passwordShow, setPasswordShow] = useState(false)

    const { createEmployeemutations, useCreateEmpQuery } = useCreateEmployee()

    const { isLoading, error } = useCreateEmpQuery();


    const formik = useFormik({
        initialValues: {
            emailid: '',
            isdcode: "+91",
            mobile: '',
            password: '',
            employeeType: '',
            officeId: '',
            role: '',
            otpRequire: '',
        },
        onSubmit: async (values, { resetForm }) => {
            const mutationsRespon = await createEmployeemutations.mutateAsync(values);
            alert(mutationsRespon)
            error && alert(error)
            resetForm();
            onClose();
        },
    });


    return (
        <>

            <Modal size={'2xl'} closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <form onSubmit={formik.handleSubmit}>
                        <ModalHeader>Create employee Account</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                            <Stack spacing={'4'} p="1rem" backgroundColor="whiteAlpha.900" rounded={"10px"} >
                                <InputGroup gap={5}>
                                    <FormControl isRequired>
                                        <FormLabel>Email</FormLabel>
                                        <Input
                                            type={"email"}
                                            name="emailid"
                                            placeholder="Email address"
                                            value={formik.values.emailid}
                                            // onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                        />
                                    </FormControl>
                                    <FormControl isRequired>
                                        <FormLabel>Phone No</FormLabel>
                                        <InputGroup>
                                            <InputLeftAddon children={formik.values.isdcode} />
                                            <Input
                                                type={"tel"}
                                                maxLength={10}
                                                name="mobile"
                                                placeholder="Phone number"
                                                value={formik.values.mobile}
                                                // onBlur={formik.handleBlur}
                                                onChange={formik.handleChange}
                                            />
                                        </InputGroup>
                                    </FormControl>
                                </InputGroup>
                                <InputGroup gap={5}>
                                    <FormControl isRequired>
                                        <FormLabel>Office Id</FormLabel>
                                        <Input
                                            type={"text"}
                                            name="officeId"
                                            placeholder="Office Id"
                                            value={formik.values.officeId}
                                            // onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                        />
                                    </FormControl>
                                    <FormControl isRequired>
                                        <FormLabel>Role</FormLabel>
                                        <Select
                                            placeholder="Select role"
                                            value={formik.values.role}
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                            name="role"
                                        >
                                            <option value={1}>Software Devloper</option>
                                            <option value={2}>Data Entry Operator</option>
                                            <option value={3}>Executive </option>
                                            <option value={4}>Manager </option>
                                            <option value={5}>Operation Exicutive </option>
                                            <option value={6}>Other</option>
                                        </Select>
                                    </FormControl>
                                </InputGroup>
                                <InputGroup gap={5}>
                                    <FormControl isRequired>
                                        <FormLabel>Employee Type</FormLabel>
                                        <Input
                                            type={"text"}
                                            name="employeeType"
                                            placeholder="exapmle : RM "
                                            value={formik.values.employeeType}
                                            // onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                        />
                                    </FormControl>
                                    <FormControl isRequired>
                                        <FormLabel>OTP Require</FormLabel>
                                        <Select
                                            name="otpRequire"
                                            placeholder="Otp Require"
                                            value={formik.values.otpRequire}
                                            onChange={formik.handleChange}
                                        >
                                            <option value={1}>True</option>
                                            <option value={2} >False</option>
                                        </Select>
                                    </FormControl>
                                </InputGroup>
                                <FormControl isRequired>
                                    <FormLabel>Password</FormLabel>
                                    <InputGroup>
                                        <Input
                                            type={passwordShow ? 'text' : 'password'}
                                            name="password"
                                            placeholder='Enter password'
                                            value={formik.values.password}
                                            // onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                        />
                                        <InputRightElement width='4.5rem'>
                                            <Button h='1.75rem' size='sm' onClick={() => setPasswordShow(!passwordShow)}>
                                                {passwordShow ? 'Hide' : 'Show'}
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>
                                </FormControl>

                            </Stack>
                        </ModalBody>

                        <ModalFooter>
                            <Button
                                type="submit"
                                variant="solid"
                                mr={5}
                                bgColor={'green.400'}
                                colorScheme='white'
                                isLoading={isLoading}
                                loadingText='Createing'
                            >
                                Create Employee
                            </Button>
                            <Button onClick={onClose} bgColor={'red.400'} colorScheme='white' >Cancel</Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal >
        </>
    )
}

export default CreateEmployeeByDetailsModal;