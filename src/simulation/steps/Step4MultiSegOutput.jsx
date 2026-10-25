import { useState } from 'react';
import { DEMO_BOUNDARIES, DEMO_TOPICS, DEMO_TRANSCRIPT, VERIFIED_METRICS } from '../data/demoData';
import styles from '../steps.module.css';

export default function Step4MultiSegOutput({ onNext, onPrev }) {
  const [activeTopicId, setActiveTopicId] = useState(null);
  const [showValidation, setShowValidation] = useState(false);
  const totalSec = 570;

  return (
    <div className={styles.pageWide}>
      <div className={styles.stepBadge}>MULTISEG OUTPUT · TOPIC SEGMENTS</div>
      <h1 className={styles.stepTitle}>Detected Topic Boundaries</h1>
      <p className={styles.stepSubtitle}>
        MultiSeg predicts a binary boundary label for each inter-sentence position.
        Consecutive segments with label 0 form one topic; label 1 starts a new topic.
      </p>

      {/* Boundary label sequence */}
      <div className={styles.card} style={{ marginBottom: '1.5rem' }}>
        <div className={styles.cardHeader}>
          <div className={styles.cardHeaderIcon}>🔢</div>
          <span className={styles.cardHeaderTitle}>Boundary Label Sequence — 15 Sentences</span>
          <span className={styles.badge + ' ' + styles.badgeSim} style={{ marginLeft: 'auto' }}>Simulation Output</span>
        </div>
        <div className={styles.cardBody}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
            {DEMO_BOUNDARIES.map(b => (
              <div key={b.sentenceId} style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem',
                background: b.label === 1 ? 'rgba(139,26,62,0.12)' : 'var(--sim-surface-2)',
                border: b.label === 1 ? '1px solid rgba(139,26,62,0.35)' : '1px solid var(--sim-border)',
                borderRadius: '0.5rem', padding: '0.5rem 0.625rem', minWidth: '52px',
              }}>
                <span style={{ fontSize: '0.65rem', color: 'var(--sim-text-3)', fontFamily: 'monospace' }}>S{b.sentenceId}</span>
                <span className={b.label === 1 ? styles.chip1 : styles.chip0}>{b.label}</span>
                {b.label === 1 && <span style={{ fontSize: '0.55rem', color: 'var(--sim-accent-light)', fontWeight: 700 }}>BOUNDARY</span>}
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', fontSize: '0.75rem', color: 'var(--sim-text-3)' }}>
              <span className={styles.chip0}>0</span> Continuation of same topic
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', fontSize: '0.75rem', color: 'var(--sim-text-2)' }}>
              <span className={styles.chip1}>1</span> New topic begins
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--sim-text-3)', marginBottom: '0.5rem' }}>
          Lecture Timeline — Topic Segments with Boundary Markers
        </div>
        <div className={styles.timeline} style={{ height: 72 }}>
          {DEMO_TOPICS.map((topic) => {
            const left = (topic.startSec / totalSec) * 100;
            const width = ((topic.endSec - topic.startSec) / totalSec) * 100;
            const isActive = activeTopicId === topic.id;
            return (
              <div
                key={topic.id}
                className={styles.timelineFill}
                style={{
                  left: left + '%', width: width + '%',
                  background: isActive ? 'rgba(139,26,62,0.28)' : `rgba(${20 + topic.id * 15},${40 + topic.id * 8},${80 + topic.id * 5},0.25)`,
                  borderRight: '2px solid var(--sim-accent)',
                  cursor: 'pointer',
                }}
                onClick={() => setActiveTopicId(topic.id === activeTopicId ? null : topic.id)}
                title={'Topic ' + topic.id + ': ' + topic.label}
              >
                <span className={styles.timelineLabel} style={{ top: 4, bottom: 'auto', left: 4, color: 'var(--sim-text-2)' }}>
                  T{topic.id}
                </span>
                <span className={styles.timelineLabel} style={{ bottom: 4, left: 4, color: 'var(--sim-text-3)' }}>
                  {topic.start}–{topic.end}
                </span>
              </div>
            );
          })}
        </div>
        <div style={{ fontSize: '0.7rem', color: 'var(--sim-text-3)', textAlign: 'center' }}>
          Maroon vertical lines = MultiSeg-predicted topic boundaries · Click topic to highlight
        </div>
      </div>

      {/* Topic Cards */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--sim-text-3)', marginBottom: '0.875rem' }}>
          Topic Segments — 6 Lecture Units
        </div>
        <div className={styles.grid3}>
          {DEMO_TOPICS.map((topic) => (
            <div
              key={topic.id}
              className={styles.topicCard}
              style={{ cursor: 'pointer', borderColor: activeTopicId === topic.id ? 'var(--sim-accent)' : '' }}
              onClick={() => setActiveTopicId(topic.id === activeTopicId ? null : topic.id)}
            >
              <div className={styles.topicCardHeader}>
                <span className={styles.topicId}>TOPIC {String(topic.id).padStart(2, '0')}</span>
                <span className={styles.topicTimestamp}>{topic.start} — {topic.end}</span>
              </div>
              <div className={styles.topicTitle}>{topic.label}</div>
              <div className={styles.topicBody}>
                <div className={styles.topicPreview}>{topic.preview}</div>
                <div className={styles.topicMeta}>
                  <span className={styles.tag}>{topic.sentenceCount} sentences</span>
                  <span className={styles.tag}>{Math.round((topic.endSec - topic.startSec) / 60 * 10) / 10} min</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Validation section */}
      <div className={styles.card} style={{ marginBottom: '1.5rem' }}>
        <button
          className={styles.expandToggle}
          onClick={() => setShowValidation(v => !v)}
          style={{ width: '100%', padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: showValidation ? '1px solid var(--sim-border)' : 'none' }}
        >
          <span>{showValidation ? '▼' : '▶'}</span>
          <span>How We Validate MultiSeg — Evaluation on Our Dataset</span>
          <span style={{ marginLeft: 'auto', fontSize: '0.65rem', color: 'var(--sim-text-3)' }}>Click to {showValidation ? 'collapse' : 'expand'}</span>
        </button>
        {showValidation && (
          <div className={styles.cardBody}>
            <div className={styles.warningBox} style={{ marginBottom: '1.25rem' }}>
              <span>⚠</span>
              <div>
                <strong>Pretrained baseline only.</strong> The metrics below reflect the pretrained MultiSeg model evaluated on our lecture-domain dataset <em>before</em> domain-specific fine-tuning. Lecture-domain adaptation is currently in progress.
              </div>
            </div>
            <div className={styles.grid3} style={{ marginBottom: '1.25rem' }}>
              <div className={styles.metricCard}>
                <div className={styles.metricValue}>{VERIFIED_METRICS.dataset.annotatedBoundaries}</div>
                <div className={styles.metricLabel}>Annotated Boundaries</div>
              </div>
              <div className={styles.metricCard}>
                <div className={styles.metricValue}>{VERIFIED_METRICS.dataset.annotatedVideos}</div>
                <div className={styles.metricLabel}>Annotated Lectures</div>
              </div>
              <div className={styles.metricCard}>
                <div className={styles.metricValue}>{VERIFIED_METRICS.dataset.totalQueries}</div>
                <div className={styles.metricLabel}>Concept Queries</div>
              </div>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--sim-text-3)', marginBottom: '0.625rem' }}>
                Evaluation Tolerance Windows
              </div>
              <div className={styles.tableWrap}>
                <table className={styles.table}>
                  <thead><tr><th>Metric</th><th>Tolerance</th><th>Value (Pretrained Baseline)</th><th>Note</th></tr></thead>
                  <tbody>
                    <tr>
                      <td><span className={styles.mono}>Hit@5s</span></td>
                      <td>±5 seconds</td>
                      <td><strong style={{ color: 'var(--sim-pending)' }}>{VERIFIED_METRICS.multiSeg.hitAt5s}%</strong></td>
                      <td>Before fine-tuning</td>
                    </tr>
                    <tr>
                      <td><span className={styles.mono}>Hit@10s</span></td>
                      <td>±10 seconds</td>
                      <td><strong style={{ color: 'var(--sim-pending)' }}>{VERIFIED_METRICS.multiSeg.hitAt10s}%</strong></td>
                      <td>Before fine-tuning</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className={styles.infoBox}>
              <div className={styles.infoBoxTitle}>Why is the baseline low?</div>
              MultiSeg was originally trained on general domain corpora (news, Wikipedia). Lecture videos have different acoustic and discourse characteristics. Domain adaptation is required, which is currently in progress as part of our implementation work.
            </div>
          </div>
        )}
      </div>

      <div className={styles.navRow}>
        <button className={styles.btn + ' ' + styles.btnGhost} onClick={onPrev}>← Back</button>
        <div className={styles.navRowRight}>
          <button className={styles.btn + ' ' + styles.btnPrimary} onClick={onNext}>Continue to BART →</button>
        </div>
      </div>
    </div>
  );
}
