import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Gift, Bike, Store } from 'lucide-react';
import { useSendUSDC } from '../hooks/useSendUSDC';

export default function EmptyStateRail() {
  const { send } = useSendUSDC();
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="px-3 pt-4 space-y-3">
      <div className="rounded-3xl bg-[#15211B] border border-[#3DF08C]/20 p-5">
        <div className="flex items-center gap-3"><div className="w-12 h-12 rounded-2xl bg-[#3DF08C]/15 flex items-center justify-center"><Gift size={24} className="text-[#3DF08C]" /></div><div><div className="font-bold text-[#F2F7F1]">First $1 in seconds</div><div className="text-xs text-[#7A8C7F]">Claim free USDC to start</div></div></div>
        <Button onClick={() => send({ kind: 'faucet', label: 'Faucet · Welcome $1', amount: 1, dir: 'in' })} className="w-full h-12 mt-4 rounded-2xl bg-[#3DF08C] text-[#0C1410] font-bold transition-all duration-200">Claim $1 USDC</Button>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-[#15211B] border border-white/5 p-4 hover:border-white/15 transition-all duration-200"><Bike size={20} className="text-[#3DF08C] mb-2" /><div className="text-sm font-bold text-[#F2F7F1]">Ride nearby</div><div className="text-xs text-[#7A8C7F]">Bukit · $2.40</div></div>
        <div className="rounded-2xl bg-[#15211B] border border-white/5 p-4 hover:border-white/15 transition-all duration-200"><Store size={20} className="text-[#FF7A45] mb-2" /><div className="text-sm font-bold text-[#F2F7F1]">Warung Bukit</div><div className="text-xs text-[#7A8C7F]">120m · Nasi Lemak</div></div>
      </div>
    </motion.div>
  );
}
