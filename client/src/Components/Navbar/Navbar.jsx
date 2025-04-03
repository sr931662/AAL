import React, { useState, useEffect } from 'react';
import logo from '../../Assets/logo.png';
import styles from "./Navbar.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../../store/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const [username, setUsername] = useState(localStorage.getItem('fname'));
  const [navbarBg, setNavbarBg] = useState('transparent');
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();

  // Function to update username when login state changes
  const updateUserState = () => {
    setUsername(localStorage.getItem('fname'));
  };

  // Effect to listen for storage changes (when login happens)
  useEffect(() => {
    window.addEventListener("storage", updateUserState);
    return () => window.removeEventListener("storage", updateUserState);
  }, []);

  // Effect to change navbar background on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setNavbarBg('white');
      } else {
        setNavbarBg('transparent');
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userID');
    localStorage.removeItem('fname');
    setUsername(null);
    navigate('/login');
    setIsMenuOpen(false); // Close menu after logout
  };

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close menu when a link is clicked
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className={styles.header} style={{ backgroundColor: navbarBg, transition: 'background-color 0.3s ease' }}>
      <Link to="/" className={styles.logo_link} onClick={closeMenu}>
        <div className={styles.logo}>
          <img src={logo} alt="Logo" width="100vw" />
        </div>
      </Link>

      {/* Hamburger Menu Button */}
      <button className={styles.hamburger} onClick={toggleMenu}>
        <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
      </button>

      {/* Desktop Menu */}
      <div className={`${styles.menu} ${styles.desktopMenu}`}>
        <Link to="/adopt" className={`${styles.menu_link} ${styles.regular_links}`}>
          <div className={styles.menu_btn}><span>Adopt</span></div>
        </Link>

        <Link to="/about-us" className={`${styles.menu_link} ${styles.regular_links}`}>
          <div className={styles.menu_btn}><span>About</span></div>
        </Link>

        <Link to="/care-tips" className={`${styles.menu_link} ${styles.regular_links}`}>
          <div className={styles.menu_btn}><span>Care Tips</span></div>
        </Link>

        {username ? (
          <>
            <span className={`${styles.menu_link} ${styles.user_name}`}>
              Hello, {username}
            </span>
            <button className={`${styles.menu_link} ${styles.logout_btn}`} onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/sign-up" className={`${styles.menu_link} ${styles.sign_up_link}`}>
            <div className={styles.sign_up}>Sign up</div>
          </Link>
        )}
      </div>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.mobileMenuOpen : ''}`}>
        <Link to="/adopt" className={styles.mobileLink} onClick={closeMenu}>
          Adopt
        </Link>
        <Link to="/about-us" className={styles.mobileLink} onClick={closeMenu}>
          About
        </Link>
        <Link to="/care-tips" className={styles.mobileLink} onClick={closeMenu}>
          Care Tips
        </Link>
        {username ? (
          <>
            <div className={styles.mobileUser}>Hello, {username}</div>
            <button className={styles.mobileLogout} onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <Link to="/sign-up" className={styles.mobileSignUp} onClick={closeMenu}>
            Sign up
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;