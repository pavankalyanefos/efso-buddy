export default function Contact() {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', margin: 0, background: '#f7f7f7' }}>
      <header style={{ background: '#000', color: '#fff', padding: '20px', textAlign: 'center' }}>
        <h1>EFOS.in</h1>
        <p>Education Future One Stop</p>
      </header>

      <div style={{ width: '85%', margin: '30px auto', background: '#fff', padding: '30px', boxShadow: '0 0 10px #ddd', borderRadius: '8px' }}>
        <h1>Privacy Policy</h1>
        <p>EFOS Edumarketers Pvt. Ltd. ("we", "our", "EFOS Buddy") is committed to safeguarding your personal information. This Privacy Policy explains how we collect, use, and protect your data when you access our website, mobile app, and services.</p>

        <h2>1. Information We Collect</h2>
        <ul>
          <li>Name</li>
          <li>Email Address</li>
          <li>Mobile Number</li>
          <li>Messages / Queries</li>
          <li>Job application and education details (when applicable)</li>
        </ul>

        <h2>2. Automatically Collected Data</h2>
        <ul>
          <li>IP Address</li>
          <li>Device & Browser Information</li>
          <li>Usage Data</li>
          <li>Cookies & Tracking Data</li>
        </ul>

        <h2>3. How We Use Your Information</h2>
        <ul>
          <li>To provide and improve our services</li>
          <li>To respond to queries</li>
          <li>To process job applications</li>
          <li>To send updates and notifications</li>
          <li>To enhance security and user experience</li>
        </ul>

        <p><strong>We do not sell or rent your personal data to any third party.</strong></p>

        <h2>4. Data Security</h2>
        <p>We use strict security measures to protect your information from unauthorized access, alteration, or misuse.</p>

        <h2>5. Sharing of Information</h2>
        <p>We may share information only with:</p>
        <ul>
          <li>Verified employers (for job matching)</li>
          <li>Trusted service partners</li>
          <li>Government/legal authorities when required</li>
        </ul>

        <h2>6. Your Rights</h2>
        <ul>
          <li>Access your data</li>
          <li>Request corrections</li>
          <li>Ask for deletion</li>
          <li>Withdraw consent anytime</li>
        </ul>

        <h2>7. Third-Party Links</h2>
        <p>Our site may include links to social media or partner websites. We are not responsible for their content or privacy practices.</p>

        <h2>8. Updates to This Policy</h2>
        <p>We may update this Privacy Policy periodically. Changes will be posted on this page.</p>

        <h2>Contact Us</h2>
        <p><strong>EFOS Edumarketers Pvt. Ltd.</strong><br />
        Noida, Uttar Pradesh<br />
        Phone: +91-8744050874</p>

        <h2>Stay Connected</h2>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <span style={{ margin: '0 10px' }}><strong>Instagram:</strong> EFOS.in</span>
          <span style={{ margin: '0 10px' }}><strong>Facebook:</strong> EFOS.in</span>
          <span style={{ margin: '0 10px' }}><strong>Twitter:</strong> EFOS.in</span>
        </div>
      </div>

      <footer style={{ background: '#000', color: '#fff', padding: '20px', textAlign: 'center' }}>
        <p>© EFOS.in - Education Future One Stop 2025</p>
        <a href="#" style={{ color: '#fff', margin: '0 10px', textDecoration: 'none' }}>Privacy Policy</a> |
        <a href="#" style={{ color: '#fff', margin: '0 10px', textDecoration: 'none' }}>Terms of Use</a> |
        <a href="#" style={{ color: '#fff', margin: '0 10px', textDecoration: 'none' }}>Contact Us</a> |
        <a href="#" style={{ color: '#fff', margin: '0 10px', textDecoration: 'none' }}>Refund Policy</a>
      </footer>
    </div>
  );
}