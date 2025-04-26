import React, { useState } from 'react';
import { z } from 'zod';
import styles from './SignupForm.module.css';

// Zod schemas remain the same as before
const addressSchema = z.object({
    pincode: z
        .string({ required_error: "Pincode is required" }) 
        .trim()
        .length(6, { message: "Pincode must be exactly 6 digits" })
        .regex(/^\d{6}$/, { message: "Pincode must contain only digits" }),
    houseNo: z
        .string({ required_error: "House number is required" })
        .trim()
        .min(1, { message: "House number cannot be empty" }),
    street_name: z
        .string({ required_error: "Street name is required" })
        .trim()
        .min(3, { message: "Street name must be at least 3 characters" }),
    district: z.string().trim().optional(),
    city: z
        .string({ required_error: "City is required" })
        .trim()
        .min(2, { message: "City must be at least 2 characters" }),
    state: z
        .string({ required_error: "State is required" })
        .trim()
        .min(2, { message: "State must be at least 2 characters" }),
    country: z
        .string({ required_error: "Country is required" })
        .trim()
        .min(2, { message: "Country must be at least 2 characters" })
});

const signupSchema = z.object({
    fname: z
        .string({ required_error: "First name is required" })
        .trim()
        .min(3, { message: "First name must be at least 3 characters" })
        .max(255, { message: "First name must not exceed 255 characters" }),
    mname: z.string().trim().optional(),
    lname: z
        .string({ required_error: "Last name is required" })
        .trim()
        .min(3, { message: "Last name must be at least 3 characters" })
        .max(255, { message: "Last name must not exceed 255 characters" }),
    phone: z
        .string({ required_error: "Phone number is required" })
        .trim()
        .min(10, { message: "Phone number must be at least 10 digits" })
        .max(20, { message: "Phone number must not exceed 20 digits" }),
    email: z
        .string({ required_error: "Email is required" })
        .trim()
        .email({ message: "Invalid email address" })
        .min(3, { message: "Email must be at least 3 characters" })
        .max(255, { message: "Email must not exceed 255 characters" }),
    pass: z
        .string({ required_error: "Password is required" })
        .min(8, { message: "Password must be at least 8 characters" })
        .max(1024, { message: "Password must not exceed 1024 characters" }),
    repass: z
        .string({ required_error: "Confirm password is required" })
        .min(8, { message: "Confirm password must be at least 8 characters" })
        .max(1024, { message: "Confirm password must not exceed 1024 characters" }),
    address: addressSchema,
    role: z
        .enum(["pet_owner", "vet", "visitor", "admin"], { required_error: "Role is required" })
}).refine(data => data.pass === data.repass, {
    message: "Passwords don't match",
    path: ["repass"]
});

