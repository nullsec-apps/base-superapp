import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChatMsg } from '../lib/sampleData';
import { BadgeCheck, Coins } from 'lucide-react';
import { useChat } from '../hooks/useChat';
import { useSendUSDC } from '../hooks/useSendUSDC';
import { cn } from '../lib/utils';
import { usd } from '../lib/usdc';

interface MessageBubbleProps { msg: ChatMsg; threadId: string; }

export default function MessageBubble({ msg, threadId }: MessageBubbleProps) {
  const sendTip = useChat((s) => s.sendTip);
  const { send } = useSendUSDC();
  const [tipped, setTipped] = useState(false);
  const mine = msg.from === 'me';

  const handleDrag = (_: any, info: { offset: { x: number } }) => {
    if (!mine && info.offset.x > 70 && !msg.tip && !tipped) {
      setTipped(true);
      sendTip(threadId, msg.id, 0.5);
      send({ kind: 'tip', label: 'Tip · message', amount: 0.5, dir: 'out' });
    }
  };

  return (
    <div className={cn('flex', mine ? 'justify-end' : 'justify-start')}>
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        drag={!mine ? 'x' : false}
        dragConstraints={{ left: 0, right: 100 }}
        dragElastic={0.4}
        onDragEnd={handleDrag}
        className={cn('max-w-[78%] px-4 py-2.5 rounded-2xl relative', mine ? 'bg-[#3DF08C] text-[#0C1410] rounded-br-md' : 'bg-[#0C1410] text-[#F2F7F1] rounded-bl-md border border-white/5')}
      >
        {msg.verified && !mine && <div className="flex items-center gap-1 text-[10px] text-[#3DF08C] mb-0.5"><BadgeCheck size={11} /> Verified</div>}
        <p className="text-sm leading-snug">{msg.text}</p>
        {(msg.tip || tipped) && (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded-full bg-[#FF7A45]/20 text-[#FF7A45] text-[11px] font-bold"><Coins size={11} /> Tipped {usd(msg.tip || 0.5)}</motion.div>
        )}
      </motion.div>
    </div>
  );
}
