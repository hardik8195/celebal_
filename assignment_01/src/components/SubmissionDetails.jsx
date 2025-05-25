import React from 'react';
import { useLocation } from 'react-router-dom';
import './SubmissionDetails.css';

const SubmissionDetails = () => {
  const location = useLocation();
  const { formData } = location.state || {};

  if (!formData) {
    return <div className="submission-details">No data available</div>;
  }

  return (
    <div className="submission-details">
      <h2>Registration Details</h2>
      
      <div className="details-container">
        <div className="detail-group">
          <h3>Personal Information</h3>
          <div className="detail-item">
            <span className="label">Full Name:</span>
            <span className="value">{formData.firstName} {formData.lastName}</span>
          </div>
          <div className="detail-item">
            <span className="label">Username:</span>
            <span className="value">{formData.username}</span>
          </div>
          <div className="detail-item">
            <span className="label">Email:</span>
            <span className="value">{formData.email}</span>
          </div>
        </div>

        <div className="detail-group">
          <h3>Contact Information</h3>
          <div className="detail-item">
            <span className="label">Phone Number:</span>
            <span className="value">+{formData.countryCode} {formData.phoneNumber}</span>
          </div>
          <div className="detail-item">
            <span className="label">Country:</span>
            <span className="value">{formData.country}</span>
          </div>
          <div className="detail-item">
            <span className="label">City:</span>
            <span className="value">{formData.city}</span>
          </div>
        </div>

        <div className="detail-group">
          <h3>Identity Information</h3>
          <div className="detail-item">
            <span className="label">PAN Number:</span>
            <span className="value">{formData.panNumber}</span>
          </div>
          <div className="detail-item">
            <span className="label">Aadhar Number:</span>
            <span className="value">{formData.aadharNumber}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmissionDetails; 