import { Box } from '@chakra-ui/react'
import { useEffect, FC } from "react";
import SetterDrawer from '../../HOCs/SetterDrawer';
import { FaUserEdit, FaUsers } from 'react-icons/fa';
import { BiTrendingDown, BiTrendingUp } from 'react-icons/bi';
import DashBoardCard from '../../Components/HomePageCard';
import { useNavigate } from 'react-router-dom';
import { TableD } from '../../Components/Tables/DashBoardTable';


interface MyComponentProps {
    verifyUser?: boolean;
}
const DashBoardHome: FC<MyComponentProps> = ({
    verifyUser,
}) => {
    const navigate = useNavigate();
    useEffect(() => {
        if (!verifyUser) {
            navigate("/");
        }
    }, [verifyUser,navigate]);
    return (
        <Box w={'full'}>
            {/* minH={'35.5rem'} */}
            <Box display={'flex'} flexDirection={['column', 'row']} gap={[10, 4]} mb={6} justifyContent={'flex-start'}  >
                <DashBoardCard BoxIcon={FaUsers} Tranding_type={BiTrendingUp} Main_Heading={"Total Customers"} NumberOFHeding={125} NoOfPersent_UPDW={10} IncDec={"Increase"} ThymeColor={'red.400'} />
                <DashBoardCard BoxIcon={FaUserEdit} Tranding_type={BiTrendingDown} Main_Heading={"Employees"} NumberOFHeding={13} NoOfPersent_UPDW={-2} IncDec={"Decrease"} ThymeColor={"green.400"} />
            </Box>
            <TableD />
        </Box>
    )
}

export default SetterDrawer(DashBoardHome);