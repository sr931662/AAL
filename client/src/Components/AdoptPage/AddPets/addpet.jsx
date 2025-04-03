
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './addpet.module.css'; // Import the CSS module

export const isAdmin = () => {
    const userData = localStorage.getItem('user');
    if (!userData) return false;
    
    try {
        const user = JSON.parse(userData);
        return user.role === 'admin';
    } catch (error) {
        console.error('Error parsing user data:', error);
        return false;
    }
};

const AddPetForm = () => {
    const [petData, setPetData] = useState({
        pid: '',
        pname: '',
        pimage: '',
        ptype: '',
        gender: '',
        age: 0,
        shelter_loc: '',
        v_status: '',
        t_status: '',
    });
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            const user = JSON.parse(userData);
            if (user.role === 'admin') {
                setIsAdmin(true);
            }
        }
        setLoading(false);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPetData({ ...petData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:3005/api/auth/add-pet', petData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            alert('Pet added successfully');
            setPetData({
                pid: '',
                pname: '',
                pimage: '',
                ptype: '',
                gender: '',
                age: 0,
                shelter_loc: '',
                v_status: '',
                t_status: '',
            });
        } catch (error) {
            console.error('Error adding pet:', error);
            alert(error.response?.data?.message || 'Failed to add pet');
        }
    };

    if (loading) {
        return <div className={styles.loading}>Loading...</div>;
    }


    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Add New Pet</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                    <input 
                        type="text" 
                        name="pid" 
                        placeholder="Pet ID" 
                        value={petData.pid} 
                        onChange={handleChange} 
                        className={styles.input}
                        required 
                    />
                </div>
                
                <div className={styles.formGroup}>
                    <input 
                        type="text" 
                        name="pname" 
                        placeholder="Pet Name" 
                        value={petData.pname} 
                        onChange={handleChange} 
                        className={styles.input}
                        required 
                    />
                </div>
                
                <div className={styles.formGroupFull}>
                    <input 
                        type="text" 
                        name="pimage" 
                        placeholder="Pet Image URL" 
                        value={petData.pimage} 
                        onChange={handleChange} 
                        className={styles.input}
                        required 
                    />
                </div>
                
                <div className={styles.formGroup}>
                    <input 
                        type="text" 
                        name="ptype" 
                        placeholder="Pet Type" 
                        value={petData.ptype} 
                        onChange={handleChange} 
                        className={styles.input}
                        required 
                    />
                </div>
                
                <div className={styles.formGroup}>
                    <select 
                        name="gender" 
                        value={petData.gender} 
                        onChange={handleChange} 
                        className={styles.select}
                        placeholder="Enter gender"
                        required
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
                
                <div className={styles.formGroup}>
                    <input 
                        type="number" 
                        name="age" 
                        placeholder="Age" 
                        value={petData.age} 
                        onChange={handleChange} 
                        className={styles.input}
                        required 
                    />
                </div>
                
                <div className={styles.formGroup}>
                    <input 
                        type="text" 
                        name="shelter_loc" 
                        placeholder="Shelter Location" 
                        value={petData.shelter_loc} 
                        onChange={handleChange} 
                        className={styles.input}
                        required 
                    />
                </div>
                
                <div className={styles.formGroup}>
                    <select 
                        name="v_status" 
                        placeholder="Vaccinated?"
                        value={petData.v_status} 
                        onChange={handleChange} 
                        className={styles.select}
                        required
                    >
                        <option value="">Vaccination Status</option>
                        <option value="Vaccinated">Vaccinated</option>
                        <option value="Non-vaccinated">Non-vaccinated</option>
                        <option value="In-progress">In-progress</option>
                    </select>
                </div>
                
                <div className={styles.formGroup}>
                    <select 
                        name="t_status" 
                        placeholder="Trained?"
                        value={petData.t_status} 
                        onChange={handleChange} 
                        className={styles.select}
                        required
                    >
                        <option value="">Training Status</option>
                        <option value="House trained">House trained</option>
                        <option value="Shelter trained">Shelter trained</option>
                        <option value="K9 trained">K9 trained</option>
                        <option value="Puppies training">Puppies training</option>
                    </select>
                </div>
                
                <button type="submit" className={styles.submitButton}>Add Pet</button>
            </form>
        </div>
    );
};

export default AddPetForm;