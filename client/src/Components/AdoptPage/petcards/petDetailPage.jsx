import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import emailjs from '@emailjs/browser';
import styles from './petDetailPage.module.css';

const PetDetailPage = () => {
    const { id } = useParams();
    const [pet, setPet] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [emailSent, setEmailSent] = useState(false);
    const [emailError, setEmailError] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [showForm, setShowForm] = useState(false);
    const navigate = useNavigate();

    // Initialize EmailJS once when component mounts
    useEffect(() => {
        emailjs.init('enKl3zRd23Mfn39ZU'); // Replace with your actual EmailJS public key
    }, []);

    useEffect(() => {
        const fetchPet = async () => {
            try {
                const response = await axios.get(`http://localhost:3005/api/auth/pets/${id}`);
                setPet(response.data);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to load pet details');
            } finally {
                setLoading(false);
            }
        };

        fetchPet();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAdoptClick = async (e) => {
        e.preventDefault();
        
        if (!showForm) {
            setShowForm(true);
            return;
        }

        try {
            // Validate form
            if (!formData.name || !formData.email) {
                setEmailError('Name and email are required');
                return;
            }

            // Validate email format
            if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
                setEmailError('Please enter a valid email address');
                return;
            }

            // Send the email
            const result = await emailjs.send(
                'service_6c2jgbd',  // Replace with your EmailJS service ID
                'template_khm633q', // Replace with your EmailJS template ID
                {
                    pet_name: pet.pname,
                    pet_type: pet.ptype,
                    pet_age: pet.age,
                    pet_gender: pet.gender,
                    shelter_location: pet.shelter_loc,
                    to_email: 'vidushitrivedi279@gmail.com', // Shelter's email
                    from_name: formData.name,
                    from_email: formData.email,
                    phone: formData.phone,
                    message: formData.message || `I'm interested in adopting ${pet.pname}!`,
                    reply_to: formData.email
                }
            );
            
            if (result.status === 200) {
                setEmailSent(true);
                setEmailError(null);
            } else {
                throw new Error('Failed to send email');
            }
        } catch (err) {
            console.error('Failed to send email:', err);
            setEmailError(err.message || 'Failed to send adoption interest. Please try again later.');
        }
    };

    if (loading) return <div className={styles.loading}>Loading pet details...</div>;
    if (error) return <div className={styles.error}>{error}</div>;
    if (!pet) return <div className={styles.error}>Pet not found</div>;

    return (
        <div className={styles.container}>
            <button onClick={() => navigate(-1)} className={styles.backButton}>
                ← Back to All Pets
            </button>

            <div className={styles.petHeader}>
                <h1>{pet.pname}</h1>
                <div className={styles.meta}>
                    <span>{pet.ptype}</span>
                    <span>{pet.age} years old</span>
                    <span>{pet.gender}</span>
                </div>
            </div>

            <div className={styles.content}>
                <div className={styles.imageContainer}>
                    <img 
                        src={pet.pimage || '/default-pet.jpg'} 
                        alt={pet.pname}
                        onError={(e) => {
                            e.target.src = '/default-pet.jpg';
                        }}
                    />
                </div>

                <div className={styles.details}>
                    <div className={styles.status}>
                        <span className={`${styles.statusTag} ${pet.v_status === 'Vaccinated' ? styles.vaccinated : styles.notVaccinated}`}>
                            {pet.v_status}
                        </span>
                        <span className={`${styles.statusTag} ${pet.t_status === 'Trained' ? styles.trained : styles.notTrained}`}>
                            {pet.t_status}
                        </span>
                    </div>

                    <div className={styles.infoSection}>
                        <h3>Location</h3>
                        <p>{pet.shelter_loc}</p>
                    </div>

                    <div className={styles.infoSection}>
                        <h3>About</h3>
                        <p>{pet.description || `This ${pet.ptype.toLowerCase()} is looking for a loving home!`}</p>
                    </div>

                    {!emailSent ? (
                        <>
                            {showForm && (
                                <form className={styles.adoptionForm}>
                                    <div className={styles.formGroup}>
                                        <label htmlFor="name">Your Name *</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label htmlFor="email">Email *</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label htmlFor="phone">Phone</label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label htmlFor="message">Message</label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            placeholder={`Tell us why you'd be a good fit for ${pet.pname}`}
                                        />
                                    </div>
                                </form>
                            )}
                            
                            <button 
                                className={styles.adoptButton}
                                onClick={handleAdoptClick}
                            >
                                {showForm 
                                    ? 'Submit Adoption Interest' 
                                    : `Interested in Adopting ${pet.pname}?`}
                            </button>
                        </>
                    ) : (
                        <div className={styles.successMessage}>
                            Thank you! Your adoption interest for {pet.pname} has been sent.
                        </div>
                    )}
                    
                    {emailError && <div className={styles.error}>{emailError}</div>}
                </div>
            </div>
        </div>
    );
};

export default PetDetailPage;