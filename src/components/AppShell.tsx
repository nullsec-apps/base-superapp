import { useState } from 'react';
import USDCPulseBar from './USDCPulseBar';
import ServiceRail from './ServiceRail';
import ActivityFeed from './ActivityFeed';
import ThumbTabDock from './ThumbTabDock';
import MoveSheet from './MoveSheet';
import ChatSheet from './ChatSheet';
import PaySheet from './PaySheet';
import MeScreen from './MeScreen';
import OnboardingSheet from './OnboardingSheet';
import PulseToast from './PulseToast';
import EmptyStateRail from './EmptyStateRail';
import { useUSDCBalance } from '../hooks/useUSDCBalance';

type Tab = 'move' | 'chat' | 'pay' | 'me';

export default function AppShell() {
  const [tab, setTab] = useState<Tab>('move');
  const [sheet, setSheet] = useState<'move' | 'chat' | 'pay' | null>(null);
  const [onboarded, setOnboarded] = useState(false);
  const balance = useUSDCBalance((s) => s.balance);

  return (
    <div className="min-h-screen w-full bg-[#0C1410] flex justify-center overflow-x-hidden">
      <div className="relative w-full max-w-[480px] min-h-screen bg-[#0C1410] flex flex-col overflow-hidden">
        <USDCPulseBar />
        <div className="flex-1 overflow-y-auto pb-28" style={{ scrollbarWidth: 'none' }}>
          {tab === 'me' ? <MeScreen /> : (
            <>
              <ServiceRail onOpen={(s) => setSheet(s)} />
              {balance <= 0 ? <EmptyStateRail /> : <ActivityFeed />}
            </>
          )}
        </div>
        <ThumbTabDock active={sheet || tab} onTab={(t) => { if (t === 'me') { setTab('me'); setSheet(null); } else { setTab(t); setSheet(t); } }} />
        <MoveSheet open={sheet === 'move'} onClose={() => setSheet(null)} />
        <ChatSheet open={sheet === 'chat'} onClose={() => setSheet(null)} />
        <PaySheet open={sheet === 'pay'} onClose={() => setSheet(null)} />
        <OnboardingSheet open={!onboarded} onDone={() => setOnboarded(true)} />
        <PulseToast />
      </div>
    </div>
  );
}
