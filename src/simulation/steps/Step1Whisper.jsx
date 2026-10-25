import { useState, useEffect, useCallback } from 'react';
import ProcessingLog from '../components/ProcessingLog';
import styles from '../steps.module.css';

const WHISPER_STEPS = [
  { msg: 'Loading video metadata...', offsetSec: 0 },
  { msg: 'Extracting audio stream...', offsetSec: 2 },
  { msg: 'Audio track isolated (16kHz mono WAV)', offsetSec: 4, done: true },
  { msg: 'Initializing Whisper ASR (openai/whisper-base)...', offsetSec: 5 },
  { msg: 'Chunking audio into 30-second segments...', offsetSec: 7 },
  { msg: 'Running beam search transcription (beam_size=5)...', offsetSec: 8 },
  { msg: 'Processing segment 1 of 5... (00:00–00:30)', offsetSec: 11 },
  { msg: 'Processing segment 2 of 5... (00:30–01:00)', offsetSec: 13 },
  { msg: 'Processing segment 3 of 5... (01:00–01:30)', offsetSec: 15 },
  { msg: 'Processing segment 4 of 5... (01:30–02:00)', offsetSec: 17 },
  { msg: 'Processing segment 5 of 5... (02:00–09:30)', offsetSec: 19 },
  { msg: 'Aligning timestamps with audio boundaries...', offsetSec: 21 },
  { msg: 'Post-processing transcript segments...', offsetSec: 22 },
  { msg: 'Whisper ASR complete — 15 segments, 570 seconds covered', offsetSec: 23, done: true },
];

export default function Step1Whisper({ fileMetadata, onNext, onPrev }) {
  const [logs, setLogs] = useState([]);
  const [progress, setProgress] = useState(0);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);

  const runWhisper = useCallback(() => {
    setRunning(true);
    setLogs([]);
    setProgress(0);
    WHISPER_STEPS.forEach((step, i) => {
      setTimeout(() => {
        setLogs(prev => [...prev, step]);
        setProgress(Math.round(((i + 1) / WHISPER_STEPS.length) * 100));
        if (i === WHISPER_STEPS.length - 1) {
          setTimeout(() => setDone(true), 400);
        }
      }, step.offsetSec * 500);
    });
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.stepBadge}>STEP 1 / 4 · VIDEO → WHISPER</div>
      <h1 className={styles.stepTitle}>Preparing Lecture Audio</h1>
      <p className={styles.stepSubtitle}>
        Whisper ASR converts lecture speech into timestamped textual segments,
        preserving temporal alignment throughout the transcript.
      </p>

      <div className={styles.grid2} style={{ marginBottom: '1.5rem', alignItems: 'start' }}>
        {/* Left: Video info */}
        <div>
          <div className={styles.card} style={{ marginBottom: '1rem' }}>
            <div className={styles.cardHeader}>
              <div className={styles.cardHeaderIcon}>📹</div>
              <span className={styles.cardHeaderTitle}>Input: Lecture Video</span>
            </div>
            <div className={styles.cardBody}>
              {[
                ['File', fileMetadata?.name || '—'],
                ['Duration', fileMetadata?.duration || '—'],
                ['Format', fileMetadata?.format || '—'],
                ['Size', fileMetadata?.size || '—'],
              ].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid var(--sim-border)', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--sim-text-3)' }}>{k}</span>
                  <span style={{ fontSize: '0.82rem', fontFamily: 'JetBrains Mono, monospace', color: 'var(--sim-text)', fontWeight: 600 }}>{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pipeline flow */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.cardHeaderIcon}>⚙️</div>
              <span className={styles.cardHeaderTitle}>Processing Pipeline</span>
            </div>
            <div className={styles.cardBody}>
              {[
                { icon: '📹', label: 'Lecture Video', desc: 'Input MP4/WebM/MOV' },
                null,
                { icon: '🎵', label: 'Audio Extraction', desc: 'ffmpeg · 16kHz mono WAV' },
                null,
                { icon: '🎙️', label: 'Whisper ASR', desc: 'openai/whisper-base · beam_size=5' },
                null,
                { icon: '📄', label: 'Timestamped Transcript', desc: 'Start · End · Text per segment' },
              ].map((item, i) =>
                item === null ? (
                  <div key={i} className={styles.vArrow}>↓</div>
                ) : (
                  <div key={i} className={styles.archNode} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.625rem 0.875rem', textAlign: 'left' }}>
                    <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
                    <div>
                      <div className={styles.archNodeLabel} style={{ fontSize: '0.85rem' }}>{item.label}</div>
                      <div className={styles.archNodeSub}>{item.desc}</div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* Right: Processing log */}
        <div>
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.cardHeaderIcon}>🎙️</div>
              <span className={styles.cardHeaderTitle}>Whisper ASR Processing</span>
            </div>
            <div className={styles.cardBody}>
              {!running && !done && (
                <div className={styles.infoBox} style={{ marginBottom: '1rem' }}>
                  <div className={styles.infoBoxTitle}>What is Whisper?</div>
                  OpenAI Whisper is a multi-lingual automatic speech recognition model trained on 680,000 hours of audio data. It produces token-aligned transcripts with word-level timestamps for every spoken segment.
                </div>
              )}
              {(running || done) && (
                <ProcessingLog entries={logs} progress={done ? 100 : progress} />
              )}
              {done && (
                <div className={styles.successBox} style={{ marginTop: '1rem' }}>
                  <span>✓</span>
                  <div>
                    <strong>Whisper processing complete.</strong> 15 timestamped segments generated covering the full lecture duration.
                    <div className={styles.simNote} style={{ marginTop: '0.25rem' }}>Precomputed simulation — representative of Whisper output on lecture-domain audio.</div>
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
            <button className={styles.btn + ' ' + styles.btnPrimary} onClick={runWhisper}>
              🎙️ Run Whisper ASR
            </button>
          )}
          {running && !done && (
            <button className={styles.btn + ' ' + styles.btnPrimary} disabled>
              <span className={styles.spinner} /> Processing...
            </button>
          )}
          {done && (
            <button className={styles.btn + ' ' + styles.btnPrimary} onClick={onNext}>
              View Transcript →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