const SignupForm = () => {
    const [formData, setFormData] = useState({
        fname: '',
        mname: '',
        lname: '',
        phone: '',
        email: '',
        pass: '',
        repass: '',
        role: '',
        address: {
            pincode: '',
            houseNo: '',
            street_name: '',
            district: '',
            city: '',
            state: '',
            country: ''
        }
    });
    
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        if (name.includes('address.')) {
            const addressField = name.split('.')[1];
            setFormData(prev => ({
                ...prev,
                address: {
                    ...prev.address,
                    [addressField]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            await signupSchema.parseAsync(formData);
            console.log('Form is valid', formData);
            setErrors({});
            // Submit to backend here
        } catch (error) {
            if (error instanceof z.ZodError) {
                const errorMap = {};
                error.errors.forEach(err => {
                    const path = err.path.join('.');
                    errorMap[path] = err.message;
                });
                setErrors(errorMap);
            }
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Create your account</h1>
                    <p className={styles.subtitle}>Join our community today</p>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    {/* Name Fields */}
                    <div className={styles.formGroup}>
                        <h3 className={styles.sectionTitle}>Personal Information</h3>
                        <div className={styles.nameFields}>
                            <div className={styles.inputWrapper}>
                                <label>First Name*</label>
                                <input
                                    type="text"
                                    name="fname"
                                    value={formData.fname}
                                    onChange={handleChange}
                                    className={`${styles.input} ${errors['fname'] ? styles.error : ''}`}
                                />
                                {errors['fname'] && <span className={styles.errorMessage}>{errors['fname']}</span>}
                            </div>
                            
                            <div className={styles.inputWrapper}>
                                <label>Middle Name</label>
                                <input
                                    type="text"
                                    name="mname"
                                    value={formData.mname}
                                    onChange={handleChange}
                                    className={styles.input}
                                />
                            </div>
                            
                            <div className={styles.inputWrapper}>
                                <label>Last Name*</label>
                                <input
                                    type="text"
                                    name="lname"
                                    value={formData.lname}
                                    onChange={handleChange}
                                    className={`${styles.input} ${errors['lname'] ? styles.error : ''}`}
                                />
                                {errors['lname'] && <span className={styles.errorMessage}>{errors['lname']}</span>}
                            </div>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className={styles.formGroup}>
                        <div className={styles.inputWrapper}>
                            <label>Phone Number*</label>
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className={`${styles.input} ${errors['phone'] ? styles.error : ''}`}
                            />
                            {errors['phone'] && <span className={styles.errorMessage}>{errors['phone']}</span>}
                        </div>
                        
                        <div className={styles.inputWrapper}>
                            <label>Email*</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`${styles.input} ${errors['email'] ? styles.error : ''}`}
                            />
                            {errors['email'] && <span className={styles.errorMessage}>{errors['email']}</span>}
                        </div>
                    </div>

                    {/* Password Fields */}
                    <div className={styles.formGroup}>
                        <h3 className={styles.sectionTitle}>Account Security</h3>
                        <div className={styles.passwordFields}>
                            <div className={styles.inputWrapper}>
                                <label>Password*</label>
                                <input
                                    type="password"
                                    name="pass"
                                    value={formData.pass}
                                    onChange={handleChange}
                                    className={`${styles.input} ${errors['pass'] ? styles.error : ''}`}
                                />
                                {errors['pass'] && <span className={styles.errorMessage}>{errors['pass']}</span>}
                            </div>
                            
                            <div className={styles.inputWrapper}>
                                <label>Confirm Password*</label>
                                <input
                                    type="password"
                                    name="repass"
                                    value={formData.repass}
                                    onChange={handleChange}
                                    className={`${styles.input} ${errors['repass'] ? styles.error : ''}`}
                                />
                                {errors['repass'] && <span className={styles.errorMessage}>{errors['repass']}</span>}
                            </div>
                        </div>
                    </div>

                    {/* Role Selection */}
                    <div className={styles.formGroup}>
                        <div className={styles.inputWrapper}>
                            <label>Role*</label>
                            <select
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                className={`${styles.select} ${errors['role'] ? styles.error : ''}`}
                            >
                                <option value="">Select a role</option>
                                <option value="pet_owner">Pet Owner</option>
                                <option value="vet">Veterinarian</option>
                                <option value="visitor">Visitor</option>
                                <option value="admin">Admin</option>
                            </select>
                            {errors['role'] && <span className={styles.errorMessage}>{errors['role']}</span>}
                        </div>
                    </div>

                    {/* Address Information */}
                    <div className={styles.formGroup}>
                        <h3 className={styles.sectionTitle}>Address Information</h3>
                        <div className={styles.addressGrid}>
                            <div className={styles.inputWrapper}>
                                <label>Pincode*</label>
                                <input
                                    type="text"
                                    name="address.pincode"
                                    value={formData.address.pincode}
                                    onChange={handleChange}
                                    className={`${styles.input} ${errors['address.pincode'] ? styles.error : ''}`}
                                />
                                {errors['address.pincode'] && <span className={styles.errorMessage}>{errors['address.pincode']}</span>}
                            </div>
                            
                            <div className={styles.inputWrapper}>
                                <label>House Number*</label>
                                <input
                                    type="text"
                                    name="address.houseNo"
                                    value={formData.address.houseNo}
                                    onChange={handleChange}
                                    className={`${styles.input} ${errors['address.houseNo'] ? styles.error : ''}`}
                                />
                                {errors['address.houseNo'] && <span className={styles.errorMessage}>{errors['address.houseNo']}</span>}
                            </div>
                            
                            <div className={styles.inputWrapper}>
                                <label>Street Name*</label>
                                <input
                                    type="text"
                                    name="address.street_name"
                                    value={formData.address.street_name}
                                    onChange={handleChange}
                                    className={`${styles.input} ${errors['address.street_name'] ? styles.error : ''}`}
                                />
                                {errors['address.street_name'] && <span className={styles.errorMessage}>{errors['address.street_name']}</span>}
                            </div>
                            
                            <div className={styles.inputWrapper}>
                                <label>District</label>
                                <input
                                    type="text"
                                    name="address.district"
                                    value={formData.address.district}
                                    onChange={handleChange}
                                    className={styles.input}
                                />
                            </div>
                            
                            <div className={styles.inputWrapper}>
                                <label>City*</label>
                                <input
                                    type="text"
                                    name="address.city"
                                    value={formData.address.city}
                                    onChange={handleChange}
                                    className={`${styles.input} ${errors['address.city'] ? styles.error : ''}`}
                                />
                                {errors['address.city'] && <span className={styles.errorMessage}>{errors['address.city']}</span>}
                            </div>
                            
                            <div className={styles.inputWrapper}>
                                <label>State*</label>
                                <input
                                    type="text"
                                    name="address.state"
                                    value={formData.address.state}
                                    onChange={handleChange}
                                    className={`${styles.input} ${errors['address.state'] ? styles.error : ''}`}
                                />
                                {errors['address.state'] && <span className={styles.errorMessage}>{errors['address.state']}</span>}
                            </div>
                            
                            <div className={styles.inputWrapper}>
                                <label>Country*</label>
                                <input
                                    type="text"
                                    name="address.country"
                                    value={formData.address.country}
                                    onChange={handleChange}
                                    className={`${styles.input} ${errors['address.country'] ? styles.error : ''}`}
                                />
                                {errors['address.country'] && <span className={styles.errorMessage}>{errors['address.country']}</span>}
                            </div>
                        </div>
                    </div>

                    <button type="submit" className={styles.submitButton}>Create Account</button>
                </form>
            </div>
        </div>
    );
};

export default SignupForm;