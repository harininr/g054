import { useEffect, useRef } from 'react';
import styles from '../steps.module.css';

export default function ProcessingLog({ entries, progress }) {
  const bottomRef = useRef(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [entries]);

  const now = new Date();
  const baseTime = (now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds());

  return (
    <div>
      {progress !== undefined && (
        <div className={styles.progressWrap}>
          <div className={styles.progressBar} style={{ width: progress + '%' }} />
        </div>
      )}
      <div className={styles.logBox}>
        {entries.map((entry, i) => {
          const t = baseTime + entry.offsetSec;
          const h = Math.floor(t / 3600) % 24;
          const m = Math.floor((t % 3600) / 60);
          const s = t % 60;
          const ts = [h,m,s].map(n => String(n).padStart(2,'0')).join(':');
          const isLast = i === entries.length - 1;
          return (
            <div key={i} className={styles.logEntry}>
              <span className={styles.logTime}>{ts}</span>
              <span className={isLast && !entry.done ? styles.logMsgActive : entry.done ? styles.logMsgDone : styles.logMsg}>
                {isLast && !entry.done && '▶ '}{entry.msg}{entry.done && ' ✓'}
              </span>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
