// Client-side component that shows form if user data not available,
// or displays the user data with edit and navigation options

'use client';

import { Container } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import UserDetailsForm from './UserDetailsForm';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import UserDetailsDisplay from './UserDetailsDisplay';
import Loading from './Loading';

export default function ClientWrapper({
  editMode = false,
}: {
  editMode?: boolean;
}) {
  const { userName, jobTitle, isLoggedIn, login, loading, updateUserData } =
    useAuth();


  const [editing, setEditing] = useState(editMode);
  const router = useRouter();

  const searchParams = useSearchParams();

  useEffect(() => {
    const isEdit = searchParams.get('edit') === 'true';
    setEditing(isEdit);
  }, [searchParams]);

  const handleComplete = (data: { userName: string; jobTitle: string }) => {
    if (editing) {
      updateUserData(data.userName, data.jobTitle);
    } else {
      login(data.userName, data.jobTitle);
    }

    setEditing(false);

    if (searchParams.has('edit')) {
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.delete('edit');
      router.replace(`/?${newParams.toString()}`);
    }
  };

  if (loading) {
    return <Loading />;
  }

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
