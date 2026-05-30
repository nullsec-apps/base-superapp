import { create } from 'zustand';
interface BalState { balance: number; setBalance: (n: number) => void; adjust: (d: number) => void; }
export const useUSDCBalance = create<BalState>((set) => ({
  balance: 48.2,
  setBalance: (n) => set({ balance: n }),
  adjust: (d) => set((s) => ({ balance: Math.max(0, +(s.balance + d).toFixed(2)) })),
}));
