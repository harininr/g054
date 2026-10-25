import { MapPin, FileText, BarChart3, Clock } from 'lucide-react';
import styles from './Architecture.module.css';

const inputLayer = [
  { step: '01', label: 'Lecture Video', sub: 'Raw Input', type: 'input' },
  { step: '02', label: 'Whisper ASR', sub: 'Speech Recognition', type: 'process' },
  { step: '03', label: 'Timestamped Transcript', sub: 'Text + Timestamps', type: 'data' },
  { step: '04', label: 'Shot / Temporal Segmentation', sub: 'Fixed-Window or Semantic Boundary', type: 'process' },
  { step: '05', label: 'BART Shot-Level Summary', sub: 'Semantic Compression', type: 'process' },
  { step: '06', label: 'SBERT Embedding', sub: 'Dense Vector Encoding', type: 'process' },
  { step: '07', label: 'FAISS Vector Index', sub: 'Indexed Embedding Store', type: 'store' },
];

const queryLayer = [
  { step: 'Q1', label: 'User Query', sub: 'Natural Language Input', type: 'input' },
  { step: 'Q2', label: 'SBERT Query Embedding', sub: 'Same Encoder as Index', type: 'process' },
  { step: 'Q3', label: 'FAISS Similarity Search', sub: 'Cosine Similarity Lookup', type: 'process' },
  { step: 'Q4', label: 'Top-K Similar Shots', sub: 'Ranked Candidates', type: 'data' },
];

const outputLayer = [
  { label: 'Retrieved Moment', sub: 'Matched Lecture Segment', icon: MapPin },
  { label: 'Shot Summary', sub: 'BART-Generated Summary', icon: FileText },
  { label: 'Confidence Score', sub: '(S₁ − S₂) / S₁', icon: BarChart3 },
  { label: 'Timestamp', sub: 'Start → End (seconds)', icon: Clock },
];

function NodeType({ type }) {
  const map = { input: 'nodeInput', process: 'nodeProcess', data: 'nodeData', store: 'nodeStore' };
  return map[type] || 'nodeProcess';
}

