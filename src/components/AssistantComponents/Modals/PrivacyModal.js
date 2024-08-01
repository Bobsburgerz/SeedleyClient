import React from 'react';

const PrivacyModal = ({ onClose }) => {
  return (
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
        alignItems: 'center'
      }}
      className="modal-overlay"
    >
      <div
        style={{
          width: '400px',
          maxHeight: '80vh',
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          overflowY: 'auto',
          padding: '20px',
          position: 'relative'
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
            fontWeight: 'bold',
            color: 'black'
          }}
          onClick={onClose}
          className="closer-btn-2"
        >
          x
        </div>
        <h2>Privacy Policy</h2>
        <p>
        Privacy Policy

Effective Date: [Insert Date]

1. Introduction

Welcome to Seedley.net ("we," "our," "us"). This Privacy Policy explains how we collect, use, disclose, and protect your information when you use our AI phone calling service, which employs large language models (LLMs), text-to-speech (TTS), and speech-to-text (SST) technologies, as well as integrates with Google Calendar via OAuth2 for appointment scheduling. By using our service, you agree to the practices described in this policy.

2. Information We Collect

2.1 Personal Data

When you use Seedley.net, we may collect the following types of personal data:

Call Recordings: Audio recordings of phone calls made through our service.
Call Metadata: Information related to the calls, such as call duration, timestamps, and participants.
Google Calendar Data: Information accessed via OAuth2 integration, including appointment details, available times, and calendar events.
2.2 Usage Data

We collect information about your interactions with our service, including:

Log Data: IP address, browser type, operating system, and usage details.
Device Information: Device type, operating system version, and unique device identifiers.
3. OAuth2 Integration

3.1 Google Calendar Integration

To facilitate appointment scheduling and view available times, Seedley.net integrates with Google Calendar using OAuth2. This allows our AI assistant to:

Book Appointments: Schedule new appointments based on your preferences and availability.
View Available Times: Check calendar availability to suggest suitable times for meetings.
3.2 OAuth2 Tokens

Data Access: We collect and use OAuth2 access and refresh tokens provided by Google to authenticate and interact with your calendar.
Token Storage: Access and refresh tokens are securely stored and managed by us to maintain service functionality.
4. How We Use Your Information

We use your information for the following purposes:

Service Provision: To facilitate and manage AI-driven phone calls, including handling, processing, and storing call recordings and calendar data.
Appointment Scheduling: To use Google Calendar for booking and managing appointments as requested by you.
Improvement and Development: To enhance and improve the performance of our AI phone calling service.
Compliance and Security: To comply with legal obligations and ensure the security and integrity of our service.
5. Data Retention and Security

5.1 Data Retention

Call Recordings: Most calls are saved by us. We do not retain data beyond what is necessary for providing our services. We ensure that no third-party providers retain or have access to your call data.
Google Calendar Data: Calendar data accessed via OAuth2 is retained only as long as necessary to facilitate appointment scheduling and is deleted or anonymized as soon as it is no longer needed.
5.2 Security Measures

We implement robust technical and organizational measures to protect your personal data from unauthorized access, alteration, disclosure, or destruction. However, no method of electronic transmission or storage is entirely secure.

6. Data Sharing and Disclosure

We do not share your personal data with third parties except in the following cases:

With Your Consent: We may share data if you have provided explicit consent.
Service Providers: We use third-party services for technical support and infrastructure. These providers are contractually obligated to protect your data and may not retain it.
Legal Requirements: We may disclose your data if required by law or in response to valid requests by public authorities.
7. Your Rights

You have the following rights regarding your personal data:

Access and Correction: You may request access to and correction of your personal data.
Data Deletion: You can request the deletion of your personal data, subject to legal and operational constraints.
Opt-Out: If you wish to opt out of call recording or data collection, or if you wish to revoke OAuth2 permissions, please contact us to discuss your options.
8. Changes to This Privacy Policy

We may update this Privacy Policy periodically. We will notify you of significant changes by posting the new policy on our service. Your continued use of our service after any changes constitutes your acceptance of the updated Privacy Policy.

9. Contact Us

For questions or concerns about this Privacy Policy or our data practices, please contact us at:

Email: [Your Contact Email]
Address: [Your Physical Address]
10. Data Protection Officer

For additional information on data protection, you can contact our Data Protection Officer at:

Email: [DPO Email]
Address: [DPO Address]

        </p>
        {/* Add more content or styling as needed */}
      </div>
    </div>
  );
};

export default PrivacyModal;
