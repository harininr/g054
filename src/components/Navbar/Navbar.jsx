import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, BookOpen, ExternalLink } from 'lucide-react';
import styles from './Navbar.module.css';

const navLinks = [
  { to: '/', label: 'Home', end: true },
  { to: '/research', label: 'Research' },
  { to: '/methodology', label: 'Methodology' },
  { to: '/architecture', label: 'Architecture' },
  { to: '/experiments', label: 'Experiments' },
  { to: '/results', label: 'Results' },
  { to: '/progress', label: 'Progress' },
  { to: '/documentation', label: 'Docs' },
  { to: '/team', label: 'Team' },
  { to: '/demonstration', label: 'Demo' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`} role="banner">
      <nav className={styles.nav} aria-label="Main navigation">
        <div className={styles.inner}>
          {/* Logo */}
          <Link to="/" className={styles.logo} aria-label="Home — Team 54 Research Portal">
            <div className={styles.logoIcon} aria-hidden="true">
              <BookOpen size={18} strokeWidth={2.5} />
            </div>
            <div className={styles.logoText}>
              <span className={styles.logoTitle}>Team 54</span>
              <span className={styles.logoSub}>Research Portal</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <ul className={styles.links} role="list">
            {navLinks.map(({ to, label, end }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={end}
                  className={({ isActive }) =>
                    `${styles.link} ${isActive ? styles.linkActive : ''}`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* GitHub Button */}
          <Link
            to="/github"
            className={`${styles.githubBtn} btn btn--outline btn--sm`}
            aria-label="View GitHub Repository"
          >
            GitHub
            <ExternalLink size={14} />
          </Link>

          {/* Mobile Toggle */}
          <button
            className={styles.menuBtn}
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className={styles.mobileMenu} id="mobile-menu" role="dialog" aria-modal="true" aria-label="Navigation menu">
            <ul role="list">
              {navLinks.map(({ to, label, end }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    end={end}
                    className={({ isActive }) =>
                      `${styles.mobileLink} ${isActive ? styles.mobileLinkActive : ''}`
                    }
                    onClick={() => setOpen(false)}
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
              <li>
                <Link
                  to="/github"
                  className={styles.mobileLink}
                  onClick={() => setOpen(false)}
                >
                  GitHub
                </Link>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}
