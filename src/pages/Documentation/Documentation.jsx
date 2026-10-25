import { useState } from 'react';
import { ChevronRight, BookOpen, Cpu, Database, Search, FileText, Layers, Mic, Settings, AlertCircle, GitBranch } from 'lucide-react';
import styles from './Documentation.module.css';

const docSections = [
  {
    id: 'getting-started',
    icon: <BookOpen size={16} />,
    label: 'Getting Started',
    content: {
      title: 'Getting Started',
      overview:
        'This documentation covers the complete architecture and implementation of the Transcript-Dominant Summary-Assisted Semantic Indexing pipeline for Lecture Video Moment Retrieval.',
      subsections: [
        {
          title: 'Prerequisites',
          body: 'The system requires Python 3.9+, PyTorch, Hugging Face Transformers, Sentence-Transformers, FAISS, and OpenAI Whisper. A CUDA-capable GPU is recommended for BART and SBERT inference at scale.',
        },
        {
          title: 'Installation',
          code: 'pip install openai-whisper\npip install transformers\npip install sentence-transformers\npip install faiss-cpu  # or faiss-gpu\npip install torch torchvision',
        },
      ],
    },
  },
  {
    id: 'system-overview',
    icon: <Settings size={16} />,
    label: 'System Overview',
    content: {
      title: 'System Overview',
      overview:
        'The system is divided into two phases: an offline indexing phase (run once per lecture corpus) and an online query phase (run per retrieval request). The offline phase is compute-intensive; the online phase is fast.',
      subsections: [
        {
          title: 'Offline Phase (Indexing)',
          body: 'Input: Lecture video → Whisper ASR → Transcript segmentation → BART summarization → SBERT embedding → FAISS index. This phase runs once per lecture corpus and produces a persistent FAISS index + metadata store.',
        },
        {
          title: 'Online Phase (Retrieval)',
          body: 'Input: User query → SBERT query embedding → FAISS search → Top-K results → Ranked output with timestamps, summaries, and confidence scores.',
        },
      ],
    },
  },
  {
    id: 'dataset',
    icon: <Database size={16} />,
    label: 'Dataset',
    content: {
      title: 'Dataset',
      overview:
        'The project uses a corpus of lecture video recordings. Dataset statistics will be finalized after dataset preparation is complete.',
      subsections: [
        {
          title: 'Video Dataset',
          body: 'Lecture video recordings covering computer science topics. Dataset statistics (number of videos, total duration, topics covered) will be added after final dataset preparation.',
          note: true,
        },
        {
          title: 'Annotation Protocol',
          body: 'Ground-truth query–timestamp pairs will be annotated to enable evaluation of R@1, R@5, and mIoU metrics. Annotation methodology and inter-annotator agreement details will be documented after annotation is complete.',
          note: true,
        },
      ],
    },
  },
  {
    id: 'asr-pipeline',
    icon: <Mic size={16} />,
    label: 'ASR Pipeline',
    content: {
      title: 'ASR Pipeline (Whisper)',
      overview:
        'OpenAI Whisper converts lecture audio into timestamped transcript segments. Whisper was selected for its state-of-the-art accuracy on diverse speech and its native support for word-level and segment-level timestamps.',
      subsections: [
        {
          title: 'Whisper Configuration',
          code: 'import whisper\n\nmodel = whisper.load_model("large")\nresult = model.transcribe(\n    "lecture.mp4",\n    word_timestamps=True\n)\n\nsegments = result["segments"]\n# Each segment: {start, end, text}',
        },
        {
          title: 'Output Format',
          body: 'Each Whisper segment contains a start time (seconds), end time (seconds), and transcribed text. These raw segments are then merged or split during the segmentation step.',
        },
      ],
    },
  },
  {
    id: 'segmentation',
    icon: <Layers size={16} />,
    label: 'Transcript Segmentation',
    content: {
      title: 'Transcript Segmentation',
      overview:
        'Two segmentation strategies are evaluated: fixed-window and semantic boundary detection. The choice of segmentation significantly affects retrieval granularity and precision.',
      subsections: [
        {
          title: 'Fixed-Window Segmentation',
          body: 'The transcript is divided into fixed-duration windows (30s, 60s, 120s). Simple to implement, but arbitrarily cuts conceptual units.',
        },
        {
          title: 'Semantic Boundary Detection',
          code: '# 10-second sub-chunks\nsub_chunks = chunk_transcript(segments, size=10)\nembeddings = sbert.encode(sub_chunks)\n\nboundaries = []\nfor i in range(len(sub_chunks)-1):\n    sim = cosine_similarity(\n        embeddings[i], embeddings[i+1])\n    if sim < threshold_τ:\n        boundaries.append(i)',
        },
      ],
    },
  },
  {
    id: 'bart',
    icon: <Cpu size={16} />,
    label: 'BART Summarization',
    content: {
      title: 'BART Semantic Compression',
      overview:
        'facebook/bart-large-cnn summarizes each transcript segment into a semantically dense representation. This reduces noise from verbose speech patterns and produces query-aligned summaries.',
      subsections: [
        {
          title: 'BART Configuration',
          code: 'from transformers import pipeline\n\nsummarizer = pipeline(\n    "summarization",\n    model="facebook/bart-large-cnn"\n)\n\nfor segment in segments:\n    summary = summarizer(\n        segment["text"],\n        max_length=80,\n        min_length=20,\n        do_sample=False\n    )[0]["summary_text"]',
        },
      ],
    },
  },
  {
    id: 'sbert',
    icon: <GitBranch size={16} />,
    label: 'SBERT Embeddings',
    content: {
      title: 'SBERT Embedding Generation',
      overview:
        'Sentence-BERT encodes both raw transcript segments and BART summaries as dense 768-dimensional vectors. The fused embedding combines both representations with a tunable weight α.',
      subsections: [
        {
          title: 'Embedding Generation',
          code: 'from sentence_transformers import SentenceTransformer\n\nmodel = SentenceTransformer("all-mpnet-base-v2")\n\nraw_emb = model.encode(raw_texts)\nsummary_emb = model.encode(summary_texts)\n\n# Fused embedding\nalpha = 0.5\nfused = alpha * raw_emb + (1 - alpha) * summary_emb',
        },
      ],
    },
  },
  {
    id: 'faiss',
    icon: <Database size={16} />,
    label: 'FAISS Indexing',
    content: {
      title: 'FAISS Vector Index',
      overview:
        'FAISS (Facebook AI Similarity Search) indexes all segment embeddings and enables efficient approximate nearest-neighbour search at query time using cosine similarity.',
      subsections: [
        {
          title: 'Index Construction',
          code: 'import faiss\nimport numpy as np\n\ndim = 768\nindex = faiss.IndexFlatIP(dim)\n\n# Normalize for cosine similarity\nembeddings = np.array(fused_embeddings)\nfaiss.normalize_L2(embeddings)\nindex.add(embeddings)\n\n# Save index\nfaiss.write_index(index, "lecture.index")',
        },
      ],
    },
  },
  {
    id: 'retrieval',
    icon: <Search size={16} />,
    label: 'Retrieval',
    content: {
      title: 'Query Processing & Retrieval',
      overview:
        'At retrieval time, the user\'s query is encoded with SBERT, normalized, and searched against the FAISS index. Top-K results are returned with timestamps, summaries, and confidence scores.',
      subsections: [
        {
          title: 'Query-to-Timestamp Pipeline',
          code: 'def retrieve(query, k=5):\n    E_q = model.encode([query])\n    faiss.normalize_L2(E_q)\n\n    D, I = index.search(E_q, k)\n\n    results = []\n    for rank, (score, idx) in enumerate(zip(D[0], I[0])):\n        results.append({\n            "rank": rank + 1,\n            "timestamp": metadata[idx]["timestamp"],\n            "summary": metadata[idx]["summary"],\n            "score": float(score),\n        })\n\n    # Confidence scoring\n    if len(D[0]) >= 2:\n        conf = (D[0][0] - D[0][1]) / D[0][0]\n        results[0]["confidence"] = conf\n\n    return results',
        },
      ],
    },
  },
  {
    id: 'evaluation',
    icon: <AlertCircle size={16} />,
    label: 'Evaluation',
    content: {
      title: 'Evaluation Protocol',
      overview:
        'Evaluation uses Recall@K (R@1, R@5) and mean Intersection over Union (mIoU) on annotated lecture query–timestamp pairs. Results are pending experimental evaluation.',
      subsections: [
        {
          title: 'Metrics',
          body: 'R@1: Fraction of queries where the correct segment appears in the top-1 result. R@5: Fraction where the correct segment appears in the top-5 results. mIoU: Mean temporal overlap between predicted and ground-truth timestamps.',
        },
        {
          title: 'Status',
          body: 'Experimental benchmarking is planned after full pipeline implementation. No numerical results are available yet.',
          note: true,
        },
      ],
    },
  },
];

