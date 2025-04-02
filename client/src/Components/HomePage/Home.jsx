import React, { useState } from 'react'
import styles from './Home.module.css';
import { Link } from "react-router-dom";
import map from '../../Assets/sample_map.jpg';
import video from "../../Assets/test-video.mp4"
import { faHome, faPager, faHandshake, faHeart, faBedPulse, faHeartPulse, faBone, faDog, faArrowRight, faMap, faMapMarker, faMapMarked, faMapMarkerAlt, faPhoneAlt, faPhone, faMessage, faMailForward, faEnvelope } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const ITEMS_PER_PAGE = 2;


const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const residentialProjects = [
      // ... your project data here
      { id:'id_01', 
        name: 'Mishri', 
        image: 'https://pethelpful.com/.image/t_share/MjEwNzc0NTIwMTI5MTM2NDY1/-golden-retriever-growth-sequence-in-the-1st-year.jpg', 
        owner: 'Ms. Somya', 
        location: 'Banasthali, Rajasthan', 
        age: '5 year(s) old', 
        pet_type: 'Dog', 
        breed: 'Golden Retriever', 
        gender: 'female', 
        adopted: '2020', 
        story: 'Mishri, a clever and brave 5-year-old Golden Retriever, loved two things more than anything else: her bright yellow tennis ball and her best friend, Aanya, a cheerful 10-year-old girl. Mishri and Aanya spent their afternoons playing fetch in the...'},
      { id:'id_01', 
        name: 'Luna', 
        image: 'https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2017/01/05115810/German-Shepherd-Dog-laying-down-in-the-grass-looking-up.jpg', 
        owner: 'Ms. Vidushi', 
        location: 'Banasthali, Rajasthan', 
        age: '2 year(s) old', 
        pet_type: 'Dog', 
        breed: 'German Shefferd', 
        gender: 'female', 
        adopted: '2023', 
        story: 'Luna, a playful and curious 2-year-old German Shepherd, loved exploring her backyard. It was her kingdom, full of trees to sniff, squirrels to chase, and hidden treasures waiting to be discovered. \nOne sunny morning, Luna was out in the yard when she...'},
      { id:'id_01', 
        name: 'Oreo', 
        image: 'https://paradepets.com/.image/ar_4:3%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cg_xy_center%2Cq_auto:good%2Cw_1200%2Cx_1045%2Cy_573/MTkxMzY1Nzg5MjE4MTIxMjQ5/orange-cat-names-1-jpg.jpg', 
        owner: 'Ms. Richa', 
        location: 'Banasthali, Rajasthan', 
        age: '4 year(s) old', 
        pet_type: 'Cat', 
        breed: 'Orange', 
        gender: 'male', 
        adopted: '2021', 
        story: 'Oreo, a 4-year-old orange tabby cat with striking white paws and a tail that flicked like a wand, lived a cozy life in a little house by the park. By day, he napped in sunny spots and supervised his humans as they worked. But by night, Oreo transformed into the fearless...'},
  ];
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = residentialProjects.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(residentialProjects.length / ITEMS_PER_PAGE);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  return (
    <div className={styles.container}>
      {/* video and promotion section */}
      <div className={styles.home_companion}>
        {/* Main header */}
        <h1 className={styles.header_bold}>
          Find Your Perfect Companion
        </h1>

        {/* Sub header */}
        <h3 className={styles.sub_header}>
          Give a loving home to a pet in need. Our adoption process makes it easy to find your perfect match.
        </h3>

        {/* Action buttons - Adopt and Re-home */}
        <div className={styles.companion_btn}>
          <Link to="/adopt" className={styles.adopt_companion}>
            Adopt Now
          </Link>

          <button className={styles.rehome_companion}>
            Re-home
          </button>
        </div>

      </div>




      {/* Adoption Process */}
      <div className={styles.Ad_process}>
        
      <h1 className={styles.Header}>Adoption Process</h1>

        <divc className={styles.Ad_content}>
          
          <div className={styles.Ad_card}>
            <div className={styles.process_icon}>
              <FontAwesomeIcon icon={faPager} className={styles.fa_icon} />
            </div>
            
            <p className={styles.process_head}>
              1. Application
            </p>

            <p className={styles.process_info}>
              Fill out our adoption application form with your details and preferences.
            </p>
          </div>
          <div className={styles.Ad_card}>
            <div className={styles.process_icon}>
              <FontAwesomeIcon icon={faHome} className={styles.fa_icon} />
            </div>
            <p className={styles.process_head}>
              2. Home Check
            </p>
            <p className={styles.process_info}>
              Fill out our adoption application form with your details and preferences.
            </p>
          </div>
          <div className={styles.Ad_card}>
            <div className={styles.process_icon}>
              <FontAwesomeIcon icon={faHandshake} className={styles.fa_icon} />
            </div>
            
            <p className={styles.process_head}>
              3. Meet & Greet
            </p>
            <p className={styles.process_info}>
              Fill out our adoption application form with your details and preferences.
            </p>
          </div>
          <div className={styles.Ad_card}>
            <div className={styles.process_icon}>
              <FontAwesomeIcon icon={faHeart} className={styles.fa_icon} />
            </div>
            
            <p className={styles.process_head}>
              4. Adoption
            </p>

            <p className={styles.process_info}>
              Fill out our adoption application form with your details and preferences.
            </p>
          </div>
          
        </divc>

      </div>

      {/* Pet Care tips */}

      <div className={styles.Care_section}>
          
        <h1 className={styles.Header}>
          Pet Care Tips
        </h1>
        <div className={styles.Care_content}>
          
          <div className={styles.Care_card}>
            <div className={styles.Care_icon}>
              <FontAwesomeIcon icon={faHeartPulse} className={styles.fa_icon} />
            </div>
            
            <p className={styles.Care_head}>
              1. Application
            </p>

            <p className={styles.Care_info}>
              Fill out our adoption application form with your details and preferences.
            </p>
            
            <Link to="#" className={styles.care_link}>
            Learn More <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </div>



          <div className={styles.Care_card}>
            <div className={styles.Care_icon}>
              <FontAwesomeIcon icon={faBone} className={styles.fa_icon} />
            </div>
            <p className={styles.Care_head}>
              2. Home Check
            </p>
            <p className={styles.Care_info}>
              Fill out our adoption application form with your details and preferences.
            </p>

            <Link to="#" className={styles.care_link}>
            Learn More <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </div>



          <div className={styles.Care_card}>
            <div className={styles.Care_icon}>
              <FontAwesomeIcon icon={faDog} className={styles.fa_icon} />
            </div>
            
            <p className={styles.Care_head}>
              3. Meet & Greet
            </p>
            <p className={styles.Care_info}>
              Fill out our adoption application form with your details and preferences.
            </p>

            <Link to="#" className={styles.care_link}>
            Learn More <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </div>
        </div>
      </div>


      {/* Success Stories */}

      
      <div className={styles.stories}>
      <h2 className={styles.stories_heading}>Success Stories</h2>
  
      <div className={styles.stories_glide}>
        <div className={styles.stories_track}>
          <div className={styles.stories_slides}>

            {currentItems.map((pet, index) => (
              <div className={styles.stories_slide}>
                <div className={styles.story_card}>
                  <div className={styles.story_header}>
                    <img
                      src={pet.image}
                      alt={pet.name}
                      className={styles.story_img}
                    />
                    <div>
                      <h4 className={styles.story_name}>{pet.owner}</h4>
                      <p className={styles.story_sub}>Located in {pet.location}</p>
                      <p className={styles.story_sub}>Adopted {pet.name} in {pet.adopted}</p>
                    </div>
                  </div>
                  <p className={styles.story_text}>
                    "{pet.story}"
                  </p>
                </div>
              </div>

            ))}

      </div>
    </div>

    {/* Bullet Navigation  */}
    <div className={styles.pagination}>
      {Array.from({ length: totalPages }, (_, i) => (
          <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={currentPage === i + 1 ? styles.activePage : ''}>
              {i + 1}
          </button>
      ))}
  </div>
  </div>
  </div>

      {/* Contact Us form and Visitor */}

      <div className={styles.contact_nav}>
        <div className={styles.contact_us}>
          <h2 className={styles.c_header}>Contact Us</h2>
          <form action="https://api.web3forms.com/submit" method="POST" className={styles.project_info}>
            <input type="hidden" name="access_key" value="d352b78b-8cfa-4e9a-8359-aa41e72e70f3" />
          
            <label htmlFor="Fname">First Name :</label>
            <input type="text" id="fname" name="fname" required />

            <label htmlFor="Mname">Midde Name (optional):</label>
            <input type="text" id="mname" name="fname" />

            <label htmlFor="Lname">Last Name :</label>
            <input type="text" id="lname" name="fname" required />

            <label htmlFor="email">Email Id :</label>
            <input type="email" id="email" name="fname" required />

            <label htmlFor="phone">Phone no. :</label>
            <input type="phone" id="phone" name="fname" required />
            
            <label htmlFor="message">Message :</label>
            <textarea type="text" id="msg" name="msg" required />
            
            <center>
              <button type='submit' className={styles.submit}>Submit</button>
            </center>
          </form>
        </div>

        <div className={styles.visitor}>
          <h2 className={styles.v_header}>
            Visit our Office
          </h2>
          
          <p className={styles.v_info}><FontAwesomeIcon icon={faMapMarkerAlt} className={styles.FAI} />  123 Pet Street, Animal City, AC 12345</p>
          <p className={styles.v_info}><FontAwesomeIcon icon={faPhone} className={styles.FAI} />  123-456-7890</p>
          <p className={styles.v_info}><FontAwesomeIcon icon={faEnvelope} className={styles.FAI} />  abc@gmail.com</p>

          <div className={styles.map}>
            {/* API connection needed */}
          </div>

        </div>
      </div>

    </div>
  )
}

export default Home