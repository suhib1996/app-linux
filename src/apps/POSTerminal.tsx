import { useState } from 'react';
import { useOSStore } from '@/store/osStore';
import * as Icons from 'lucide-react';

export default function POSTerminal() {
  const [cart, setCart] = useState<{ name: string; price: number; qty: number }[]>([]);
  const [showReceipt, setShowReceipt] = useState(false);
  const addNotification = useOSStore(s => s.addNotification);

  const products = [
    { name: 'Coffee', price: 4.50 }, { name: 'Sandwich', price: 8.99 },
    { name: 'Salad', price: 12.50 }, { name: 'Smoothie', price: 6.99 },
    { name: 'Pastry', price: 3.99 }, { name: 'Water', price: 2.00 },
    { name: 'Juice', price: 5.50 }, { name: 'Cookie', price: 2.50 },
    { name: 'Muffin', price: 3.50 }, { name: 'Tea', price: 3.00 },
    { name: 'Bagel', price: 3.99 }, { name: 'Yogurt', price: 4.99 },
  ];

  const addToCart = (product: { name: string; price: number }) => {
    const existing = cart.find(i => i.name === product.name);
    if (existing) {
      setCart(cart.map(i => i.name === product.name ? { ...i, qty: i.qty + 1 } : i));
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
    }
  };

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  const handleCheckout = () => {
    setShowReceipt(true);
    addNotification({ title: 'Payment Complete', message: `$${total.toFixed(2)} received`, type: 'success' });
  };

  if (showReceipt) {
    return (
      <div className="w-full h-full bg-zinc-900 text-zinc-200 flex items-center justify-center">
        <div className="bg-zinc-800 rounded-xl p-6 text-center space-y-4">
          <Icons.CheckCircle size={48} className="text-green-400 mx-auto" />
          <h3 className="text-xl font-semibold">Payment Successful!</h3>
          <div className="text-3xl font-bold">${total.toFixed(2)}</div>
          <div className="text-sm text-zinc-500">{new Date().toLocaleString()}</div>
          <button onClick={() => { setShowReceipt(false); setCart([]); }} className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">New Order</button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex bg-zinc-900 text-zinc-200">
      {/* Products */}
      <div className="flex-1 p-4 overflow-auto">
        <div className="grid grid-cols-3 gap-3">
          {products.map(p => (
            <button key={p.name} onClick={() => addToCart(p)} className="bg-zinc-800 rounded-xl p-4 hover:bg-zinc-700 transition-colors text-left">
              <div className="font-medium">{p.name}</div>
              <div className="text-sm text-zinc-500">${p.price.toFixed(2)}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Cart */}
      <div className="w-64 border-l border-zinc-700/50 p-4 flex flex-col">
        <h3 className="font-medium mb-3">Order</h3>
        <div className="flex-1 overflow-auto space-y-2">
          {cart.map((item, i) => (
            <div key={i} className="flex justify-between text-sm">
              <span>{item.qty}x {item.name}</span>
              <span>${(item.price * item.qty).toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className="border-t border-zinc-700 pt-3 mt-3">
          <div className="flex justify-between text-lg font-medium mb-3">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button onClick={handleCheckout} disabled={cart.length === 0} className="w-full py-3 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 disabled:opacity-50">
            Charge ${total.toFixed(2)}
          </button>
        </div>
      </div>
    </div>
  );
}
