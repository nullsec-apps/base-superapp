import { create } from 'zustand';
import { Thread, seedThreads } from '../lib/sampleData';
interface ChatState {
  threads: Thread[];
  sendMsg: (tid: string, text: string) => void;
  sendTip: (tid: string, mid: string, amount: number) => void;
}
export const useChat = create<ChatState>((set) => ({
  threads: seedThreads,
  sendMsg: (tid, text) => set((s) => ({
    threads: s.threads.map((t) => t.id === tid ? { ...t, ts: Date.now(), unread: 0, preview: text, messages: [...t.messages, { id: Math.random().toString(36).slice(2), from: 'me', text }] } : t),
  })),
  sendTip: (tid, mid, amount) => set((s) => ({
    threads: s.threads.map((t) => t.id === tid ? { ...t, messages: t.messages.map((m) => m.id === mid ? { ...m, tip: amount } : m) } : t),
  })),
}));
