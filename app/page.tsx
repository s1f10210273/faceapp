"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import TakePicture from './components/TakePicture';
import { Box, Text, Image, Spinner, Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react';

export default function Home() {
  const router = useRouter();
  const [camOn, setCamOn] = useState<boolean>(true);
  const [responseData, setResponseData] = useState<{ image: string; message: string; predicted_age: number } | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleCaptureImage = async (capturedImageSrc: string) => {
    setCamOn(false);
    setLoading(true);
    sendImage(capturedImageSrc);
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
        if (data.predicted_age > 60) {
          router.push('/over60');
        } else {
          router.push('/young');
        }
      } else {
        throw new Error('Failed to fetch');
      }
    } catch (error) {
      console.error('Error uploading image', error);
      setError('画像のアップロード中にエラーが発生しました。');
    } finally {
      setLoading(false);
    }
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

      {responseData && !loading && (
        <Box textAlign="center" mt={4}>
          <Image src={responseData.image} alt="Processed" maxW="md" mx="auto" borderRadius="lg" />
          <Text mt={2} fontSize="lg">
            あなたは{responseData.predicted_age}代です
          </Text>
        </Box>
      )}
    </Box>
  );
}
