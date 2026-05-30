import { useUSDCBalance } from '../hooks/useUSDCBalance';
import { useTransactions } from '../hooks/useTransactions';
import { usePulse } from '../hooks/usePulse';
import { usd, formatUSDC } from '../lib/usdc';
import { settleDuration } from '../lib/format';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDownLeft, ArrowUpRight, Zap } from 'lucide-react';
import { cn } from '../lib/utils';

export default function USDCPulseBar() {
  const balance = useUSDCBalance((s) => s.balance);
  const txs = useTransactions((s) => s.txs);
  const dir = usePulse((s) => s.dir);
  const last = txs[0];

  return (
    <div className="sticky top-0 z-30 px-3 pt-3 pb-2 bg-[#0C1410]">
      <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }} className="relative overflow-hidden rounded-3xl bg-[#15211B] border border-white/5 shadow-[0_8px_40px_rgba(0,0,0,0.5)]">
        <AnimatePresence>
          {dir && (
            <motion.div
              key={Date.now()}
              initial={{ x: '-100%', opacity: 0.8 }}
              animate={{ x: '100%', opacity: 0 }}
              transition={{ duration: 0.85, ease: 'easeOut' }}
              className="absolute inset-y-0 w-1/2 pointer-events-none"
              style={{
                background: `linear-gradient(90deg, transparent, ${dir === 'in' ? '#3DF08C55' : '#FF7A4555'}, transparent)`,
              }}
            />
          )}
        </AnimatePresence>
        <div className="relative px-5 pt-4 pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[#7A8C7F] text-[11px] font-medium uppercase tracking-wider">
              <Zap size={12} strokeWidth={2} className="text-[#3DF08C]" /> USDC Balance · Base
            </div>
            <div className="flex items-center gap-1 text-[10px] text-[#3DF08C] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3DF08C] animate-pulse" /> Live
            </div>
          </div>
          <div className="flex items-end gap-1 mt-1">
            <motion.span
              key={balance}
              initial={{ scale: 0.96 }}
              animate={{ scale: 1 }}
              className="font-display text-[42px] leading-none font-extrabold text-[#F2F7F1]"
            >
              ${formatUSDC(balance).split('.')[0]}
            </motion.span>
            <span className="font-display text-2xl font-bold text-[#7A8C7F] pb-0.5">.{formatUSDC(balance).split('.')[1]}</span>
          </div>
        </div>
        {last && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative flex items-center gap-2 px-5 py-2.5 bg-black/20 border-t border-white/5">
            <div className={cn('w-7 h-7 rounded-full flex items-center justify-center shrink-0', last.dir === 'in' ? 'bg-[#3DF08C]/15' : 'bg-[#FF7A45]/15')}>
              {last.dir === 'in' ? <ArrowDownLeft size={15} className="text-[#3DF08C]" /> : <ArrowUpRight size={15} className="text-[#FF7A45]" />}
            </div>
            <span className="text-[13px] text-[#F2F7F1] font-medium truncate flex-1">{last.label}</span>
            <span className={cn('text-[13px] font-bold', last.dir === 'in' ? 'text-[#3DF08C]' : 'text-[#FF7A45]')}>
              {last.dir === 'in' ? '+' : '-'}{usd(last.amount)}
            </span>
            <span className="text-[10px] text-[#7A8C7F] shrink-0">· {settleDuration(last.settleMs)}</span>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
