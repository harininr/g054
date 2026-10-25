import { ExternalLink, GitBranch, FileText, BookOpen } from 'lucide-react';
import { references } from '../../data/references';
import styles from './GitHub.module.css';

export default function GitHub() {
  return (
    <main className={styles.page}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <div className="container">
          <span className="badge badge--dark">Repository</span>
          <h1 className={styles.pageTitle}>GitHub &amp; References</h1>
          <p className={styles.pageSubtitle}>
            Source code repository for the documentation portal and academic references used in this research.
          </p>
        </div>
      </div>

      <div className="container">
        {/* Repository Card */}
        <section className={styles.repoSection} aria-labelledby="repo-heading">
          <h2 id="repo-heading" className={styles.sectionTitle}>
            <GitBranch size={20} aria-hidden="true" />
            Repository
          </h2>
          <div className={styles.repoCard}>
            <div className={styles.repoHeader}>
              <div className={styles.repoIcon} aria-hidden="true">
                <GitBranch size={24} />
              </div>
              <div>
                <h3 className={styles.repoName}>Documentation-Website</h3>
                <p className={styles.repoDesc}>
                  Research project documentation portal — built with React + Vite.
                  This repository hosts the frontend-only documentation website for Team 54&rsquo;s
                  Final Year Research Project.
                </p>
              </div>
            </div>

            <div className={styles.repoMeta}>
              <span className={styles.metaChip}>React</span>
              <span className={styles.metaChip}>Vite</span>
              <span className={styles.metaChip}>JavaScript</span>
              <span className={styles.metaChip}>CSS Modules</span>
            </div>

            <div className={styles.repoNote}>
              <FileText size={14} />
              <span>
                The documentation portal is maintained separately from the core research
                implementation codebase. This website contains no backend or model code.
              </span>
            </div>

            <a
              href="#"
              className={`btn btn--primary ${styles.repoBtn}`}
              aria-label="View Repository on GitHub (URL placeholder)"
              onClick={(e) => e.preventDefault()}
            >
              View Repository
              <ExternalLink size={16} />
            </a>
            <p className={styles.urlNote}>
              Repository URL will be linked once the GitHub repository is publicly available.
            </p>
          </div>
        </section>

        {/* References */}
        <section className={styles.refsSection} aria-labelledby="refs-heading">
          <h2 id="refs-heading" className={styles.sectionTitle}>
            <BookOpen size={20} aria-hidden="true" />
            Academic References
          </h2>
          <p className={styles.refsIntro}>
            References cited in this research project. DOI and external URLs are included only when
            available in the source project documentation — no fabricated links.
          </p>

          <ol className={styles.refsList}>
            {references.map((ref) => (
              <li key={ref.id} className={styles.refItem}>
                <span className={styles.refNum}>[{ref.id}]</span>
                <div className={styles.refBody}>
                  <p className={styles.refAuthors}>
                    {ref.authors} ({ref.year}).
                  </p>
                  <p className={styles.refTitle}>&ldquo;{ref.title}.&rdquo;</p>
                  <p className={styles.refVenue}>{ref.venue}.</p>
                  {ref.doi && (
                    <a href={ref.doi} target="_blank" rel="noopener noreferrer" className={styles.refDoi}>
                      {ref.doi}
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </main>
  );
}
