import { FC } from 'react'
import { Box,  HStack, Icon, Text } from '@chakra-ui/react'
import { IconType } from 'react-icons';

interface CustomerCardProps {
    BoxIcon: React.ElementType | IconType;
    Main_Heading: string;
    IconColor: string;
    BoxColor: string;
    NumberOFHeding: number;
}
const CustomerCard: FC<CustomerCardProps> = ({ BoxIcon, Main_Heading, NumberOFHeding, BoxColor, IconColor }) => {


    return (
        <HStack bg={'white'} rounded={'xl'} p={[3, 6]} px={['2', '3']} shadow={'base'} w={['100%', '52']} gap={1} >
            <Box height={[10, 14]} w={[10, 14]} bg={BoxColor} rounded={'full'} display={'flex'} justifyContent={'center'} alignItems={'center'}  >
                <Icon color={IconColor} as={BoxIcon} boxSize={6} />
            </Box>
            <Box display={'flex'} flexDirection={'column'} justifyContent={'flex-start'} m={0} alignItems={'baseline'} >
                <Text fontWeight={'bold'} >{NumberOFHeding} </Text>
                <Text m={0} fontSize={['xx-small', 'sm']} color={'gray.400'} fontWeight={'semibold'}  >{Main_Heading}</Text>
            </Box>
        </HStack>
    )
}

export default CustomerCard