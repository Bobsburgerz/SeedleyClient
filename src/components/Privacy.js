import React from 'react';
import { Link } from 'react-router-dom';
const Privacy = ({ onClose }) => {
  return (
    <div className="pricing-container">
      <div
        style={{
          zIndex: '999999999',
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        className="modal-overlay"
      >
        <div
          style={{
            width: '450px',
            maxHeight: '80vh',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            overflowY: 'auto',
            padding: '20px',
            position: 'relative',
          }}
          className="modal-content"
        >
          <div
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              cursor: 'pointer',
              fontSize: '18px',
              borderRadius: '5px',
         
              border: '1px solid gray',
              padding: '3px',
              color: 'gray',

            }}
            onClick={onClose}
           
          >
          <Link to="/">Back</Link>   
          </div>
          <h2>Privacy Policy</h2>
          <p>
            <strong>Effective Date:</strong> 07/31/2024
          </p>
          <p>
            <strong>1. Introduction</strong>
            <br />
            Welcome to Seedley.net ("we," "our," "us"). This Privacy Policy explains how we collect, use, disclose, and protect your information when you use our AI phone calling service, which employs large language models (LLMs), text-to-speech (TTS), and speech-to-text (SST) technologies, as well as integrates with Google Calendar via OAuth2 for appointment scheduling. By using our service, you agree to the practices described in this policy.
          </p>
          <p>
            <strong>2. Information We Collect</strong>
            <br />
            <strong>2.1 Personal Data</strong>
            <br />
            When you use Seedley.net, we may collect the following types of personal data:
            <ul>
              <li><strong>Call Recordings:</strong> Audio recordings of phone calls made through our service.</li>
              <li><strong>Call Metadata:</strong> Information related to the calls, such as call duration, timestamps, and participants.</li>
              <li><strong>Google Calendar Data:</strong> Information accessed via OAuth2 integration, including appointment details, available times, and calendar events.</li>
            </ul>
            <strong>2.2 Usage Data</strong>
            <br />
            We collect information about your interactions with our service, including:
            <ul>
              <li><strong>Log Data:</strong> IP address, browser type, operating system, and usage details.</li>
              <li><strong>Device Information:</strong> Device type, operating system version, and unique device identifiers.</li>
            </ul>
          </p>
          <p>
            <strong>3. OAuth2 Integration</strong>
            <br />
            <strong>3.1 Google Calendar Integration</strong>
            <br />
            To facilitate appointment scheduling and view available times, Seedley.net integrates with Google Calendar using OAuth2. This allows our AI assistant to:
            <ul>
              <li><strong>Book Appointments:</strong> Schedule new appointments based on your preferences and availability.</li>
              <li><strong>View Available Times:</strong> Check calendar availability to suggest suitable times for meetings.</li>
            </ul>
            <strong>3.2 OAuth2 Tokens</strong>
            <br />
            <ul>
              <li><strong>Data Access:</strong> We collect and use OAuth2 access and refresh tokens provided by Google to authenticate and interact with your calendar.</li>
              <li><strong>Token Storage:</strong> Access and refresh tokens are securely stored and managed by us to maintain service functionality.</li>
            
              <li> Seedley's use and transfer to any other app of information received from Google APIs will adhere to <a href="https://developers.google.com/terms/api-services-user-data-policy#additional_requirements_for_specific_api_scopes">Google API Services User Data Policy</a> , including the Limited Use requirements.</li>
            </ul>
          </p>
          <p>
            <strong>4. How We Use Your Information</strong>
            <br />
            We use your information for the following purposes:
            <ul>
              <li><strong>Service Provision:</strong> To facilitate and manage AI-driven phone calls, including handling, processing, and storing call recordings and calendar data.</li>
              <li><strong>Appointment Scheduling:</strong> To use Google Calendar for booking and managing appointments as requested by you.</li>
              <li><strong>Improvement and Development:</strong> To enhance and improve the performance of our AI phone calling service.</li>
              <li><strong>Compliance and Security:</strong> To comply with legal obligations and ensure the security and integrity of our service.</li>
            </ul>
          </p>
          <p>
            <strong>5. Data Retention and Security</strong>
            <br />
            <strong>5.1 Data Retention</strong>
            <br />
            <ul>
              <li><strong>Call Recordings:</strong> Most calls are saved by us. We do not retain data beyond what is necessary for providing our services. We ensure that no third-party providers retain or have access to your call data.</li>
              <li><strong>Google Calendar Data:</strong> Calendar data accessed via OAuth2 is retained only as long as necessary to facilitate appointment scheduling and is deleted or anonymized as soon as it is no longer needed.</li>
            </ul>
            <strong>5.2 Security Measures</strong>
            <br />
            We implement robust technical and organizational measures to protect your personal data from unauthorized access, alteration, disclosure, or destruction. However, no method of electronic transmission or storage is entirely secure.
          </p>
          <p>
            <strong>6. Data Sharing and Disclosure</strong>
            <br />
            We do not share your personal data with third parties except in the following cases:
            <ul>
              <li><strong>With Your Consent:</strong> We may share data if you have provided explicit consent.</li>
              <li><strong>Service Providers:</strong> We use third-party services for technical support and infrastructure. These providers are contractually obligated to protect your data and may not retain it.</li>
              <li><strong>Legal Requirements:</strong> We may disclose your data if required by law or in response to valid requests by public authorities.</li>
            </ul>
          </p>
          <p>
            <strong>7. Your Rights</strong>
            <br />
            You have the following rights regarding your personal data:
            <ul>
              <li><strong>Access and Correction:</strong> You may request access to and correction of your personal data.</li>
              <li><strong>Data Deletion:</strong> You can request the deletion of your personal data, subject to legal and operational constraints.</li>
              <li><strong>Opt-Out:</strong> If you wish to opt out of call recording or data collection, or if you wish to revoke OAuth2 permissions, please contact us to discuss your options.</li>
            </ul>
          </p>
          <p>
            <strong>8. Changes to This Privacy Policy</strong>
            <br />
            We may update this Privacy Policy periodically. We will notify you of significant changes by posting the new policy on our service. Your continued use of our service after any changes constitutes your acceptance of the updated Privacy Policy.
          </p>
          <p>
            <strong>9. Contact Us</strong>
            <br />
            For questions or concerns about this Privacy Policy or our data practices, please contact us at:
            <ul>
              <li><strong>Email:</strong>info@seedley.net</li>
            </ul>
          </p>
          <p>
            <strong>10. Data Protection Officer</strong>
            <br />
            For additional information on data protection, you can contact our Data Protection Officer at:
            <ul>
              <li><strong>Email:</strong>info@seedley.met</li>
             
            </ul>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
