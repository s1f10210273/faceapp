"use client"

import { useState } from 'react'
import { Box, Image, Text, Button, Grid, Flex, Heading, ChakraProvider, IconButton } from '@chakra-ui/react'
import { MdShoppingCart } from 'react-icons/md'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface MenuItem {
  id: number
  name: string
  description: string
  price: number
  image: string
}

const menuItems: MenuItem[] = [
  { id: 1, name: 'ハンバーガー', description: 'ジューシーなビーフパティのハンバーガー', price: 800, image: 'https://placehold.jp/300x300.png' },
  { id: 2, name: 'フライドポテト', description: 'サクサクのフライドポテト', price: 400, image: 'https://placehold.jp/300x300.png' },
  { id: 3, name: 'シーザーサラダ', description: '新鮮なレタスとクリーミーなドレッシング', price: 600, image: 'https://placehold.jp/300x300.png' },
]

const MotionBox = motion(Box)

export default function Home() {
  const [cart, setCart] = useState<MenuItem[]>([])

  const addToCart = (item: MenuItem) => {
    setCart([...cart, item])
  }

  return (
    <ChakraProvider>
      <Box minH="100vh" bg="blue.50" p={6}>
        <Flex justifyContent="space-between" alignItems="center" mb={8}>
          <Heading as="h1" size="2xl" color="blue.700">
            メニュー
          </Heading>
          <Link href="/cart">
            <IconButton
              icon={<MdShoppingCart />}
              aria-label="カートを見る"
              size="lg"
              variant="outline"
              colorScheme="blue"
              fontSize="2xl"
            />
          </Link>
        </Flex>
        
        <Grid templateColumns={{ base: "1fr", sm: "1fr 1fr", lg: "repeat(3, 1fr)" }} gap={10}>
          {menuItems.map(item => (
            <MotionBox
              key={item.id}
              position="relative"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              overflow="hidden"
              borderRadius="lg"
              boxShadow="lg"
            >
              <Image src={item.image} alt={item.name} w="full" h="400px" objectFit="cover" />
              <Box position="absolute" bottom="0" left="0" w="full" bg="rgba(100, 100, 100, 0.6)" color="white" p={4}>
                <Text fontSize="xl" fontWeight="bold">{item.name}</Text>
                <Text fontSize="sm">{item.description}</Text>
                <Text fontSize="lg" fontWeight="bold">¥{item.price}</Text>
                <Button 
                  colorScheme="blue"
                  onClick={() => addToCart(item)}
                  w="full"
                  mt={2}
                  size="md"
                  fontSize="md"
                >
                  注文する
                </Button>
              </Box>
            </MotionBox>
          ))}
        </Grid>
      </Box>
    </ChakraProvider>
  )
}
