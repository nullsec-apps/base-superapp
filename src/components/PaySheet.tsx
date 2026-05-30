import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { X, QrCode, Store, Send } from 'lucide-react';
import { merchants } from '../lib/sampleData';
import { useSendUSDC } from '../hooks/useSendUSDC';
import { usd } from '../lib/usdc';
import AmountKeypad from './AmountKeypad';
import QRScanner from './QRScanner';

interface PaySheetProps { open: boolean; onClose: () => void; }

export default function PaySheet({ open, onClose }: PaySheetProps) {
  const [amount, setAmount] = useState('0');
  const [merchant, setMerchant] = useState(merchants[0]);
  const [peer, setPeer] = useState('');
  const { send } = useSendUSDC();
  const amt = parseFloat(amount) || 0;

  const payMerchant = () => { if (amt <= 0) return; send({ kind: 'merchant', label: merchant.name, amount: amt, dir: 'out' }); setAmount('0'); onClose(); };
  const sendPeer = () => { if (amt <= 0 || !peer) return; send({ kind: 'merchant', label: `To ${peer}`, amount: amt, dir: 'out' }); setAmount('0'); setPeer(''); onClose(); };

  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 flex justify-center bg-black/70">
          <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', damping: 30, stiffness: 280 }} className="w-full max-w-[480px] mt-auto h-[90vh] bg-[#15211B] rounded-t-[32px] border-t border-white/10 flex flex-col">
            <div className="flex items-center justify-between p-4 pb-2">
              <h2 className="font-display text-xl font-bold text-[#F2F7F1] flex items-center gap-2"><QrCode size={20} className="text-[#3DF08C]" /> Pay</h2>
              <button onClick={onClose} className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-[#7A8C7F] hover:bg-white/10 transition-all duration-200"><X size={18} /></button>
            </div>
            <Tabs defaultValue="scan" className="flex-1 flex flex-col overflow-hidden px-4">
              <TabsList className="bg-[#0C1410] rounded-2xl p-1 h-12 w-full">
                <TabsTrigger value="scan" className="flex-1 rounded-xl data-[state=active]:bg-[#3DF08C] data-[state=active]:text-[#0C1410] text-[#7A8C7F]">Scan</TabsTrigger>
                <TabsTrigger value="merchant" className="flex-1 rounded-xl data-[state=active]:bg-[#3DF08C] data-[state=active]:text-[#0C1410] text-[#7A8C7F]">Merchant</TabsTrigger>
                <TabsTrigger value="send" className="flex-1 rounded-xl data-[state=active]:bg-[#3DF08C] data-[state=active]:text-[#0C1410] text-[#7A8C7F]">Send</TabsTrigger>
              </TabsList>
              <div className="flex-1 overflow-y-auto py-4">
                <TabsContent value="scan" className="mt-0"><QRScanner /></TabsContent>
                <TabsContent value="merchant" className="mt-0 space-y-3">
                  <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
                    {merchants.map((m) => (
                      <button key={m.id} onClick={() => setMerchant(m)} className={`shrink-0 flex items-center gap-2 px-3 py-2 rounded-2xl border transition-all duration-200 ${merchant.id === m.id ? 'border-[#3DF08C] bg-[#3DF08C]/10' : 'border-white/5 bg-[#0C1410] hover:border-white/15'}`}>
                        <Avatar className="w-8 h-8"><AvatarImage src={m.avatar} /><AvatarFallback>{m.name[0]}</AvatarFallback></Avatar>
                        <div className="text-left"><div className="text-xs font-bold text-[#F2F7F1]">{m.name}</div><div className="text-[10px] text-[#7A8C7F]">{m.category} · {m.distance}</div></div>
                      </button>
                    ))}
                  </div>
                  <div className="text-center py-2"><div className="font-display text-4xl font-extrabold text-[#F2F7F1]">{usd(amt)}</div><div className="text-xs text-[#7A8C7F] flex items-center justify-center gap-1 mt-1"><Store size={12} /> {merchant.name}</div></div>
                  <AmountKeypad value={amount} onChange={setAmount} />
                  <Button onClick={payMerchant} className="w-full h-14 rounded-2xl bg-[#3DF08C] text-[#0C1410] font-bold transition-all duration-200">Pay {usd(amt)}</Button>
                </TabsContent>
                <TabsContent value="send" className="mt-0 space-y-3">
                  <Input value={peer} onChange={(e) => setPeer(e.target.value)} placeholder="@username or 0x address" className="h-12 bg-[#0C1410] border-white/10 text-[#F2F7F1] rounded-2xl" />
                  <div className="text-center py-2"><div className="font-display text-4xl font-extrabold text-[#F2F7F1]">{usd(amt)}</div></div>
                  <AmountKeypad value={amount} onChange={setAmount} />
                  <Button onClick={sendPeer} className="w-full h-14 rounded-2xl bg-[#3DF08C] text-[#0C1410] font-bold transition-all duration-200"><Send size={18} className="mr-2" /> Send {usd(amt)}</Button>
                </TabsContent>
              </div>
            </Tabs>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
