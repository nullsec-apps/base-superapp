export function useHaptics() {
  const tap = () => { try { navigator.vibrate?.(12); } catch {} };
  const confirm = () => { try { navigator.vibrate?.([10, 30, 20]); } catch {} };
  return { tap, confirm };
}
