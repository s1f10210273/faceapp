"use client"

import { useState } from 'react'

interface MenuItem {
  id: number
  name: string
  description: string
  price: number
  image: string
}

const menuItems: MenuItem[] = [
  { id: 1, name: 'ハンバーガー', description: 'ジューシーなビーフパティのハンバーガー', price: 800, image: 'https://placehold.jp/150x150.png' },
  { id: 2, name: 'フライドポテト', description: 'サクサクのフライドポテト', price: 400, image: 'https://placehold.jp/150x150.png' },
  { id: 3, name: 'シーザーサラダ', description: '新鮮なレタスとクリーミーなドレッシング', price: 600, image: 'https://placehold.jp/150x150.png' },
]


export default function Home() {
  const [cart, setCart] = useState<MenuItem[]>([])

  const addToCart = (item: MenuItem) => {
    setCart([...cart, item])
  }

  const totalPrice = cart.reduce((total, item) => total + item.price, 0)

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="text-center mb-6">
        <h1 className="text-5xl font-bold text-red-600">メニュー</h1>
      </header>

      <main>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map(item => (
            <div key={item.id} className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <img src={item.image} alt={item.name} className="w-full h-48 object-cover rounded-t-lg mb-4" />
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">{item.name}</h2>
              <p className="text-gray-600 mb-2">{item.description}</p>
              <p className="text-xl font-bold text-gray-900 mb-4">¥{item.price}</p>
              <button 
                onClick={() => addToCart(item)} 
                className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                注文する
              </button>
            </div>
          ))}
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 w-full bg-gray-800 text-white py-4 flex justify-between px-6">
        <div className="text-lg font-semibold">カート合計: ¥{totalPrice}</div>
        <button 
          disabled={cart.length === 0}
          className={`px-4 py-2 ${cart.length === 0 ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'} rounded-lg transition-colors`}
        >
          注文を確定する
        </button>
      </footer>
    </div>
  )
}
