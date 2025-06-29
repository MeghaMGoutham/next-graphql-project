'use client';

import { Box, Text } from '@chakra-ui/react';

export default function Footer() {
  return (
    <Box as="footer" textAlign="center" bg="black" py="4">
      <Text fontSize="sm" color="white">
        v3.5
      </Text>
    </Box>
  );
}
