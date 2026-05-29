import { useState } from 'react';
import { useOSStore } from '@/store/osStore';
import * as Icons from 'lucide-react';

export default function CardPay() {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [amount, setAmount] = useState('');
  const [processing, setProcessing] = useState(false);
  const addNotification = useOSStore(s => s.addNotification);

  const handlePayment = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      addNotification({ title: 'Payment Successful', message: `$${amount} charged successfully`, type: 'success' });
      setAmount('');
    }, 2000);
  };

  return (
    <div className="w-full h-full bg-zinc-900 text-zinc-200 overflow-auto">
      <div className="max-w-sm mx-auto p-6">
        <h2 className="text-xl font-semibold mb-6 text-center">Card Payment</h2>

        {/* Card Visual */}
        <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-5 mb-6 shadow-xl">
          <div className="flex justify-between items-start mb-8">
            <Icons.CreditCard size={32} className="text-white/80" />
            <span className="text-white/60 text-sm font-medium">VISA</span>
          </div>
          <div className="text-white text-xl font-mono tracking-widest mb-4">
            {cardNumber || '#### #### #### ####'}
          </div>
          <div className="flex justify-between">
            <div>
              <div className="text-white/60 text-[10px] uppercase">Card Holder</div>
              <div className="text-white text-sm">USER NAME</div>
            </div>
            <div>
              <div className="text-white/60 text-[10px] uppercase">Expires</div>
              <div className="text-white text-sm">{expiry || 'MM/YY'}</div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm text-zinc-500">Card Number</label>
            <input value={cardNumber} onChange={e => setCardNumber(e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim())} maxLength={19} placeholder="1234 5678 9012 3456" className="w-full mt-1 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 font-mono" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm text-zinc-500">Expiry</label>
              <input value={expiry} onChange={e => setExpiry(e.target.value)} placeholder="MM/YY" maxLength={5} className="w-full mt-1 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2" />
            </div>
            <div>
              <label className="text-sm text-zinc-500">CVV</label>
              <input type="password" value={cvv} onChange={e => setCvv(e.target.value)} placeholder="***" maxLength={3} className="w-full mt-1 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2" />
            </div>
          </div>
          <div>
            <label className="text-sm text-zinc-500">Amount ($)</label>
            <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="0.00" className="w-full mt-1 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-lg font-medium" />
          </div>
          <button onClick={handlePayment} disabled={processing} className="w-full py-3 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 disabled:opacity-50">
            {processing ? 'Processing...' : `Pay $${amount || '0.00'}`}
          </button>
        </div>
      </div>
    </div>
  );
}
