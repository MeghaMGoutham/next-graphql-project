// Layout wrapper: Adds header, footer, and background image

'use client';

import { Box, Flex, Heading } from '@chakra-ui/react';
import Footer from './Footer';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Flex
      direction="column"
      minH="100vh"
      bgImage="url(/bg.jpg)"
      bgRepeat="no-repeat"
      bgSize="cover"
    >
      <Box bg="rgba(173,216,230,1)" w="100%">
        <Flex justify="center" mx="6" py="2">
          <Heading textAlign="center">Welcome!</Heading>
        </Flex>
      </Box>
      <Box flex="1" px="6" py="4">
        {children}
      </Box>
      <Footer />
    </Flex>
  );
}
