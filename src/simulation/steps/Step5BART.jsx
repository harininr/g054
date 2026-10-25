import { useState, useCallback } from 'react';
import ProcessingLog from '../components/ProcessingLog';
import { DEMO_TOPICS, BART_COMPARISON, VERIFIED_METRICS } from '../data/demoData';
import styles from '../steps.module.css';

const BART_STEPS = [
  { msg: 'Loading 6 topic segment transcripts...', offsetSec: 0 },
  { msg: 'Initializing BART model (facebook/bart-large-cnn)...', offsetSec: 2 },
  { msg: 'BART tokenizer ready (max_length=1024)...', offsetSec: 3, done: true },
  { msg: 'Processing Topic 1: Introduction to Neural Networks...', offsetSec: 4 },
  { msg: 'Encoding Topic 1 (encoder hidden states generated)...', offsetSec: 5 },
  { msg: 'Decoding Topic 1 (beam_size=4, max_new_tokens=150)...', offsetSec: 6 },
  { msg: 'Topic 1 summary generated ✓', offsetSec: 7, done: true },
  { msg: 'Processing Topic 2: Gradient Descent & Optimization...', offsetSec: 8 },
  { msg: 'Topic 2 summary generated ✓', offsetSec: 10, done: true },
  { msg: 'Processing Topic 3: Backpropagation Algorithm...', offsetSec: 11 },
  { msg: 'Topic 3 summary generated ✓', offsetSec: 13, done: true },
  { msg: 'Processing Topic 4: Activation Functions...', offsetSec: 14 },
  { msg: 'Topic 4 summary generated ✓', offsetSec: 15, done: true },
  { msg: 'Processing Topic 5: Regularization Techniques...', offsetSec: 16 },
  { msg: 'Topic 5 summary generated ✓', offsetSec: 18, done: true },
  { msg: 'Processing Topic 6: Convolutional Neural Networks...', offsetSec: 19 },
  { msg: 'Topic 6 summary generated ✓', offsetSec: 21, done: true },
  { msg: 'All 6 topic summaries generated — BART complete', offsetSec: 22, done: true },
];

