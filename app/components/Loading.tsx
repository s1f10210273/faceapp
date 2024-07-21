import React from 'react';
import { Box, Spinner, Flex, ChakraProvider } from '@chakra-ui/react';

export default function Loading() {
  return (
    <ChakraProvider>
      <Flex alignItems="center" justifyContent="center" minH="100vh">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Flex>
    </ChakraProvider>
  );
}


