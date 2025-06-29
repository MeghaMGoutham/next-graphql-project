'use client';

import { Box, Text } from '@chakra-ui/react';

export default function Footer() {
  return (
    <Box as="footer" py={4} textAlign="center" bg="rgba(173,216,230,1)">
      <Text fontSize="sm">v3.5</Text>
    </Box>
  );
}
