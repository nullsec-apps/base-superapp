import { Bike, MessageCircle, QrCode, Repeat } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useHaptics } from '../hooks/useHaptics';
import { useSendUSDC } from '../hooks/useSendUSDC';
import { cn } from '../lib/utils';

interface ServiceRailProps { onOpen: (s: 'move' | 'chat' | 'pay') => void; }

const tiles = [
  { id: 'move' as const, label: 'Move', sub: 'Hail a ride', icon: Bike, color: '#3DF08C', quick: 'Rebook · Ride to Bukit $2.40' },
  { id: 'chat' as const, label: 'Chat', sub: '2 unread', icon: MessageCircle, color: '#FF7A45', quick: 'Message Aiman R.' },
  { id: 'pay' as const, label: 'Pay', sub: 'Scan or send', icon: QrCode, color: '#3DF08C', quick: 'Repay · Warung Bukit $4.80' },
];

export default function ServiceRail({ onOpen }: ServiceRailProps) {
  const { tap } = useHaptics();
  const { send } = useSendUSDC();
  const [menu, setMenu] = useState<string | null>(null);

  return (
    <div className="px-3 pt-2">
      <div className="flex items-baseline justify-between px-1 mb-2">
        <h2 className="font-display text-xl font-bold text-[#F2F7F1]">Move. Chat. Pay.</h2>
        <span className="text-[11px] text-[#7A8C7F]">swipe →</span>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1 snap-x scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
        {tiles.map((t, i) => {
          const Icon = t.icon;
          return (
            <motion.button
              key={t.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              onClick={() => { tap(); onOpen(t.id); }}
              onContextMenu={(e) => { e.preventDefault(); setMenu(menu === t.id ? null : t.id); }}
              className={cn('snap-start shrink-0 w-[150px] h-[150px] rounded-3xl p-4 flex flex-col justify-between text-left relative overflow-hidden border border-white/5 active:scale-95 transition-all duration-200 hover:border-white/15', 'bg-[#15211B]')}
            >
              <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full blur-2xl opacity-20" style={{ background: t.color }} />
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: t.color + '22' }}>
                <Icon size={24} strokeWidth={2} style={{ color: t.color }} />
              </div>
              <div>
                <div className="font-display text-2xl font-bold text-[#F2F7F1]">{t.label}</div>
                <div className="text-[12px] text-[#7A8C7F]">{t.sub}</div>
              </div>
              {menu === t.id && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} onClick={(e) => { e.stopPropagation(); setMenu(null); if (t.id === 'move') send({ kind: 'ride', label: 'Rebook · Ride to Bukit', amount: 2.4, dir: 'out' }); if (t.id === 'pay') send({ kind: 'merchant', label: 'Repay · Warung Bukit', amount: 4.8, dir: 'out' }); }} className="absolute inset-0 bg-black/85 flex flex-col items-center justify-center gap-2 p-3 backdrop-blur-sm">
                  <Repeat size={20} className="text-[#3DF08C]" />
                  <span className="text-[11px] text-center text-[#F2F7F1] font-medium leading-tight">{t.quick}</span>
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
