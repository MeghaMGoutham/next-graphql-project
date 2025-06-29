// This form collects user details and submits them to generate a JWT

'use client';

import { Button, Input, Field, VStack } from '@chakra-ui/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

interface FormValues {
  userName: string;
  jobTitle: string;
}

const formSchema = z.object({
  userName: z.string().min(1, { message: 'Please enter your user name' }),
  jobTitle: z.string().min(1, { message: 'Please enter your job title' }),
});

export default function UserDetailsForm({
  onComplete,
}: {
  onComplete: (userData: { userName: string; jobTitle: string }) => void;
}) {
  // Validation is handled using zod schema + react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const res = await fetch('/api/user-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        onComplete(data);
      } else {
        console.error('Failed to set token');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack gap="4">
        <Field.Root invalid={!!errors.userName}>
          <Field.Label>Username</Field.Label>
          <Input
            id="userNameInput"
            borderColor="black"
            placeholder="Enter your username"
            {...register('userName')}
          />
          <Field.ErrorText>{errors.userName?.message}</Field.ErrorText>
        </Field.Root>

        <Field.Root invalid={!!errors.jobTitle}>
          <Field.Label>Job Title</Field.Label>
          <Input
            id="jobTitleInput"
            borderColor="black"
            placeholder="Enter your job title"
            {...register('jobTitle')}
          />
          <Field.ErrorText>{errors.jobTitle?.message}</Field.ErrorText>
        </Field.Root>

        <Button type="submit" colorScheme="blue" w="full">
          Submit
        </Button>
      </VStack>
    </form>
  );
}
