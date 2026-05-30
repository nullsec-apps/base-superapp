import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { MapPin, Navigation, X, Bike, Star } from 'lucide-react';
import { drivers } from '../lib/sampleData';
import { useSendUSDC } from '../hooks/useSendUSDC';
import { usd } from '../lib/usdc';
import RideTrackingCard from './RideTrackingCard';

interface MoveSheetProps { open: boolean; onClose: () => void; }

export default function MoveSheet({ open, onClose }: MoveSheetProps) {
  const [pickup, setPickup] = useState('Jalan Tun Razak');
  const [dest, setDest] = useState('Bukit Bintang');
  const [phase, setPhase] = useState<'plan' | 'matching' | 'tracking'>('plan');
  const { send } = useSendUSDC();
  const fare = 2.4;
  const driver = drivers[0];

  const hail = () => {
    send({ kind: 'ride', label: `Ride to ${dest}`, amount: fare, dir: 'out' });
    setPhase('matching');
    setTimeout(() => setPhase('tracking'), 1800);
  };
  const reset = () => { setPhase('plan'); onClose(); };

  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 flex justify-center bg-black/70">
          <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', damping: 30, stiffness: 280 }} className="w-full max-w-[480px] mt-auto h-[88vh] bg-[#15211B] rounded-t-[32px] border-t border-white/10 flex flex-col">
            <div className="flex items-center justify-between p-4 pb-2">
              <h2 className="font-display text-xl font-bold text-[#F2F7F1] flex items-center gap-2"><Bike size={20} className="text-[#3DF08C]" /> Move</h2>
              <button onClick={reset} className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-[#7A8C7F] hover:bg-white/10 transition-all duration-200"><X size={18} /></button>
            </div>
            <div className="relative mx-4 rounded-3xl overflow-hidden h-44 border border-white/5" style={{ background: 'radial-gradient(circle at 30% 30%, #1c2e24, #0C1410)' }}>
              <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'linear-gradient(#3DF08C22 1px,transparent 1px),linear-gradient(90deg,#3DF08C22 1px,transparent 1px)', backgroundSize: '28px 28px' }} />
              <div className="absolute left-[25%] top-[35%]"><MapPin size={22} className="text-[#3DF08C]" fill="#3DF08C" /></div>
              <div className="absolute right-[25%] bottom-[30%]"><Navigation size={22} className="text-[#FF7A45]" fill="#FF7A45" /></div>
              <svg className="absolute inset-0 w-full h-full"><line x1="28%" y1="42%" x2="72%" y2="68%" stroke="#3DF08C" strokeWidth="2" strokeDasharray="6 6" /></svg>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {phase === 'plan' && (
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
                  <div className="rounded-2xl bg-[#0C1410] border border-white/5 p-3 space-y-2">
                    <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#3DF08C]" /><Input value={pickup} onChange={(e) => setPickup(e.target.value)} className="h-11 bg-transparent border-0 text-[#F2F7F1] px-1" placeholder="Pickup" /></div>
                    <div className="h-px bg-white/5 ml-1" />
                    <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#FF7A45]" /><Input value={dest} onChange={(e) => setDest(e.target.value)} className="h-11 bg-transparent border-0 text-[#F2F7F1] px-1" placeholder="Destination" /></div>
                  </div>
                  <div className="rounded-2xl bg-[#0C1410] border border-white/5 p-4 flex items-center gap-3">
                    <Avatar className="w-12 h-12"><AvatarImage src={driver.avatar} /><AvatarFallback>AR</AvatarFallback></Avatar>
                    <div className="flex-1"><div className="font-bold text-[#F2F7F1] text-sm">{driver.name}</div><div className="text-xs text-[#7A8C7F] flex items-center gap-1"><Star size={11} className="text-[#FF7A45]" fill="#FF7A45" /> {driver.rating} · {driver.vehicle} · {driver.eta} min</div></div>
                    <div className="text-right"><div className="font-display text-xl font-bold text-[#3DF08C]">{usd(fare)}</div><div className="text-[10px] text-[#7A8C7F]">USDC fare</div></div>
                  </div>
                  <Button onClick={hail} className="w-full h-14 rounded-2xl bg-[#3DF08C] text-[#0C1410] font-bold text-base transition-all duration-200">Pay {usd(fare)} & Hail</Button>
                </motion.div>
              )}
              {phase === 'matching' && (
                <div className="space-y-3">
                  <div className="text-center py-4"><span className="inline-block w-12 h-12 rounded-full border-4 border-[#3DF08C]/20 border-t-[#3DF08C] animate-spin" /><p className="mt-3 text-sm text-[#7A8C7F]">Matching nearby driver…</p></div>
                  <Skeleton className="h-20 rounded-2xl bg-white/5" />
                </div>
              )}
              {phase === 'tracking' && <RideTrackingCard onArrive={reset} />}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
