import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegistrationForm.css';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    countryCode: '',
    phoneNumber: '',
    country: '',
    city: '',
    panNumber: '',
    aadharNumber: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Navigate to submission page with form data
    navigate('/submission-success', { state: { formData } });
  };

  return (
    <div className="registration-form">
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input 
            type="text" 
            id="firstName" 
            name="firstName" 
            value={formData.firstName}
            onChange={handleChange}
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input 
            type="text" 
            id="lastName" 
            name="lastName" 
            value={formData.lastName}
            onChange={handleChange}
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input 
            type="text" 
            id="username" 
            name="username" 
            value={formData.username}
            onChange={handleChange}
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">E-mail</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={formData.email}
            onChange={handleChange}
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            value={formData.password}
            onChange={handleChange}
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <div className="phone-input">
            <input 
              type="text" 
              id="countryCode" 
              name="countryCode" 
              placeholder="Code" 
              value={formData.countryCode}
              onChange={handleChange}
            />
            <input 
              type="tel" 
              id="phoneNumber" 
              name="phoneNumber" 
              placeholder="Number" 
              value={formData.phoneNumber}
              onChange={handleChange}
              required 
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="country">Country</label>
          <select 
            id="country" 
            name="country" 
            value={formData.country}
            onChange={handleChange}
            required
          >
            <option value="">Select Country</option>
            <option value="IN">India</option>
            <option value="US">United States</option>
            <option value="UK">United Kingdom</option>
            <option value="CA">Canada</option>
            <option value="AU">Australia</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="city">City</label>
          <select 
            id="city" 
            name="city" 
            value={formData.city}
            onChange={handleChange}
            required
          >
            <option value="">Select City</option>
            <option value="delhi">Delhi</option>
            <option value="mumbai">Mumbai</option>
            <option value="bangalore">Bangalore</option>
            <option value="chennai">Chennai</option>
            <option value="kolkata">Kolkata</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="panNumber">PAN Number</label>
          <input 
            type="text" 
            id="panNumber" 
            name="panNumber" 
            value={formData.panNumber}
            onChange={handleChange}
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="aadharNumber">Aadhar Number</label>
          <input 
            type="text" 
            id="aadharNumber" 
            name="aadharNumber" 
            value={formData.aadharNumber}
            onChange={handleChange}
            required 
          />
        </div>

        <button type="submit" className="submit-button">Register</button>
      </form>
    </div>
  );
};

export default RegistrationForm; 