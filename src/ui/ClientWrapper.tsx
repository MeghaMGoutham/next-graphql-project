// Client-side component that shows form if user data not available,
// or displays the user data with edit and navigation options

'use client';

import { Container, Text, Button, Stack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import UserDetailsForm from './UserDetailsForm';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import UserDetailsDisplay from './UserDetailsDisplay';

export default function ClientWrapper({
  userName: initialUserName,
  jobTitle: initialJobTitle,
  editMode = false,
}: {
  userName: string;
  jobTitle: string;
  editMode?: boolean;
}) {
  const { userName, jobTitle, isLoggedIn, login } = useAuth();

  const [editing, setEditing] = useState(editMode);
  const router = useRouter();

  const searchParams = useSearchParams();

  useEffect(() => {
    // Initialize auth context with server data only once
    if (!isLoggedIn && initialUserName && initialJobTitle) {
      login(initialUserName, initialJobTitle);
    }
  }, [initialUserName, initialJobTitle, isLoggedIn, login]);

  useEffect(() => {
    const isEdit = searchParams.get('edit') === 'true';
    setEditing(isEdit);
  }, [searchParams]);

  const handleComplete = (data: { userName: string; jobTitle: string }) => {
    login(data.userName, data.jobTitle);
    setEditing(false);
    setEditing(false);

    if (searchParams.has('edit')) {
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.delete('edit');
      router.replace(`/?${newParams.toString()}`);
    }
  };

  return (
    <Container maxW="container.md" py={8}>
      {isLoggedIn && !editing ? (
        <UserDetailsDisplay
          userName={userName ?? ''}
          jobTitle={jobTitle ?? ''}
        />
      ) : (
        <UserDetailsForm
          onComplete={handleComplete}
          defaultValues={{ userName: userName ?? '', jobTitle: jobTitle ?? '' }}
          isUpdate={editing}
        />
      )}
    </Container>
  );
}
