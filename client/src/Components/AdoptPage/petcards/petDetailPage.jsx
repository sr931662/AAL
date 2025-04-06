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
    const [showForm, setShowForm] = useState(false);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        // Section 1: Personal Information
        fullName: '',
        email: '',
        phone: '',
        residenceType: 'own', // own/rent/other
        landlordPermission: 'yes', // yes/no/not-applicable
        
        // Section 2: Household
        householdMembers: '1', // 1/2/3/4+
        hasChildren: 'no', // yes/no
        childrenAges: '',
        hasAllergies: 'no', // yes/no
        allergyDetails: '',
        
        // Section 3: Pet Experience
        currentPets: 'none', // none/1/2/3+
        pastPetsExperience: 'yes', // yes/no/some
        vetAccess: 'yes', // yes/no/plan-to-get
        
        // Section 4: Lifestyle
        workArrangement: 'office', // office/hybrid/remote/unemployed
        dailyAloneHours: '4-8', // <4/4-8/8+
        travelFrequency: 'rarely', // rarely/sometimes/often
        travelPlans: '',
        
        // Section 5: Pet Care
        petLocation: 'free-roam', // free-roam/contained-room/crated/other
        exercisePlan: 'daily-walks', // daily-walks/yard/other
        trainingApproach: 'positive', // positive/mixed/other
        
        // Section 6: Commitment
        financialPreparedness: 'fully', // fully/mostly/somewhat
        movingPlans: 'none', // none/possible/planned
        surrenderPrevention: 'keep', // keep/rehome/shelter
        
        // Section 7: About the Pet
        whyThisPet: '',
        additionalInfo: ''
    });

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

    const handleRadioChange = (name, value) => {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    const handleAdoptClick = async (e) => {
        e.preventDefault();
        
        if (!showForm) {
            setShowForm(true);
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
            return;
        }
    
        try {
            // Validate required fields
            if (!formData.fullName || !formData.email || !formData.phone) {
                setEmailError('Please fill in all required fields');
                return;
            }
    
            // Transform data for email template
            const templateParams = {
                pet_name: pet.pname || 'Not specified',
                pet_type: pet.ptype || 'Not specified',
                shelter_name: "Your Shelter Name", // Replace with your actual shelter name
                year: new Date().getFullYear(),
                
                // Applicant Information
                fullName: formData.fullName || 'Not provided',
                email: formData.email || 'Not provided',
                phone: formData.phone || 'Not provided',
                residenceType: formData.residenceType === 'own' ? 'Owns home' : 
                              formData.residenceType === 'rent' ? 'Rents home' : 
                              'Other living arrangement',
                landlordPermission: formData.landlordPermission === 'yes' ? 'Has permission' :
                                   formData.landlordPermission === 'no' ? 'No permission' : 
                                   'Not applicable',
                
                // Household Information
                householdMembers: formData.householdMembers === '1' ? '1 (Just me)' :
                                 formData.householdMembers === '2' ? '2' :
                                 formData.householdMembers === '3' ? '3' : '4 or more',
                hasChildren: formData.hasChildren === 'yes' ? 'Yes' : 'No',
                childrenAges: formData.childrenAges || 'Not applicable',
                hasAllergies: formData.hasAllergies === 'yes' ? 'Yes' : 'No',
                allergyDetails: formData.allergyDetails || 'Not applicable',
                
                // Pet Experience
                currentPets: formData.currentPets === 'none' ? 'None' :
                             formData.currentPets === '1' ? '1 pet' :
                             formData.currentPets === '2' ? '2 pets' : '3 or more pets',
                pastPetsExperience: formData.pastPetsExperience === 'yes' ? 'Yes, extensive experience' :
                                   formData.pastPetsExperience === 'no' ? 'No, first-time owner' : 
                                   'Some experience',
                vetAccess: formData.vetAccess === 'yes' ? 'Yes, established vet' :
                          formData.vetAccess === 'no' ? 'No' : 'Will find one if needed',
                
                // Lifestyle & Care Plans
                workArrangement: formData.workArrangement === 'office' ? 'Works in office' :
                                 formData.workArrangement === 'hybrid' ? 'Hybrid work arrangement' :
                                 formData.workArrangement === 'remote' ? 'Works from home' : 'Not employed',
                dailyAloneHours: formData.dailyAloneHours === '<4' ? 'Less than 4 hours' :
                                 formData.dailyAloneHours === '4-8' ? '4-8 hours' : 'More than 8 hours',
                travelFrequency: formData.travelFrequency === 'rarely' ? 'Rarely travels' :
                                formData.travelFrequency === 'sometimes' ? 'Travels sometimes (monthly)' :
                                'Travels often (weekly)',
                travelPlans: formData.travelPlans || 'Not specified',
                petLocation: formData.petLocation === 'free-roam' ? 'Free roam of home' :
                             formData.petLocation === 'contained-room' ? 'Contained in room' :
                             formData.petLocation === 'crated' ? 'In crate' : 'Other arrangement',
                exercisePlan: formData.exercisePlan === 'daily-walks' ? 'Daily walks' :
                              formData.exercisePlan === 'yard' ? 'Access to yard' : 'Other plan',
                trainingApproach: formData.trainingApproach === 'positive' ? 'Positive reinforcement' :
                                 formData.trainingApproach === 'mixed' ? 'Mixed methods' : 'Other approach',
                
                // Commitment
                financialPreparedness: formData.financialPreparedness === 'fully' ? 'Fully prepared' :
                                      formData.financialPreparedness === 'mostly' ? 'Mostly prepared' :
                                      'Somewhat prepared',
                movingPlans: formData.movingPlans === 'none' ? 'No plans to move' :
                             formData.movingPlans === 'possible' ? 'Possible move' : 'Planned move',
                surrenderPrevention: formData.surrenderPrevention === 'keep' ? 'Would find a way to keep' :
                                    formData.surrenderPrevention === 'rehome' ? 'Would rehome responsibly' :
                                    'Would return to shelter',
                
                // About the Pet
                whyThisPet: formData.whyThisPet || 'Not specified',
                additionalInfo: formData.additionalInfo || 'None provided'
            };
    
            // Send the email
            const response = await emailjs.send(
                'service_6c2jgbd',
                'template_khm633q',
                templateParams,
                'enKl3zRd23Mfn39ZU'
            );
    
            if (response.status === 200) {
                setEmailSent(true);
                setEmailError(null);
            } else {
                throw new Error('Failed to send email');
            }
        } catch (err) {
            console.error('Failed to send email:', err);
            setEmailError('Failed to submit adoption application. Please try again later.');
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
                        onError={(e) => e.target.src = '/default-pet.jpg'}
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

                </div>
            </div>
                    {!emailSent ? (
                        <>
                            {showForm ? (
                                <form className={styles.adoptionForm}>
                                    <h2>Adoption Application for {pet.pname}</h2>
                                    
                                    {/* Section 1: Personal Information */}
                                    <fieldset className={styles.formSection}>
                                        <legend>1. Your Information</legend>
                                        <div className={styles.formGroup}>
                                            <label>Full Name *</label>
                                            <input
                                                type="text"
                                                name="fullName"
                                                value={formData.fullName}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div className={styles.formRow}>
                                            <div className={styles.formGroup}>
                                                <label>Email *</label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>
                                            <div className={styles.formGroup}>
                                                <label>Phone *</label>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label>Your residence type *</label>
                                            <div className={styles.radioGroup}>
                                                {['own', 'rent', 'other'].map(option => (
                                                    <label key={option}>
                                                        <input
                                                            type="radio"
                                                            checked={formData.residenceType === option}
                                                            onChange={() => handleRadioChange('residenceType', option)}
                                                        />
                                                        {option === 'own' ? 'Own my home' : 
                                                         option === 'rent' ? 'Rent my home' : 'Other'}
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                        {formData.residenceType === 'rent' && (
                                            <div className={styles.formGroup}>
                                                <label>Do you have landlord permission for pets? *</label>
                                                <div className={styles.radioGroup}>
                                                    {['yes', 'no', 'not-applicable'].map(option => (
                                                        <label key={option}>
                                                            <input
                                                                type="radio"
                                                                checked={formData.landlordPermission === option}
                                                                onChange={() => handleRadioChange('landlordPermission', option)}
                                                            />
                                                            {option === 'yes' ? 'Yes, I have permission' : 
                                                             option === 'no' ? 'No, I don\'t' : 'Not applicable'}
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </fieldset>

                                    {/* Section 2: Household */}
                                    <fieldset className={styles.formSection}>
                                        <legend>2. Household Information</legend>
                                        <div className={styles.formGroup}>
                                            <label>Number of adults in home *</label>
                                            <div className={styles.radioGroup}>
                                                {['1', '2', '3', '4+'].map(option => (
                                                    <label key={option}>
                                                        <input
                                                            type="radio"
                                                            checked={formData.householdMembers === option}
                                                            onChange={() => handleRadioChange('householdMembers', option)}
                                                        />
                                                        {option === '1' ? 'Just me' : 
                                                         option === '4+' ? '4 or more' : option}
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label>Children in household? *</label>
                                            <div className={styles.radioGroup}>
                                                {['yes', 'no'].map(option => (
                                                    <label key={option}>
                                                        <input
                                                            type="radio"
                                                            checked={formData.hasChildren === option}
                                                            onChange={() => handleRadioChange('hasChildren', option)}
                                                        />
                                                        {option === 'yes' ? 'Yes' : 'No'}
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                        {formData.hasChildren === 'yes' && (
                                            <div className={styles.formGroup}>
                                                <label>Ages of children (if any)</label>
                                                <input
                                                    type="text"
                                                    name="childrenAges"
                                                    value={formData.childrenAges}
                                                    onChange={handleInputChange}
                                                    placeholder="e.g., 5, 8, 12"
                                                />
                                            </div>
                                        )}
                                        <div className={styles.formGroup}>
                                            <label>Any pet allergies in household? *</label>
                                            <div className={styles.radioGroup}>
                                                {['yes', 'no'].map(option => (
                                                    <label key={option}>
                                                        <input
                                                            type="radio"
                                                            checked={formData.hasAllergies === option}
                                                            onChange={() => handleRadioChange('hasAllergies', option)}
                                                        />
                                                        {option === 'yes' ? 'Yes' : 'No'}
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                        {formData.hasAllergies === 'yes' && (
                                            <div className={styles.formGroup}>
                                                <label>Please describe the allergies</label>
                                                <input
                                                    type="text"
                                                    name="allergyDetails"
                                                    value={formData.allergyDetails}
                                                    onChange={handleInputChange}
                                                    placeholder="What allergies and who has them"
                                                />
                                            </div>
                                        )}
                                    </fieldset>

                                    {/* Section 3: Pet Experience */}
                                    <fieldset className={styles.formSection}>
                                        <legend>3. Pet Experience</legend>
                                        <div className={styles.formGroup}>
                                            <label>Current pets in your home *</label>
                                            <div className={styles.radioGroup}>
                                                {['none', '1', '2', '3+'].map(option => (
                                                    <label key={option}>
                                                        <input
                                                            type="radio"
                                                            checked={formData.currentPets === option}
                                                            onChange={() => handleRadioChange('currentPets', option)}
                                                        />
                                                        {option === 'none' ? 'None' : 
                                                         option === '3+' ? '3 or more' : option}
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label>Previous pet ownership experience *</label>
                                            <div className={styles.radioGroup}>
                                                {['yes', 'no', 'some'].map(option => (
                                                    <label key={option}>
                                                        <input
                                                            type="radio"
                                                            checked={formData.pastPetsExperience === option}
                                                            onChange={() => handleRadioChange('pastPetsExperience', option)}
                                                        />
                                                        {option === 'yes' ? 'Yes, extensive' : 
                                                         option === 'no' ? 'No, first-time owner' : 'Some experience'}
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label>Access to a veterinarian? *</label>
                                            <div className={styles.radioGroup}>
                                                {['yes', 'no', 'plan-to-get'].map(option => (
                                                    <label key={option}>
                                                        <input
                                                            type="radio"
                                                            checked={formData.vetAccess === option}
                                                            onChange={() => handleRadioChange('vetAccess', option)}
                                                        />
                                                        {option === 'yes' ? 'Yes, established vet' : 
                                                         option === 'no' ? 'No' : 'Will find one if needed'}
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    </fieldset>

                                    {/* Section 4: Lifestyle */}
                                    <fieldset className={styles.formSection}>
                                        <legend>4. Your Lifestyle</legend>
                                        <div className={styles.formGroup}>
                                            <label>Your work arrangement *</label>
                                            <div className={styles.radioGroup}>
                                                {['office', 'hybrid', 'remote', 'unemployed'].map(option => (
                                                    <label key={option}>
                                                        <input
                                                            type="radio"
                                                            checked={formData.workArrangement === option}
                                                            onChange={() => handleRadioChange('workArrangement', option)}
                                                        />
                                                        {option === 'office' ? 'Work in office' : 
                                                         option === 'hybrid' ? 'Hybrid work' :
                                                         option === 'remote' ? 'Work from home' : 'Not employed'}
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label>Hours pet would be alone daily *</label>
                                            <div className={styles.radioGroup}>
                                                {['<4', '4-8', '8+'].map(option => (
                                                    <label key={option}>
                                                        <input
                                                            type="radio"
                                                            checked={formData.dailyAloneHours === option}
                                                            onChange={() => handleRadioChange('dailyAloneHours', option)}
                                                        />
                                                        {option === '<4' ? 'Less than 4 hours' : 
                                                         option === '4-8' ? '4-8 hours' : 'More than 8 hours'}
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label>How often do you travel? *</label>
                                            <div className={styles.radioGroup}>
                                                {['rarely', 'sometimes', 'often'].map(option => (
                                                    <label key={option}>
                                                        <input
                                                            type="radio"
                                                            checked={formData.travelFrequency === option}
                                                            onChange={() => handleRadioChange('travelFrequency', option)}
                                                        />
                                                        {option === 'rarely' ? 'Rarely' : 
                                                         option === 'sometimes' ? 'Sometimes (monthly)' : 'Often (weekly)'}
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label>Plans for pet when traveling?</label>
                                            <input
                                                type="text"
                                                name="travelPlans"
                                                value={formData.travelPlans}
                                                onChange={handleInputChange}
                                                placeholder="Pet sitter, boarding, etc."
                                            />
                                        </div>
                                    </fieldset>

                                    {/* Section 5: Pet Care */}
                                    <fieldset className={styles.formSection}>
                                        <legend>5. Pet Care Plans</legend>
                                        <div className={styles.formGroup}>
                                            <label>Where will pet stay when alone? *</label>
                                            <div className={styles.radioGroup}>
                                                {['free-roam', 'contained-room', 'crated', 'other'].map(option => (
                                                    <label key={option}>
                                                        <input
                                                            type="radio"
                                                            checked={formData.petLocation === option}
                                                            onChange={() => handleRadioChange('petLocation', option)}
                                                        />
                                                        {option === 'free-roam' ? 'Free roam of home' : 
                                                         option === 'contained-room' ? 'Contained in room' :
                                                         option === 'crated' ? 'In crate' : 'Other arrangement'}
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label>Exercise plan for pet *</label>
                                            <div className={styles.radioGroup}>
                                                {['daily-walks', 'yard', 'other'].map(option => (
                                                    <label key={option}>
                                                        <input
                                                            type="radio"
                                                            checked={formData.exercisePlan === option}
                                                            onChange={() => handleRadioChange('exercisePlan', option)}
                                                        />
                                                        {option === 'daily-walks' ? 'Daily walks' : 
                                                         option === 'yard' ? 'Access to yard' : 'Other plan'}
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label>Training approach *</label>
                                            <div className={styles.radioGroup}>
                                                {['positive', 'mixed', 'other'].map(option => (
                                                    <label key={option}>
                                                        <input
                                                            type="radio"
                                                            checked={formData.trainingApproach === option}
                                                            onChange={() => handleRadioChange('trainingApproach', option)}
                                                        />
                                                        {option === 'positive' ? 'Positive reinforcement' : 
                                                         option === 'mixed' ? 'Mixed methods' : 'Other approach'}
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    </fieldset>

                                    {/* Section 6: Commitment */}
                                    <fieldset className={styles.formSection}>
                                        <legend>6. Long-Term Commitment</legend>
                                        <div className={styles.formGroup}>
                                            <label>Financial preparedness *</label>
                                            <div className={styles.radioGroup}>
                                                {['fully', 'mostly', 'somewhat'].map(option => (
                                                    <label key={option}>
                                                        <input
                                                            type="radio"
                                                            checked={formData.financialPreparedness === option}
                                                            onChange={() => handleRadioChange('financialPreparedness', option)}
                                                        />
                                                        {option === 'fully' ? 'Fully prepared' : 
                                                         option === 'mostly' ? 'Mostly prepared' : 'Somewhat prepared'}
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label>Any plans to move in next 2 years? *</label>
                                            <div className={styles.radioGroup}>
                                                {['none', 'possible', 'planned'].map(option => (
                                                    <label key={option}>
                                                        <input
                                                            type="radio"
                                                            checked={formData.movingPlans === option}
                                                            onChange={() => handleRadioChange('movingPlans', option)}
                                                        />
                                                        {option === 'none' ? 'No plans' : 
                                                         option === 'possible' ? 'Possible move' : 'Planned move'}
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label>If you couldn't keep pet, you would: *</label>
                                            <div className={styles.radioGroup}>
                                                {['keep', 'rehome', 'shelter'].map(option => (
                                                    <label key={option}>
                                                        <input
                                                            type="radio"
                                                            checked={formData.surrenderPrevention === option}
                                                            onChange={() => handleRadioChange('surrenderPrevention', option)}
                                                        />
                                                        {option === 'keep' ? 'Find a way to keep' : 
                                                         option === 'rehome' ? 'Rehome responsibly' : 'Return to shelter'}
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    </fieldset>

                                    {/* Section 7: About the Pet */}
                                    <fieldset className={styles.formSection}>
                                        <legend>7. About {pet.pname}</legend>
                                        <div className={styles.formGroup}>
                                            <label>Why are you interested in adopting {pet.pname}? *</label>
                                            <textarea
                                                name="whyThisPet"
                                                value={formData.whyThisPet}
                                                onChange={handleInputChange}
                                                required
                                                placeholder="What makes this pet a good fit for you?"
                                            />
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label>Anything else we should know?</label>
                                            <textarea
                                                name="additionalInfo"
                                                value={formData.additionalInfo}
                                                onChange={handleInputChange}
                                                placeholder="Additional information about your home or situation"
                                            />
                                        </div>
                                    </fieldset>

                                    <div className={styles.formFooter}>
                                        <p>By submitting, I confirm all information is accurate and I'm committed to providing a loving home.</p>
                                        <button 
                                            type="submit"
                                            className={styles.adoptButton}
                                            onClick={handleAdoptClick}
                                        >
                                            Submit Application
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <button 
                                    className={styles.adoptButton}
                                    onClick={handleAdoptClick}
                                >
                                    Start Adoption Application for {pet.pname}
                                </button>
                            )}
                        </>
                    ) : (
                        <div className={styles.successMessage}>
                            <h2>Thank You!</h2>
                            <p>Your application for {pet.pname} has been submitted.</p>
                            <p>We'll review your information and contact you within 3-5 business days.</p>
                            <button 
                                className={styles.backButton}
                                onClick={() => navigate('/')}
                            >
                                Back to Available Pets
                            </button>
                        </div>
                    )}
                    
                    {emailError && <div className={styles.error}>{emailError}</div>}
        </div>
    );
};

export default PetDetailPage;