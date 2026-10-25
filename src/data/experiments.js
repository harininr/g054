// ─── Experiments Data ─────────────────────────────────────────────────────────
// IMPORTANT: No numerical results are fabricated.
// Results will be populated after experimental evaluation.

export const hypotheses = [
  {
    id: "H1",
    title: "Transcript vs. Vision-Based Retrieval",
    shortTitle: "H1: Transcript vs. CLIP",
    claim:
      "Transcript-based retrieval produces higher accuracy than vision-based retrieval for lecture videos.",
    rationale:
      "In knowledge-centric lecture videos, camera views remain static and visual content changes minimally. Conceptual explanations occur primarily in spoken discourse. Therefore, retrieval systems that operate over transcripts should outperform those that rely on visual frame features.",
    exampleQuery: "Explain gradient descent",
    exampleNote:
      "The concept 'gradient descent' may produce no distinctive visual cue (no scene change, no slide transition) while being explicitly and repeatedly present in speech.",
    baseline: "CLIP Vision-Based Retrieval",
    proposed: "Transcript-Based SBERT Retrieval",
    metrics: ["R@1", "R@5", "mIoU"],
    variants: [
      { label: "CLIP Baseline", description: "Visual frame embeddings via CLIP" },
      { label: "Transcript SBERT", description: "Transcript segments embedded with SBERT" },
    ],
    resultsStatus: "PENDING",
    resultsNote: "Experimental results pending evaluation on annotated lecture query set.",
  },
  {
    id: "H2",
    title: "Embedding Fusion Ablation",
    shortTitle: "H2: Fusion vs. Individual Signals",
    claim:
      "Fusing raw transcript embeddings with BART-compressed summary embeddings outperforms either signal independently.",
    rationale:
      "Raw transcripts preserve exact terminology but contain filler words and redundant speech. BART summaries capture semantic essence but may lose specific technical terms. A weighted fusion combines both strengths, producing a more robust retrieval representation.",
    formula: "Fused = α · SBERT(raw) + (1 − α) · SBERT(summary)",
    alphaValues: [0.3, 0.5, 0.6, 0.7],
    metrics: ["R@1", "R@5", "mIoU"],
    variants: [
      { label: "Raw Only", description: "SBERT over raw transcript segment" },
      { label: "Summary Only", description: "SBERT over BART-compressed summary" },
      { label: "Fused (α=0.3)", description: "30% raw + 70% summary" },
      { label: "Fused (α=0.5)", description: "50% raw + 50% summary" },
      { label: "Fused (α=0.6)", description: "60% raw + 40% summary" },
      { label: "Fused (α=0.7)", description: "70% raw + 30% summary" },
    ],
    resultsStatus: "PENDING",
    resultsNote: "Ablation results pending — optimal α to be determined from evaluation.",
  },
  {
    id: "H3",
    title: "Semantic vs. Fixed-Window Segmentation",
    shortTitle: "H3: Segmentation Strategy",
    claim:
      "Semantic boundary-based segmentation produces higher retrieval precision than fixed time-window segmentation.",
    rationale:
      "Fixed-window segmentation arbitrarily cuts transcripts regardless of topic boundaries, potentially splitting conceptual units across segments or merging unrelated topics. Semantic boundary detection using cosine similarity between consecutive SBERT embeddings identifies natural discourse transitions.",
    semanticMethod: [
      "Divide transcript into 10-second sub-chunks",
      "Compute SBERT embeddings for each sub-chunk",
      "Calculate cosine similarity between consecutive sub-chunks",
      "Insert boundary when similarity drops below threshold τ",
    ],
    fixedWindows: ["30 seconds", "60 seconds", "120 seconds"],
    metrics: ["R@1", "R@5", "mIoU"],
    considerations: [
      "Over-segmentation risk: very low τ creates too many short segments",
      "Under-segmentation risk: very high τ merges distinct topics",
      "Threshold τ selection is an empirical decision",
    ],
    resultsStatus: "PENDING",
    resultsNote: "Segmentation comparison results pending experimental evaluation.",
  },
  {
    id: "H4",
    title: "Query Expansion for Improved Recall",
    shortTitle: "H4: LLM Query Expansion",
    claim:
      "LLM-generated query expansion improves retrieval recall over single-query search.",
    rationale:
      "Student queries may be imprecise, use different vocabulary than the transcript, or lack the specific phrasing used in a lecture. Expanding the query into semantically related paraphrases using an LLM increases the coverage of the embedding search space.",
    pipeline: [
      "Student submits a natural language query",
      "LLM generates 3 semantically related paraphrases",
      "SBERT encodes all 4 queries (original + 3 paraphrases)",
      "FAISS returns top-K results for each query",
      "Union of retrieved results produces expanded candidate set",
    ],
    tradeoffs: [
      "Improved recall: paraphrases cover more vocabulary patterns",
      "Latency overhead: 4× SBERT inference + 4× FAISS search",
      "Risk of semantic drift: poorly generated paraphrases may hurt precision",
    ],
    metrics: ["R@1", "R@5", "Latency (ms)"],
    variants: [
      { label: "Single Query", description: "Original query only" },
      { label: "Expanded (×3)", description: "Original + 3 LLM paraphrases" },
    ],
    resultsStatus: "PENDING",
    resultsNote: "Query expansion evaluation results pending implementation.",
  },
];

export const resultsSections = [
  {
    id: "clip-comparison",
    title: "CLIP Baseline Comparison",
    description: "R@1, R@5, mIoU comparison between CLIP vision baseline and transcript SBERT retrieval.",
    status: "PENDING",
  },
  {
    id: "fusion-ablation",
    title: "Embedding Fusion Ablation",
    description: "Ablation study across α ∈ {0.3, 0.5, 0.6, 0.7} for raw-summary embedding fusion.",
    status: "PENDING",
  },
  {
    id: "segmentation-comparison",
    title: "Segmentation Strategy Comparison",
    description: "Retrieval precision comparison across semantic boundary and fixed-window segmentation.",
    status: "PENDING",
  },
  {
    id: "query-expansion",
    title: "Query Expansion Recall",
    description: "Recall improvement from LLM-generated paraphrase expansion vs. single query.",
    status: "PENDING",
  },
  {
    id: "latency",
    title: "Latency Analysis",
    description: "End-to-end query-to-result latency for single-query and expanded-query pipelines.",
    status: "PENDING",
  },
];
