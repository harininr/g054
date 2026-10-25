import { TRACE_STEPS } from '../data/demoData';
import styles from './PipelineTrace.module.css';

const icons = ['📹','🎙️','📄','⚡','🗂️','🤖','📝','✅','🔍'];

export default function PipelineTrace({ currentStep, completedSteps, onGoToStep }) {
  return (
    <aside className={styles.trace}>
      <div className={styles.header}>
        <span className={styles.headerLabel}>Pipeline Trace</span>
        <span className={styles.headerStatus}>~60% Implemented</span>
      </div>
      <ul className={styles.list}>
        {TRACE_STEPS.map((ts) => {
          const done = completedSteps.has(ts.stepIndex);
          const active = currentStep === ts.stepIndex;
          const upcoming = ts.upcoming;
          return (
            <li
              key={ts.stepIndex}
              className={[
                styles.item,
                active ? styles.itemActive : '',
                done ? styles.itemDone : '',
                upcoming ? styles.itemUpcoming : '',
              ].join(' ')}
              onClick={() => {
                if (!upcoming && (done || active)) onGoToStep(ts.stepIndex);
              }}
              style={{ cursor: done || active ? 'pointer' : 'default' }}
              title={upcoming ? 'Next Research Phase' : done ? 'Click to revisit' : ''}
            >
              <div className={styles.iconWrap}>
                {done && !active ? (
                  <span className={styles.checkIcon}>✓</span>
                ) : (
                  <span className={styles.stepIcon}>{icons[ts.stepIndex]}</span>
                )}
                {active && <span className={styles.activeDot} />}
              </div>
              <div className={styles.text}>
                <span className={styles.label}>{ts.label}</span>
                <span className={styles.sublabel}>{ts.sublabel}</span>
              </div>
              {upcoming && (
                <span className={styles.upcomingBadge}>Next Phase</span>
              )}
            </li>
          );
        })}
      </ul>
      <div className={styles.footer}>
        <div className={styles.footerRow}>
          <span className={styles.footerDot} style={{background:'#10b981'}} />
          <span className={styles.footerText}>Implemented</span>
        </div>
        <div className={styles.footerRow}>
          <span className={styles.footerDot} style={{background:'#f59e0b'}} />
          <span className={styles.footerText}>Integration in Progress</span>
        </div>
        <div className={styles.footerRow}>
          <span className={styles.footerDot} style={{background:'#3d5a7a'}} />
          <span className={styles.footerText}>Next Phase</span>
        </div>
      </div>
    </aside>
  );
}
