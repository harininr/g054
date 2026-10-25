import { BookOpen, AlertTriangle, Lightbulb, Target, HelpCircle } from 'lucide-react';
import { literaturePapers } from '../../data/literature';
import styles from './Research.module.css';

const sections = [
  {
    id: 'problem',
    icon: <AlertTriangle size={20} />,
    eyebrow: 'Problem Statement',
    title: 'The Challenge of Lecture Video Retrieval',
    content: [
      'Existing Video Moment Retrieval (VMR) methods commonly align natural language text queries with visual frame-level representations. These approaches assume that meaningful temporal boundaries correspond to visual transitions—scene changes, motion events, or visual content shifts.',
      'In knowledge-centric lecture videos, however, this assumption breaks down. Camera viewpoints may remain static throughout a recording. Slides may remain visually similar across multiple conceptual topics. Instructor motion provides minimal discriminative visual signal. Conceptual shifts—when a lecture transitions from one technical concept to another—occur primarily in spoken discourse, not in visual frames.',
      'This creates a fundamental difficulty for concept-level temporal localization: a student querying "explain gradient descent" or "what is backpropagation" may receive irrelevant results from a vision-dominant retrieval system because these concepts produce no distinctive visual cue.',
    ],
  },
  {
    id: 'gap',
    icon: <Target size={20} />,
    eyebrow: 'Research Gap',
    title: 'What is Missing in Current VMR Research',
    bullets: [
      {
        label: 'Vision-Dominant Retrieval',
        text: 'Most VMR methods use visual frame features as the primary modality, treating text queries as secondary alignment targets.',
      },
      {
        label: 'Speech as Auxiliary Signal',
        text: 'When transcripts or captions are used, they typically serve as supplementary features rather than the dominant retrieval medium.',
      },
      {
        label: 'Visual Transition Assumption',
        text: 'Temporal boundary detection methods often rely on scene changes or optical flow, which are unreliable indicators of topic boundaries in lecture content.',
      },
      {
        label: 'Lack of Lecture-Specific Retrieval',
        text: 'Long-form lecture video retrieval as a transcript-dominant semantic search problem has received limited dedicated attention in the VMR literature.',
      },
    ],
  },
  {
    id: 'originality',
    icon: <Lightbulb size={20} />,
    eyebrow: 'Originality',
    title: 'Our Research Contribution',
    content: [
      'Our framework reformulates temporal grounding for lecture videos as transcript-dominant semantic localization rather than motion-based event detection. Instead of treating speech as an auxiliary modality, we invert the modality hierarchy: spoken discourse becomes the primary retrieval signal.',
      'We combine automatic speech recognition (Whisper), semantic compression (BART), dense embedding (SBERT), and efficient vector search (FAISS) into a unified pipeline that operates entirely on transcribed lecture content. Visual modalities are intentionally excluded from the core retrieval mechanism.',
      'This reformulation enables retrieval of conceptual explanations in lecture videos that produce no distinctive visual change—the very scenario where vision-dominant VMR systems systematically fail.',
    ],
  },
  {
    id: 'hypotheses',
    icon: <HelpCircle size={20} />,
    eyebrow: 'Research Questions',
    title: 'Research Hypotheses',
    hypotheses: [
      {
        id: 'H1',
        question: 'Does transcript-based retrieval outperform vision-based retrieval for lecture videos?',
        description: 'Compared against a CLIP visual baseline using R@1, R@5, and mIoU on annotated lecture query pairs.',
      },
      {
        id: 'H2',
        question: 'Does fusing raw transcript embeddings with BART summary embeddings outperform either signal alone?',
        description: 'Ablation study with weighted fusion α ∈ {0.3, 0.5, 0.6, 0.7} to identify the optimal mixing ratio.',
      },
      {
        id: 'H3',
        question: 'Does semantic boundary segmentation outperform fixed-window temporal segmentation?',
        description: 'Comparing cosine-similarity-based discourse segmentation against 30s, 60s, and 120s fixed windows.',
      },
      {
        id: 'H4',
        question: 'Does LLM-generated query expansion improve retrieval recall over single-query search?',
        description: 'Expanding each query into 3 LLM paraphrases and measuring recall improvement vs. latency overhead.',
      },
    ],
  },
];

