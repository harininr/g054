import { useState, useCallback } from 'react';
import ProcessingLog from '../components/ProcessingLog';
import styles from '../steps.module.css';

const MULTISEG_STEPS = [
  { msg: 'Loading timestamped transcript (15 segments)...', offsetSec: 0 },
  { msg: 'Tokenizing sentences with MiniLM tokenizer...', offsetSec: 2 },
  { msg: 'Generating MiniLM semantic embeddings (384-D)...', offsetSec: 4 },
  { msg: 'MiniLM sentence representations ready', offsetSec: 7, done: true },
  { msg: 'Identifying inter-sentence boundary positions...', offsetSec: 8 },
  { msg: 'Extracting boundary audio windows (±1.5s around each boundary)...', offsetSec: 9 },
  { msg: 'Running Wav2Vec2 feature extraction (384-D acoustic)...', offsetSec: 11 },
  { msg: 'Wav2Vec2 acoustic representations ready', offsetSec: 14, done: true },
  { msg: 'Fusing semantic + acoustic features → 768-D joint representation...', offsetSec: 15 },
  { msg: 'Applying positional encoding (RoFormer-style)...', offsetSec: 17 },
  { msg: 'Running RoFormer boundary classification head...', offsetSec: 18 },
  { msg: 'Applying sigmoid threshold (τ = 0.5) for boundary prediction...', offsetSec: 20 },
  { msg: 'Detected 5 topic boundaries in 14 inter-sentence positions', offsetSec: 22 },
  { msg: 'MultiSeg inference complete — 6 topic segments generated', offsetSec: 23, done: true },
];

