"use client";

import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { Box, Button, ChakraProvider, Flex, IconButton } from '@chakra-ui/react';
import { MdCamera } from "react-icons/md";

interface TakePictureProps {
  onCapture: (imageSrc: string) => void;
}

const TakePicture: React.FC<TakePictureProps> = ({ onCapture }) => {
  const webcamRef = useRef<Webcam>(null);
  const [camOn, setCamOn] = useState<boolean>(false);

  const captureImage = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      onCapture(imageSrc);
    }
  };

  return (
    <Box minH="100vh" bg="blue.50" p={6}>
    <ChakraProvider>
      <Flex direction="column" align="center" justify="center" minH="100vh" bg="gray.100" p={4}>
        {camOn ? (
          <Box position="relative" rounded="lg" overflow="hidden" bg="white" shadow="md">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width={640}
              height={480}
              style={{ borderRadius: '8px' }}
            />
        <IconButton
          icon={<MdCamera />}
          aria-label="Capture Image"
          position="absolute"
          bottom={6}
          left="50%"
          transform="translateX(-50%)"
          color="white"
          onClick={captureImage}
          fontSize="5xl"
          variant="unstyled"
          _hover={{ background: 'transparent' }}
        />
          </Box>
        ) : (
          <Button colorScheme="blue" onClick={() => setCamOn(!camOn)}>
            Start Camera
          </Button>
        )}
      </Flex>
    </ChakraProvider>
    </Box>
  );
};

export default TakePicture;
