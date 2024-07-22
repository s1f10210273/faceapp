"use client"

import { useState } from 'react'
import { Box, Image, Text, Button, Grid, Flex, Heading, VStack, ChakraProvider, IconButton } from '@chakra-ui/react'
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
  { id: 1, name: 'ハンバーガー', description: 'ジューシーなビーフパティのハンバーガー', price: 800, image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgujVNYlDUUQ7Lp8k9ahcr6gzPjDs0h_8QpLJ4MfvLv54yPzr77jxo-AsL1Da3j673fOLWmk29VUB8Z7aFn1pb0FEdoBv8HDDNj_tx3J4JPjvL7okazprqSeg9miTJdwvlKwmhv-0EPwM6r/s400/food_hamburger.png' },
  { id: 2, name: 'フライドポテト', description: 'サクサクのフライドポテト', price: 400, image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhZTQY6nHBE5zNXX8GxOUJOnZKSq6rib90CGxczSZK0N6mcacSC_-24KJbIIbDBdR6-hWWw3m8EhKKAj1HNrikaVeSXuoPAafwmwJchURjb5ym4aylJN6Ew4qbuJDnHvfGKB4k5p9wi5-LZ/s400/food_frenchfry.png' },
  { id: 3, name: 'シーザーサラダ', description: '新鮮なレタスとクリーミーなドレッシング', price: 600, image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj6IhHRwn9JqoA5hcmpLBYTP8d6XBhRT0vXIj8opFaL5dBPWYCOUrieopcLU36xxo9hBZBQrgl_KaHVOr8R08aCMA6OT3Qk3KfT7oNHFgn0-9CuCVjZEz9S6aXzpci6raJdlDWljnezBelZ/s400/salad_reisyabu.png' },
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
          <Heading as="h1" size="xl" color="blue.700">
            メニュー
          </Heading>
          <Link href="/cart">
            <IconButton
              icon={<MdShoppingCart />}
              aria-label="カートを見る"
              size="lg"
              variant="outline"
              colorScheme="blue"
            />
          </Link>
        </Flex>
        
        <Grid templateColumns={{ base: "1fr", sm: "1fr 1fr", lg: "repeat(3, 1fr)" }} gap={8}>
          {menuItems.map(item => (
            <MotionBox
              key={item.id}
              bg="white"
              p={4}
              rounded="lg"
              shadow="lg"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Image src={item.image} alt={item.name} w="full" h="200px" objectFit="cover" rounded="md" mb={4} />
              <VStack align="start" spacing={2}>
                <Text fontSize="xl" fontWeight="bold" color="blue.800">{item.name}</Text>
                <Text>{item.description}</Text>
                <Text fontSize="lg" fontWeight="bold" color="blue.900">¥{item.price}</Text>
                <Button 
                  colorScheme="blue"
                  onClick={() => addToCart(item)}
                  w="full"
                  mt={2}
                >
                  注文する
                </Button>
              </VStack>
            </MotionBox>
          ))}
        </Grid>
      </Box>
    </ChakraProvider>
  )
}
