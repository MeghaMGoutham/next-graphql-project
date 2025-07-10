// This form collects user details and submits them to generate a JWT

'use client';

import { Button, Input, Field, VStack, Box, Flex } from '@chakra-ui/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/context/AuthContext';

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
  defaultValues,
  isUpdate = false,
}: {
  onComplete: (userData: { userName: string; jobTitle: string }) => void;
  defaultValues?: { userName: string; jobTitle: string };
  isUpdate?: boolean;
}) {
  // Validation is handled using zod schema + react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    onComplete(data); // Proceed for login
  };

  return (
    <Flex justify="flex-start" align="center" direction="column" p={4}>
      <Box
        p="8"
        bg="rgba(0,0,0,0.5)"
        backdropFilter="blur(10px)"
        rounded="md"
        w="full"
        maxW="sm"
        boxShadow="lg"
        border="1px solid rgba(255,255,255,0.2)"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack gap="4">
            <Field.Root invalid={!!errors.userName} w="full">
              <Field.Label color="white" fontSize="sm" fontWeight="semibold">
                Username
              </Field.Label>
              <Input
                id="userNameInput"
                placeholder="Enter your username"
                borderColor="whiteAlpha.700"
                _placeholder={{ color: 'whiteAlpha.700' }}
                color="white"
                _hover={{ borderColor: 'white' }}
                {...register('userName')}
              />
              <Field.ErrorText>{errors.userName?.message}</Field.ErrorText>
            </Field.Root>

            <Field.Root invalid={!!errors.jobTitle} w="full">
              <Field.Label color="white" fontSize="sm" fontWeight="semibold">
                Job Title
              </Field.Label>
              <Input
                id="jobTitleInput"
                placeholder="Enter your job title"
                borderColor="whiteAlpha.700"
                _placeholder={{ color: 'whiteAlpha.700' }}
                color="white"
                _hover={{ borderColor: 'white' }}
                {...register('jobTitle')}
              />
              <Field.ErrorText>{errors.jobTitle?.message}</Field.ErrorText>
            </Field.Root>

            <Button
              type="submit"
              bg="black"
              color="white"
              _hover={{ bg: 'gray.900' }}
              w="full"
              fontWeight="bold"
            >
              {isUpdate ? 'Update' : 'Submit'}
            </Button>
          </VStack>
        </form>
      </Box>
    </Flex>
  );
}
