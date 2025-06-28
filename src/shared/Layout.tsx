'use client';

import { Box, Flex } from '@chakra-ui/react';
import Footer from './Footer';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <Flex direction="column" minH="100vh">
            <Box as="main" flex="1">
                {children}
            </Box>
            <Footer />
        </Flex>
    );
}
