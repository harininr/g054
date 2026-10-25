import { useState } from 'react';
import { DEMO_TOPICS, DEMO_SUMMARIES, DEMO_TRANSCRIPT, VERIFIED_METRICS } from '../data/demoData';
import styles from '../steps.module.css';

export default function Step6BARTOutput({ onNext, onPrev, seekVideo }) {
  const [expandedTranscripts, setExpandedTranscripts] = useState({});

  const toggleTranscript = (id) => {
    setExpandedTranscripts(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const getTopicTranscript = (topic) => {
    return DEMO_TRANSCRIPT
      .filter(seg => topic.sentenceIds.includes(seg.id))
      .map(seg => `[${seg.start}–${seg.end}] ${seg.text}`)
      .join('\n\n');
  };

  return (
    <div className={styles.pageWide}>
      <div className={styles.stepBadge}>BART OUTPUT · ALL TOPIC SUMMARIES</div>
      <h1 className={styles.stepTitle}>Topic-Wise Semantic Summaries</h1>
      <p className={styles.stepSubtitle}>
        Each topic segment has been independently summarized by BART. These summaries
        form the semantic representation layer that will be used for vector-based retrieval
        in the next research phase.
      </p>

      <div className={styles.infoBox} style={{ marginBottom: '1.5rem', display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        <div>
          <div className={styles.infoBoxTitle}>Verified Metric</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--sim-text)', fontFamily: 'JetBrains Mono, monospace' }}>
            {VERIFIED_METRICS.bart.bertF1}
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--sim-text-3)', marginTop: '0.125rem' }}>BERT-F1 (model comparison)</div>
        </div>
        <div style={{ flex: 1, fontSize: '0.875rem', color: 'var(--sim-text-2)', lineHeight: 1.7 }}>
          {VERIFIED_METRICS.bart.label} The summaries below are precomputed demonstration outputs representative of BART abstractive summarization on lecture-domain transcripts.
        </div>
      </div>

      {/* Summary cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
        {DEMO_TOPICS.map((topic) => {
          const summary = DEMO_SUMMARIES.find(s => s.topicId === topic.id);
          const showTranscript = expandedTranscripts[topic.id];
          return (
            <div key={topic.id} className={styles.summaryCard}>
              <div className={styles.summaryCardHeader}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
                    <span className={styles.topicId}>TOPIC {String(topic.id).padStart(2, '0')}</span>
                    <span className={styles.topicTimestamp}>{topic.start} — {topic.end}</span>
                  </div>
                  <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--sim-text)' }}>{topic.label}</div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
                  <span className={styles.tag}>{topic.sentenceCount} sentences</span>
                  {seekVideo && (
                    <button
                      className={styles.btn + ' ' + styles.btnGhost}
                      style={{ padding: '0.375rem 0.75rem', fontSize: '0.75rem' }}
                      onClick={() => seekVideo(topic.startSec)}
                    >
                      ↗ {topic.start}
                    </button>
                  )}
                </div>
              </div>
              <div>
                <div className={styles.summaryLabel} style={{ padding: '0.75rem 1.25rem 0' }}>BART Summary</div>
                <div className={styles.summaryText}>{summary?.summary || '—'}</div>
              </div>
              <div className={styles.transcriptToggle}>
                <button className={styles.expandToggle} onClick={() => toggleTranscript(topic.id)}>
                  <span>{showTranscript ? '▼' : '▶'}</span>
                  {showTranscript ? 'Hide' : 'View'} source transcript ({topic.sentenceCount} segments)
                </button>
                {showTranscript && (
                  <div className={styles.transcriptText}>
                    {DEMO_TRANSCRIPT.filter(s => topic.sentenceIds.includes(s.id)).map(seg => (
                      <div key={seg.id} style={{ marginBottom: '0.625rem' }}>
                        <span className={styles.mono} style={{ color: 'var(--sim-accent-light)', marginRight: '0.5rem' }}>[{seg.start}–{seg.end}]</span>
                        {seg.text}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Next step hint */}
      <div className={styles.card} style={{ marginBottom: '1.5rem' }}>
        <div className={styles.cardHeader}>
          <div className={styles.cardHeaderIcon}>✅</div>
          <span className={styles.cardHeaderTitle}>These Summaries Become the Retrieval Index</span>
        </div>
        <div className={styles.cardBody}>
          <div className={styles.ioRow}>
            {[
              { icon: '📝', label: 'Topic Summaries', sub: '6 BART-generated semantic summaries' },
              { label: '→' },
              { icon: '🔢', label: 'SBERT Encoding', sub: '768-D dense embeddings' },
              { label: '→' },
              { icon: '🗄️', label: 'FAISS Index', sub: 'Vector similarity search' },
              { label: '→' },
              { icon: '🔍', label: 'Query Retrieval', sub: 'Next Research Phase', upcoming: true },
            ].map((item, i) => item.label ? (
              <div key={i} className={styles.ioArrow}>{item.label}</div>
            ) : (
              <div key={i} style={{ flex: 1, textAlign: 'center', opacity: item.upcoming ? 0.5 : 1 }}>
                <div style={{ fontSize: '1.3rem', marginBottom: '0.25rem' }}>{item.icon}</div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--sim-text)' }}>{item.label}</div>
                <div style={{ fontSize: '0.7rem', color: item.upcoming ? 'var(--sim-upcoming)' : 'var(--sim-text-3)' }}>{item.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.navRow}>
        <button className={styles.btn + ' ' + styles.btnGhost} onClick={onPrev}>← Back</button>
        <div className={styles.navRowRight}>
          <button className={styles.btn + ' ' + styles.btnPrimary} onClick={onNext}>View Final Pipeline Output →</button>
        </div>
      </div>
    </div>
  );
}
