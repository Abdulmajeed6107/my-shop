import emailjs from "@emailjs/browser";
import { useRef } from "react";
import { useState } from "react";
import MyNavbar from "../../components/Navbarcustom";
import TopHeader from "../../components/TopHeader";
import Footer from "../../components/Footer";

function Contact() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    // Initializes EmailJS with your Vite public key environment variable
    emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
          reply_to: formData.email, // Send this so you can use {{reply_to}} in the template
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          alert("Message sent successfully!");
          setFormData({ name: "", email: "", message: "" }); // Reset state
          form.current.reset(); // Clears your inputs automatically
        },
        (error) => {
          alert("Failed to send message. Please try again.");
          console.error("EmailJS Error:", error);
        }
      );
  };


  return (
    <div>
      <TopHeader />
      <MyNavbar />
      <button onClick={() => window.history.back()} className="btn btn-outline-dark mb-3 ms-3">
        ← Back
      </button>
    <form ref={form} onSubmit={sendEmail} className="container mt-5 p-4 border rounded mb-5" style={{ maxWidth: "600px" }}>
      <h2 className="mb-4 text-center">Contact Us</h2>
      <hr className=""/>
      <div>
        <label className="mb-2 fs-3">Name</label>
        <input className="form-control" type="text" name="name" placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required />
      </div>

      <div>
        <label className="mb-2 fs-3">Email</label>
        <input className="form-control" type="email" name="email" placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required />
      </div>

      <div>
        <label className="mb-2 fs-3">Message</label>
        <textarea className="form-control" name="message" placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          required ></textarea>
      </div>

      <button type="submit" className="btn btn-primary w-100 mt-3">
        Send Message
      </button>
    </form>
    <Footer />
    </div>
    
  );
}

export default Contact;
