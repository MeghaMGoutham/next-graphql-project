import {
  Box,
  Center,
  Stack,
  Text,
  Image,
  Button,
  Flex,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

// Displays user information on home page after logged in
export default function UserDetailsDisplay({
  userName,
  jobTitle,
}: {
  userName: string;
  jobTitle: string;
}) {
  const router = useRouter();
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
        textAlign="left"
      >
        <Center mb="6">
          <Image
            src="/profile.jpg"
            alt="Ghost"
            boxSize="150px"
            objectFit="cover"
          />
        </Center>
        <Stack gap={4}>
          <Box>
            <Text fontSize="sm" fontWeight="semibold" color="white">
              Username
            </Text>
            <Text color="whiteAlpha.900">{userName}</Text>
          </Box>

          <Box>
            <Text fontSize="sm" fontWeight="semibold" color="white">
              Job Title
            </Text>
            <Text color="whiteAlpha.900">{jobTitle}</Text>
          </Box>
          <Button
            bg="black"
            color="white"
            _hover={{ bg: 'gray.900' }}
            w="full"
            fontWeight="bold"
            onClick={() => router.push('/information')}
          >
            Explore Rick and Morty
          </Button>
        </Stack>
      </Box>
    </Flex>
  );
}
