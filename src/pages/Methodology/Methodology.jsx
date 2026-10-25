import { Mic, Cpu, GitBranch, Database, Search, ArrowDown, FileText, Layers, Target } from 'lucide-react';
import styles from './Methodology.module.css';

const steps = [
  {
    num: '01',
    icon: <FileText size={22} />,
    title: 'Lecture Video',
    subtitle: 'Input',
    what: 'A long-form lecture video recording (audio + visual content).',
    why: 'The source material. The pipeline extracts audio for transcription; visual frames are not used in the core retrieval mechanism.',
    produces: 'Raw video file ready for audio extraction.',
    tag: 'Input',
  },
  {
    num: '02',
    icon: <Mic size={22} />,
    title: 'Whisper ASR',
    subtitle: 'Automatic Speech Recognition',
    what: 'OpenAI Whisper converts lecture audio into timestamped transcript segments.',
    why: 'Whisper provides state-of-the-art speech recognition with built-in word/segment-level timestamps, making it suitable for long lecture recordings without requiring manual transcription.',
    produces: 'Timestamped text segments: [{start, end, text}, ...]',
    tag: 'ASR',
    code: '# Example Whisper output segment\n{\n  "start": 127.4,\n  "end":   142.1,\n  "text":  "So gradient descent updates the weights by moving in the direction that reduces the loss..."\n}',
    status: 'COMPLETED',
  },
  {
    num: '03',
    icon: <FileText size={22} />,
    title: 'Temporal Segmentation',
    subtitle: 'Shot-Level Division',
    what: 'Divides the full transcript into retrieval units (shots/segments) using either fixed-window or semantic boundary detection.',
    why: 'FAISS indexes segments, not full transcripts. Proper segmentation determines retrieval granularity — too coarse loses precision, too fine loses context. Semantic boundary detection uses SBERT cosine similarity between consecutive 10-second sub-chunks.',
    produces: 'List of segments: [{id, start, end, text}, ...]',
    tag: 'Segmentation',
    code: '# Semantic boundary detection\nfor i in range(len(chunks)-1):\n    sim = cosine_similarity(embed[i], embed[i+1])\n    if sim < threshold_τ:\n        insert_boundary()',
    status: 'IN_PROGRESS',
  },
  {
    num: '04',
    icon: <Cpu size={22} />,
    title: 'BART Semantic Compression',
    subtitle: 'Shot-Level Summarization',
    what: 'facebook/bart-large-cnn summarizes each transcript segment into a concise semantic representation.',
    why: 'Raw transcripts contain filler words, repetition, and verbose speech patterns. BART compression produces a noise-reduced, semantically dense representation that is more query-aligned during embedding.',
    produces: 'Per-segment BART summary: {segment_id, summary_text}',
    tag: 'BART',
    code: 'from transformers import pipeline\nsummarizer = pipeline("summarization",\n  model="facebook/bart-large-cnn")\n\nsummary = summarizer(segment_text,\n  max_length=80, min_length=20)',
    status: 'PLANNED',
  },
  {
    num: '05',
    icon: <GitBranch size={22} />,
    title: 'SBERT Embedding Generation',
    subtitle: 'Dense Vector Encoding',
    what: 'Sentence-BERT encodes each segment (raw transcript and/or BART summary) as a dense 768-dimensional vector.',
    why: 'SBERT produces semantically meaningful sentence embeddings that capture meaning beyond keyword overlap. Fused embeddings combine raw precision with summary noise-robustness.',
    produces: 'Per-segment embedding vectors: {segment_id, embedding: [768-dim]}',
    tag: 'SBERT',
    code: 'from sentence_transformers import SentenceTransformer\nmodel = SentenceTransformer(\n  "all-mpnet-base-v2")\n\n# Fused embedding\nE = α * model.encode(raw_text)\n  + (1-α) * model.encode(summary)',
    status: 'PLANNED',
  },
  {
    num: '06',
    icon: <Database size={22} />,
    title: 'FAISS Vector Index',
    subtitle: 'Approximate Nearest Neighbour',
    what: 'All segment embeddings are indexed in FAISS for efficient cosine similarity search at query time.',
    why: 'FAISS enables sub-linear time retrieval over large embedding collections. The index stores embedding vectors alongside segment metadata (timestamps, summaries).',
    produces: 'Searchable FAISS index + metadata store',
    tag: 'FAISS',
    code: 'import faiss\n# Build inner-product index\nindex = faiss.IndexFlatIP(dim=768)\n# Normalize for cosine similarity\nfaiss.normalize_L2(embeddings)\nindex.add(embeddings)',
    status: 'PLANNED',
  },
  {
    num: '07',
    icon: <Search size={22} />,
    title: 'Query Embedding',
    subtitle: 'Query Processing',
    what: 'At retrieval time, the user\'s natural language query is encoded using the same SBERT model.',
    why: 'The query must live in the same embedding space as the indexed segments for cosine similarity to be meaningful.',
    produces: 'Query embedding vector: [768-dim]',
    tag: 'Query',
    code: 'query = "Explain gradient descent"\nE_q = model.encode(query)\nfaiss.normalize_L2(E_q)',
    status: 'PLANNED',
  },
  {
    num: '08',
    icon: <Target size={22} />,
    title: 'Top-K Retrieval & Scoring',
    subtitle: 'Retrieval Output',
    what: 'FAISS returns the top-K most similar segments. A confidence score is computed using the margin between the top-1 and top-2 similarity scores.',
    why: 'The confidence score (S1 − S2) / S1 quantifies how decisively the top result outperforms the next-best match. High confidence indicates a clear retrieval; low confidence suggests ambiguity.',
    produces: 'Retrieved moments: [{timestamp, summary, confidence_score}]',
    tag: 'Output',
    code: '# Top-K search\nD, I = index.search(E_q, k=5)\n\n# Confidence scoring\nconfidence = (D[0][0] - D[0][1]) / D[0][0]',
    status: 'PLANNED',
  },
];

