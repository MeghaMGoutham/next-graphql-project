// Layout wrapper: Adds header, footer, and background image

'use client';

import {
  Box,
  Button,
  Drawer,
  Flex,
  Heading,
  HStack,
  CloseButton,
  useBreakpointValue,
  VStack,
  Portal,
} from '@chakra-ui/react';
import Footer from './Footer';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isLoggedIn, logout } = useAuth();
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const navButtons = (
    <>
      <Button
        variant="ghost"
        color="white"
        _hover={{ bg: 'blue.600' }}
        onClick={() => {
          router.push('/');
          if (isMobile) setIsDrawerOpen(false); // Close the drawer on click
        }}
      >
        Home
      </Button>
      <Button
        variant="ghost"
        color="white"
        _hover={{ bg: 'blue.600' }}
        onClick={() => {
          router.push('/?edit=true');
          if (isMobile) setIsDrawerOpen(false); // Close the drawer on click
        }}
      >
        Edit Details
      </Button>
      <Button
        variant="ghost"
        color="white"
        _hover={{ bg: 'red.600' }}
        onClick={() => {
          if (isMobile) setIsDrawerOpen(false); // Close the drawer on click
          localStorage.removeItem('userData');
          logout();
        }}
      >
        Logout
      </Button>
    </>
  );

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
          {isLoggedIn ? (
            isMobile ? (
              <>
                <Drawer.Root
                  open={isDrawerOpen}
                  onOpenChange={(e) => setIsDrawerOpen(e.open)}
                >
                  <Drawer.Trigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      color="white"
                      onClick={() => setIsDrawerOpen(true)}
                    >
                      Menu
                    </Button>
                  </Drawer.Trigger>
                  <Portal>
                    <Drawer.Backdrop />
                    <Drawer.Positioner>
                      <Drawer.Content bg="black">
                        <Drawer.Header>
                          <Drawer.Title>Open Menu</Drawer.Title>
                        </Drawer.Header>
                        <Drawer.Body>
                          <VStack gap={4} mt={10}>
                            {navButtons}
                          </VStack>
                        </Drawer.Body>
                        <Drawer.CloseTrigger asChild>
                          <CloseButton size="sm" color="white" />
                        </Drawer.CloseTrigger>
                      </Drawer.Content>
                    </Drawer.Positioner>
                  </Portal>
                </Drawer.Root>
              </>
            ) : (
              <HStack gap={4}>{navButtons}</HStack>
            )
          ) : null}
        </Flex>
      </Box>
      <Box flex="1" px="6" py="4">
        {children}
      </Box>
      <Footer />
    </Flex>
  );
}
