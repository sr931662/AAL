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
          <Link to="/" className={styles.link}>
            Home
          </Link>
          <Link to="/about-us" className={styles.link}>
            About us
          </Link>
          <Link to="/adopt" className={styles.link}>
            Adopt
          </Link>
          <Link to="/care-tips" className={styles.link}>
            Care Tips
          </Link>
        </div>

      </div>

      
      <div className={styles.batch}>
      <h2 className={styles.foot_headers}>Office Info.</h2>
        <h4 className={styles.link}>
          123 Pet Street, Animal City, AC 12345
        </h4>
        <h4 className={styles.link}>
          123-456-7890
        </h4>
        <h4 className={styles.link}>
          abc@gmail.com
        </h4>
      </div>
    </div>
  )
}

export default Footer