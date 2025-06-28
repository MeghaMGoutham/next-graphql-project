'use client';

import { Heading, Container } from '@chakra-ui/react';
import Layout from '@/shared/Layout';

export default function Home() {
  return (
    <Layout>
      <Container maxW="container.md" py={8}>
        <Heading>Welcome to the Challenge!</Heading>
      </Container>
    </Layout>
  );
}