"use client"

import { useState } from 'react'
import { MdShoppingCart } from 'react-icons/md'

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

export default function Home() {
  const [cart, setCart] = useState<MenuItem[]>([])

  const addToCart = (item: MenuItem) => {
    setCart([...cart, item])
  }

  const totalPrice = cart.reduce((total, item) => total + item.price, 0)

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="text-center mb-8">
        <h1 className="text-6xl font-bold text-red-700 mb-4">メニュー</h1>
        <div className="text-xl font-semibold text-gray-700">
          <MdShoppingCart className="inline mr-2 text-3xl" />
          カートに {cart.length} アイテム
        </div>
      </header>

      <main>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuItems.map(item => (
            <div key={item.id} className="relative bg-white rounded-lg shadow-lg overflow-hidden border border-gray-300">
              <img src={item.image} alt={item.name} className="w-full h-64 object-cover" />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4">
                <h2 className="text-3xl font-bold text-white mb-2">{item.name}</h2>
                <p className="text-lg text-gray-200 mb-4">{item.description}</p>
                <p className="text-2xl font-bold text-yellow-400 mb-4">¥{item.price}</p>
                <button 
                  onClick={() => addToCart(item)} 
                  className="w-full px-4 py-2 bg-red-600 text-white text-xl font-bold rounded-lg hover:bg-red-700 transition-colors">
                  注文する
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 w-full bg-gray-800 text-white py-6 flex justify-between px-8">
        <div className="text-xl font-bold flex items-center">
          <MdShoppingCart className="mr-3 text-3xl" />
          カート合計: ¥{totalPrice}
        </div>
        <button 
          disabled={cart.length === 0}
          className={`px-8 py-4 text-xl font-bold ${cart.length === 0 ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'} rounded-lg transition-colors`}
        >
          注文を確定する
        </button>
      </footer>
    </div>
  )
}
