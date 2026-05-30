import { motion } from 'framer-motion';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Copy, Gift, LogOut, BadgeCheck, Bike, Coins, TrendingUp, Receipt } from 'lucide-react';
import { useWallet } from '../hooks/useWallet';
import { useUSDCBalance } from '../hooks/useUSDCBalance';
import { useTransactions } from '../hooks/useTransactions';
import { useSendUSDC } from '../hooks/useSendUSDC';
import { truncAddr, timeAgo } from '../lib/format';
import { usd } from '../lib/usdc';
import toast from 'react-hot-toast';

export default function MeScreen() {
  const { address, email } = useWallet();
  const balance = useUSDCBalance((s) => s.balance);
  const txs = useTransactions((s) => s.txs);
  const { send } = useSendUSDC();
  const rides = txs.filter((t) => t.kind === 'ride').length;
  const spent = txs.filter((t) => t.dir === 'out').reduce((a, t) => a + t.amount, 0);
  const tips = txs.filter((t) => t.kind === 'tip').reduce((a, t) => a + t.amount, 0);

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="px-4 pt-4">
      <div className="flex items-center gap-3">
        <Avatar className="w-16 h-16 border-2 border-[#3DF08C]/30"><AvatarImage src="https://i.pravatar.cc/120?img=15" /><AvatarFallback>ME</AvatarFallback></Avatar>
        <div>
          <div className="flex items-center gap-1 font-display text-xl font-bold text-[#F2F7F1]">{email || 'BaseGo User'} <BadgeCheck size={16} className="text-[#3DF08C]" /></div>
          <button onClick={() => { navigator.clipboard?.writeText(address); toast.success('Address copied'); }} className="flex items-center gap-1 text-xs text-[#7A8C7F] mt-0.5 hover:text-[#3DF08C] transition-all duration-200">{truncAddr(address)} <Copy size={11} /></button>
        </div>
      </div>
      <div className="mt-5 rounded-3xl bg-[#15211B] border border-white/5 p-5">
        <div className="text-xs text-[#7A8C7F] uppercase tracking-wider">Wallet balance</div>
        <div className="font-display text-3xl font-extrabold text-[#3DF08C] mt-1">{usd(balance)}</div>
        <Button onClick={() => { send({ kind: 'faucet', label: 'Faucet · Top up $5', amount: 5, dir: 'in' }); toast.success('+$5.00 USDC claimed'); }} className="w-full h-11 mt-3 rounded-2xl bg-[#FF7A45]/15 text-[#FF7A45] font-bold hover:bg-[#FF7A45]/25 transition-all duration-200"><Gift size={16} className="mr-2" /> Top up $5 from faucet</Button>
      </div>
      <div className="grid grid-cols-3 gap-2 mt-3">
        {[{ i: Bike, l: 'Rides', v: rides, c: '#3DF08C' }, { i: TrendingUp, l: 'Spent', v: usd(spent), c: '#FF7A45' }, { i: Coins, l: 'Tips', v: usd(tips), c: '#3DF08C' }].map((s, k) => {
          const I = s.i;
          return (
            <div key={k} className="rounded-2xl bg-[#15211B] border border-white/5 p-3 text-center">
              <I size={18} className="mx-auto mb-1" style={{ color: s.c }} />
              <div className="font-display text-base font-bold text-[#F2F7F1]">{s.v}</div>
              <div className="text-[10px] text-[#7A8C7F]">{s.l}</div>
            </div>
          );
        })}
      </div>
      <Tabs defaultValue="history" className="mt-4">
        <TabsList className="bg-[#0C1410] rounded-2xl p-1 h-11 w-full">
          <TabsTrigger value="history" className="flex-1 rounded-xl data-[state=active]:bg-[#3DF08C] data-[state=active]:text-[#0C1410] text-[#7A8C7F]">History</TabsTrigger>
          <TabsTrigger value="settings" className="flex-1 rounded-xl data-[state=active]:bg-[#3DF08C] data-[state=active]:text-[#0C1410] text-[#7A8C7F]">Account</TabsTrigger>
        </TabsList>
        <TabsContent value="history" className="mt-3 space-y-2">
          {txs.length === 0 ? (
            <div className="flex flex-col items-center py-8 text-center"><Receipt size={22} className="text-[#7A8C7F] mb-2" /><p className="text-sm text-[#F2F7F1]">No transactions yet</p><p className="text-xs text-[#7A8C7F] mt-1">Your USDC movements will appear here.</p></div>
          ) : txs.map((t) => (
            <div key={t.id} className="flex items-center justify-between p-3 rounded-2xl bg-[#15211B] border border-white/5">
              <div><div className="text-sm font-medium text-[#F2F7F1]">{t.label}</div><div className="text-[10px] text-[#7A8C7F]">{timeAgo(t.ts)}</div></div>
              <span className={`font-bold text-sm ${t.dir === 'in' ? 'text-[#3DF08C]' : 'text-[#FF7A45]'}`}>{t.dir === 'in' ? '+' : '-'}{usd(t.amount)}</span>
            </div>
          ))}
        </TabsContent>
        <TabsContent value="settings" className="mt-3">
          <div className="rounded-2xl bg-[#15211B] border border-white/5 divide-y divide-white/5">
            <div className="p-4 flex justify-between items-center"><span className="text-sm text-[#F2F7F1]">Network</span><Badge className="bg-[#3DF08C]/15 text-[#3DF08C]">Base Mainnet</Badge></div>
            <div className="p-4 flex justify-between items-center"><span className="text-sm text-[#F2F7F1]">Wallet type</span><span className="text-xs text-[#7A8C7F]">Embedded smart wallet</span></div>
            <div className="p-4 flex justify-between items-center"><span className="text-sm text-[#F2F7F1]">Currency</span><span className="text-xs text-[#7A8C7F]">USDC · 6 decimals</span></div>
          </div>
          <Button onClick={() => toast('Signed out (demo)')} variant="ghost" className="w-full h-12 mt-3 rounded-2xl text-[#FF7A45] hover:bg-[#FF7A45]/10 transition-all duration-200"><LogOut size={16} className="mr-2" /> Sign out</Button>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
