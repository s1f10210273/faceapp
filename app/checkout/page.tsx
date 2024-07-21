"use client"

import { Box, Text, Button, VStack, ChakraProvider, Heading, Stack } from '@chakra-ui/react'
import { useState } from 'react'

interface MenuItem {
  id: number
  name: string
  description: string
  price: number
  image: string
}

export default function Checkout() {
  const [cart, setCart] = useState<MenuItem[]>([
    { id: 1, name: 'ハンバーガー', description: 'ジューシーなビーフパティのハンバーガー', price: 800, image: 'https://placehold.jp/300x300.png' }
  ])

  const totalPrice = cart.reduce((total, item) => total + item.price, 0)

  const handleCheckout = () => {
    alert("注文が確定されました。")
  }

  return (
    <ChakraProvider>
      <Box minH="100vh" bg="blue.50" p={6}>
        <Heading as="h1" size="2xl" color="blue.700" textAlign="center" mb={8}>
          会計
        </Heading>
        <VStack
          spacing={4}
          align="center"
          maxW="600px"
          mx="auto"
          bg="white"
          p={6}
          rounded="lg"
          shadow="lg"
        >
            <Text fontSize="xl" fontWeight="bold" >合計 ¥{totalPrice}</Text>
          <Button colorScheme="blue" w="full" mt={4} onClick={handleCheckout}>
            注文を確定する
          </Button>
        </VStack>
      </Box>
    </ChakraProvider>
  )
}