const statusColors = {
  COMPLETED: 'completed',
  IN_PROGRESS: 'in-progress',
  PLANNED: 'planned',
};

const statusLabels = {
  COMPLETED: 'Completed',
  IN_PROGRESS: 'In Progress',
  PLANNED: 'Planned',
};

export default function Methodology() {
  return (
    <main className={styles.page}>
      {/* Page Header */}
      <div className={styles.pageHeader}>
        <div className="container">
          <span className="badge badge--dark">Methodology</span>
          <h1 className={styles.pageTitle}>System Methodology</h1>
          <p className={styles.pageSubtitle}>
            A step-by-step walkthrough of every component in the transcript-dominant semantic retrieval pipeline — what each does, why it was selected, and what it produces.
          </p>
        </div>
      </div>

      <div className="container">
        {/* Mathematical Model */}
        <section className={styles.mathSection} aria-labelledby="math-heading">
          <h2 id="math-heading" className={styles.mathTitle}>Mathematical Model</h2>
          <p className={styles.mathSubtitle}>
            The retrieval pipeline is defined by the following formal equations.
          </p>
          <div className={styles.mathGrid}>
            <div className={styles.mathCard}>
              <div className={styles.mathLabel}>Query Embedding</div>
              <div className={styles.mathEq}>E<sub>q</sub> = f(q)</div>
              <div className={styles.mathNote}>f(·) denotes the SBERT encoder</div>
            </div>
            <div className={styles.mathCard}>
              <div className={styles.mathLabel}>Segment Embedding</div>
              <div className={styles.mathEq}>E<sub>i</sub> = f(s<sub>i</sub>)</div>
              <div className={styles.mathNote}>s<sub>i</sub> is the i-th transcript segment</div>
            </div>
            <div className={styles.mathCard}>
              <div className={styles.mathLabel}>Cosine Similarity</div>
              <div className={styles.mathEq}>
                Score<sub>i</sub> = <span className={styles.fraction}><span className={styles.numerator}>E<sub>q</sub> · E<sub>i</sub></span><span className={styles.denominator}>‖E<sub>q</sub>‖ ‖E<sub>i</sub>‖</span></span>
              </div>
            </div>
            <div className={styles.mathCard}>
              <div className={styles.mathLabel}>Best Result</div>
              <div className={styles.mathEq}>i* = argmax<sub>i</sub> Score<sub>i</sub></div>
            </div>
            <div className={styles.mathCard}>
              <div className={styles.mathLabel}>Embedding Fusion</div>
              <div className={styles.mathEq}>E<sub>fused</sub> = α · f(raw) + (1−α) · f(summary)</div>
              <div className={styles.mathNote}>α ∈ {'{'}0.3, 0.5, 0.6, 0.7{'}'}</div>
            </div>
            <div className={styles.mathCard}>
              <div className={styles.mathLabel}>Confidence Score</div>
              <div className={styles.mathEq}>
                Confidence = <span className={styles.fraction}><span className={styles.numerator}>S<sub>1</sub> − S<sub>2</sub></span><span className={styles.denominator}>S<sub>1</sub></span></span>
              </div>
              <div className={styles.mathNote}>S<sub>1</sub>, S<sub>2</sub> are top-1 and top-2 similarity scores</div>
            </div>
          </div>
        </section>

        {/* Pipeline Steps */}
        <section className={styles.pipelineSection} aria-labelledby="pipeline-heading">
          <h2 id="pipeline-heading" className={styles.sectionTitle}>Pipeline Components</h2>

          <div className={styles.stepsList}>
            {steps.map((step, i) => (
              <article key={i} className={styles.step} aria-labelledby={`step-${i}-heading`}>
                <div className={styles.stepLeft}>
                  <div className={styles.stepNum} aria-hidden="true">{step.num}</div>
                  {i < steps.length - 1 && (
                    <div className={styles.stepConnector} aria-hidden="true">
                      <ArrowDown size={14} />
                    </div>
                  )}
                </div>
                <div className={styles.stepRight}>
                  <div className={styles.stepHeader}>
                    <div className={styles.stepIconWrap} aria-hidden="true">{step.icon}</div>
                    <div>
                      <div className={styles.stepMeta}>
                        <span className={`badge badge--pastel`}>{step.tag}</span>
                        {step.status && (
                          <span className={`badge badge--${statusColors[step.status]}`}>
                            <span className={`dot dot--${statusColors[step.status]}`} aria-hidden="true" />
                            {statusLabels[step.status]}
                          </span>
                        )}
                      </div>
                      <h3 id={`step-${i}-heading`} className={styles.stepTitle}>{step.title}</h3>
                      <p className={styles.stepSubtitle}>{step.subtitle}</p>
                    </div>
                  </div>

                  <div className={styles.stepDetails}>
                    <div className={styles.detailBlock}>
                      <span className={styles.detailLabel}>What it does</span>
                      <p className={styles.detailText}>{step.what}</p>
                    </div>
                    <div className={styles.detailBlock}>
                      <span className={styles.detailLabel}>Why it is used</span>
                      <p className={styles.detailText}>{step.why}</p>
                    </div>
                    <div className={styles.detailBlock}>
                      <span className={styles.detailLabel}>What it produces</span>
                      <p className={`${styles.detailText} ${styles.produces}`}>{step.produces}</p>
                    </div>
                  </div>

                  {step.code && (
                    <pre className="code-block" aria-label={`Code example for ${step.title}`}>
                      <code>{step.code}</code>
                    </pre>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
