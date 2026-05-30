import { Component, ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';

interface State { hasError: boolean; }

export default class ErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen w-full bg-[#0C1410] flex flex-col items-center justify-center px-6 text-center">
          <div className="w-14 h-14 rounded-2xl bg-[#FF7A45]/15 flex items-center justify-center mb-4"><AlertTriangle size={28} className="text-[#FF7A45]" /></div>
          <h1 className="font-display text-xl font-bold text-[#F2F7F1]">Something went wrong</h1>
          <p className="text-sm text-[#7A8C7F] mt-2">Reload BaseGo to get back to your USDC balance.</p>
          <button onClick={() => location.reload()} className="mt-5 h-12 px-6 rounded-2xl bg-[#3DF08C] text-[#0C1410] font-bold transition-all duration-200">Reload</button>
        </div>
      );
    }
    return this.props.children;
  }
}
