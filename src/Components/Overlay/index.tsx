import { Box } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface OverlayProps {
    children: ReactNode;
}

const Overlay = ({ children }: OverlayProps) => {
    return (
        <Box
            h={'-webkit-fill-available'}
            w={'full'}
            bg='blackAlpha.500'
            backdropFilter="blur(5px) "
            position="absolute"
            top={0}
            left={0}
            right={0}
        >
            {children}
        </Box>
    );
};
export default Overlay