import { resultsSections } from '../../data/experiments';
import { BarChart2, Clock, AlertCircle } from 'lucide-react';
import styles from './Results.module.css';

export default function Results() {
  return (
    <main className={styles.page}>
      <div className={styles.pageHeader}>
        <div className="container">
          <span className="badge badge--dark">Results</span>
          <h1 className={styles.pageTitle}>Experimental Results</h1>
          <p className={styles.pageSubtitle}>
            This page is ready to receive actual experimental results as evaluation progresses.
            All result sections are structured and labelled — no fabricated metrics are displayed.
          </p>
          <div className={styles.noResults}>
            <AlertCircle size={16} />
            <span>
              <strong>Results pending.</strong>{' '}
              Experimental evaluation has not yet been completed. All sections below will be populated with actual data once evaluation is finished.
            </span>
          </div>
        </div>
      </div>

      <div className="container">
        <div className={styles.resultGrid}>
          {resultsSections.map((rs) => (
            <section key={rs.id} id={rs.id} className={styles.resultCard} aria-labelledby={`${rs.id}-heading`}>
              <div className={styles.cardTop}>
                <div className={styles.cardIcon} aria-hidden="true">
                  <BarChart2 size={20} />
                </div>
                <div>
                  <h2 id={`${rs.id}-heading`} className={styles.cardTitle}>{rs.title}</h2>
                  <p className={styles.cardDesc}>{rs.description}</p>
                </div>
              </div>

              {/* Placeholder chart area */}
              <div className={styles.chartPlaceholder} aria-label="Chart will be displayed once results are available">
                <div className={styles.placeholderBars} aria-hidden="true">
                  {[60, 45, 75, 30, 80].map((h, i) => (
                    <div key={i} className={styles.bar} style={{ height: `${h}%` }} />
                  ))}
                </div>
                <div className={styles.placeholderText}>
                  <Clock size={18} />
                  <p>Awaiting experimental evaluation</p>
                  <p className={styles.placeholderSub}>
                    Results will be populated with actual data from annotated lecture query benchmarks.
                  </p>
                </div>
              </div>

              <div className={styles.cardFooter}>
                <span className="badge badge--in-progress">
                  <span className="dot dot--progress" aria-hidden="true" />
                  Evaluation in progress
                </span>
              </div>
            </section>
          ))}
        </div>

        {/* Example retrieval — clearly labelled as illustrative */}
        <section className={styles.exampleSection} aria-labelledby="example-heading">
          <div className={styles.exampleHeader}>
            <h2 id="example-heading" className={styles.exampleTitle}>Example Retrieval Output</h2>
            <span className={`badge badge--in-progress`} style={{ background: 'rgba(245,158,11,0.1)', color: '#d97706', border: '1px solid rgba(245,158,11,0.25)' }}>
              Illustrative Example — Not an Experimental Result
            </span>
          </div>
          <p className={styles.exampleNote}>
            This is a structural example of the retrieval output format. Values shown are illustrative only.
          </p>

          <div className={styles.retrievalExample}>
            <div className={styles.exampleQuery}>
              <span className={styles.exLabel}>User Query</span>
              <code className={styles.exCode}>&ldquo;Explain gradient descent with learning rate&rdquo;</code>
            </div>
            <div className={styles.exampRows}>
              <div className={styles.exampRow}>
                <span className={styles.exLabel}>Retrieved Timestamp</span>
                <code className={styles.exCode}>12:43 → 14:17 (94 seconds)</code>
              </div>
              <div className={styles.exampRow}>
                <span className={styles.exLabel}>Shot Summary</span>
                <p className={styles.exText}>
                  &ldquo;The instructor explains that gradient descent iteratively adjusts model parameters by computing the gradient of the loss function with respect to each weight and moving in the negative gradient direction scaled by the learning rate α.&rdquo;
                </p>
              </div>
              <div className={styles.exampRow}>
                <span className={styles.exLabel}>Confidence Score</span>
                <code className={styles.exCode}>0.73 (illustrative)</code>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
