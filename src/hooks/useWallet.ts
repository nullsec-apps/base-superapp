import { create } from 'zustand';
interface WalletState { address: string; email: string; loggedIn: boolean; login: (email: string) => void; logout: () => void; }
const genAddr = () => '0x' + Array.from({ length: 40 }, () => '0123456789abcdef'[Math.floor(Math.random() * 16)]).join('');
export const useWallet = create<WalletState>((set) => ({
  address: '0x7a3Fc9b21De4488A1eaB0cf2D9e84B5cA9d3F1e2',
  email: '',
  loggedIn: false,
  login: (email) => set({ email, loggedIn: true, address: genAddr() }),
  logout: () => set({ loggedIn: false, email: '' }),
}));
