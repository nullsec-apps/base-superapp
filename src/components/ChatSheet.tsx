import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, MessageCircle, ChevronLeft, Send, BadgeCheck } from 'lucide-react';
import { useChat } from '../hooks/useChat';
import { timeAgo } from '../lib/format';
import MessageBubble from './MessageBubble';

interface ChatSheetProps { open: boolean; onClose: () => void; }

export default function ChatSheet({ open, onClose }: ChatSheetProps) {
  const threads = useChat((s) => s.threads);
  const sendMsg = useChat((s) => s.sendMsg);
  const [active, setActive] = useState<string | null>(null);
  const [text, setText] = useState('');
  const thread = threads.find((t) => t.id === active);

  const submit = () => { if (!text.trim() || !active) return; sendMsg(active, text.trim()); setText(''); };

  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 flex justify-center bg-black/70">
          <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ type: 'spring', damping: 30, stiffness: 280 }} className="w-full max-w-[480px] mt-auto h-[88vh] bg-[#15211B] rounded-t-[32px] border-t border-white/10 flex flex-col">
            <div className="flex items-center justify-between p-4 pb-2">
              {thread ? (
                <button onClick={() => setActive(null)} className="flex items-center gap-2 text-[#F2F7F1] hover:opacity-80 transition-all duration-200"><ChevronLeft size={20} /><span className="font-display font-bold flex items-center gap-1">{thread.name}{thread.verified && <BadgeCheck size={15} className="text-[#3DF08C]" />}</span></button>
              ) : (
                <h2 className="font-display text-xl font-bold text-[#F2F7F1] flex items-center gap-2"><MessageCircle size={20} className="text-[#FF7A45]" /> Chat</h2>
              )}
              <button onClick={() => { setActive(null); onClose(); }} className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-[#7A8C7F] hover:bg-white/10 transition-all duration-200"><X size={18} /></button>
            </div>
            {!thread ? (
              <div className="flex-1 overflow-y-auto px-3 pb-4">
                <p className="text-[11px] text-[#7A8C7F] px-1 mb-2">Swipe a message right to send a USDC tip 💸</p>
                {threads.map((t, i) => (
                  <motion.button initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }} key={t.id} onClick={() => setActive(t.id)} className="w-full flex items-center gap-3 p-3 rounded-2xl hover:bg-white/5 active:scale-[0.98] transition-all duration-200">
                    <Avatar className="w-12 h-12"><AvatarImage src={t.avatar} /><AvatarFallback>{t.name[0]}</AvatarFallback></Avatar>
                    <div className="flex-1 text-left min-w-0">
                      <div className="flex items-center gap-1"><span className="font-bold text-[#F2F7F1] text-sm truncate">{t.name}</span>{t.verified && <BadgeCheck size={14} className="text-[#3DF08C] shrink-0" />}</div>
                      <div className="text-xs text-[#7A8C7F] truncate">{t.preview}</div>
                    </div>
                    <div className="flex flex-col items-end gap-1"><span className="text-[10px] text-[#7A8C7F]">{timeAgo(t.ts)}</span>{t.unread > 0 && <Badge className="bg-[#3DF08C] text-[#0C1410] h-5 min-w-5 px-1.5 rounded-full text-[10px]">{t.unread}</Badge>}</div>
                  </motion.button>
                ))}
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2">
                  {thread.messages.map((m) => <MessageBubble key={m.id} msg={m} threadId={thread.id} />)}
                </div>
                <div className="p-3 flex items-center gap-2 border-t border-white/5">
                  <Input value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && submit()} placeholder="Message…" className="h-12 bg-[#0C1410] border-white/10 text-[#F2F7F1] rounded-2xl" />
                  <Button onClick={submit} className="w-12 h-12 rounded-2xl bg-[#3DF08C] text-[#0C1410] shrink-0 p-0 transition-all duration-200"><Send size={18} /></Button>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
