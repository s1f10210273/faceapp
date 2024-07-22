"use client";

import React, { Suspense, useState } from 'react';
import { useRouter } from 'next/navigation';
import TakePicture from './components/TakePicture';
import Loading from './components/Loading';
import { Box, Flex, Text, Image, Alert, AlertIcon, AlertTitle, AlertDescription, VStack, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, Button, Input, FormControl, FormLabel } from '@chakra-ui/react';

export default function Home() {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [camOn, setCamOn] = useState<boolean>(true);
  const [responseData, setResponseData] = useState<{ image: string; message: string; predicted_age: number } | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [manualAge, setManualAge] = useState<number | null>(null);

  const handleCaptureImage = async (capturedImageSrc: string) => {
    setCamOn(false);
    setLoading(true);
    await sendImage(capturedImageSrc);
  };

  const sendImage = async (imageSrc: string) => {
    try {
      const response = await fetch('http://127.0.0.1:5328/api/faceage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ image: imageSrc })
      });

      if (response.ok) {
        const data = await response.json();
        setResponseData(data);
      } else if (response.status === 500) {
        setResponseData({ image: imageSrc, message: 'Error occurred', predicted_age: 0 });
      } else {
        throw new Error('Failed to fetch');
      }
    } catch (error) {
      console.error('Error uploading image', error);
      setResponseData({ image: imageSrc, message: 'Error occurred', predicted_age: 0 });
    } finally {
      setLoading(false);
      onOpen();
    }
  };

  const handleAgeSubmit = () => {
    onClose();
    setTimeout(() => {
      if (manualAge && manualAge > 60) {
        router.push('/over60');
      } else {
        router.push('/young');
      }
    }, 3000); // 3秒後にページ遷移
  };

  return (
    <Box minH="100vh" bg="blue.50" p={6}>
      {camOn ? (
        <TakePicture onCapture={handleCaptureImage} />
      ) : null}

      {error && (
        <Alert status="error" mt={4}>
          <AlertIcon />
          <Box>
            <AlertTitle>エラー</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Box>
        </Alert>
      )}

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <Flex direction="column" align="center" justify="center" minH="100vh" bg="gray.100" p={4}>
            <Box position="relative" rounded="lg" overflow="hidden" bg="white" shadow="md">
              <ModalBody>
                <Suspense fallback={<Loading />}>
                  {responseData && (
                    <VStack spacing={4} align="center" bg="white" p={6} rounded="lg" shadow="lg" textAlign="center">
                      <Text size="5xl" fontWeight="bold">こんにちは</Text>
                      <Image src={responseData.image} alt="Processed" maxW="full" borderRadius="md" style={{ borderRadius: '8px' }} />
                      {responseData.predicted_age === 0 ? (
                        <FormControl>
                          <FormLabel>年齢を入力してください</FormLabel>
                          <Input
                            type="number"
                            value={manualAge ?? ''}
                            onChange={(e) => setManualAge(parseInt(e.target.value))}
                          />
                          <Button mt={4} colorScheme="blue" onClick={handleAgeSubmit}>送信</Button>
                        </FormControl>
                      ) : (
                        <Text fontSize="lg">あなたは{responseData.predicted_age}代です</Text>
                      )}
                    </VStack>
                  )}
                </Suspense>
              </ModalBody>
            </Box>
          </Flex>
        </ModalContent>
      </Modal>
    </Box>
  );
}
