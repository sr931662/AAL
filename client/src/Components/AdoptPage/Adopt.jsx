import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../store/auth';
import axios from 'axios';
import styles from './Adopt.module.css';
import about1 from '../../Assets/AAL-about.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faSearch, faFilter } from '@fortawesome/free-solid-svg-icons';

const Adopt = () => {
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({
        petType: '',
        age: '',
        gender: '',
        v_status: '',
        t_status: ''
    });
    const { user } = useAuth();

    useEffect(() => {
        const fetchPets = async () => {
            try {
                setLoading(true);
                setError(null);
                
                // Add authorization header if needed
                const config = {
                    headers: {}
                };
                
                if (localStorage.getItem('token')) {
                    config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
                }

                const response = await axios.get('http://localhost:3005/api/auth/pets', config);
                
                if (response.data && Array.isArray(response.data)) {
                    setPets(response.data);
                } else {
                    throw new Error('Invalid data format received from server');
                }
            } catch (err) {
                console.error('Error fetching pets:', err);
                setError(err.response?.data?.message || 
                         err.message || 
                         'Failed to load pets. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchPets();
    }, []);

    const handleSearch = (e) => {
        setSearchQuery(e.target.value.toLowerCase());
    };

    const handleFilterChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        });
    };

    const clearFilters = () => {
        setSearchQuery('');
        setFilters({
            petType: '',
            age: '',
            gender: '',
            v_status: '',
            t_status: ''
        });
    };

    // Filter pets based on search and filters
    const filteredPets = pets.filter(pet => {
        const matchesSearch = pet.pname?.toLowerCase().includes(searchQuery) || 
                           pet.ptype?.toLowerCase().includes(searchQuery);
        
        const matchesFilters = (
            (filters.petType ? pet.ptype === filters.petType : true) &&
            (filters.age ? pet.age.toString() === filters.age : true) &&
            (filters.gender ? pet.gender === filters.gender : true) &&
            (filters.v_status ? pet.v_status === filters.v_status : true) &&
            (filters.t_status ? pet.t_status === filters.t_status : true)
        );

        return matchesSearch && matchesFilters;
    });

    if (loading) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.spinner}></div>
                <p>Loading pets...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.errorContainer}>
                <p className={styles.errorMessage}>{error}</p>
                <button 
                    onClick={() => window.location.reload()} 
                    className={styles.retryButton}
                >
                    Try Again
                </button>
            </div>
        );
    }

    return (
        
        <div className={styles.container}>
            {/* Header Section */}
            <div className={styles.header}>
                <div className={styles.header1}>
                    <h1 className={styles.main_head}>Find Your Perfect Companion</h1>
                    <p className={styles.head_info}>
                        Every pet deserves a loving home. Browse through our available pets and give them a second chance at happiness.
                    </p>
                </div>
                <div className={styles.header2}>
                    <img src={about1} alt='Pet playing Around' className={styles.about_img_1} />
                </div>
            </div>

            {/* Filter Section */}
            <div className={styles.filter}>
                <input 
                    type='text' 
                    placeholder='Search...' 
                    onChange={handleSearch} 
                    className={styles.filter5}
                />
                <select name='petType' onChange={handleFilterChange} value={filters.petType}>
                    <option value=''>Any type</option>
                    {[...new Set(pets.map(pet => pet.ptype))].map(type => (
                        <option key={type} value={type}>{type}</option>
                    ))}
                </select>
                <select name='age' onChange={handleFilterChange} value={filters.age}>
                    <option value=''>Any age</option>
                    {[...new Set(pets.map(pet => String(pet.age)))].map(age => (
                        <option key={age} value={age}>{age}</option>
                    ))}
                </select>
                <select name='gender' onChange={handleFilterChange} value={filters.gender}>
                    <option value=''>Any gender</option>
                    <option value='male'>Male</option>
                    <option value='female'>Female</option>
                </select>
                <button onClick={clearFilters} className={styles.f_btn}>
                    Clear
                </button>
            </div>

            {/* Pets Section */}
            <div className={styles.pets_section}>
                <h2 className={styles.header_pets}>Available Pets</h2>
                <div className={styles.pet_cards}>
                    {filteredPets.map(pet => (
                        <div key={pet._id || pet.pid} className={styles.card}>
                            <img 
                                src={pet.pimage} 
                                alt={pet.pname} 
                                className={styles.pet_img}
                                onError={(e) => {
                                    e.target.src = '/default-pet.jpg';
                                }}
                            />
                            <div className={styles.details}>
                                <div className={styles.info_slip1}>
                                    <span className={styles.pet_name}>{pet.pname}</span>
                                    <span className={styles.pet_age}>{pet.age} years</span>
                                </div>
                                <div className={styles.pet_info_slip}>
                                    <span className={styles.inner_head}>{pet.ptype}</span>
                                    <span>{pet.gender}</span>
                                </div>
                                <span 
                                    className={styles.v_style}
                                    style={{
                                        backgroundColor: pet.v_status === 'Vaccinated' ? '#a1d0ef' : '#f3dda0',
                                        color: pet.v_status === 'Vaccinated' ? 'rgb(36, 98, 207)' : 'rgb(196, 102, 15)'
                                    }}
                                >
                                    {pet.v_status}
                                </span>
                                <div className={styles.pet_info_slip}>
                                    <FontAwesomeIcon icon={faHeart} />
                                    <span>{pet.likes || 0} likes</span>
                                </div>
                                <Link to={`/pets/${pet.pid}`} className={styles.learn}>
                                    Learn More
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Adopt;