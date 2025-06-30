// Client-side component that shows form if user data not available,
// or displays the user data with edit and navigation options

'use client';

import { Container } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import UserDetailsForm from './UserDetailsForm';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import UserDetailsDisplay from './UserDetailsDisplay';

export default function ClientWrapper({
  editMode = false,
}: {
  editMode?: boolean;
}) {
  const { userName, jobTitle, isLoggedIn, login } = useAuth();

  const [editing, setEditing] = useState(editMode);
  const router = useRouter();

  const searchParams = useSearchParams();

  useEffect(() => {
    const isEdit = searchParams.get('edit') === 'true';
    setEditing(isEdit);
  }, [searchParams]);

  const handleComplete = (data: { userName: string; jobTitle: string }) => {
    login(data.userName, data.jobTitle);
    setEditing(false);
    setEditing(false);

    //On updating data, URl to be updated back to HomePage "/" (if URL has edit parameter)
    if (searchParams.has('edit')) {
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.delete('edit');
      router.replace(`/?${newParams.toString()}`);
    }
  };

  //Displays userform or userdetails based on isLoggedIn state and editing mode
  //Send defaultValues to UserDetailsForm in order to pre-populate the form fields with existing user data when editing, or to have them empty by default when creating new data.
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
