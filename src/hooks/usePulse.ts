import { create } from 'zustand';
interface PulseState { dir: 'in' | 'out' | null; trigger: (d: 'in' | 'out') => void; }
export const usePulse = create<PulseState>((set) => ({
  dir: null,
  trigger: (d) => { set({ dir: d }); setTimeout(() => set({ dir: null }), 900); },
}));
