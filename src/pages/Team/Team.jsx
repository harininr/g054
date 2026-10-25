import { teamMembers, guide, institution } from '../../data/team';
import { Users, GraduationCap } from 'lucide-react';
import styles from './Team.module.css';

const avatarColors = [
  'linear-gradient(135deg, #1a3a8f, #2563eb)',
  'linear-gradient(135deg, #1d4ed8, #38bdf8)',
  'linear-gradient(135deg, #0d1f3c, #1a3a8f)',
  'linear-gradient(135deg, #2563eb, #60a5fa)',
];

export default function Team() {
  return (
    <main className={styles.page}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <div className="container">
          <span className="badge badge--dark">Team</span>
          <h1 className={styles.pageTitle}>Research Team</h1>
          <p className={styles.pageSubtitle}>
            Team 54 · Final Year Research Project · {institution.name}
          </p>
        </div>
      </div>

      <div className="container">
        {/* Institution */}
        <section className={styles.institutionCard} aria-labelledby="institution-heading">
          <div className={styles.instIcon} aria-hidden="true">
            <GraduationCap size={24} />
          </div>
          <div>
            <p className={styles.instLabel}>Institution</p>
            <h2 id="institution-heading" className={styles.instName}>{institution.name}</h2>
            <p className={styles.instDept}>{institution.school} · {institution.department}</p>
          </div>
        </section>

        {/* Guide */}
        <section className={styles.guideSection} aria-labelledby="guide-heading">
          <h2 id="guide-heading" className={styles.sectionTitle}>
            <GraduationCap size={20} aria-hidden="true" />
            Project Guide
          </h2>
          <div className={styles.guideCard}>
            <div className={styles.guideAvatar} aria-hidden="true">
              <span>{guide.initials}</span>
            </div>
            <div className={styles.guideInfo}>
              <h3 className={styles.guideName}>{guide.name}</h3>
              <p className={styles.guideTitle}>{guide.title}</p>
              <p className={styles.guideDept}>{guide.department}</p>
              <p className={styles.guideInst}>{guide.institution}</p>
            </div>
          </div>
        </section>

        {/* Team Members */}
        <section className={styles.teamSection} aria-labelledby="team-heading">
          <h2 id="team-heading" className={styles.sectionTitle}>
            <Users size={20} aria-hidden="true" />
            Team Members
          </h2>
          <div className={styles.teamGrid}>
            {teamMembers.map((member, i) => (
              <article key={member.id} className={styles.memberCard} aria-labelledby={`member-${member.id}-heading`}>
                <div
                  className={styles.memberAvatar}
                  style={{ background: avatarColors[i % avatarColors.length] }}
                  aria-hidden="true"
                >
                  <span>{member.initials}</span>
                </div>
                <div className={styles.memberInfo}>
                  <h3 id={`member-${member.id}-heading`} className={styles.memberName}>{member.name}</h3>
                  <p className={styles.memberTeam}>Team 54</p>
                  <p className={styles.memberDept}>{institution.department}</p>
                </div>
                <div className={styles.memberNum} aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Project Card */}
        <section className={styles.projectCard} aria-labelledby="project-card-heading">
          <h2 id="project-card-heading" className={styles.projectTitle}>
            Transcript-Dominant Summary-Assisted Semantic Indexing for Lecture Video Moment Retrieval
          </h2>
          <div className={styles.projectMeta}>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Team</span>
              <span className={styles.metaValue}>54</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Type</span>
              <span className={styles.metaValue}>Type 1 — Research Project</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Guide</span>
              <span className={styles.metaValue}>Dr. Manjusha R.</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Department</span>
              <span className={styles.metaValue}>CSE, Amrita Vishwa Vidyapeetham</span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
