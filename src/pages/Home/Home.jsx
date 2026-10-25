import { Link } from 'react-router-dom';
import {
  ArrowRight, ChevronDown, Mic, FileText, Layers,
  Zap, Database, Search, Target, BarChart2, BookOpen,
  Play, GitBranch, Cpu
} from 'lucide-react';
import styles from './Home.module.css';

const pipelineSteps = [
  { icon: <Play size={16} />, label: 'Lecture Video', sub: 'Input' },
  { icon: <Mic size={16} />, label: 'Whisper ASR', sub: 'Speech-to-Text' },
  { icon: <FileText size={16} />, label: 'Timestamped Transcript', sub: 'Output' },
  { icon: <Layers size={16} />, label: 'Segmentation', sub: 'Shot-Level' },
  { icon: <Cpu size={16} />, label: 'BART', sub: 'Semantic Compression' },
  { icon: <GitBranch size={16} />, label: 'SBERT', sub: 'Dense Embeddings' },
  { icon: <Database size={16} />, label: 'FAISS', sub: 'Vector Index' },
  { icon: <Search size={16} />, label: 'Semantic Retrieval', sub: 'Query → Timestamp' },
];

const features = [
  {
    icon: <Mic size={22} />,
    title: 'Transcript-Dominant Retrieval',
    description:
      'Locates lecture moments using spoken discourse as the primary semantic signal, not visual motion or scene transitions.',
    tag: 'Core Approach',
  },
  {
    icon: <Cpu size={22} />,
    title: 'BART Semantic Compression',
    description:
      'Compresses verbose transcript segments into semantically dense summaries for noise-robust indexing.',
    tag: 'Whisper + BART',
  },
  {
    icon: <GitBranch size={22} />,
    title: 'SBERT Dense Embeddings',
    description:
      'Encodes queries and transcript segments as contextual dense vectors for semantic similarity matching.',
    tag: 'Sentence-BERT',
  },
  {
    icon: <Database size={22} />,
    title: 'FAISS Vector Search',
    description:
      'Efficient approximate nearest-neighbour search over the embedding index for scalable retrieval.',
    tag: 'FAISS',
  },
  {
    icon: <Target size={22} />,
    title: 'Timestamp Localization',
    description:
      'Returns the precise start–end timestamp of the retrieved lecture segment alongside its summary.',
    tag: 'Temporal Grounding',
  },
  {
    icon: <BarChart2 size={22} />,
    title: 'Confidence Scoring',
    description:
      'Quantifies retrieval certainty using the margin between the top-1 and top-2 similarity scores.',
    tag: 'Score = (S1−S2)/S1',
  },
];

