import {  Box, Button, Divider, Image,  Text } from '@chakra-ui/react'
import { useState } from 'react'
// import { BiCheckDouble } from 'react-icons/bi'
import { VscCheckAll } from 'react-icons/vsc'

const Notifications = () => {

    const [readUnread, setReadUnread] = useState<string>('unread');

    const newD = new Date();
    const notificationsArray: any[] = [
        {
            name: 'klerk dan',
            avtar: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=600',
            createdDate: newD,
        },
        {
            name: 'Mikel Tom',
            avtar: 'https://images.pexels.com/photos/943235/pexels-photo-943235.jpeg?auto=compress&cs=tinysrgb&w=600',
            createdDate: newD,
        },
        {
            name: 'David Harbour',
            avtar: 'https://images.pexels.com/photos/775358/pexels-photo-775358.jpeg?auto=compress&cs=tinysrgb&w=600',
            createdDate: newD,
        }
    ];

    return (
        <>
            <Text fontSize={'xl'} fontWeight={'semibold'}>Notifications</Text>
            <Box my={5}>
                {
                    notificationsArray.length ?
                        <>
                            {notificationsArray?.map((registerUser, index) => {
                                return (
                                    <>
                                        <Box mb={1} key={registerUser.name + index} bg={readUnread === 'unread' ? 'gray.100' : 'white'} _hover={{ bg: 'gray.50', rounded: 'xl' }} display={'flex'} flexDirection={'row'} p={2} gap={2} cursor={'pointer'} >

                                            <Image src={registerUser.avtar} alt='user' rounded={'full'} objectFit={'cover'} boxSize='50px' minW={'50px'} bg={'red'} shadow={'md'} />


                                            <Box m={0} p={1} w={'full'} fontWeight={'semibold'} color={'black'} >
                                                <Text m={0} fontSize={'xs'}  > <Text _hover={{ textDecoration: 'underline' }} as={'span'} lineHeight={'5'} > {registerUser.name} </Text> registered successfully !</Text>
                                                <Box mt={'1'} w={'full'} fontSize={'xs'} fontWeight={'semibold'} display={'flex'} justifyContent={'space-between'}>
                                                    <Text>Friday 02:20pm</Text>
                                                    <Text m={'0'} > Sep 20,2022</Text>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </>
                                )
                            })
                            }
                            < Divider />

                            <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} p={1}>
                                <Button size={'xs'} variant={'ghost'} colorScheme={'twitter'} _hover={{
                                    bg: "none",
                                    textDecoration: 'underline'
                                }} leftIcon={<VscCheckAll />} onClick={() => setReadUnread('allread')}>
                                    Mark all as read
                                </Button>
                                <Button size={'sm'} colorScheme='twitter'>
                                    View All notifications
                                </Button>
                            </Box>
                        </>
                        :
                        <Text textAlign={'center'} my={7} fontSize={'sm'}>No Notification</Text>
                }


            </Box >
        </>
    )
}

export default Notifications