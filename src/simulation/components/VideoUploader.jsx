import { useCallback, useState } from 'react';
import styles from '../steps.module.css';

export default function VideoUploader({ onFile, onDemo, fileMetadata }) {
  const [dragging, setDragging] = useState(false);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('video/')) onFile(file);
  }, [onFile]);

  const handleChange = useCallback((e) => {
    const file = e.target.files[0];
    if (file) onFile(file);
  }, [onFile]);

  if (fileMetadata) {
    return (
      <div style={{
        background: 'var(--sim-surface)', border: '1px solid var(--sim-border-accent)',
        borderRadius: '0.875rem', padding: '1.5rem',
        boxShadow: 'var(--sim-shadow-accent)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <div style={{
            width: 48, height: 48, background: 'rgba(139,26,62,0.2)',
            borderRadius: '0.5rem', display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0,
          }}>📹</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--sim-text)', marginBottom: '0.25rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {fileMetadata.name}
            </div>
            {fileMetadata.isDemo && (
              <span style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0.15rem 0.5rem', borderRadius: '99px', background: 'rgba(99,140,180,0.15)', color: '#5ba0d0', border: '1px solid rgba(99,140,180,0.3)' }}>
                Demonstration Dataset
              </span>
            )}
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '0.75rem' }}>
          {[
            { label: 'Duration', value: fileMetadata.duration },
            { label: 'Size', value: fileMetadata.size },
            { label: 'Format', value: fileMetadata.format },
          ].map(({ label, value }) => (
            <div key={label} style={{ background: 'var(--sim-surface-2)', borderRadius: '0.5rem', padding: '0.625rem 0.875rem' }}>
              <div style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--sim-text-3)', marginBottom: '0.25rem' }}>{label}</div>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--sim-text)', fontFamily: 'JetBrains Mono, monospace' }}>{value}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        style={{
          border: `2px dashed ${dragging ? 'var(--sim-accent-light)' : 'var(--sim-border-strong)'}`,
          borderRadius: '0.875rem',
          padding: '3rem 2rem',
          textAlign: 'center',
          background: dragging ? 'rgba(139,26,62,0.07)' : 'var(--sim-surface)',
          cursor: 'pointer',
          transition: 'all 0.2s',
          marginBottom: '1rem',
        }}
        onClick={() => document.getElementById('video-file-input').click()}
      >
        <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🎬</div>
        <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--sim-text)', marginBottom: '0.5rem' }}>
          Drop lecture video here
        </div>
        <div style={{ fontSize: '0.875rem', color: 'var(--sim-text-2)', marginBottom: '1rem' }}>
          or click to browse
        </div>
        <div style={{ fontSize: '0.75rem', color: 'var(--sim-text-3)' }}>
          Accepts .mp4 · .webm · .mov
        </div>
        <input
          id="video-file-input"
          type="file"
          accept="video/*"
          style={{ display: 'none' }}
          onChange={handleChange}
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
        <hr style={{ flex: 1, border: 'none', borderTop: '1px solid var(--sim-border)' }} />
        <span style={{ fontSize: '0.75rem', color: 'var(--sim-text-3)' }}>or</span>
        <hr style={{ flex: 1, border: 'none', borderTop: '1px solid var(--sim-border)' }} />
      </div>
      <button
        onClick={onDemo}
        style={{
          width: '100%', padding: '0.875rem', borderRadius: '0.625rem',
          background: 'var(--sim-surface-2)', border: '1px solid var(--sim-border-strong)',
          color: 'var(--sim-text)', fontSize: '0.875rem', fontWeight: 600,
          cursor: 'pointer', display: 'flex', alignItems: 'center',
          justifyContent: 'center', gap: '0.625rem', transition: 'all 0.2s',
        }}
        onMouseEnter={e => e.currentTarget.style.background = 'var(--sim-surface-3)'}
        onMouseLeave={e => e.currentTarget.style.background = 'var(--sim-surface-2)'}
      >
        <span>🎓</span>
        Use Demonstration Dataset
      </button>
    </div>
  );
}
