export default function Terms() {
  return (
    <div>
      <header style={{ background: '#FF0000', color: 'white', padding: '15px 25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: '26px', fontWeight: 'bold' }}>EFOS.in</div>
        <nav>
          <a href="/" style={{ color: 'white', marginLeft: '20px', textDecoration: 'none', fontSize: '16px' }}>Home</a>
          <a href="/programs" style={{ color: 'white', marginLeft: '20px', textDecoration: 'none', fontSize: '16px' }}>Programs</a>
        </nav>
      </header>

      <div style={{ maxWidth: '900px', margin: '40px auto', padding: '20px' }}>
        <div style={{ border: '3px solid #000000', background: '#FFE5E5', padding: '25px', borderRadius: '8px' }}>
          <h1 style={{ color: '#000000', textAlign: 'center' }}>Terms and Conditions</h1>

          <p>By signing up on the EFOS Skill Academy Website you are agreeing to be bound by the following terms and conditions ("Terms of Use").</p>

          <p>As the original purchaser of content sold on EFOS Skill Academy, you are entitled to access and use the content which is identified in the course and which is on the EFOS Skill Academy website, at skills.efos.in ("Website"). In order to access and use this content, you must register with EFOS Skill Academy and create a password.</p>

          <p>Your password is unique and exclusive to you, and you may not transfer your password to any other person...</p>

          <p>These Terms of Use constitute the entire agreement between you and EFOS Skill Academy concerning your use of the Website.</p>
        </div>
      </div>

      <footer style={{ background: '#FF0000', color: 'white', textAlign: 'center', padding: '20px', marginTop: '40px' }}>
        EFOS.in - Education Future One Stop © 2025<br />
        <a href="/privacy-policy" style={{ color: '#fff', margin: '0 10px', textDecoration: 'none' }}>Privacy Policy</a> |
        <a href="/terms" style={{ color: '#fff', margin: '0 10px', textDecoration: 'none' }}>Terms & Condition</a> |
        <a href="/contact" style={{ color: '#fff', margin: '0 10px', textDecoration: 'none' }}>Contact Us</a>
      </footer>
    </div>
  );
}