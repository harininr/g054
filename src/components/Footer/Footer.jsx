import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import styles from './Footer.module.css';

const quickLinks = [
  { to: '/', label: 'Home' },
  { to: '/research', label: 'Research' },
  { to: '/methodology', label: 'Methodology' },
  { to: '/architecture', label: 'Architecture' },
  { to: '/experiments', label: 'Experiments' },
  { to: '/results', label: 'Results' },
];

const moreLinks = [
  { to: '/progress', label: 'Progress' },
  { to: '/documentation', label: 'Documentation' },
  { to: '/team', label: 'Team' },
  { to: '/demonstration', label: 'Demonstration' },
  { to: '/github', label: 'GitHub' },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.topBar} />
      <div className={`container ${styles.inner}`}>
        {/* Brand */}
        <div className={styles.brand}>
          <div className={styles.logo}>
            <div className={styles.logoIcon} aria-hidden="true">
              <BookOpen size={16} strokeWidth={2.5} />
            </div>
            <span className={styles.logoText}>Team 54</span>
          </div>
          <p className={styles.description}>
            <em>Transcript-Dominant Summary-Assisted Semantic Indexing for Lecture Video Moment Retrieval</em>
          </p>
          <div className={styles.tags}>
            <span className="badge badge--dark">Final Year Project</span>
            <span className="badge badge--dark">Team 54</span>
          </div>
        </div>

        {/* Quick Links */}
        <div className={styles.linkGroup}>
          <h3 className={styles.linkHeading}>Pages</h3>
          <ul>
            {quickLinks.map(({ to, label }) => (
              <li key={to}>
                <Link to={to} className={styles.link}>{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.linkGroup}>
          <h3 className={styles.linkHeading}>More</h3>
          <ul>
            {moreLinks.map(({ to, label }) => (
              <li key={to}>
                <Link to={to} className={styles.link}>{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Info */}
        <div className={styles.info}>
          <h3 className={styles.linkHeading}>Institution</h3>
          <p className={styles.infoText}>Amrita Vishwa Vidyapeetham</p>
          <p className={styles.infoText}>School of Computing</p>
          <p className={styles.infoText}>Department of Computer Science &amp; Engineering</p>
          <div className={styles.guide}>
            <p className={styles.infoLabel}>Guide</p>
            <p className={styles.infoText}>Dr. Manjusha R.</p>
            <p className={styles.infoSubText}>Assistant Professor, CSE</p>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className="container">
          <div className={styles.bottomInner}>
            <p className={styles.copyright}>
              &copy; {year} Team 54 · Amrita Vishwa Vidyapeetham ·{' '}
              <span className={styles.academic}>Academic Research Project</span>
            </p>
            <p className={styles.disclaimer}>
              All results and data are from ongoing research. No fabricated metrics.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
