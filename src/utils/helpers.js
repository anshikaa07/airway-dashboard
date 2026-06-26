// ============================================================
// UTILITY HELPERS
// ============================================================

export function getStatusColor(status) {
  if (status === 'on-time')   return 'var(--color-green)';
  if (status === 'delayed')   return 'var(--color-amber)';
  if (status === 'cancelled') return 'var(--color-red)';
  return 'var(--text-muted)';
}

export function getImpactStyle(impact) {
  if (impact === 'high')     return { bg: 'rgba(239,68,68,0.2)',   color: 'var(--color-red)' };
  if (impact === 'moderate') return { bg: 'rgba(245,158,11,0.2)',  color: 'var(--color-amber)' };
  return                            { bg: 'rgba(16,185,129,0.2)',  color: 'var(--color-green)' };
}

export function getHeatColor(value) {
  if (value < 30) return { bg: '#1e3a5f', color: '#60a5fa' };
  if (value < 60) return { bg: '#1d6a9f', color: '#93c5fd' };
  if (value < 80) return { bg: '#b45309', color: '#fbbf24' };
  return                 { bg: '#991b1b', color: '#fca5a5' };
}

export function formatDelay(delay) {
  if (!delay) return '—';
  return `+${delay}m`;
}

export function getUTCTime() {
  return new Date().toLocaleTimeString('en-US', {
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
  }) + ' UTC';
}

export function randomDelta(base, range) {
  return +(base + (Math.random() * range * 2 - range)).toFixed(1);
}
