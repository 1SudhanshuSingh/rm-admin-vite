import { FC } from 'react'
import { Box, HStack, Heading, Icon, Text, VStack } from '@chakra-ui/react'
import { IconType } from 'react-icons';

interface DashBoardCardProps {
    BoxIcon: React.ElementType | IconType;
    Tranding_type: React.ElementType | IconType;
    Main_Heading: string;
    IncDec: string;
    ThymeColor: string;
    NumberOFHeding: number;
    NoOfPersent_UPDW: number;
}
const DashBoardCard: FC<DashBoardCardProps> = ({ BoxIcon, Tranding_type, Main_Heading, NumberOFHeding, NoOfPersent_UPDW, IncDec, ThymeColor }) => {
    return (
        <Box bg={"white"} shadow={"lg"} height={"28"} w={['full',"64"]} p={'3'} px={'4'} display={'flex'} cursor={'pointer'} flexDirection={'column'} flexDir={'column'} justifyContent={'space-between'} rounded={'xl'} >
            <HStack display={'flex'} justifyContent={'flex-end'} gap={5} position={'relative'}>
                <Box h={12} w={'12'} bg={ThymeColor} p={"2"} position={'absolute'} top={-7} left={0} color={'white'} display={"inline-flex"} alignItems={'center'} justifyContent={'center'} rounded={'lg'} >
                    <Icon as={BoxIcon} boxSize={6} />
                </Box>
                <VStack alignItems={'flex-end'}>
                    <Heading fontWeight={'semibold'} display={'inline'} color={ThymeColor} fontSize={'md'} >{Main_Heading} </Heading>
                    <Heading fontWeight={'Bold'} color={'blackAlpha.800'} fontSize={'large'} >{NumberOFHeding}</Heading>
                </VStack>
            </HStack>
            <HStack>
                <Icon color={IncDec === "Increase" ? 'green.500' : 'red.500'} as={Tranding_type} w={6} h={"6"} />
                <Text color={NoOfPersent_UPDW >= 0 ? 'green.400' : 'red.400'}>{NoOfPersent_UPDW} %</Text>
                <Text>{IncDec}</Text>
            </HStack>
        </Box>
    )
}

export default DashBoardCard