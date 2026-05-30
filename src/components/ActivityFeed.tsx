import { useTransactions } from '../hooks/useTransactions';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDownLeft, ArrowUpRight, Bike, Coins, Store, Gift, ExternalLink, Receipt } from 'lucide-react';
import { usd } from '../lib/usdc';
import { timeAgo, settleDuration } from '../lib/format';
import { Tx } from '../lib/sampleData';

const iconFor = (k: Tx['kind']) => k === 'ride' ? Bike : k === 'tip' ? Coins : k === 'merchant' ? Store : k === 'faucet' ? Gift : ArrowDownLeft;

export default function ActivityFeed() {
  const txs = useTransactions((s) => s.txs);
  return (
    <div className="px-3 pt-4">
      <div className="flex items-baseline justify-between px-1 mb-2">
        <h2 className="font-display text-lg font-bold text-[#F2F7F1]">Activity</h2>
        <span className="text-[11px] text-[#7A8C7F]">{txs.length} on Base</span>
      </div>
      {txs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-3"><Receipt size={22} className="text-[#7A8C7F]" /></div>
          <p className="text-sm font-medium text-[#F2F7F1]">No activity yet</p>
          <p className="text-xs text-[#7A8C7F] mt-1">Hail a ride, send a tip, or pay a merchant to see it here.</p>
        </div>
      ) : (
        <div className="space-y-2">
          <AnimatePresence initial={false}>
            {txs.map((t) => {
              const Icon = iconFor(t.kind);
              return (
                <motion.div key={t.id} initial={{ opacity: 0, y: -12, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} className="flex items-center gap-3 p-3 rounded-2xl bg-[#15211B] border border-white/5 hover:border-white/15 transition-all duration-200">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${t.dir === 'in' ? 'bg-[#3DF08C]/15' : 'bg-[#FF7A45]/15'}`}>
                    <Icon size={18} className={t.dir === 'in' ? 'text-[#3DF08C]' : 'text-[#FF7A45]'} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-[#F2F7F1] text-sm truncate">{t.label}</div>
                    <div className="flex items-center gap-1.5 text-[10px] text-[#7A8C7F]">
                      <span>{timeAgo(t.ts)}</span>
                      <span>·</span>
                      <Badge className="bg-[#3DF08C]/10 text-[#3DF08C] h-4 px-1.5 rounded-md text-[9px] font-medium">settled {settleDuration(t.settleMs)}</Badge>
                      <a href={`https://basescan.org/tx/${t.txHash}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-0.5 text-[#7A8C7F] hover:text-[#3DF08C] transition-all duration-200"><ExternalLink size={9} /></a>
                    </div>
                  </div>
                  <div className={`flex items-center gap-0.5 font-bold text-sm shrink-0 ${t.dir === 'in' ? 'text-[#3DF08C]' : 'text-[#FF7A45]'}`}>
                    {t.dir === 'in' ? <ArrowDownLeft size={13} /> : <ArrowUpRight size={13} />}{t.dir === 'in' ? '+' : '-'}{usd(t.amount)}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
