import { Toaster } from 'react-hot-toast';
export default function PulseToast() {
  return <Toaster position="top-center" containerStyle={{ top: 100 }} toastOptions={{ style: { background: '#15211B', color: '#F2F7F1', border: '1px solid rgba(61,240,140,0.2)', borderRadius: '16px', fontSize: '13px' } }} />;
}