export default function Architecture() {
  return (
    <main className={styles.page}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <div className="container">
          <span className="badge badge--dark">Architecture</span>
          <h1 className={styles.pageTitle}>System Architecture</h1>
          <p className={styles.pageSubtitle}>
            Three-layer architecture: offline indexing of lecture transcripts, online query processing,
            and retrieval output with timestamps and confidence scores.
          </p>
        </div>
      </div>

      <div className="container">
        <div className={styles.archWrapper}>
          {/* Legend */}
          <div className={styles.legend} aria-label="Node type legend">
            <span className={styles.legendTitle}>Legend</span>
            <div className={styles.legendItems}>
              <div className={styles.legendItem}>
                <span className={`${styles.legendDot} ${styles.dotInput}`} />
                Input / Output
              </div>
              <div className={styles.legendItem}>
                <span className={`${styles.legendDot} ${styles.dotProcess}`} />
                Processing
              </div>
              <div className={styles.legendItem}>
                <span className={`${styles.legendDot} ${styles.dotData}`} />
                Data
              </div>
              <div className={styles.legendItem}>
                <span className={`${styles.legendDot} ${styles.dotStore}`} />
                Storage / Index
              </div>
            </div>
          </div>

          <div className={styles.layers}>
            {/* Indexing Layer */}
            <section className={`${styles.layer} ${styles.layerIndex}`} aria-labelledby="layer-index-heading">
              <div className={styles.layerLabel}>
                <div className={`${styles.layerBadge} ${styles.layerBadgeIndex}`}>Layer 1</div>
                <h2 id="layer-index-heading" className={styles.layerTitle}>Offline Indexing</h2>
                <p className={styles.layerDesc}>Processes lecture videos once, builds a searchable FAISS index</p>
              </div>
              <div className={styles.nodes}>
                {inputLayer.map((node, i) => (
                  <div key={i} className={styles.nodeWrapper}>
                    <div className={`${styles.node} ${styles[NodeType({ type: node.type })]}`} aria-label={node.label}>
                      <span className={styles.nodeStep}>{node.step}</span>
                      <span className={styles.nodeLabel}>{node.label}</span>
                      <span className={styles.nodeSub}>{node.sub}</span>
                    </div>
                    {i < inputLayer.length - 1 && (
                      <div className={styles.nodeArrow} aria-hidden="true">
                        <div className={styles.arrowLine} />
                        <div className={styles.arrowHead} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Divider + arrow showing FAISS is shared */}
            <div className={styles.layerBridge} aria-hidden="true">
              <div className={styles.bridgeLine} />
              <div className={styles.bridgeLabel}>FAISS Index shared between layers</div>
              <div className={styles.bridgeLine} />
            </div>

            {/* Query Layer */}
            <section className={`${styles.layer} ${styles.layerQuery}`} aria-labelledby="layer-query-heading">
              <div className={styles.layerLabel}>
                <div className={`${styles.layerBadge} ${styles.layerBadgeQuery}`}>Layer 2</div>
                <h2 id="layer-query-heading" className={styles.layerTitle}>Online Query Processing</h2>
                <p className={styles.layerDesc}>Processes user queries at retrieval time against the prebuilt index</p>
              </div>
              <div className={styles.nodes}>
                {queryLayer.map((node, i) => (
                  <div key={i} className={styles.nodeWrapper}>
                    <div className={`${styles.node} ${styles[NodeType({ type: node.type })]}`} aria-label={node.label}>
                      <span className={styles.nodeStep}>{node.step}</span>
                      <span className={styles.nodeLabel}>{node.label}</span>
                      <span className={styles.nodeSub}>{node.sub}</span>
                    </div>
                    {i < queryLayer.length - 1 && (
                      <div className={styles.nodeArrow} aria-hidden="true">
                        <div className={styles.arrowLine} />
                        <div className={styles.arrowHead} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Output Layer */}
          <section className={`${styles.layer} ${styles.layerOutput}`} aria-labelledby="layer-output-heading">
            <div className={styles.layerLabel}>
              <div className={`${styles.layerBadge} ${styles.layerBadgeOutput}`}>Layer 3</div>
              <h2 id="layer-output-heading" className={styles.layerTitle}>Retrieval Output</h2>
              <p className={styles.layerDesc}>Structured response for each retrieved lecture moment</p>
            </div>
            <div className={styles.outputGrid}>
              {outputLayer.map((item, i) => {
                const IconComp = item.icon;
                return (
                  <div key={i} className={styles.outputCard}>
                    <IconComp className={styles.outputIcon} size={22} aria-hidden="true" />
                    <span className={styles.outputLabel}>{item.label}</span>
                    <span className={styles.outputSub}>{item.sub}</span>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Key Design Decisions */}
          <section className={styles.decisions} aria-labelledby="decisions-heading">
            <h2 id="decisions-heading" className={styles.decisionTitle}>Key Design Decisions</h2>
            <div className={styles.decisionGrid}>
              {[
                {
                  q: 'Why no visual modality?',
                  a: 'Visual frames in lecture videos exhibit minimal discriminative variation. Lecture content changes are discourse-driven. Removing visual modality focuses retrieval power entirely on semantic content.',
                },
                {
                  q: 'Why BART before SBERT?',
                  a: 'Raw transcripts contain filler speech, redundancy, and colloquial phrasing. BART compression produces query-aligned semantic summaries that reduce noise in the embedding space.',
                },
                {
                  q: 'Why FAISS over brute-force search?',
                  a: 'FAISS enables sub-linear approximate nearest-neighbour search, making the system scalable to lecture corpora with thousands of segments without prohibitive query latency.',
                },
                {
                  q: 'Why separate offline/online phases?',
                  a: 'Indexing is expensive (ASR + BART + SBERT + FAISS). Separating it from query processing ensures fast retrieval — only SBERT query encoding + FAISS search happen at query time.',
                },
              ].map((d, i) => (
                <div key={i} className={styles.decisionCard}>
                  <p className={styles.decisionQ}>{d.q}</p>
                  <p className={styles.decisionA}>{d.a}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
