import React from 'react';
import {Link} from 'react-router-dom'
const PricingPage = () => {
  const styles = `
    .pricing-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 50px;
    }

    .pricing-title {
      font-size: 24px;
      margin-bottom: 20px;
    }

    .plan {
      background-color: #f5f5f5;
      border-radius: 5px;
      padding: 20px;
      text-align: center;
      width: 300px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .plan-name {
      font-size: 20px;
      margin-bottom: 10px;
    }

    .plan-price {
      font-size: 24px;
      margin-bottom: 20px;
    }

    .get-started-button {
      background-color: #007bff;
      color: #fff;
      border: none;
      border-radius: 5px;
      padding: 10px 20px;
      font-size: 16px;
      cursor: pointer;
    }

    .get-started-button:hover {
      background-color: #0056b3;
    }

    .features {
      margin-top: 30px;
      text-align: left;
    }
    .tiny {
       font-size: 11px;
       color: gray
      }
    .feature-item {
      margin-bottom: 10px;
    }
  `;

  return (
    <div className="pricing-container">
      <h1 className="pricing-title">Try Seedley today</h1>
      <div className="plan">
        <h2 className="plan-name">AI automation solution</h2>
        <h1 className="">$99/month</h1>
        <p>Try it for free</p>
       
       <Link to="/signup"><button className="get-started-button">Get Started</button></Link> 
      </div>
      <div className="features">
        <h3>Features:</h3>
        <ul>
          <li className="feature-item">Job postings</li>
          <li className="feature-item">Post to Premium Job Boards</li>
          <li className="feature-item">Integrates with zoom</li>
          <li className="feature-item">Resume Parser</li>
          <li className="feature-item">Applicant Database</li>
          <li className="feature-item">Team Collaboration </li>
          <li className="feature-item">Email Automation </li>
        </ul>
      </div>
      <style>{styles}</style>
    </div>
  );
};

export default PricingPage;