import { useTransactions } from './useTransactions';
import { useUSDCBalance } from './useUSDCBalance';
import { usePulse } from './usePulse';
import { useHaptics } from './useHaptics';
import { Tx } from '../lib/sampleData';
import toast from 'react-hot-toast';
import { usd } from '../lib/usdc';

export function useSendUSDC() {
  const add = useTransactions((s) => s.add);
  const adjust = useUSDCBalance((s) => s.adjust);
  const trigger = usePulse((s) => s.trigger);
  const { confirm } = useHaptics();

  const send = (p: { kind: Tx['kind']; label: string; amount: number; dir: 'in' | 'out' }) => {
    const settleMs = 900 + Math.floor(Math.random() * 900);
    const tx: Tx = {
      id: Math.random().toString(36).slice(2),
      kind: p.kind,
      label: p.label,
      amount: p.amount,
      dir: p.dir,
      ts: Date.now(),
      settleMs,
      txHash: '0x' + Array.from({ length: 64 }, () => '0123456789abcdef'[Math.floor(Math.random() * 16)]).join(''),
    };
    add(tx);
    adjust(p.dir === 'in' ? p.amount : -p.amount);
    trigger(p.dir);
    confirm();
    toast.success(`${p.dir === 'in' ? '+' : '-'}${usd(p.amount)} · settled in ${(settleMs / 1000).toFixed(1)}s`);
  };

  return { send };
}
