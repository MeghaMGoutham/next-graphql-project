'use client';

import {
  Box,
  Button,
  CloseButton,
  Dialog,
  Image,
  Portal,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { useRouter, notFound } from 'next/navigation';
import { GET_CHARACTERS } from '@/lib/queries';
import Loading from './Loading';
import { Character, CharactersQueryData } from '@/constants/types';

export default function InformationPage({
  currentPage,
}: {
  currentPage: number;
}) {
  // Fetch paginated character data from Rick & Morty GraphQL API
  const { data, loading, error } = useQuery<CharactersQueryData>(
    GET_CHARACTERS,
    {
      variables: { page: currentPage },
    }
  );

  const router = useRouter();

  // State to control modal/dialog open status and selected character details
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Character | null>(null);

  if (loading) {
    return <Loading />;
  }
  if (error) throw error;
  if (!data?.characters?.results?.length) notFound();

  const characters = data.characters.results;

  // Handler to change page by pushing new URL with updated page query parameter
  const handlePageChange = (newPage: number) => {
    router.push(`/information?page=${newPage}`);
  };

  return (
    <Box px={4} py={4} pb={28} height="calc(100vh - 120px)" overflowY="auto">
      {/* Display character cards in a responsive grid */}
      <SimpleGrid columns={[1, 2, 3]} gap={4} p={4} alignItems="stretch">
        {characters.map((char: Character) => (
          <Dialog.Root
            key={char.id}
            open={open && selected?.id === char.id}
            onOpenChange={({ open }) => {
              setOpen(open);
              if (!open) setSelected(null);
            }}
          >
            <Dialog.Trigger asChild>
              <Box
                p={0}
                shadow="md"
                borderWidth="1px"
                borderRadius="md"
                cursor="pointer"
                overflow="hidden"
                onClick={() => {
                  setSelected(char);
                  setOpen(true);
                }}
              >
                <Image
                  src={char.image}
                  alt={char.name}
                  w="100%"
                  h="250px"
                  objectFit="cover"
                />
                <Text p={2} fontWeight="bold" color="white" bg="blackAlpha.600">
                  {char.name}
                </Text>
              </Box>
            </Dialog.Trigger>
            {/* Modal dialog for detailed character info */}
            <Portal>
              <Dialog.Backdrop />
              <Dialog.Positioner>
                <Dialog.Content
                  maxW="500px"
                  w="90%"
                  borderRadius="lg"
                  bg="white"
                  overflow="hidden"
                  boxShadow="lg"
                >
                  <Dialog.Header>
                    <Dialog.Title>{selected?.name}</Dialog.Title>
                    <Dialog.CloseTrigger asChild>
                      <CloseButton
                        size="sm"
                        position="absolute"
                        top="12px"
                        right="12px"
                      />
                    </Dialog.CloseTrigger>
                  </Dialog.Header>

                  <Dialog.Body>
                    <Image
                      src={selected?.image}
                      alt={selected?.name}
                      borderRadius="md"
                      mb={4}
                      width="100%"
                      height="auto"
                      objectFit="cover"
                      maxHeight="300px"
                    />
                    <Stack gap={2}>
                      <Text>
                        <strong>Status:</strong> {selected?.status}
                      </Text>
                      <Text>
                        <strong>Species:</strong> {selected?.species}
                      </Text>
                      <Text>
                        <strong>Gender:</strong> {selected?.gender}
                      </Text>
                      <Text>
                        <strong>Origin:</strong> {selected?.origin?.name}
                      </Text>
                      <Text>
                        <strong>Location:</strong> {selected?.location?.name}
                      </Text>
                    </Stack>
                  </Dialog.Body>
                </Dialog.Content>
              </Dialog.Positioner>
            </Portal>
          </Dialog.Root>
        ))}
      </SimpleGrid>

      {/* Pagination controls */}
      <Box textAlign="center" my={4}>
        <Button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage <= 1}
        >
          Previous
        </Button>
        <Button
          onClick={() => handlePageChange(currentPage + 1)}
          ml={4}
          disabled={!data?.characters?.info?.next}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
}
