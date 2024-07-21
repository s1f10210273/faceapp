"use client"

import { useState } from 'react'
import { Box, Text, Button, VStack, HStack, Divider, Heading, ChakraProvider } from '@chakra-ui/react'
import Link from 'next/link'

interface MenuItem {
  id: number
  name: string
  description: string
  price: number
  image: string
}

export default function Cart() {
  const [cart, setCart] = useState<MenuItem[]>([
    { id: 1, name: 'ハンバーガー', description: 'ジューシーなビーフパティのハンバーガー', price: 800, image: 'https://placehold.jp/300x300.png' }
  ])

  const totalPrice = cart.reduce((total, item) => total + item.price, 0)

  return (
    <ChakraProvider>
      <Box minH="100vh" bg="blue.50" p={6}>
        <Heading as="h1" size="2xl" color="blue.700" textAlign="center" mb={8}>
          カート
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
          {cart.map(item => (
            <Box key={item.id} p={4} bg="white">
              <HStack justifyContent="space-between">
                <Text fontSize="lg" fontWeight="bold">{item.name}</Text>
                <Text fontSize="lg" fontWeight="bold">¥{item.price}</Text>
              </HStack>
            </Box>
          ))}
          <Divider />
          <HStack justifyContent="space-between" fontSize="xl" fontWeight="bold">
            <Text>合計</Text>
            <Text>¥{totalPrice}</Text>
          </HStack>
          <Link href="/checkout">
            <Button colorScheme="blue" w="full" mt={4}>
              会計へ進む
            </Button>
          </Link>
        </VStack>
      </Box>
    </ChakraProvider>
  )
}
