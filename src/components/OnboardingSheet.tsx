import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Mail, Gift, Bike, Zap, Check } from 'lucide-react';
import { useWallet } from '../hooks/useWallet';
import { useSendUSDC } from '../hooks/useSendUSDC';
import { truncAddr } from '../lib/format';

interface OnboardingSheetProps { open: boolean; onDone: () => void; }

export default function OnboardingSheet({ open, onDone }: OnboardingSheetProps) {
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState('');
  const [claiming, setClaiming] = useState(false);
  const [claimed, setClaimed] = useState(false);
  const { login, address } = useWallet();
  const { send } = useSendUSDC();

  const doLogin = () => { if (!email.includes('@')) return; login(email); setStep(1); };
  const claim = () => {
    setClaiming(true);
    setTimeout(() => { setClaiming(false); setClaimed(true); send({ kind: 'faucet', label: 'Faucet · Welcome $1', amount: 1, dir: 'in' }); }, 1100);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex justify-center bg-black/70 backdrop-blur-sm">
          <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', damping: 30, stiffness: 280 }} className="w-full max-w-[480px] mt-auto bg-[#15211B] rounded-t-[32px] border-t border-white/10 p-6 pb-10">
            <div className="w-10 h-1 rounded-full bg-white/15 mx-auto mb-6" />
            {step === 0 && (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
                <div className="w-14 h-14 rounded-2xl bg-[#3DF08C]/15 flex items-center justify-center mb-5"><Zap size={28} className="text-[#3DF08C]" /></div>
                <h1 className="font-display text-3xl font-extrabold text-[#F2F7F1] leading-tight">Move. Chat. Pay.<br />One balance, one tap.</h1>
                <p className="text-[#7A8C7F] text-sm mt-3 leading-relaxed">Your Base wallet, USDC-native — hail a ride, message a driver, settle a meal, all from a single green balance.</p>
                <div className="mt-6 space-y-3">
                  <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" type="email" className="h-14 bg-[#0C1410] border-white/10 text-[#F2F7F1] text-base rounded-2xl" />
                  <Button onClick={doLogin} className="w-full h-14 rounded-2xl bg-[#3DF08C] hover:bg-[#3DF08C]/90 text-[#0C1410] font-bold text-base transition-all duration-200"><Mail size={18} className="mr-2" /> Continue with email</Button>
                  <div className="flex items-center gap-3 py-1"><Separator className="flex-1 bg-white/10" /><span className="text-[11px] text-[#7A8C7F]">or</span><Separator className="flex-1 bg-white/10" /></div>
                  <div className="grid grid-cols-2 gap-3">
                    <Button onClick={() => { login('google@user'); setStep(1); }} variant="outline" className="h-12 rounded-2xl border-white/10 bg-[#0C1410] text-[#F2F7F1] hover:bg-white/5 transition-all duration-200">Google</Button>
                    <Button onClick={() => { login('apple@user'); setStep(1); }} variant="outline" className="h-12 rounded-2xl border-white/10 bg-[#0C1410] text-[#F2F7F1] hover:bg-white/5 transition-all duration-200">Apple</Button>
                  </div>
                </div>
              </motion.div>
            )}
            {step === 1 && (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
                <div className="flex items-center gap-2 text-[#3DF08C] text-xs font-medium mb-2"><Check size={14} /> Smart wallet ready · {truncAddr(address)}</div>
                <h1 className="font-display text-2xl font-extrabold text-[#F2F7F1]">Get your first $1 in seconds</h1>
                <p className="text-[#7A8C7F] text-sm mt-2">No bank, no seed phrase. Claim free USDC to start moving.</p>
                <div className="mt-5 rounded-3xl bg-[#0C1410] border border-white/5 p-5">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#FF7A45]/15 flex items-center justify-center"><Gift size={24} className="text-[#FF7A45]" /></div>
                    <div className="flex-1"><div className="font-bold text-[#F2F7F1]">Welcome Faucet</div><div className="text-xs text-[#7A8C7F]">$1.00 USDC · instant</div></div>
                    {claimed && <Check size={22} className="text-[#3DF08C]" />}
                  </div>
                  {claiming && <Progress value={66} className="mt-4 h-1.5 bg-white/10" />}
                  {!claimed ? (
                    <Button onClick={claim} disabled={claiming} className="w-full h-12 mt-4 rounded-2xl bg-[#3DF08C] text-[#0C1410] font-bold transition-all duration-200">{claiming ? 'Claiming…' : 'Claim $1 USDC'}</Button>
                  ) : (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 mt-4 p-3 rounded-2xl bg-[#3DF08C]/10"><Bike size={18} className="text-[#3DF08C]" /><span className="text-xs text-[#F2F7F1]">Sample ride nearby: Bukit · 3 min · $2.40</span></motion.div>
                  )}
                </div>
                <Button onClick={onDone} variant="ghost" className="w-full h-12 mt-4 text-[#F2F7F1] hover:bg-white/5 transition-all duration-200">{claimed ? 'Start using BaseGo →' : 'Skip for now'}</Button>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
