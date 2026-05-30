export interface Driver { name: string; rating: number; vehicle: string; plate: string; eta: number; avatar: string; }
export interface Merchant { id: string; name: string; category: string; distance: string; avatar: string; }
export interface ChatMsg { id: string; from: 'me' | 'them'; text: string; verified?: boolean; tip?: number; }
export interface Thread { id: string; name: string; avatar: string; preview: string; ts: number; unread: number; verified?: boolean; messages: ChatMsg[]; }
export interface Tx { id: string; kind: 'ride' | 'tip' | 'merchant' | 'faucet' | 'receive'; label: string; amount: number; dir: 'in' | 'out'; ts: number; settleMs: number; txHash: string; }

export const drivers: Driver[] = [
  { name: 'Aiman R.', rating: 4.9, vehicle: 'Honda EX5', plate: 'WXY 4821', eta: 3, avatar: 'https://i.pravatar.cc/120?img=12' },
  { name: 'Siti N.', rating: 4.8, vehicle: 'Yamaha Y15', plate: 'BKL 9032', eta: 5, avatar: 'https://i.pravatar.cc/120?img=45' },
];

export const merchants: Merchant[] = [
  { id: 'm1', name: 'Warung Bukit', category: 'Nasi Lemak', distance: '120m', avatar: 'https://i.pravatar.cc/80?img=33' },
  { id: 'm2', name: 'Kopi Tiam 88', category: 'Coffee', distance: '340m', avatar: 'https://i.pravatar.cc/80?img=21' },
  { id: 'm3', name: 'Pasar Malam', category: 'Street Food', distance: '600m', avatar: 'https://i.pravatar.cc/80?img=8' },
];

export const seedThreads: Thread[] = [
  { id: 't1', name: 'BaseGo Support', avatar: 'https://i.pravatar.cc/80?img=68', preview: 'Welcome! Tap to claim your first $1 →', ts: Date.now() - 120000, unread: 1, verified: true, messages: [
    { id: 'm1', from: 'them', text: 'Welcome to BaseGo! Your Base wallet is ready 🟢', verified: true },
    { id: 'm2', from: 'them', text: 'Claim your first $1 USDC and try a ride nearby.', verified: true },
  ] },
  { id: 't2', name: 'Aiman R. (Driver)', avatar: 'https://i.pravatar.cc/80?img=12', preview: 'On my way, 3 min out 🛵', ts: Date.now() - 45000, unread: 1, verified: true, messages: [
    { id: 'm1', from: 'them', text: 'Hi! I am matched for your ride to Bukit.', verified: true },
    { id: 'm2', from: 'them', text: 'On my way, 3 min out 🛵', verified: true },
    { id: 'm3', from: 'me', text: 'Great, I am at the entrance!' },
  ] },
];

export const seedTxs: Tx[] = [];
