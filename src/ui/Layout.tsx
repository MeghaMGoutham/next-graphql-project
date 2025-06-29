// Layout wrapper: Adds header, footer, and background image

'use client';

import { Box, Button, Flex, Heading, HStack } from '@chakra-ui/react';
import Footer from './Footer';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isLoggedIn, logout } = useAuth();

  const navButtons = isLoggedIn ? (
    <>
      <Button
        variant="ghost"
        color="white"
        _hover={{ bg: 'blue.600' }}
        onClick={() => router.push('/')}
      >
        Home
      </Button>
      <Button
        variant="ghost"
        color="white"
        _hover={{ bg: 'blue.600' }}
        onClick={() => router.push('/?edit=true')}
      >
        Edit Details
      </Button>
      <Button
        variant="ghost"
        color="white"
        _hover={{ bg: 'red.600' }}
        onClick={() => logout()}
      >
        Logout
      </Button>
    </>
  ) : null;

  return (
    <Flex
      direction="column"
      minH="100vh"
      bgImage="url(/rickmorty-bg.jpg)"
      bgRepeat="no-repeat"
      bgSize="cover"
      backgroundPosition="center"
      position="relative"
      width="100%"
    >
      <Box bg="black" w="100%" py={3} px={6}>
        <Flex justify="space-between" align="center">
          <Heading size="md" color="white">
            Welcome!
          </Heading>
          <HStack gap={4}>{navButtons}</HStack>
        </Flex>
      </Box>
      <Box flex="1" px="6" py="4">
        {children}
      </Box>
      <Footer />
    </Flex>
  );
}
