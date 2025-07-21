import { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Form submitted!');
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
      <h1 style={{ color: '#2c3e50', textAlign: 'center' }}>Contact Us</h1>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: '400px', margin: '0 auto' }}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          style={{ padding: '10px', margin: '10px 0', border: '1px solid #ddd', borderRadius: '4px' }}
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          style={{ padding: '10px', margin: '10px 0', border: '1px solid #ddd', borderRadius: '4px' }}
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          style={{ padding: '10px', margin: '10px 0', border: '1px solid #ddd', borderRadius: '4px', minHeight: '100px' }}
        />
        <button type="submit" style={{ padding: '10px', backgroundColor: '#2c3e50', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Send Message</button>
      </form>
    </div>
  );
}

export default Contact;