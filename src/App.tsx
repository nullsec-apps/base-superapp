import AppShell from './components/AppShell';
import ErrorBoundary from './components/ErrorBoundary';
import './index.css';

export default function App() {
  return (
    <ErrorBoundary>
      <AppShell />
    </ErrorBoundary>
  );
}
