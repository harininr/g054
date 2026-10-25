import { Play, Clock, FlaskConical, AlertCircle, Search, FileText, Target } from 'lucide-react';
import styles from './Demonstration.module.css';

const demoCards = [
  {
    id: 'full-pipeline',
    title: 'Full Pipeline Demonstration',
    description: 'End-to-end walkthrough from lecture video input to retrieved moment with timestamp, summary, and confidence score.',
    duration: 'Duration TBD',
    experiment: 'Complete Pipeline',
    status: 'coming-soon',
  },
  {
    id: 'whisper-demo',
    title: 'Whisper ASR Transcription',
    description: 'Demonstration of OpenAI Whisper processing a lecture video and producing timestamped transcript segments.',
    duration: 'Duration TBD',
    experiment: 'ASR Component',
    status: 'coming-soon',
  },
  {
    id: 'retrieval-demo',
    title: 'Query-to-Timestamp Retrieval',
    description: 'Live demo of a natural language query being matched to the most relevant lecture segment via SBERT + FAISS.',
    duration: 'Duration TBD',
    experiment: 'Retrieval Pipeline',
    status: 'coming-soon',
  },
  {
    id: 'comparison-demo',
    title: 'CLIP vs. Transcript Comparison',
    description: 'Side-by-side comparison of vision-based CLIP retrieval and transcript-based SBERT retrieval on the same lecture query.',
    duration: 'Duration TBD',
    experiment: 'Hypothesis H1',
    status: 'coming-soon',
  },
];

export default function Demonstration() {
  return (
    <main className={styles.page}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <div className="container">
          <span className="badge badge--dark">Demonstration</span>
          <h1 className={styles.pageTitle}>Demonstration</h1>
          <p className={styles.pageSubtitle}>
            Video demonstrations of the retrieval pipeline, component walkthroughs, and
            example retrieval outputs. Demo videos will be added once recording is complete.
          </p>
        </div>
      </div>

      <div className="container">
        {/* Demo Cards */}
        <section className={styles.demoGrid} aria-label="Demonstration videos">
          {demoCards.map((demo) => (
            <article key={demo.id} className={styles.demoCard} aria-labelledby={`${demo.id}-heading`}>
              {/* Video placeholder */}
              <div className={styles.videoPlaceholder}>
                <div className={styles.placeholderContent}>
                  <div className={styles.playCircle} aria-hidden="true">
                    <Play size={24} />
                  </div>
                  <p className={styles.comingSoon}>Demo video coming soon</p>
                </div>
                <div className={styles.videoBadge}>
                  <Clock size={12} />
                  {demo.duration}
                </div>
              </div>
              <div className={styles.cardBody}>
                <span className="badge badge--pastel">{demo.experiment}</span>
                <h3 id={`${demo.id}-heading`} className={styles.cardTitle}>{demo.title}</h3>
                <p className={styles.cardDesc}>{demo.description}</p>
                <button className={`btn btn--ghost btn--sm ${styles.watchBtn}`} disabled aria-label={`Watch ${demo.title} — coming soon`}>
                  <Play size={14} />
                  Watch Demo
                </button>
              </div>
            </article>
          ))}
        </section>

        {/* Example Retrieval */}
        <section className={styles.exampleSection} aria-labelledby="example-retrieval-heading">
          <div className={styles.exampleHeader}>
            <h2 id="example-retrieval-heading" className={styles.exampleTitle}>
              <Search size={20} />
              Example Retrieval
            </h2>
            <span className={styles.exampleWarning}>
              <AlertCircle size={14} />
              Illustrative example — not an experimental result
            </span>
          </div>
          <p className={styles.exampleNote}>
            This demonstrates the expected output format of the retrieval pipeline. All values are illustrative.
          </p>

          <div className={styles.retrievalFlow}>
            {/* Query */}
            <div className={styles.flowStep}>
              <div className={styles.flowIcon} aria-hidden="true"><Search size={18} /></div>
              <div className={styles.flowContent}>
                <span className={styles.flowLabel}>User Query</span>
                <code className={styles.flowCode}>&ldquo;What is the vanishing gradient problem?&rdquo;</code>
              </div>
            </div>
            <div className={styles.flowArrow} aria-hidden="true" />

            {/* Processing */}
            <div className={styles.flowStep}>
              <div className={styles.flowIcon} aria-hidden="true"><FlaskConical size={18} /></div>
              <div className={styles.flowContent}>
                <span className={styles.flowLabel}>SBERT Encoding → FAISS Search</span>
                <span className={styles.flowMuted}>Query encoded as 768-dim vector, searched against lecture index</span>
              </div>
            </div>
            <div className={styles.flowArrow} aria-hidden="true" />

            {/* Result */}
            <div className={`${styles.flowStep} ${styles.flowResult}`}>
              <div className={styles.flowIcon} aria-hidden="true"><Target size={18} /></div>
              <div className={styles.flowContent}>
                <span className={styles.flowLabel}>Retrieved Result</span>
                <div className={styles.resultGrid}>
                  <div className={styles.resultItem}>
                    <span className={styles.resultLabel}>Timestamp</span>
                    <code className={styles.resultValue}>23:15 → 25:42</code>
                  </div>
                  <div className={styles.resultItem}>
                    <span className={styles.resultLabel}>Confidence</span>
                    <code className={styles.resultValue}>0.68 (illustrative)</code>
                  </div>
                </div>
                <div className={styles.resultItem} style={{ marginTop: '0.75rem' }}>
                  <span className={styles.resultLabel}>Shot Summary</span>
                  <p className={styles.resultText}>
                    &ldquo;The instructor explains that in deep neural networks, gradients can become exponentially small during backpropagation through many layers, causing the vanishing gradient problem. This prevents earlier layers from learning effectively. Solutions include ReLU activation functions and residual connections.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
