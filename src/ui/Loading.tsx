'use client';

import { Flex, Spinner, Text } from '@chakra-ui/react';

export default function Loading() {
  return (
    <Flex
      height="100vh"
      align="center"
      justify="center"
      direction="column"
      color="white"
    >
      <Spinner size="xl" mb={4} />
      <Text fontSize="xl">Loading...</Text>
    </Flex>
  );
}
