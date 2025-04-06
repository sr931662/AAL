import React, { useState, useEffect, useRef } from 'react'
import styles from './Home.module.css';
import { Link } from "react-router-dom";
import video from "../../Assets/hero-video.mp4"
import { 
  faHome, faPager, faHandshake, faHeart, 
  faHeartPulse, faBone, faDog, faArrowRight 
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import emailjs from '@emailjs/browser';
import { useAuth } from '../../store/auth';

const ITEMS_PER_PAGE = 2;

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { user } = useAuth();
  const videoRef = useRef(null);
  const form = useRef();

  // Pet data with unique IDs
  const pets = [
    { 
      id: 'pet_001', 
      name: 'Mishri', 
      image: 'https://pethelpful.com/.image/t_share/MjEwNzc0NTIwMTI5MTM2NDY1/-golden-retriever-growth-sequence-in-the-1st-year.jpg', 
      owner: 'Ms. Somya', 
      location: 'Banasthali, Rajasthan', 
      age: '5 year(s) old', 
      pet_type: 'Dog', 
      breed: 'Golden Retriever', 
      gender: 'female', 
      adopted: '2020', 
      story: 'Mishri, a clever and brave 5-year-old Golden Retriever, loved two things more than anything else: her bright yellow tennis ball and her best friend, Aanya...'
    },
    { 
      id: 'pet_002', 
      name: 'Luna', 
      image: 'https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2017/01/05115810/German-Shepherd-Dog-laying-down-in-the-grass-looking-up.jpg', 
      owner: 'Ms. Vidushi', 
      location: 'Banasthali, Rajasthan', 
      age: '2 year(s) old', 
      pet_type: 'Dog', 
      breed: 'German Shepherd', 
      gender: 'female', 
      adopted: '2023', 
      story: 'Luna, a playful and curious 2-year-old German Shepherd, loved exploring her backyard. It was her kingdom, full of trees to sniff, squirrels to chase...'
    },
    { 
      id: 'pet_003', 
      name: 'Oreo', 
      image: 'https://paradepets.com/.image/ar_4:3%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cg_xy_center%2Cq_auto:good%2Cw_1200%2Cx_1045%2Cy_573/MTkxMzY1Nzg5MjE4MTIxMjQ5/orange-cat-names-1-jpg.jpg', 
      owner: 'Ms. Richa', 
      location: 'Banasthali, Rajasthan', 
      age: '4 year(s) old', 
      pet_type: 'Cat', 
      breed: 'Orange Tabby', 
      gender: 'male', 
      adopted: '2021', 
      story: 'Oreo, a 4-year-old orange tabby cat with striking white paws and a tail that flicked like a wand, lived a cozy life in a little house by the park...'
    },
  ];

  // Pagination logic
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = pets.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(pets.length / ITEMS_PER_PAGE);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Email sending function
  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm('service_6c2jgbd', 'template_rjyr8rc', form.current, {
      publicKey: 'enKl3zRd23Mfn39ZU',
    })
    .then(() => console.log('SUCCESS!'))
    .catch(error => console.log('FAILED...', error.text));
  };

  // Video setup
  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.playbackRate = 0.5;
      videoElement.playsInline = true;
      videoElement.preload = "auto";
      videoElement.muted = true;
      
      const handleCanPlay = () => {
        videoElement.play().catch(e => console.log("Autoplay prevented:", e));
      };
      
      videoElement.addEventListener('canplay', handleCanPlay);
      return () => videoElement.removeEventListener('canplay', handleCanPlay);
    }
  }, []);

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <div className={styles.home_companion}>
        <video 
          ref={videoRef}
          autoPlay 
          loop 
          muted 
          className={styles.video_background}
        >
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className={styles.companion_content}>
          <h1 className={styles.header_bold}>Find Your Perfect Companion</h1>
          <h3 className={styles.sub_header}>
            Give a loving home to a pet in need. Our adoption process makes it easy to find your perfect match.
          </h3>
          <div className={styles.companion_btn}>
            <Link to="/adopt" className={styles.adopt_companion}>Adopt Now</Link>
            <Link to="/adopt/add-pet" className={styles.adopt_companion}>Re-home</Link>
          </div>
        </div>
      </div>

      {/* Adoption Process */}
      <div className={styles.Ad_process}>
        <h1 className={styles.Header}>Adoption Process</h1>
        <div className={styles.Ad_content}>
          {[
            { icon: faPager, title: "1. Application", desc: "Fill out our adoption application form with your details and preferences." },
            { icon: faHome, title: "2. Home Check", desc: "We'll visit your home to ensure it's suitable for your new pet." },
            { icon: faHandshake, title: "3. Meet & Greet", desc: "Meet potential pets to find your perfect match." },
            { icon: faHeart, title: "4. Adoption", desc: "Complete the paperwork and welcome your new family member!" }
          ].map((step, index) => (
            <div key={`step-${index}`} className={styles.Ad_card}>
              <div className={styles.process_icon}>
                <FontAwesomeIcon icon={step.icon} className={styles.fa_icon} />
              </div>
              <p className={styles.process_head}>{step.title}</p>
              <p className={styles.process_info}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Pet Care Tips */}
      <div className={styles.Care_section}>
        <h1 className={styles.Header}>Pet Care Tips</h1>
        <div className={styles.Care_content}>
          {[
            { icon: faHeartPulse, title: "1. Provide a Balanced Diet", 
              desc: "Ensure your pet gets nutritious food suited to their species and age. Fresh water, vitamins, and portion control are essential." },
            { icon: faBone, title: "2. Regular Exercise & Playtime", 
              desc: "Engage your pet in daily activities like walks, fetch, or interactive toys. Exercise keeps them physically fit and mentally stimulated." },
            { icon: faDog, title: "3. Routine Vet Checkups", 
              desc: "Schedule regular vet visits to monitor health, vaccinations, and early detection of diseases." }
          ].map((tip, index) => (
            <div key={`tip-${index}`} className={styles.Care_card}>
              <div className={styles.Care_icon}>
                <FontAwesomeIcon icon={tip.icon} className={styles.fa_icon} />
              </div>
              <p className={styles.Care_head}>{tip.title}</p>
              <p className={styles.Care_info}>{tip.desc}</p>
              <Link to="/care-tips" className={styles.care_link}>
                Learn More <FontAwesomeIcon icon={faArrowRight} />
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Success Stories */}
      <div className={styles.stories}>
        <h2 className={styles.stories_heading}>Success Stories</h2>
        <div className={styles.stories_glide}>
          <div className={styles.stories_track}>
            <div className={styles.stories_slides}>
              {currentItems.map((pet) => (
                <div key={pet.id} className={styles.stories_slide}>
                  <div className={styles.story_card}>
                    <div className={styles.story_header}>
                      <img src={pet.image} alt={pet.name} className={styles.story_img} />
                      <div>
                        <h4 className={styles.story_name}>{pet.owner}</h4>
                        <p className={styles.story_sub}>Located in {pet.location}</p>
                        <p className={styles.story_sub}>Adopted {pet.name} in {pet.adopted}</p>
                      </div>
                    </div>
                    <p className={styles.story_text}>"{pet.story}"</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination */}
          <div className={styles.pagination}>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={`page-${i}`}
                onClick={() => paginate(i + 1)}
                className={currentPage === i + 1 ? styles.activePage : ''}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className={styles.contact_nav}>
        <div className={styles.contact_us}>
          <h2 className={styles.c_header}>Contact Us</h2>
          <form ref={form} onSubmit={sendEmail} className={styles.contact_info}>
            <label htmlFor="name">Name :</label>
            <input type="text" id="name" name="name" required />

            <label htmlFor="email">Email Id :</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              placeholder={user?.email || ""} 
              defaultValue={user?.email || ""} 
              required 
            />

            <label htmlFor="phone">Phone no. :</label>
            <input type="tel" id="phone" name="phone" required />
            
            <label htmlFor="message">Message :</label>
            <textarea id="msg" name="msg" required />
            
            <center>
              <button type='submit' className={styles.submit}>Submit</button>
            </center>
          </form>
        </div>

        <div className={styles.visitor}>
          <h2 className={styles.v_header}>Visit our Office</h2>
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3573.6174384764386!2d75.87194517622035!3d26.403544476954327!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbfc0c282ffffff%3A0x4776f298b0f0587e!2sBanasthali%20Vidyapith!5e0!3m2!1sen!2sin!4v1743691700578!5m2!1sen!2sin" 
            allowFullScreen 
            className={styles.map} 
            loading="lazy" 
            title="Office Location"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  )
}

export default Home