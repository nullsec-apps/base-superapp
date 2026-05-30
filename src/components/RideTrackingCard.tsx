import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Phone, MessageCircle, Check } from 'lucide-react';
import { drivers } from '../lib/sampleData';

export default function RideTrackingCard({ onArrive }: { onArrive?: () => void }) {
  const [progress, setProgress] = useState(8);
  const [eta, setEta] = useState(3);
  const driver = drivers[0];
  useEffect(() => {
    const t = setInterval(() => setProgress((p) => Math.min(100, p + 6)), 600);
    const e = setInterval(() => setEta((x) => Math.max(0, x - 1)), 2000);
    return () => { clearInterval(t); clearInterval(e); };
  }, []);
  const arrived = progress >= 100;
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
      <div className="rounded-3xl bg-[#0C1410] border border-white/5 p-4">
        <div className="flex items-center justify-between mb-3">
          <Badge className={arrived ? 'bg-[#3DF08C] text-[#0C1410]' : 'bg-[#FF7A45]/15 text-[#FF7A45]'}>{arrived ? 'Arrived' : `${eta} min away`}</Badge>
          <span className="text-xs text-[#7A8C7F]">{driver.plate}</span>
        </div>
        <Progress value={progress} className="h-2 bg-white/10" />
        <div className="flex items-center gap-3 mt-4">
          <Avatar className="w-12 h-12"><AvatarImage src={driver.avatar} /><AvatarFallback>AR</AvatarFallback></Avatar>
          <div className="flex-1"><div className="font-bold text-[#F2F7F1] text-sm">{driver.name}</div><div className="text-xs text-[#7A8C7F] flex items-center gap-1"><Star size={11} className="text-[#FF7A45]" fill="#FF7A45" /> {driver.rating} · {driver.vehicle}</div></div>
          <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[#3DF08C] hover:bg-white/10 transition-all duration-200"><Phone size={16} /></button>
          <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[#3DF08C] hover:bg-white/10 transition-all duration-200"><MessageCircle size={16} /></button>
        </div>
      </div>
      {arrived && (
        <Button onClick={onArrive} className="w-full h-12 rounded-2xl bg-[#3DF08C] text-[#0C1410] font-bold transition-all duration-200"><Check size={18} className="mr-2" /> Ride complete · Settled in 1.2s</Button>
      )}
    </motion.div>
  );
}
