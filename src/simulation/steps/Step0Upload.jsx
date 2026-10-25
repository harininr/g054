import VideoUploader from '../components/VideoUploader';
import StatusBadge from '../components/StatusBadge';
import styles from '../steps.module.css';

export default function Step0Upload({ fileMetadata, onFile, onDemo, onNext }) {
  const ready = !!fileMetadata;
  return (
    <div className={styles.page}>
      <div className={styles.stepBadge}>
        <span>STEP 0</span> · Pipeline Entry
      </div>
      <h1 className={styles.stepTitle}>Upload Lecture Video</h1>
      <p className={styles.stepSubtitle}>
        Provide the lecture video that will be processed through our pipeline:
        Whisper ASR → MultiSeg → BART Summarization.
      </p>

      <div className={styles.grid2} style={{ alignItems: 'start', marginBottom: '1.5rem' }}>
        <div>
          <VideoUploader onFile={onFile} onDemo={onDemo} fileMetadata={fileMetadata} />
        </div>

        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.cardHeaderIcon}>📋</div>
            <span className={styles.cardHeaderTitle}>Pipeline Overview</span>
          </div>
          <div className={styles.cardBody}>
            {[
              { step: 'Whisper ASR', desc: 'Speech to timestamped transcript', status: 'implemented' },
              { step: 'MultiSeg', desc: 'Topic boundary detection', status: 'functional' },
              { step: 'BART', desc: 'Topic-wise summarization', status: 'functional' },
              { step: 'Semantic Retrieval', desc: 'Query → timestamp', status: 'upcoming' },
            ].map(({ step, desc, status }) => (
              <div key={step} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.625rem 0', borderBottom: '1px solid var(--sim-border)' }}>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--sim-text)' }}>{step}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--sim-text-3)' }}>{desc}</div>
                </div>
                <StatusBadge status={status} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {ready && (
        <div className={styles.infoBox} style={{ marginBottom: '1.5rem' }}>
          <div className={styles.infoBoxTitle}>Ready to Process</div>
          Video loaded. The simulation will demonstrate each pipeline stage with precomputed outputs representative of our implementation.
        </div>
      )}

      <div className={styles.navRow}>
        <div style={{ fontSize: '0.8rem', color: 'var(--sim-text-3)' }}>
          {ready ? '✓ Video ready' : 'Upload or use demonstration dataset to continue'}
        </div>
        <div className={styles.navRowRight}>
          <button
            className={styles.btnPrimary + ' ' + styles.btn}
            onClick={onNext}
            disabled={!ready}
          >
            Start Processing →
          </button>
        </div>
      </div>
    </div>
  );
}
