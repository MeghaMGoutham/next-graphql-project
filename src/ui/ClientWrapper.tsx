// Client-side component that shows form if user data not available,
// or displays the user data with edit and navigation options

'use client';

import { Container, Text, Button, Stack } from '@chakra-ui/react';
import { useState } from 'react';
import UserDetailsForm from './UserDetailsForm';
import { useRouter } from 'next/navigation';

export default function ClientWrapper({
  userName: initialUserName,
  jobTitle: initialJobTitle,
}: {
  userName: string;
  jobTitle: string;
}) {
  const [userName, setUserName] = useState(initialUserName);
  const [jobTitle, setJobTitle] = useState(initialJobTitle);
  const [editing, setEditing] = useState(false);
  const router = useRouter();

  const handleComplete = (data: { userName: string; jobTitle: string }) => {
    setUserName(data.userName);
    setJobTitle(data.jobTitle);
    setEditing(false);
  };

  return (
    <Container maxW="container.md" py={8}>
      {userName && jobTitle && !editing ? (
        <Stack gap={4} textAlign="center">
          <Text>Username: {userName}</Text>
          <Text>Job Title: {jobTitle}</Text>
          <Stack direction="row" gap={4} justify="center">
            <Button onClick={() => setEditing(true)}>Edit User Details</Button>
            <Button
              colorScheme="blue"
              onClick={() => router.push('/information')}
            >
              Go to Information
            </Button>
          </Stack>
        </Stack>
      ) : (
        <UserDetailsForm onComplete={handleComplete} />
      )}
    </Container>
  );
}
