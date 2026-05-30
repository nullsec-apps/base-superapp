import { create } from 'zustand';
import { Tx, seedTxs } from '../lib/sampleData';
interface TxState { txs: Tx[]; add: (t: Tx) => void; }
export const useTransactions = create<TxState>((set) => ({
  txs: seedTxs,
  add: (t) => set((s) => ({ txs: [t, ...s.txs] })),
}));
