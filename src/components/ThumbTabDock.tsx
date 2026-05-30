import { Bike, MessageCircle, QrCode, User } from 'lucide-react';
import { useHaptics } from '../hooks/useHaptics';
import { cn } from '../lib/utils';
import { motion } from 'framer-motion';

interface ThumbTabDockProps { active: string; onTab: (t: 'move' | 'chat' | 'pay' | 'me') => void; }

const tabs = [
  { id: 'move' as const, label: 'Move', icon: Bike },
  { id: 'chat' as const, label: 'Chat', icon: MessageCircle },
  { id: 'pay' as const, label: 'Pay', icon: QrCode },
  { id: 'me' as const, label: 'Me', icon: User },
];

export default function ThumbTabDock({ active, onTab }: ThumbTabDockProps) {
  const { tap } = useHaptics();
  return (
    <div className="absolute bottom-0 left-0 right-0 z-30 px-3 pb-4 pt-2 bg-gradient-to-t from-[#0C1410] via-[#0C1410] to-transparent">
      <div className="flex items-center justify-around bg-[#15211B] rounded-3xl border border-white/10 px-2 py-2 shadow-[0_8px_40px_rgba(0,0,0,0.5)]">
        {tabs.map((t) => {
          const Icon = t.icon;
          const on = active === t.id;
          return (
            <button key={t.id} onClick={() => { tap(); onTab(t.id); }} className="relative flex flex-col items-center gap-0.5 px-4 py-1.5 min-w-[60px]">
              {on && <motion.div layoutId="dock-glow" className="absolute inset-0 rounded-2xl bg-[#3DF08C]/12" />}
              <Icon size={22} className={cn('relative transition-colors duration-200', on ? 'text-[#3DF08C]' : 'text-[#7A8C7F]')} strokeWidth={on ? 2.2 : 1.8} />
              <span className={cn('relative text-[10px] font-medium', on ? 'text-[#3DF08C]' : 'text-[#7A8C7F]')}>{t.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
