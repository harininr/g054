import { useState } from 'react';
import { DEMO_TRANSCRIPT } from '../data/demoData';
import styles from '../steps.module.css';

export default function Step2WhisperOutput({ onNext, onPrev, seekVideo }) {
  const [activeRow, setActiveRow] = useState(null);

  const totalSec = 570;
  const segments = DEMO_TRANSCRIPT;

  return (
    <div className={styles.page}>
      <div className={styles.stepBadge}>WHISPER OUTPUT</div>
      <h1 className={styles.stepTitle}>Timestamped Transcript</h1>
      <p className={styles.stepSubtitle}>
        Whisper converts lecture speech into timestamp-aligned textual units.
        Each row represents one spoken segment with precise start and end times.
      </p>

      {/* IO Explanation */}
      <div className={styles.ioRow} style={{ marginBottom: '1.5rem' }}>
        <div className={styles.ioPanel + ' ' + styles.ioPanelInput}>
          <div className={styles.ioLabel + ' ' + styles.ioLabelInput}>INPUT</div>
          <div className={styles.ioTitle}>Lecture Video</div>
          <div className={styles.ioDesc}>Raw audio stream (9:30 duration)</div>
        </div>
        <div className={styles.ioArrow}>→</div>
        <div className={styles.ioPanel} style={{ background: 'var(--sim-surface-2)', border: '1px solid var(--sim-border)' }}>
          <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#5ba0d0', marginBottom: '0.375rem' }}>MODULE</div>
          <div className={styles.ioTitle}>Whisper ASR</div>
          <div className={styles.ioDesc}>openai/whisper-base · beam search</div>
        </div>
        <div className={styles.ioArrow}>→</div>
        <div className={styles.ioPanel + ' ' + styles.ioPanelOutput}>
          <div className={styles.ioLabel + ' ' + styles.ioLabelOutput}>OUTPUT</div>
          <div className={styles.ioTitle}>Timestamped Segments</div>
          <div className={styles.ioDesc}>15 sentence-level segments with temporal alignment</div>
        </div>
      </div>

      {/* Timeline */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--sim-text-3)', marginBottom: '0.5rem' }}>
          Video Timeline — Transcript Segments
        </div>
        <div className={styles.timeline}>
          {segments.map((seg) => {
            const left = (seg.startSec / totalSec) * 100;
            const width = ((seg.endSec - seg.startSec) / totalSec) * 100;
            const isActive = activeRow === seg.id;
            return (
              <div
                key={seg.id}
                className={styles.timelineFill}
                style={{
                  left: left + '%',
                  width: width + '%',
                  background: isActive ? 'rgba(139,26,62,0.35)' : 'rgba(139,26,62,0.08)',
                  borderRight: '1px solid rgba(139,26,62,0.4)',
                  cursor: 'pointer',
                }}
                onClick={() => { setActiveRow(seg.id); seekVideo && seekVideo(seg.startSec); }}
                title={seg.start + ' – ' + seg.end}
              >
                {seg.id % 3 === 0 && (
                  <span className={styles.timelineLabel}>{seg.id}</span>
                )}
              </div>
            );
          })}
        </div>
        <div style={{ fontSize: '0.7rem', color: 'var(--sim-text-3)', textAlign: 'center' }}>
          Click a row below to highlight its position on the timeline
        </div>
      </div>

      {/* Transcript Table */}
      <div className={styles.card} style={{ marginBottom: '1.5rem' }}>
        <div className={styles.cardHeader}>
          <div className={styles.cardHeaderIcon}>📄</div>
          <span className={styles.cardHeaderTitle}>Transcript — 15 Segments</span>
          <span className={styles.badge + ' ' + styles.badgeSim} style={{ marginLeft: 'auto' }}>Precomputed Demo Output</span>
        </div>
        <div className={styles.tableWrap} style={{ borderRadius: 0, border: 'none' }}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>#</th>
                <th>Start</th>
                <th>End</th>
                <th>Transcript</th>
              </tr>
            </thead>
            <tbody>
              {segments.map((seg) => (
                <tr
                  key={seg.id}
                  className={activeRow === seg.id ? styles.tableRowActive : ''}
                  onClick={() => { setActiveRow(seg.id); seekVideo && seekVideo(seg.startSec); }}
                  style={{ cursor: 'pointer' }}
                >
                  <td><span className={styles.mono} style={{ color: 'var(--sim-accent-light)', fontWeight: 700 }}>{String(seg.id).padStart(2, '0')}</span></td>
                  <td><span className={styles.mono}>{seg.start}</span></td>
                  <td><span className={styles.mono}>{seg.end}</span></td>
                  <td style={{ maxWidth: '420px' }}>{seg.text}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Why Whisper explanation */}
      <div className={styles.infoBox} style={{ marginBottom: '1.5rem' }}>
        <div className={styles.infoBoxTitle}>Why Temporal Alignment Matters</div>
        Whisper produces timestamp-aligned transcript segments. These timestamps are carried through the entire pipeline — they are what allows MultiSeg to detect topic boundaries at the right temporal positions, and what allows BART summaries to be mapped back to precise video timestamps for retrieval.
      </div>

      {/* Next step transition hint */}
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div className={styles.cardHeaderIcon}>⚡</div>
          <span className={styles.cardHeaderTitle}>Next: MultiSeg Topic Segmentation</span>
        </div>
        <div className={styles.cardBody}>
          <div className={styles.ioRow}>
            <div style={{ flex: 1, textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>📄</div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--sim-text)' }}>Whisper Output</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--sim-text-3)' }}>Sentence-level timestamps</div>
            </div>
            <div className={styles.ioArrow}>→</div>
            <div style={{ flex: 1, textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>⚡</div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--sim-text)' }}>MultiSeg Input</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--sim-text-3)' }}>Transcript + boundary audio</div>
            </div>
            <div className={styles.ioArrow}>→</div>
            <div style={{ flex: 1, textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>🗂️</div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--sim-text)' }}>Topic Boundaries</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--sim-text-3)' }}>Binary boundary labels</div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.navRow}>
        <button className={styles.btn + ' ' + styles.btnGhost} onClick={onPrev}>← Back</button>
        <div className={styles.navRowRight}>
          <button className={styles.btn + ' ' + styles.btnPrimary} onClick={onNext}>
            Continue to MultiSeg →
          </button>
        </div>
      </div>
    </div>
  );
}
