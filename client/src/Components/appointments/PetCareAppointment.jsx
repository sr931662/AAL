import React, { useState, useEffect } from "react";
import styles from "./PetCareAppointment.module.css";
import axios from "axios";

const PetCareAppointment = () => {
  const [petList, setPetList] = useState([]);
  const [selectedPet, setSelectedPet] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [careType, setCareType] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch pets for the logged-in user
  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await axios.get("/api/auth/pets", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming JWT token is stored in localStorage
          },
        });
        setPetList(response.data);
      } catch (error) {
        setMessage("Error fetching pets.");
      }
    };

    fetchPets();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "/api/auth/appointments",
        {
          petId: selectedPet,
          date: appointmentDate,
          time: appointmentTime,
          careType,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setMessage("Appointment booked successfully!");
      setLoading(false);
    } catch (error) {
      setMessage("Error booking appointment.");
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Book a Pet Care Appointment</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="pet">Select Pet</label>
          <select
            id="pet"
            value={selectedPet}
            onChange={(e) => setSelectedPet(e.target.value)}
            required
          >
            <option value="">Select a pet</option>
            {petList.map((pet) => (
              <option key={pet.pid} value={pet.pid}>
                {pet.pname}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="date">Appointment Date</label>
          <input
            type="date"
            id="date"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="time">Appointment Time</label>
          <input
            type="time"
            id="time"
            value={appointmentTime}
            onChange={(e) => setAppointmentTime(e.target.value)}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="careType">Care Type</label>
          <select
            id="careType"
            value={careType}
            onChange={(e) => setCareType(e.target.value)}
            required
          >
            <option value="">Select care type</option>
            <option value="General Care">General Care</option>
            <option value="Grooming">Grooming</option>
            <option value="Medical Care">Medical Care</option>
          </select>
        </div>

        <button type="submit" disabled={loading} className={styles.submitBtn}>
          {loading ? "Booking..." : "Book Appointment"}
        </button>
      </form>

      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
};

export default PetCareAppointment;
