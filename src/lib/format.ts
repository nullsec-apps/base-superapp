export function truncAddr(a?: string): string {
  if (!a) return '0x0000…0000';
  return a.slice(0, 6) + '…' + a.slice(-4);
}
export function timeAgo(ts: number): string {
  const s = Math.floor((Date.now() - ts) / 1000);
  if (s < 60) return s + 's ago';
  const m = Math.floor(s / 60);
  if (m < 60) return m + 'm ago';
  const h = Math.floor(m / 60);
  if (h < 24) return h + 'h ago';
  return Math.floor(h / 24) + 'd ago';
}
export function settleDuration(ms: number): string {
  return (ms / 1000).toFixed(1) + 's';
}
