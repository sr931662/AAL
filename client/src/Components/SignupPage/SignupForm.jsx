import { React, useState } from "react";
import styles from "./SignupForm.module.css";
import { getImageUrl } from "../../utils";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../store/auth";

const URL = "http://localhost:3005/api/auth/sign-up";

const SignupForm = ({ isSun }) => {
  const [user, setUser] = useState({
    fname: "",
    mname: "",
    lname: "",
    phone: "",
    email: "",
    pass: "",
    repass: "",
    address: {
      pincode: "",
      houseNo: "",
      street_name: "",
      district: "",
      city: "",
      state: "",
      country: "",
    },
    role: "visitor", // Default role
  });

  const { storeTokenInLS } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("address.")) {
      const addressField = name.split(".")[1];
      setUser((prev) => ({
        ...prev,
        address: { ...prev.address, [addressField]: value },
      }));
    } else {
      setUser({ ...user, [name]: value });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(URL, user, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.status === 201) {
        const responseData = response.data;
        storeTokenInLS(responseData.token); // Store token if returned
        alert("Registration Successful");
        
        setUser({
          fname: "",
          mname: "",
          lname: "",
          phone: "",
          email: "",
          pass: "",
          repass: "",
          address: {
            pincode: "",
            houseNo: "",
            street_name: "",
            district: "",
            city: "",
            state: "",
            country: "",
          },
          role: "visitor",
        });
  
        console.log(responseData);
      } else {
        alert("Registration failed. Please check your details.");
      }
    } catch (err) {
      console.log("Error", err.message);
      alert(err.response?.data?.message || "An error occurred. Please try again.");
    }
  };

  const ninput_color = isSun ? styles.ninput_isSun : styles.ninput;
  const input_color = isSun ? styles.input_isSun : styles.input;

  return (
    <div className={styles.container}>
      <div className={isSun ? styles.cA_isSun : styles.cA}>
        <h3 className={isSun ? styles.login_header_isSun : styles.login_header}>
          Kindly, register here!
        </h3>
        <h2 className={isSun ? styles.login_motive_isSun : styles.login_motive}>
          A registered account can give more benefits
        </h2>

        <form method="POST" onSubmit={handleSubmit}>
          {/* Name Fields */}
          <div className={styles.name_section}>
            <input
              type="text"
              placeholder="First Name*"
              className={ninput_color}
              name="fname"
              value={user.fname}
              autoComplete="off"
              onChange={handleChange}
              required
            />

            <input
              type="text"
              placeholder="Middle Name"
              className={ninput_color}
              name="mname"
              autoComplete="off"
              value={user.mname}
              onChange={handleChange}
            />

            <input
              type="text"
              placeholder="Last Name*"
              className={ninput_color}
              name="lname"
              autoComplete="off"
              value={user.lname}
              onChange={handleChange}
              required
            />
          </div>

          {/* Contact Info */}
          <input
            type="text"
            name="phone"
            placeholder="Phone Number*"
            className={input_color}
            autoComplete="off"
            value={user.phone}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            placeholder="Enter email*"
            name="email"
            className={input_color}
            autoComplete="off"
            value={user.email}
            onChange={handleChange}
            required
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Enter password*"
            className={input_color}
            name="pass"
            value={user.pass}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            placeholder="Re-enter password*"
            className={input_color}
            name="repass"
            value={user.repass}
            onChange={handleChange}
            required
          />

          {/* Address */}
          <input
            type="text"
            placeholder="Pincode*"
            className={input_color}
            name="address.pincode"
            value={user.address.pincode}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            placeholder="House No*"
            className={input_color}
            name="address.houseNo"
            value={user.address.houseNo}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            placeholder="Street Name*"
            className={input_color}
            name="address.street_name"
            value={user.address.street_name}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            placeholder="District"
            className={input_color}
            name="address.district"
            value={user.address.district}
            onChange={handleChange}
          />

          <input
            type="text"
            placeholder="City*"
            className={input_color}
            name="address.city"
            value={user.address.city}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            placeholder="State*"
            className={input_color}
            name="address.state"
            value={user.address.state}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            placeholder="Country*"
            className={input_color}
            name="address.country"
            value={user.address.country}
            onChange={handleChange}
            required
          />

          {/* Role Selection */}
          <select
            name="role"
            className={input_color}
            value={user.role}
            onChange={handleChange}
            required
          >
            <option value="pet_owner">Pet Owner</option>
            <option value="vet">Veterinarian</option>
            <option value="visitor">Visitor</option>
            <option value="admin">Admin</option>
          </select>

          {/* Agreement */}
          <p className={isSun ? styles.p_isSun : styles.p}>
            <input type="checkbox" name="agreement" className={styles.check} required /> By clicking this checkbox, you
            agree with our{" "}
            <a href="#" className={isSun ? styles.terms_isSun : styles.terms}>
              Terms and Conditions
            </a>
          </p>

          {/* Submit and Login Links */}
          <div className={styles.name_section}>
            <button type="submit" className={styles.login_btn}>
              Submit
            </button>
            <Link to="/login" className={styles.login_btn}>
              Login
            </Link>
          </div>
        </form>
      </div>
      <div className={styles.cB}>
        <img src={getImageUrl("register-hero.png")} alt="" className={styles.register_img} />
      </div>
    </div>
  );
};

export default SignupForm;
