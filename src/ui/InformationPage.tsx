// // Client-side component to render paginated character cards from GraphQL

// 'use client';

// import {
//   Box,
//   Button,
//   Image,
//   SimpleGrid,
//   Stack,
//   Text,
//   useDisclosure,
// } from '@chakra-ui/react';
// import {
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalBody,
//   ModalCloseButton,
// } from '@chakra-ui/modal';
// import { useQuery } from '@apollo/client';
// import { notFound, useRouter } from 'next/navigation';
// import { useState } from 'react';
// import { GET_CHARACTERS } from '@/lib/queries';

// export default function InformationPage({
//   currentPage,
// }: {
//   currentPage: number;
// }) {
//   //   Fetch paginated character data from the Rick and Morty GraphQL API.
//   //   The `page` variable controls which set of characters is returned.
//   //   Result includes character info (id, name, image, status, etc.) and pagination metadata.
//   const { data, loading, error } = useQuery(GET_CHARACTERS, {
//     variables: { page: currentPage },
//   });

//   const router = useRouter();
//   const { open, onOpen, onClose } = useDisclosure();
//   const [selected, setSelected] = useState<any>(null);

//   if (loading) return null;
//   if (error) throw error;

//   if (!data?.characters?.results?.length) {
//     notFound();
//   }

//   const characters = data.characters.results;

//   // Updates the URL query param to reflect the new page number.
//   // Triggers a server re-render of the /information route with updated `searchParams`, which fetches a new set of characters from the API.
//   const handlePageChange = (newPage: number) => {
//     router.push(`/information?page=${newPage}`);
//   };

//   return (
//     <>
//       <SimpleGrid columns={[1, 2, 3]} gap={4} p={4}>
//         {characters.map((char: any) => (
//           <Box
//             key={char.id}
//             p={4}
//             shadow="md"
//             borderWidth="1px"
//             borderRadius="md"
//             cursor="pointer"
//             onClick={() => {
//               setSelected(char);
//               onOpen();
//             }}
//           >
//             <Image src={char.image} alt={char.name} borderRadius="md" />
//             <Text mt={2} fontWeight="bold">
//               {char.name}
//             </Text>
//           </Box>
//         ))}
//       </SimpleGrid>

//       <Box textAlign="center" my={4}>
//         <Button
//           onClick={() => handlePageChange(currentPage - 1)}
//           disabled={currentPage <= 1}
//         >
//           Previous
//         </Button>
//         <Button
//           onClick={() => handlePageChange(currentPage + 1)}
//           ml={4}
//           disabled={!data?.characters?.info?.next}
//         >
//           Next
//         </Button>
//       </Box>

//       <Modal
//         isOpen={open}
//         onClose={onClose}
//         isCentered
//         size="lg"
//         motionPreset="slideInBottom"
//       >
//         <ModalOverlay />
//         <ModalContent
//           maxW="500px"
//           w="90%"
//           borderRadius="lg"
//           bg="white"
//           overflow="hidden"
//           boxShadow="lg"
//         >
//           <ModalHeader>{selected?.name}</ModalHeader>
//           <ModalCloseButton />

//           <ModalBody>
//             <Image
//               src={selected?.image}
//               alt={selected?.name}
//               borderRadius="md"
//               mb={4}
//               width="100%"
//               height="auto"
//               objectFit="cover"
//               maxHeight="300px"
//             />
//             <Stack gap={2}>
//               <Text>
//                 <strong>Status:</strong> {selected?.status}
//               </Text>
//               <Text>
//                 <strong>Species:</strong> {selected?.species}
//               </Text>
//               <Text>
//                 <strong>Gender:</strong> {selected?.gender}
//               </Text>
//               <Text>
//                 <strong>Origin:</strong> {selected?.origin?.name}
//               </Text>
//               <Text>
//                 <strong>Location:</strong> {selected?.location?.name}
//               </Text>
//             </Stack>
//           </ModalBody>
//         </ModalContent>
//       </Modal>
//     </>
//   );
// }

//
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

export default function InformationPage({
  currentPage,
}: {
  currentPage: number;
}) {
  const { data, loading, error } = useQuery(GET_CHARACTERS, {
    variables: { page: currentPage },
  });

  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<any>(null);

  if (loading) return null;
  if (error) throw error;
  if (!data?.characters?.results?.length) notFound();

  const characters = data.characters.results;

  const handlePageChange = (newPage: number) => {
    router.push(`/information?page=${newPage}`);
  };

  return (
    <>
      <SimpleGrid columns={[1, 2, 3]} gap={4} p={4}>
        {characters.map((char: any) => (
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
                p={4}
                shadow="md"
                borderWidth="1px"
                borderRadius="md"
                cursor="pointer"
                onClick={() => {
                  setSelected(char);
                  setOpen(true);
                }}
              >
                <Image src={char.image} alt={char.name} borderRadius="md" />
                <Text mt={2} fontWeight="bold">
                  {char.name}
                </Text>
              </Box>
            </Dialog.Trigger>

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
    </>
  );
}
