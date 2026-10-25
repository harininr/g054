// ─── Project Timeline Data ────────────────────────────────────────────────────
// Status: COMPLETED | IN_PROGRESS | PLANNED
// IMPORTANT: Only mark tasks as COMPLETED if verified in project documentation.

export const timelineItems = [
  {
    id: 1,
    phase: "Phase 1 — Foundation",
    status: "COMPLETED",
    title: "Literature Survey",
    description:
      "Comprehensive survey of Video Moment Retrieval (VMR) and Video Corpus Moment Retrieval (VCMR) literature, covering vision-dominant, multimodal, and language-grounded retrieval approaches.",
    details: [
      "Reviewed 10+ relevant papers on VMR, temporal grounding, and multimodal retrieval",
      "Identified common methodology patterns and benchmark datasets",
      "Documented research gaps in lecture-domain VMR",
    ],
  },
  {
    id: 2,
    phase: "Phase 1 — Foundation",
    status: "COMPLETED",
    title: "Research Gap Identification",
    description:
      "Identified the key research gap: existing VMR methods are vision-dominant and fail to leverage spoken discourse as the primary semantic signal for knowledge-centric lecture videos.",
    details: [
      "Formalised the problem of visual stasis in lecture videos",
      "Identified over-reliance on visual transitions in existing methods",
      "Documented the case for transcript-dominant semantic retrieval",
    ],
  },
  {
    id: 3,
    phase: "Phase 1 — Foundation",
    status: "COMPLETED",
    title: "Problem Formulation",
    description:
      "Formulated the research problem as transcript-dominant semantic localization: given a natural language query, retrieve the lecture video segment whose transcribed speech best matches the query.",
    details: [
      "Defined retrieval granularity at the shot/segment level",
      "Specified evaluation metrics: R@1, R@5, mIoU",
      "Stated four research hypotheses",
    ],
  },
  {
    id: 4,
    phase: "Phase 1 — Foundation",
    status: "COMPLETED",
    title: "Core Model Selection",
    description:
      "Selected and justified the core components of the pipeline: Whisper ASR, BART for summarization, SBERT for semantic embeddings, and FAISS for vector indexing.",
    details: [
      "Evaluated Whisper variants for lecture audio transcription",
      "Justified BART for semantic compression over raw transcript",
      "Justified SBERT (Sentence-BERT) for dense query and segment embeddings",
      "Selected FAISS for efficient approximate nearest-neighbour search",
    ],
  },
  {
    id: 5,
    phase: "Phase 1 — Foundation",
    status: "COMPLETED",
    title: "Initial Whisper ASR Integration",
    description:
      "Implemented and tested the Whisper ASR pipeline on lecture video samples to produce timestamped transcript segments.",
    details: [
      "Integrated OpenAI Whisper for audio transcription",
      "Validated timestamp accuracy on lecture samples",
      "Confirmed feasibility of downstream transcript processing",
    ],
  },
  {
    id: 6,
    phase: "Phase 2 — Implementation",
    status: "IN_PROGRESS",
    title: "Fixed Shot-Level Transcript Segmentation",
    description:
      "Implementing temporal segmentation strategies including fixed-window and semantic-boundary-based approaches for dividing transcripts into retrieval units.",
    details: [
      "Fixed-window segmentation (30s, 60s, 120s variants)",
      "Semantic boundary detection via consecutive SBERT cosine similarity",
      "Threshold τ selection for boundary detection",
    ],
  },
  {
    id: 7,
    phase: "Phase 2 — Implementation",
    status: "PLANNED",
    title: "BART Semantic Compression",
    description:
      "Apply BART summarization to each transcript segment to produce a semantically compressed, query-friendly representation for indexing.",
    details: [
      "Generate shot-level BART summaries",
      "Compare retrieval with raw vs. summarized segments",
      "Ablation: raw only vs. summary only vs. fused",
    ],
  },
  {
    id: 8,
    phase: "Phase 2 — Implementation",
    status: "PLANNED",
    title: "SBERT Embedding Generation",
    description:
      "Encode all transcript segments and their BART summaries using Sentence-BERT to produce dense semantic vectors for FAISS indexing.",
    details: [
      "Generate SBERT embeddings for raw transcript segments",
      "Generate SBERT embeddings for BART summaries",
      "Implement embedding fusion with weight α",
    ],
  },
  {
    id: 9,
    phase: "Phase 2 — Implementation",
    status: "PLANNED",
    title: "FAISS Vector Indexing",
    description:
      "Build a FAISS index over the computed embeddings to enable efficient approximate nearest-neighbour search at query time.",
    details: [
      "Index construction (FlatIP or IVF variants)",
      "Cosine similarity search configuration",
      "Timestamp metadata storage alongside embeddings",
    ],
  },
  {
    id: 10,
    phase: "Phase 2 — Implementation",
    status: "PLANNED",
    title: "End-to-End Query-to-Timestamp Retrieval",
    description:
      "Assemble the complete pipeline: query → SBERT embedding → FAISS search → top-K segments → ranked output with timestamps, summaries, and confidence scores.",
    details: [
      "Query embedding via SBERT",
      "FAISS top-K retrieval",
      "Confidence scoring: (S1 − S2) / S1",
      "Timestamp and summary output formatting",
    ],
  },
  {
    id: 11,
    phase: "Phase 3 — Evaluation",
    status: "PLANNED",
    title: "Experimental Benchmarking",
    description:
      "Evaluate all four research hypotheses using annotated lecture query pairs, measuring R@1, R@5, and mIoU across pipeline variants.",
    details: [
      "H1: Transcript vs. CLIP vision baseline",
      "H2: Embedding fusion ablation (α ∈ {0.3, 0.5, 0.6, 0.7})",
      "H3: Semantic vs. fixed-window segmentation",
      "H4: Single-query vs. LLM query expansion recall",
    ],
  },
  {
    id: 12,
    phase: "Phase 3 — Evaluation",
    status: "PLANNED",
    title: "Annotated Lecture Query Evaluation",
    description:
      "Conduct accuracy evaluation using a curated set of annotated lecture query–timestamp pairs to measure retrieval precision and recall.",
    details: [
      "Dataset: annotated lecture segments with ground-truth timestamps",
      "Evaluation protocol: R@1, R@5, mIoU",
      "Ablation across all pipeline variants",
    ],
  },
];
