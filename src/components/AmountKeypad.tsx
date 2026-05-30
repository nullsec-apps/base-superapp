import { Button } from '@/components/ui/button';
import { Delete } from 'lucide-react';
import { useHaptics } from '../hooks/useHaptics';

interface AmountKeypadProps { value: string; onChange: (v: string) => void; }

export default function AmountKeypad({ value, onChange }: AmountKeypadProps) {
  const { tap } = useHaptics();
  const press = (k: string) => {
    tap();
    if (k === 'del') { onChange(value.length <= 1 ? '0' : value.slice(0, -1)); return; }
    if (k === '.') { if (value.includes('.')) return; onChange(value + '.'); return; }
    if (value === '0') { onChange(k); return; }
    if (value.includes('.') && value.split('.')[1].length >= 2) return;
    onChange(value + k);
  };
  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'del'];
  return (
    <div>
      <div className="flex gap-2 mb-3">
        {['1', '5', '10'].map((q) => (
          <Button key={q} onClick={() => { tap(); onChange(q); }} variant="outline" className="flex-1 h-10 rounded-xl border-white/10 bg-[#0C1410] text-[#3DF08C] font-bold hover:bg-[#3DF08C]/10 transition-all duration-200">${q}</Button>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-2">
        {keys.map((k) => (
          <button key={k} onClick={() => press(k)} className="h-14 rounded-2xl bg-[#0C1410] border border-white/5 flex items-center justify-center font-display text-xl font-bold text-[#F2F7F1] active:scale-95 active:bg-[#3DF08C]/10 transition-all duration-200">
            {k === 'del' ? <Delete size={20} className="text-[#FF7A45]" /> : k}
          </button>
        ))}
      </div>
    </div>
  );
}
