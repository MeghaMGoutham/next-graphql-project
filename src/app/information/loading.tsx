'use client';

import { Flex, Spinner, Text } from '@chakra-ui/react';
import Layout from '@/ui/Layout';

export default function Loading() {
  return (
    <Layout>
      <Flex
        height="100vh"
        align="center"
        justify="center"
        direction="column"
        color="white"
      >
        <Spinner size="xl" mb={4} />
        <Text fontSize="xl">Loading characters...</Text>
      </Flex>
    </Layout>
  );
}