export default function Step5BART({ onNext, onPrev }) {
  const [logs, setLogs] = useState([]);
  const [progress, setProgress] = useState(0);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const [showWhy, setShowWhy] = useState(false);

  const runBART = useCallback(() => {
    setRunning(true);
    setLogs([]);
    setProgress(0);
    BART_STEPS.forEach((step, i) => {
      setTimeout(() => {
        setLogs(prev => [...prev, step]);
        setProgress(Math.round(((i + 1) / BART_STEPS.length) * 100));
        if (i === BART_STEPS.length - 1) {
          setTimeout(() => setDone(true), 400);
        }
      }, step.offsetSec * 500);
    });
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.stepBadge}>STEP 3 / 4 · TOPIC-WISE SUMMARIZATION</div>
      <h1 className={styles.stepTitle}>Compressing Lecture Topics into Semantic Summaries</h1>
      <p className={styles.stepSubtitle}>
        Each topic segment identified by MultiSeg is processed independently by BART,
        producing a concise abstractive summary that preserves semantic content while
        reducing verbosity.
      </p>

      {/* IO Panel */}
      <div className={styles.ioRow} style={{ marginBottom: '1.5rem' }}>
        <div className={styles.ioPanel + ' ' + styles.ioPanelInput}>
          <div className={styles.ioLabel + ' ' + styles.ioLabelInput}>INPUT</div>
          <div className={styles.ioTitle}>Topic Segment Transcript</div>
          <div className={styles.ioDesc}>Full transcript text for one topic (e.g., Topic 3: Backpropagation Algorithm)</div>
        </div>
        <div className={styles.ioArrow}>→</div>
        <div className={styles.ioPanel} style={{ background: 'var(--sim-surface-2)', border: '1px solid var(--sim-border)' }}>
          <div style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--sim-accent-light)', marginBottom: '0.375rem' }}>MODEL</div>
          <div className={styles.ioTitle}>BART</div>
          <div className={styles.ioDesc}>facebook/bart-large-cnn · abstractive seq2seq</div>
        </div>
        <div className={styles.ioArrow}>→</div>
        <div className={styles.ioPanel + ' ' + styles.ioPanelOutput}>
          <div className={styles.ioLabel + ' ' + styles.ioLabelOutput}>OUTPUT</div>
          <div className={styles.ioTitle}>Topic Summary</div>
          <div className={styles.ioDesc}>Concise abstractive summary (2–4 sentences)</div>
        </div>
      </div>

      <div className={styles.grid2} style={{ marginBottom: '1.5rem', alignItems: 'start' }}>
        {/* BART process diagram */}
        <div>
          <div className={styles.card} style={{ marginBottom: '1rem' }}>
            <div className={styles.cardHeader}>
              <div className={styles.cardHeaderIcon}>🤖</div>
              <span className={styles.cardHeaderTitle}>BART Processing — Per Topic</span>
            </div>
            <div className={styles.cardBody} className={styles.vStack}>
              {[
                { icon: '📝', label: 'Topic Transcript', sub: 'Raw spoken text per topic segment' },
                null,
                { icon: '🔤', label: 'Tokenization', sub: 'BPE tokenizer · max_length=1024' },
                null,
                { icon: '🔷', label: 'BART Encoder', sub: 'Bidirectional transformer encoder' },
                null,
                { icon: '🔶', label: 'BART Decoder', sub: 'Autoregressive seq2seq decoder' },
                null,
                { icon: '🔠', label: 'Beam Search (n=4)', sub: 'max_new_tokens=150 · no_repeat_ngram=3' },
                null,
                { icon: '📋', label: 'Topic Summary', sub: 'Abstractive, semantically dense' },
              ].map((item, i) =>
                item === null ? (
                  <div key={i} className={styles.vArrow} style={{ margin: '0' }}>↓</div>
                ) : (
                  <div key={i} className={styles.archNode} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.625rem 0.875rem', textAlign: 'left' }}>
                    <span style={{ fontSize: '1.1rem' }}>{item.icon}</span>
                    <div>
                      <div className={styles.archNodeLabel} style={{ fontSize: '0.8rem' }}>{item.label}</div>
                      <div className={styles.archNodeSub}>{item.sub}</div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* Processing log */}
        <div>
          <div className={styles.card} style={{ marginBottom: '1rem' }}>
            <div className={styles.cardHeader}>
              <div className={styles.cardHeaderIcon}>💻</div>
              <span className={styles.cardHeaderTitle}>Processing Log — All 6 Topics</span>
            </div>
            <div className={styles.cardBody}>
              {!running && !done && (
                <div className={styles.infoBox}>
                  <div className={styles.infoBoxTitle}>Independent Topic Processing</div>
                  BART processes each topic segment independently, enabling parallel execution in a production environment. Each topic transcript is summarized in isolation, preserving topic-level semantic coherence.
                </div>
              )}
              {(running || done) && <ProcessingLog entries={logs} progress={done ? 100 : progress} />}
              {done && (
                <div className={styles.successBox} style={{ marginTop: '1rem' }}>
                  <span>✓</span>
                  <div>
                    <strong>BART summarization complete.</strong> 6 topic summaries generated from 6 MultiSeg-delimited segments.
                    <div className={styles.simNote} style={{ marginTop: '0.25rem' }}>Precomputed simulation output — representative of BART abstractive summarization.</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Why BART */}
          <div className={styles.card}>
            <button
              className={styles.expandToggle}
              onClick={() => setShowWhy(v => !v)}
              style={{ width: '100%', padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: showWhy ? '1px solid var(--sim-border)' : 'none' }}
            >
              <span>{showWhy ? '▼' : '▶'}</span> Why BART?
              <span style={{ marginLeft: 'auto', fontSize: '0.65rem', color: 'var(--sim-text-3)' }}>Model selection rationale</span>
            </button>
            {showWhy && (
              <div className={styles.cardBody}>
                <div className={styles.infoBox} style={{ marginBottom: '1rem' }}>
                  <div className={styles.infoBoxTitle}>Verified Research Result</div>
                  BART achieved the highest BERT-F1 of <strong style={{ color: 'var(--sim-text)' }}>{VERIFIED_METRICS.bart.bertF1}</strong> in our model comparison study. This is the only confirmed numerical result for this component.
                </div>
                <div className={styles.tableWrap}>
                  <table className={styles.table}>
                    <thead>
                      <tr><th>Model</th><th>BERT-F1</th><th>Inference</th><th>Memory</th><th>Status</th></tr>
                    </thead>
                    <tbody>
                      {BART_COMPARISON.map(m => (
                        <tr key={m.model}>
                          <td><strong style={{ color: m.selected ? 'var(--sim-text)' : 'var(--sim-text-2)' }}>{m.model}</strong></td>
                          <td><span style={{ color: m.selected ? 'var(--sim-completed)' : 'var(--sim-text-2)', fontFamily: 'monospace', fontSize: '0.85rem' }}>{m.bertF1}</span></td>
                          <td>{m.inference}</td>
                          <td>{m.memory}</td>
                          <td>{m.selected ? <span className={styles.badge + ' ' + styles.badgeCompleted}>Selected</span> : '—'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className={styles.simNote} style={{ marginTop: '0.75rem' }}>
                  ROUGE-1, ROUGE-2, ROUGE-L not shown — only BERT-F1 is the verified metric from our comparison. — and — dashes denote values not available as verified results.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={styles.navRow}>
        <button className={styles.btn + ' ' + styles.btnGhost} onClick={onPrev}>← Back</button>
        <div className={styles.navRowRight}>
          {!running && !done && (
            <button className={styles.btn + ' ' + styles.btnPrimary} onClick={runBART}>🤖 Run BART Summarization</button>
          )}
          {running && !done && (
            <button className={styles.btn + ' ' + styles.btnPrimary} disabled>
              <span className={styles.spinner} /> Summarizing topics...
            </button>
          )}
          {done && (
            <button className={styles.btn + ' ' + styles.btnPrimary} onClick={onNext}>View All Summaries →</button>
          )}
        </div>
      </div>
    </div>
  );
}