export default function Step3MultiSeg({ onNext, onPrev }) {
  const [logs, setLogs] = useState([]);
  const [progress, setProgress] = useState(0);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);

  const runMultiSeg = useCallback(() => {
    setRunning(true);
    setLogs([]);
    setProgress(0);
    MULTISEG_STEPS.forEach((step, i) => {
      setTimeout(() => {
        setLogs(prev => [...prev, step]);
        setProgress(Math.round(((i + 1) / MULTISEG_STEPS.length) * 100));
        if (i === MULTISEG_STEPS.length - 1) {
          setTimeout(() => setDone(true), 400);
        }
      }, step.offsetSec * 500);
    });
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.stepBadge}>STEP 2 / 4 · TOPIC BOUNDARY DETECTION</div>
      <h1 className={styles.stepTitle}>Detecting Lecture Topic Boundaries</h1>
      <p className={styles.stepSubtitle}>
        MultiSeg fuses semantic text features from MiniLM with acoustic prosodic features
        from Wav2Vec2, then uses RoFormer to predict topic boundary labels at each sentence boundary.
      </p>

      <div className={styles.grid2} style={{ marginBottom: '1.5rem', alignItems: 'start' }}>
        {/* Architecture diagram */}
        <div>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.cardHeaderIcon}>🏗️</div>
              <span className={styles.cardHeaderTitle}>MultiSeg Architecture</span>
            </div>
            <div className={styles.cardBody}>
              {/* Two streams → fusion → RoFormer */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <div>
                  <div style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#5ba0d0', marginBottom: '0.375rem', textAlign: 'center' }}>Semantic Stream</div>
                  <div className={styles.archNode} style={{ textAlign: 'center', background: 'var(--sim-blue-gray)', borderColor: 'rgba(91,160,208,0.3)' }}>
                    <div style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>📝</div>
                    <div className={styles.archNodeLabel}>MiniLM</div>
                    <div className={styles.archNodeSub}>all-MiniLM-L6-v2</div>
                  </div>
                  <div className={styles.vArrow}>↓</div>
                  <div className={styles.archNode} style={{ textAlign: 'center', background: 'var(--sim-blue-gray)', borderColor: 'rgba(91,160,208,0.3)' }}>
                    <div className={styles.archNodeLabel}>384-D</div>
                    <div className={styles.archNodeSub}>Semantic embedding</div>
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--sim-pending)', marginBottom: '0.375rem', textAlign: 'center' }}>Acoustic Stream</div>
                  <div className={styles.archNode} style={{ textAlign: 'center', background: 'rgba(245,158,11,0.06)', borderColor: 'rgba(245,158,11,0.25)' }}>
                    <div style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>🎵</div>
                    <div className={styles.archNodeLabel}>Wav2Vec2</div>
                    <div className={styles.archNodeSub}>facebook/wav2vec2-base</div>
                  </div>
                  <div className={styles.vArrow}>↓</div>
                  <div className={styles.archNode} style={{ textAlign: 'center', background: 'rgba(245,158,11,0.06)', borderColor: 'rgba(245,158,11,0.25)' }}>
                    <div className={styles.archNodeLabel}>384-D</div>
                    <div className={styles.archNodeSub}>Acoustic embedding</div>
                  </div>
                </div>
              </div>
              <div className={styles.vArrow}>↓</div>
              <div className={styles.archNode + ' ' + styles.archNodeAccent} style={{ textAlign: 'center', padding: '0.875rem' }}>
                <div style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>🔀</div>
                <div className={styles.archNodeLabel}>Feature Fusion (Concat)</div>
                <div className={styles.archNodeSub}>384 + 384 = 768-D representation</div>
              </div>
              <div className={styles.vArrow}>↓</div>
              <div className={styles.archNode + ' ' + styles.archNodeAccent} style={{ textAlign: 'center', padding: '0.875rem' }}>
                <div style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>🤖</div>
                <div className={styles.archNodeLabel}>RoFormer</div>
                <div className={styles.archNodeSub}>Contextual boundary classifier</div>
              </div>
              <div className={styles.vArrow}>↓</div>
              <div className={styles.archNode} style={{ textAlign: 'center', background: 'var(--sim-surface-2)' }}>
                <div className={styles.archNodeLabel}>Boundary Label</div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '0.375rem' }}>
                  <span className={styles.chip0}>0 = continue</span>
                  <span className={styles.chip1}>1 = new topic</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Processing */}
        <div>
          <div className={styles.card} style={{ marginBottom: '1rem' }}>
            <div className={styles.cardHeader}>
              <div className={styles.cardHeaderIcon}>⚡</div>
              <span className={styles.cardHeaderTitle}>Input to MultiSeg</span>
            </div>
            <div className={styles.cardBody}>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, background: 'var(--sim-surface-2)', borderRadius: '0.5rem', padding: '0.75rem' }}>
                  <div style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--sim-text-3)', marginBottom: '0.25rem' }}>Transcript</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--sim-text)' }}>15 sentences with timestamps</div>
                </div>
                <div style={{ flex: 1, background: 'var(--sim-surface-2)', borderRadius: '0.5rem', padding: '0.75rem' }}>
                  <div style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--sim-text-3)', marginBottom: '0.25rem' }}>Boundaries</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--sim-text)' }}>14 inter-sentence positions</div>
                </div>
                <div style={{ flex: 1, background: 'var(--sim-surface-2)', borderRadius: '0.5rem', padding: '0.75rem' }}>
                  <div style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--sim-text-3)', marginBottom: '0.25rem' }}>Audio Windows</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--sim-text)' }}>±1.5s per boundary</div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.cardHeaderIcon}>💻</div>
              <span className={styles.cardHeaderTitle}>Processing Log</span>
            </div>
            <div className={styles.cardBody}>
              {!running && !done && (
                <div className={styles.infoBox}>
                  <div className={styles.infoBoxTitle}>Simulation Mode</div>
                  MultiSeg inference uses precomputed demonstration outputs for presentation reliability. The architecture and algorithm shown are the actual implementation.
                </div>
              )}
              {(running || done) && <ProcessingLog entries={logs} progress={done ? 100 : progress} />}
              {done && (
                <div className={styles.successBox} style={{ marginTop: '1rem' }}>
                  <span>✓</span>
                  <div>
                    <strong>MultiSeg complete.</strong> 5 topic boundaries detected across 14 inter-sentence positions, yielding 6 topic segments.
                    <div className={styles.simNote} style={{ marginTop: '0.25rem' }}>Precomputed simulation output.</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.navRow}>
        <button className={styles.btn + ' ' + styles.btnGhost} onClick={onPrev}>← Back</button>
        <div className={styles.navRowRight}>
          {!running && !done && (
            <button className={styles.btn + ' ' + styles.btnPrimary} onClick={runMultiSeg}>⚡ Run MultiSeg</button>
          )}
          {running && !done && (
            <button className={styles.btn + ' ' + styles.btnPrimary} disabled>
              <span className={styles.spinner} /> Detecting boundaries...
            </button>
          )}
          {done && (
            <button className={styles.btn + ' ' + styles.btnPrimary} onClick={onNext}>View Topic Segments →</button>
          )}
        </div>
      </div>
    </div>
  );
}
