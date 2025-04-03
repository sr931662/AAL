import React from 'react'
import styles from './About.module.css'
import { Link } from 'react-router-dom'
import about1 from '../../Assets/AAL-about.png'

const About = () => {
  return (
        <div className={styles.container}>
            {/* Header section */}
            <div className={styles.header}>
                <div className={styles.header1}>
                    <h1 className={styles.main_head}>
                        About Adopt-A-Love
                    </h1>

                    <p className={styles.head_info}>
                    Learn about our mission, values, and the dedicated team working to connect loving homes with pets in need.
                    </p>

                </div>

                <div className={styles.header2}>
                    <img src={about1} alt="Pet playing Around" className={styles.about_img_1} />
                </div>
            </div>

            {/* Mission section */}
            <div className={styles.mission}>
                <h1 className={styles.m_head}>
                    Our Mission
                </h1>

                <p className={styles.m_moto}>We believe every pet deserves a loving home. Our mission is to rescue, rehabilitate, and rehome animals while educating the community about responsible pet ownership.</p>
            </div>

            <div className={styles.team}>
                <h1 className={styles.team_header}>Our Team</h1>
                <div className={styles.team_container}>
                    <div className={styles.team_card}>
                        <img src="" alt="Somya" className={styles.team_pic} />
                        <h3 className={styles.Name}>Somya Jain</h3>
                        <p className={styles.role}>Co-Founder</p>
                        <p className={styles.brief}>

                        </p>
                    </div>
                    <div className={styles.team_card}>
                        <img src="" alt="Vidushi" className={styles.team_pic} />
                        <h3 className={styles.Name}>Vidushi</h3>
                        <p className={styles.role}>Co-Founder</p>
                        <p className={styles.brief}>

                        </p>
                    </div>
                </div>

            </div>

            <div className={styles.impact}>
                <h1 className={styles.impact_header}>Our Impact</h1>

                <div className={styles.impact_container}>
                    <div className={styles.impact_card}>
                        <h2 className={styles.impact_value}>250+</h2>
                        <p className={styles.impact_state}>Pets Rescued</p>
                    </div>

                    <div className={styles.impact_card}>
                        <h2 className={styles.impact_value}>500+</h2>
                        <p className={styles.impact_state}>Pets Adopted</p>
                    </div>

                    <div className={styles.impact_card}>
                        <h2 className={styles.impact_value}>100%</h2>
                        <p className={styles.impact_state}>No-Kill Shelters</p>

                    </div>

                    <div className={styles.impact_card}>
                        <h2 className={styles.impact_value}>1000+</h2>
                        <p className={styles.impact_state}>Volunteer Hours</p>

                    </div>
                </div>
            </div>

            
        </div>
  )
}

export default About