export default function Home() {
  return (
    <main>
      {/* ── Hero ───────────────────────────────────── */}
      <section className={styles.hero} aria-labelledby="hero-heading">
        <div className={styles.heroBg} aria-hidden="true">
          <div className={styles.heroGrid} />
          <div className={styles.heroGlow1} />
          <div className={styles.heroGlow2} />
        </div>

        <div className={`container ${styles.heroContent}`}>
          <div className={styles.heroLeft}>
            <div className={`badge badge--dark ${styles.heroBadge}`}>
              <span className={styles.badgeDot} aria-hidden="true" />
              Final Year Research Project · Team 54
            </div>

            <h1 id="hero-heading" className={styles.heroHeading}>
              Transcript-Dominant{' '}
              <span className={styles.heroHighlight}>Semantic Retrieval</span>{' '}
              for Lecture Videos
            </h1>

            <p className={styles.heroFullTitle}>
              Transcript-Dominant Summary-Assisted Semantic Indexing for Lecture Video Moment Retrieval
            </p>

            <p className={styles.heroDescription}>
              An AI-driven framework for locating concept-level moments in long lecture videos
              using spoken discourse rather than relying primarily on visual motion.
            </p>

            <div className={styles.heroMeta}>
              <span>Amrita Vishwa Vidyapeetham</span>
              <span className={styles.metaDot} aria-hidden="true">·</span>
              <span>Dept. of CSE</span>
              <span className={styles.metaDot} aria-hidden="true">·</span>
              <span>Guide: Dr. Manjusha R.</span>
            </div>

            <div className={styles.heroCtas}>
              <Link to="/research" className="btn btn--primary btn--lg">
                Explore Research
                <ArrowRight size={18} />
              </Link>
              <Link to="/architecture" className="btn btn--secondary btn--lg">
                View Architecture
              </Link>
              <Link to="/github" className="btn btn--secondary btn--lg">
                GitHub Repository
              </Link>
              <Link to="/demonstration" className="btn btn--secondary btn--lg">
                Watch Demo
              </Link>
            </div>
          </div>

          {/* Pipeline Visual */}
          <div className={styles.heroRight} aria-label="Pipeline overview diagram">
            <div className={styles.pipelineCard}>
              <div className={styles.pipelineHeader}>
                <span className={styles.pipelineLabel}>Pipeline Overview</span>
                <div className={styles.pipelineDots} aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
              <div className={styles.pipelineSteps}>
                {pipelineSteps.map((step, i) => (
                  <div key={i} className={styles.pipelineStep}>
                    <div className={styles.pipelineStepIcon} aria-hidden="true">
                      {step.icon}
                    </div>
                    <div className={styles.pipelineStepText}>
                      <span className={styles.pipelineStepLabel}>{step.label}</span>
                      <span className={styles.pipelineStepSub}>{step.sub}</span>
                    </div>
                    {i < pipelineSteps.length - 1 && (
                      <div className={styles.pipelineArrow} aria-hidden="true" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.scrollHint} aria-hidden="true">
          <ChevronDown size={20} />
        </div>
      </section>

      {/* ── Research Motivation ────────────────────── */}
      <section className={`section ${styles.motivation}`} aria-labelledby="motivation-heading">
        <div className="container">
          <div className="section-header">
            <p className="section-header__eyebrow">
              <BookOpen size={14} />
              Research Motivation
            </p>
            <h2 id="motivation-heading" className="section-header__title">
              Why Lecture Video Retrieval Needs a Different Approach
            </h2>
            <p className="section-header__subtitle">
              Existing Video Moment Retrieval methods are predominantly vision-dominant.
              For knowledge-centric lecture videos, this creates a fundamental mismatch.
            </p>
          </div>

          <div className={styles.comparisonGrid}>
            {/* Traditional */}
            <div className={styles.compareCard}>
              <div className={styles.compareHeader}>
                <div className={`${styles.compareChip} ${styles.compareChipOld}`}>
                  Traditional VMR
                </div>
              </div>
              <div className={styles.compareFlow}>
                {['Visual Frames', 'Motion / Scene Transitions', 'Event Detection', 'Moment Retrieved'].map((item, i, arr) => (
                  <div key={i} className={styles.compareFlowItem}>
                    <div className={`${styles.compareNode} ${styles.compareNodeOld}`}>{item}</div>
                    {i < arr.length - 1 && <div className={`${styles.compareArrow} ${styles.compareArrowOld}`} aria-hidden="true" />}
                  </div>
                ))}
              </div>
              <ul className={styles.compareIssues}>
                <li>Assumes visual transitions mark topic changes</li>
                <li>Struggles when camera view is static</li>
                <li>Slide content may remain similar across topics</li>
                <li>Instructor motion provides minimal discriminative signal</li>
              </ul>
            </div>

            {/* Divider */}
            <div className={styles.vsLabel} aria-hidden="true">vs.</div>

            {/* Our Approach */}
            <div className={`${styles.compareCard} ${styles.compareCardOurs}`}>
              <div className={styles.compareHeader}>
                <div className={`${styles.compareChip} ${styles.compareChipNew}`}>
                  Our Approach
                </div>
              </div>
              <div className={styles.compareFlow}>
                {['Spoken Discourse', 'Semantic Shifts in Transcript', 'Concept-Level Localization', 'Moment + Timestamp + Score'].map((item, i, arr) => (
                  <div key={i} className={styles.compareFlowItem}>
                    <div className={`${styles.compareNode} ${styles.compareNodeNew}`}>{item}</div>
                    {i < arr.length - 1 && <div className={`${styles.compareArrow} ${styles.compareArrowNew}`} aria-hidden="true" />}
                  </div>
                ))}
              </div>
              <ul className={styles.compareStrengths}>
                <li>Transcript is the primary retrieval signal</li>
                <li>Works when visual content is static</li>
                <li>Detects conceptual shifts in spoken language</li>
                <li>BART + SBERT + FAISS for semantic precision</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Key Features ───────────────────────────── */}
      <section className={`section section--surface`} aria-labelledby="features-heading">
        <div className="container">
          <div className="section-header">
            <p className="section-header__eyebrow">
              <Zap size={14} />
              System Capabilities
            </p>
            <h2 id="features-heading" className="section-header__title">Key Features</h2>
            <p className="section-header__subtitle">
              A complete transcript-dominant retrieval pipeline from raw lecture video to ranked timestamped moments.
            </p>
          </div>

          <div className="grid-3">
            {features.map((f, i) => (
              <article key={i} className={`card ${styles.featureCard}`}>
                <div className={styles.featureIcon} aria-hidden="true">{f.icon}</div>
                <span className={`badge badge--pastel ${styles.featureTag}`}>{f.tag}</span>
                <h3 className={styles.featureTitle}>{f.title}</h3>
                <p className={styles.featureDesc}>{f.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Strip ──────────────────────────────── */}
      <section className={styles.ctaStrip} aria-labelledby="cta-heading">
        <div className="container">
          <div className={styles.ctaInner}>
            <div>
              <h2 id="cta-heading" className={styles.ctaTitle}>
                Explore the full research
              </h2>
              <p className={styles.ctaSub}>
                Read the problem statement, methodology, architecture, and experimental design.
              </p>
            </div>
            <div className={styles.ctaBtns}>
              <Link to="/research" className="btn btn--primary btn--lg">
                Research <ArrowRight size={18} />
              </Link>
              <Link to="/methodology" className="btn btn--ghost btn--lg">
                Methodology
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
