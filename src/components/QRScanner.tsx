import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { useWallet } from '../hooks/useWallet';
import { truncAddr } from '../lib/format';

export default function QRScanner() {
  const { address } = useWallet();
  const [tab, setTab] = useState('scan');
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&bgcolor=15211B&color=3DF08C&data=${encodeURIComponent('ethereum:' + address + '@8453')}`;
  return (
    <Tabs value={tab} onValueChange={setTab}>
      <TabsList className="bg-[#0C1410] rounded-2xl p-1 h-11 w-full mb-3">
        <TabsTrigger value="scan" className="flex-1 rounded-xl data-[state=active]:bg-[#3DF08C] data-[state=active]:text-[#0C1410] text-[#7A8C7F]">Scan to pay</TabsTrigger>
        <TabsTrigger value="mine" className="flex-1 rounded-xl data-[state=active]:bg-[#3DF08C] data-[state=active]:text-[#0C1410] text-[#7A8C7F]">My QR</TabsTrigger>
      </TabsList>
      <TabsContent value="scan" className="mt-0">
        <div className="relative mx-auto w-full aspect-square max-w-[280px] rounded-3xl overflow-hidden bg-black border border-white/10">
          <div className="absolute inset-0" style={{ background: 'radial-gradient(circle, #1c2e24 0%, #000 80%)' }} />
          <div className="absolute inset-8 border-2 border-[#3DF08C]/40 rounded-2xl">
            {[0, 1, 2, 3].map((c) => <div key={c} className="absolute w-5 h-5 border-[#3DF08C]" style={{ top: c < 2 ? -2 : 'auto', bottom: c >= 2 ? -2 : 'auto', left: c % 2 === 0 ? -2 : 'auto', right: c % 2 === 1 ? -2 : 'auto', borderTopWidth: c < 2 ? 3 : 0, borderBottomWidth: c >= 2 ? 3 : 0, borderLeftWidth: c % 2 === 0 ? 3 : 0, borderRightWidth: c % 2 === 1 ? 3 : 0 }} />)}
          </div>
          <motion.div animate={{ top: ['12%', '88%', '12%'] }} transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }} className="absolute left-8 right-8 h-0.5 bg-[#3DF08C] shadow-[0_0_12px_#3DF08C]" />
        </div>
        <p className="text-center text-xs text-[#7A8C7F] mt-3">Point at a merchant QR to pay in USDC</p>
      </TabsContent>
      <TabsContent value="mine" className="mt-0">
        <div className="flex flex-col items-center">
          <div className="p-4 rounded-3xl bg-[#0C1410] border border-white/10"><img src={qrUrl} alt="QR" className="w-44 h-44 rounded-xl" /></div>
          <p className="text-sm font-bold text-[#F2F7F1] mt-3">Scan to send me USDC</p>
          <p className="text-xs text-[#7A8C7F] mt-1">{truncAddr(address)} · Base</p>
        </div>
      </TabsContent>
    </Tabs>
  );
}
