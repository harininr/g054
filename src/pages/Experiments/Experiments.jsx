import { hypotheses } from '../../data/experiments';
import { FlaskConical, AlertCircle } from 'lucide-react';
import styles from './Experiments.module.css';

export default function Experiments() {
  return (
    <main className={styles.page}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <div className="container">
          <span className="badge badge--dark">Experiments</span>
          <h1 className={styles.pageTitle}>Experimental Design</h1>
          <p className={styles.pageSubtitle}>
            Four research hypotheses, each testing a distinct aspect of the transcript-dominant retrieval pipeline.
            Evaluation uses R@1, R@5, and mIoU on annotated lecture query–timestamp pairs.
          </p>
          <div className={styles.noResults}>
            <AlertCircle size={16} />
            <span>
              <strong>Evaluation in progress.</strong> This page documents experimental design and methodology.
              Numerical results will be added after benchmark evaluation is complete.
            </span>
          </div>
        </div>
      </div>

      <div className="container">
        <div className={styles.hypothesesList}>
          {hypotheses.map((h) => (
            <section key={h.id} id={h.id} className={styles.hCard} aria-labelledby={`${h.id}-heading`}>
              <div className={styles.hHeader}>
                <div className={styles.hId}>{h.id}</div>
                <div>
                  <h2 id={`${h.id}-heading`} className={styles.hTitle}>{h.title}</h2>
                  <p className={styles.hClaim}>&ldquo;{h.claim}&rdquo;</p>
                </div>
              </div>

              <div className={styles.hBody}>
                <div className={styles.hRationale}>
                  <p className={styles.rationaleLabel}>Rationale</p>
                  <p className={styles.rationaleText}>{h.rationale}</p>
                </div>

                {/* H1 */}
                {h.id === 'H1' && (
                  <div className={styles.hDetails}>
                    <div className={styles.detailRow}>
                      <div className={styles.detailBlock}>
                        <p className={styles.detailLabel}>Baseline</p>
                        <div className={`${styles.variantChip} ${styles.variantBaseline}`}>
                          {h.baseline}
                        </div>
                      </div>
                      <div className={styles.detailBlock}>
                        <p className={styles.detailLabel}>Proposed</p>
                        <div className={`${styles.variantChip} ${styles.variantProposed}`}>
                          {h.proposed}
                        </div>
                      </div>
                    </div>
                    <ExampleQuery query={h.exampleQuery} note={h.exampleNote} />
                  </div>
                )}

                {/* H2 */}
                {h.id === 'H2' && (
                  <div className={styles.hDetails}>
                    <div className={styles.formulaBlock}>
                      <p className={styles.detailLabel}>Fusion Formula</p>
                      <code className={styles.formula}>{h.formula}</code>
                    </div>
                    <div className={styles.detailRow}>
                      <div className={styles.detailBlock}>
                        <p className={styles.detailLabel}>Alpha Values Tested</p>
                        <div className={styles.alphaRow}>
                          {h.alphaValues.map((a) => (
                            <span key={a} className={styles.alphaChip}>α = {a}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <VariantsGrid variants={h.variants} />
                  </div>
                )}

                {/* H3 */}
                {h.id === 'H3' && (
                  <div className={styles.hDetails}>
                    <div className={styles.detailRow}>
                      <div className={styles.detailBlock}>
                        <p className={styles.detailLabel}>Semantic Method</p>
                        <ol className={styles.methodList}>
                          {h.semanticMethod.map((s, i) => (
                            <li key={i}>{s}</li>
                          ))}
                        </ol>
                      </div>
                      <div className={styles.detailBlock}>
                        <p className={styles.detailLabel}>Fixed-Window Baselines</p>
                        <div className={styles.chipRow}>
                          {h.fixedWindows.map((w) => (
                            <span key={w} className={`${styles.variantChip} ${styles.variantBaseline}`}>{w}</span>
                          ))}
                        </div>
                        <p className={styles.detailLabel} style={{ marginTop: '1rem' }}>Considerations</p>
                        <ul className={styles.considerList}>
                          {h.considerations.map((c, i) => <li key={i}>{c}</li>)}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {/* H4 */}
                {h.id === 'H4' && (
                  <div className={styles.hDetails}>
                    <div className={styles.detailRow}>
                      <div className={styles.detailBlock}>
                        <p className={styles.detailLabel}>Expansion Pipeline</p>
                        <ol className={styles.methodList}>
                          {h.pipeline.map((s, i) => <li key={i}>{s}</li>)}
                        </ol>
                      </div>
                      <div className={styles.detailBlock}>
                        <p className={styles.detailLabel}>Speed-Accuracy Tradeoffs</p>
                        <ul className={styles.considerList}>
                          {h.tradeoffs.map((t, i) => <li key={i}>{t}</li>)}
                        </ul>
                      </div>
                    </div>
                    <VariantsGrid variants={h.variants} />
                  </div>
                )}

                {/* Metrics + Status */}
                <div className={styles.hFooter}>
                  <div className={styles.metricsRow}>
                    <p className={styles.detailLabel}>Evaluation Metrics</p>
                    <div className={styles.chipRow}>
                      {h.metrics.map((m) => (
                        <span key={m} className={`${styles.metricChip} badge badge--pastel`}>{m}</span>
                      ))}
                    </div>
                  </div>
                  <div className={`${styles.resultsBanner}`}>
                    <FlaskConical size={16} />
                    <p className={styles.resultsNote}>{h.resultsNote}</p>
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}

function ExampleQuery({ query, note }) {
  return (
    <div className={styles.exampleBlock}>
      <p className={styles.detailLabel}>Example Query</p>
      <div className={styles.exampleQuery}>
        <span className={styles.exampleLabel}>Query</span>
        <code className={styles.exampleText}>&ldquo;{query}&rdquo;</code>
      </div>
      <p className={styles.exampleNote}>{note}</p>
    </div>
  );
}

function VariantsGrid({ variants }) {
  return (
    <div>
      <p className={styles.detailLabel}>Variants</p>
      <div className={styles.variantsGrid}>
        {variants.map((v, i) => (
          <div key={i} className={styles.variantCard}>
            <span className={styles.variantLabel}>{v.label}</span>
            <span className={styles.variantDesc}>{v.description}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
