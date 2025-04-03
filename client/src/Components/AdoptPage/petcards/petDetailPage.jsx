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
    const navigate = useNavigate();

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

    const handleAdoptClick = async () => {
        try {
            // Initialize EmailJS with your user ID
            emailjs.init('vidushitrivedi279@gmail.com');
            
            // Send the email
            const response = await emailjs.send(
                'service_6c2jgbd',  // Your EmailJS service ID
                'template_khm633q', // Your EmailJS template ID
                {
                    pet_name: pet.pname,
                    pet_type: pet.ptype,
                    pet_age: pet.age,
                    pet_gender: pet.gender,
                    shelter_location: pet.shelter_loc,
                    to_email: 'vidushitrivedi279@gmail.com', // Your email address
                    reply_to: 'USER_EMAIL@EXAMPLE.COM' // You might want to collect this from a form
                }
            );
            
            setEmailSent(true);
        } catch (err) {
            console.error('Failed to send email:', err);
            setEmailError('Failed to send adoption interest email. Please try again later.');
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
                        src={pet.pimage} 
                        alt={pet.pname}
                        onError={(e) => {
                            e.target.src = '/default-pet.jpg';
                        }}
                    />
                </div>

                <div className={styles.details}>
                    <div className={styles.status}>
                        <span className={styles.vaccination} data-status={pet.v_status}>
                            {pet.v_status}
                        </span>
                        <span className={styles.training} data-status={pet.t_status}>
                            {pet.t_status}
                        </span>
                    </div>

                    <div className={styles.infoSection}>
                        <h3>Location</h3>
                        <p>{pet.shelter_loc}</p>
                    </div>

                    <div className={styles.infoSection}>
                        <h3>About</h3>
                        <p>This {pet.ptype.toLowerCase()} is looking for a loving home!</p>
                    </div>

                    <button 
                        className={styles.adoptButton}
                        onClick={handleAdoptClick}
                        disabled={emailSent}
                    >
                        {emailSent 
                            ? `Email Sent About ${pet.pname}!` 
                            : `Interested in Adopting ${pet.pname}?`}
                    </button>
                    
                    {emailError && <div className={styles.error}>{emailError}</div>}
                </div>
            </div>
        </div>
    );
};

export default PetDetailPage;