export default function Documentation() {
  const [activeId, setActiveId] = useState(docSections[0].id);
  const active = docSections.find((s) => s.id === activeId);

  return (
    <main className={styles.page}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <div className="container">
          <span className="badge badge--dark">Documentation</span>
          <h1 className={styles.pageTitle}>Documentation Hub</h1>
          <p className={styles.pageSubtitle}>
            Technical documentation for every component of the retrieval pipeline.
          </p>
        </div>
      </div>

      <div className={`container ${styles.docsLayout}`}>
        {/* Sidebar */}
        <nav className={styles.sidebar} aria-label="Documentation navigation">
          <div className={styles.sidebarInner}>
            <p className={styles.sidebarLabel}>Contents</p>
            <ul role="list">
              {docSections.map((sec) => (
                <li key={sec.id}>
                  <button
                    className={`${styles.sidebarLink} ${activeId === sec.id ? styles.sidebarLinkActive : ''}`}
                    onClick={() => setActiveId(sec.id)}
                    aria-current={activeId === sec.id ? 'page' : undefined}
                  >
                    <span className={styles.sidebarIcon} aria-hidden="true">{sec.icon}</span>
                    {sec.label}
                    {activeId === sec.id && <ChevronRight size={14} className={styles.sidebarArrow} />}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Content */}
        <article className={styles.docContent} aria-label={active.content.title}>
          <h2 className={styles.docTitle}>{active.content.title}</h2>
          <p className={styles.docOverview}>{active.content.overview}</p>

          {active.content.subsections.map((sub, i) => (
            <section key={i} className={styles.docSubsection}>
              <h3 className={styles.subTitle}>{sub.title}</h3>
              {sub.note && (
                <div className={styles.pendingNote}>
                  <AlertCircle size={14} />
                  <span>Documentation pending — content will be added as the project progresses.</span>
                </div>
              )}
              {sub.body && <p className={styles.subBody}>{sub.body}</p>}
              {sub.code && (
                <pre className="code-block">
                  <code>{sub.code}</code>
                </pre>
              )}
            </section>
          ))}
        </article>
      </div>
    </main>
  );
}