export default function Research() {
  return (
    <main className={styles.page}>
      {/* Page Header */}
      <div className={styles.pageHeader}>
        <div className="container">
          <div className={styles.headerInner}>
            <span className="badge badge--dark">Research</span>
            <h1 className={styles.pageTitle}>Research Overview</h1>
            <p className={styles.pageSubtitle}>
              Problem statement, motivation, identified gaps, and hypotheses driving the development of a
              transcript-dominant semantic retrieval framework for lecture videos.
            </p>
          </div>
        </div>
      </div>

      <div className={`container ${styles.content}`}>
        {/* Core Research Sections */}
        {sections.map((sec) => (
          <section key={sec.id} id={sec.id} className={styles.researchSection} aria-labelledby={`${sec.id}-heading`}>
            <div className={styles.secIcon} aria-hidden="true">{sec.icon}</div>
            <div className={styles.secBody}>
              <p className="section-header__eyebrow" style={{ textAlign: 'left', marginBottom: '0.5rem' }}>
                {sec.eyebrow}
              </p>
              <h2 id={`${sec.id}-heading`} className={styles.secTitle}>{sec.title}</h2>

              {sec.content &&
                sec.content.map((para, i) => (
                  <p key={i} className={styles.secPara}>{para}</p>
                ))}

              {sec.bullets && (
                <ul className={styles.gapList}>
                  {sec.bullets.map((b, i) => (
                    <li key={i} className={styles.gapItem}>
                      <span className={styles.gapLabel}>{b.label}</span>
                      <span className={styles.gapText}>{b.text}</span>
                    </li>
                  ))}
                </ul>
              )}

              {sec.hypotheses && (
                <div className={styles.hypothesesGrid}>
                  {sec.hypotheses.map((h) => (
                    <div key={h.id} className={styles.hypothesisCard}>
                      <div className={styles.hypothesisId}>{h.id}</div>
                      <div>
                        <p className={styles.hypothesisQ}>{h.question}</p>
                        <p className={styles.hypothesisDesc}>{h.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        ))}

        {/* Literature Survey */}
        <section id="literature" aria-labelledby="literature-heading" className={styles.litSection}>
          <div className="section-header" style={{ textAlign: 'left', marginBottom: '2rem' }}>
            <p className="section-header__eyebrow" style={{ justifyContent: 'flex-start' }}>
              <BookOpen size={14} /> Literature Survey
            </p>
            <h2 id="literature-heading" className="section-header__title" style={{ textAlign: 'left' }}>
              Related Work
            </h2>
            <p className="section-header__subtitle" style={{ textAlign: 'left', margin: 0 }}>
              A comparative analysis of relevant VMR methods, their approaches, and limitations with respect to lecture video retrieval.
            </p>
          </div>

          <div className="table-wrapper">
            <table className="research-table" aria-label="Literature survey comparison table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Author / Year</th>
                  <th scope="col">Method / Contribution</th>
                  <th scope="col">Main Approach</th>
                  <th scope="col">Research Gap / Limitation</th>
                  <th scope="col">Relevance to Our Work</th>
                </tr>
              </thead>
              <tbody>
                {literaturePapers.map((paper) => (
                  <tr key={paper.id}>
                    <td className={styles.paperNum}>{paper.id}</td>
                    <td>
                      <strong className={styles.paperAuthor}>{paper.authors}</strong>
                      <br />
                      <span className={styles.paperYear}>{paper.year}</span>
                      <br />
                      <span className={styles.paperTitle}>{paper.title}</span>
                    </td>
                    <td>
                      <span className={`badge badge--pastel`}>{paper.method}</span>
                    </td>
                    <td className={styles.paperApproach}>{paper.mainApproach}</td>
                    <td className={styles.paperGap}>{paper.gap}</td>
                    <td className={styles.paperRel}>{paper.relevance}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
