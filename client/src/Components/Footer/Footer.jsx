import React from 'react'
import styles from './Footer.module.css'
import logo from "../../Assets/logo.png"
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faFacebookF } from "@fortawesome/free-solid-svg-icons"

const Footer = () => {
  return (
    <div className={styles.foot}>
      <div className={styles.batch}>
        <img src={logo} alt="Adopt-A-Love" className={styles.foot_logo} />

        <p className={styles.logo_phrase}>Finding loving homes for pets in need.</p>
      </div>
      <div className={styles.batch}>
        <h2 className={styles.foot_headers}>Quick Links</h2>
        <div className={styles.links}>
          <Link to="/about-us" className={styles.link}>
            About us
          </Link>
          <Link to="/adopt" className={styles.link}>
            Adopt
          </Link>
          <Link to="/products" className={styles.link}>
            Products
          </Link>
          <Link to="/care-tips" className={styles.link}>
            Care Tips
          </Link>
          <Link to="/contact-us" className={styles.link}>
            Contact us
          </Link>
        </div>

      </div>

      
      <div className={styles.batch}>
      <h2 className={styles.foot_headers}>Newsletter</h2>
        <input type="email" placeholder='Enter your email id...' className={styles.news} />

        <button type='submit' className={styles.foot_btn}>
          Subscribe
        </button>
      </div>
    </div>
  )
}

export default Footer