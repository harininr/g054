const STATUS_MAP = {
  implemented:    { label: 'COMPLETED',           bg: 'rgba(16,185,129,0.12)', color: '#10b981', border: 'rgba(16,185,129,0.3)' },
  functional:     { label: 'FUNCTIONAL',          bg: 'rgba(99,140,180,0.12)', color: '#5ba0d0', border: 'rgba(99,140,180,0.3)' },
  'in-progress':  { label: 'IN PROGRESS',         bg: 'rgba(245,158,11,0.12)', color: '#f59e0b', border: 'rgba(245,158,11,0.3)' },
  adaptation:     { label: 'ADAPTATION IN PROGRESS', bg: 'rgba(245,158,11,0.12)', color: '#f59e0b', border: 'rgba(245,158,11,0.3)' },
  upcoming:       { label: 'NEXT PHASE',          bg: 'rgba(61,90,122,0.2)', color: '#3d5a7a', border: 'rgba(61,90,122,0.4)' },
  simulation:     { label: 'SIMULATION MODE',     bg: 'rgba(99,140,180,0.1)', color: '#5ba0d0', border: 'rgba(99,140,180,0.25)' },
  selected:       { label: 'SELECTED MODEL',      bg: 'rgba(139,26,62,0.15)', color: '#c4405e', border: 'rgba(139,26,62,0.3)' },
};

export default function StatusBadge({ status, label, dot = true }) {
  const s = STATUS_MAP[status] || STATUS_MAP['functional'];
  const displayLabel = label || s.label;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
      padding: '0.25rem 0.625rem', borderRadius: '99px',
      fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.1em',
      textTransform: 'uppercase', background: s.bg,
      color: s.color, border: `1px solid ${s.border}`,
    }}>
      {dot && <span style={{ width: 6, height: 6, borderRadius: '50%', background: s.color, flexShrink: 0 }} />}
      {displayLabel}
    </span>
  );
}
