import { timelineItems } from '../../data/timeline';
import { CheckCircle, Clock, Circle } from 'lucide-react';
import styles from './Progress.module.css';

const statusConfig = {
  COMPLETED:   { icon: <CheckCircle size={18} />, label: 'Completed',   cls: 'completed' },
  IN_PROGRESS: { icon: <Clock size={18} />,        label: 'In Progress', cls: 'in-progress' },
  PLANNED:     { icon: <Circle size={18} />,       label: 'Planned',    cls: 'planned' },
};

const phases = [...new Set(timelineItems.map((t) => t.phase))];

const stats = {
  completed: timelineItems.filter((t) => t.status === 'COMPLETED').length,
  inProgress: timelineItems.filter((t) => t.status === 'IN_PROGRESS').length,
  planned: timelineItems.filter((t) => t.status === 'PLANNED').length,
  total: timelineItems.length,
};

export default function Progress() {
  return (
    <main className={styles.page}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <div className="container">
          <span className="badge badge--dark">Progress</span>
          <h1 className={styles.pageTitle}>Project Progress</h1>
          <p className={styles.pageSubtitle}>
            A live research timeline tracking completed, in-progress, and planned milestones.
            Status reflects verified project documentation — no tasks are pre-emptively marked complete.
          </p>
        </div>
      </div>

      <div className="container">
        {/* Stats */}
        <div className={styles.statsGrid}>
          <div className={`${styles.statCard} ${styles.statCompleted}`}>
            <CheckCircle size={22} />
            <div className={styles.statNum}>{stats.completed}</div>
            <div className={styles.statLabel}>Completed</div>
          </div>
          <div className={`${styles.statCard} ${styles.statProgress}`}>
            <Clock size={22} />
            <div className={styles.statNum}>{stats.inProgress}</div>
            <div className={styles.statLabel}>In Progress</div>
          </div>
          <div className={`${styles.statCard} ${styles.statPlanned}`}>
            <Circle size={22} />
            <div className={styles.statNum}>{stats.planned}</div>
            <div className={styles.statLabel}>Planned</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.progressBar}>
              <div
                className={styles.progressFill}
                style={{ width: `${(stats.completed / stats.total) * 100}%` }}
                role="progressbar"
                aria-valuenow={stats.completed}
                aria-valuemin={0}
                aria-valuemax={stats.total}
                aria-label="Project completion progress"
              />
            </div>
            <div className={styles.statNum}>{Math.round((stats.completed / stats.total) * 100)}%</div>
            <div className={styles.statLabel}>Overall Progress</div>
          </div>
        </div>

        {/* Timeline by Phase */}
        {phases.map((phase) => (
          <section key={phase} className={styles.phase} aria-labelledby={`phase-${phase.replace(/\s/g,'-')}`}>
            <h2 id={`phase-${phase.replace(/\s/g,'-')}`} className={styles.phaseTitle}>{phase}</h2>
            <div className={styles.timeline}>
              {timelineItems
                .filter((t) => t.phase === phase)
                .map((item, i, arr) => {
                  const cfg = statusConfig[item.status];
                  return (
                    <article key={item.id} className={styles.timelineItem} aria-labelledby={`item-${item.id}-heading`}>
                      <div className={styles.timelineLeft}>
                        <div className={`${styles.statusIcon} ${styles[`icon-${cfg.cls}`]}`} aria-label={cfg.label}>
                          {cfg.icon}
                        </div>
                        {i < arr.length - 1 && (
                          <div className={`${styles.connector} ${styles[`connector-${item.status === 'COMPLETED' ? 'done' : 'pending'}`]}`} />
                        )}
                      </div>
                      <div className={`${styles.timelineCard} ${styles[`card-${cfg.cls}`]}`}>
                        <div className={styles.cardMeta}>
                          <span className={`badge badge--${cfg.cls}`}>
                            <span className={`dot dot--${cfg.cls}`} aria-hidden="true" />
                            {cfg.label}
                          </span>
                        </div>
                        <h3 id={`item-${item.id}-heading`} className={styles.cardTitle}>{item.title}</h3>
                        <p className={styles.cardDesc}>{item.description}</p>
                        {item.details && item.details.length > 0 && (
                          <ul className={styles.cardDetails}>
                            {item.details.map((d, di) => (
                              <li key={di}>{d}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </article>
                  );
                })}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
