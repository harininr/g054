// ─── Literature Survey Data ──────────────────────────────────────────────────
// Source: Project Report / Literature Survey
// DO NOT fabricate findings — use only documented information

export const literaturePapers = [
  {
    id: 1,
    authors: "Xie et al.",
    year: "2025",
    title: "Caption Assisted Multimodal Large Language Model for Video Moment Retrieval",
    method: "Caption-Assisted MLLM",
    mainApproach:
      "Leverages multimodal large language models with generated visual captions to bridge the gap between natural language queries and video content for moment retrieval.",
    gap: "Relies heavily on vision-generated captions; in static lecture scenes, caption quality may degrade. Speech/discourse context is secondary.",
    relevance:
      "Demonstrates the value of language-aligned representations for VMR; motivates our transcript-dominant approach where speech is the primary signal.",
  },
  {
    id: 2,
    authors: "Shi et al.",
    year: "2024",
    title: "Frame as Video Clip: Proposal-Free Moment Retrieval by Semantic Aligned Frames",
    method: "Proposal-Free Semantic Frame Alignment",
    mainApproach:
      "Treats individual frames as representative video clips; aligns frame-level semantics with query text without generating temporal proposals.",
    gap: "Frame-centric alignment struggles when visual content remains static across long conceptual explanations, a common pattern in lecture videos.",
    relevance:
      "Highlights limitations of frame-level approaches for knowledge-centric content; our work shifts to transcript-level alignment.",
  },
  {
    id: 3,
    authors: "Fang et al.",
    year: "—",
    title: "Hierarchical Local-Global Transformer for Temporal Sentence Grounding",
    method: "Hierarchical Transformer (Local-Global)",
    mainApproach:
      "Models both local clip-level and global video-level contexts using a hierarchical transformer architecture for temporal sentence grounding.",
    gap: "Transformer-based grounding depends on meaningful visual variation across the video; lecture videos with minimal visual change reduce local context diversity.",
    relevance:
      "Informs our segmentation strategy — rather than using visual boundaries, we detect discourse-level boundaries in transcripts.",
  },
  {
    id: 4,
    authors: "Shen et al.",
    year: "2025",
    title: "Temporal Modeling With Frozen Vision-Language Foundation Models",
    method: "Frozen VLM Temporal Adaptation",
    mainApproach:
      "Adapts frozen vision-language foundation models for temporal grounding by adding lightweight temporal modeling heads without fine-tuning the core model.",
    gap: "Frozen vision encoders retain visual bias from pre-training; lecture frames with near-identical visual content provide limited discriminative signal.",
    relevance:
      "Our system avoids reliance on visual encoders entirely, instead using SBERT and BART over transcripts for domain-appropriate retrieval.",
  },
  {
    id: 5,
    authors: "Bhandari et al.",
    year: "2025",
    title: "Improving Video Moment Retrieval via LLM-Augmented Nested Adapter",
    method: "LLM-Augmented Nested Adapter",
    mainApproach:
      "Introduces a nested adapter mechanism augmented by LLM-generated context to enrich query and video representations for moment retrieval.",
    gap: "LLM augmentation primarily enriches visual query alignment; the role of spoken language as the dominant retrieval signal is not explored.",
    relevance:
      "Inspires our query expansion hypothesis (H4), where LLM-generated paraphrases improve retrieval recall for student queries.",
  },
  {
    id: 6,
    authors: "Jeon et al.",
    year: "2025",
    title: "DBCON: Dual-Branch Contrastive Network for Video Moment Retrieval",
    method: "Dual-Branch Contrastive Network (DBCON)",
    mainApproach:
      "Employs contrastive learning across a dual-branch architecture to align video and text modalities for accurate moment retrieval.",
    gap: "Contrastive alignment between visual and text branches depends on visual distinctiveness; static lecture content weakens contrastive signal quality.",
    relevance:
      "Motivates the need for a unimodal transcript-dominant retrieval baseline to confirm where vision-dominant approaches fall short.",
  },
  {
    id: 7,
    authors: "Chen et al.",
    year: "—",
    title: "Cross-Modality Knowledge Calibration Network for Video Moment Retrieval",
    method: "Cross-Modality Knowledge Calibration",
    mainApproach:
      "Calibrates cross-modal representations through knowledge distillation between modalities, improving text-video alignment for grounding.",
    gap: "Knowledge calibration between modalities assumes both visual and textual signals are informative; the approach may be suboptimal when one modality dominates.",
    relevance:
      "Highlights the multi-modal calibration challenge; supports our argument that lecture retrieval should prioritise transcripts over visual frames.",
  },
  {
    id: 8,
    authors: "Ge et al.",
    year: "—",
    title: "Learning to Diversify for Robust Video Moment Retrieval",
    method: "Diversity-Promoting Retrieval",
    mainApproach:
      "Introduces diversity loss terms during training to prevent retrieval systems from over-concentrating on visually salient but semantically redundant moments.",
    gap: "Diversity methods operate in visual embedding space; may not address semantic redundancy arising from repeated lecture topic coverage across videos.",
    relevance:
      "Semantic diversity in retrieved moments is a desirable property; our confidence scoring and top-K retrieval partially address this.",
  },
  {
    id: 9,
    authors: "Choi et al.",
    year: "2025",
    title: "Moment-Aware Video Retrieval",
    method: "Moment-Aware Retrieval",
    mainApproach:
      "Designs a retrieval framework that is explicitly aware of temporal moments, enabling retrieval at the moment level rather than the clip or video level.",
    gap: "Moment-aware retrieval is predominantly framed around visual event boundaries rather than conceptual discourse shifts in lecture content.",
    relevance:
      "Validates the importance of moment-level granularity in retrieval — our system achieves this via transcript segmentation and FAISS.",
  },
  {
    id: 10,
    authors: "Lin et al.",
    year: "2024",
    title: "VideoXum: Cross-Modal Visual and Textural Summarization of Videos",
    method: "Cross-Modal Video Summarization",
    mainApproach:
      "Generates cross-modal summaries combining visual and textual signals, producing concise representations of video content for downstream tasks.",
    gap: "Summarization focuses on visual saliency; in lecture videos, important conceptual content may have low visual salience but high lexical richness.",
    relevance:
      "Validates the role of semantic compression (similar to our BART summarization step) for reducing transcript noise while preserving key concepts.",
  },
];
