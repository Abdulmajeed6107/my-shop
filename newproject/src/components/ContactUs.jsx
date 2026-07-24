const ContactUs = () => {
    return (
        <div className="bottom-page-content">
            <h3 className="bottom-page-title">Get in Touch</h3>
            <p className="bottom-page-text">
                We are here to assist you. Reach out to us through any of the following channels:
            </p>

            <div className="bottom-page-contact-list">
                <div className="bottom-page-contact-item">
                    <div className="bottom-page-contact-icon">
                        <i className="bi bi-whatsapp"></i>
                    </div>
                    <div>
                        <p className="bottom-page-contact-label">WhatsApp</p>
                        <a href="https://wa.me/923143415032" target="_blank" rel="noopener noreferrer">
                            +92 314 3415032
                        </a>
                    </div>
                </div>

                <div className="bottom-page-contact-item">
                    <div className="bottom-page-contact-icon">
                        <i className="bi bi-envelope-fill"></i>
                    </div>
                    <div>
                        <p className="bottom-page-contact-label">Email</p>
                        <a href="mailto:majeedzr7741@gmail.com">
                            majeedzr7741@gmail.com
                        </a>
                    </div>
                </div>

                <div className="bottom-page-contact-item">
                    <div className="bottom-page-contact-icon">
                        <i className="bi bi-telephone-fill"></i>
                    </div>
                    <div>
                        <p className="bottom-page-contact-label">Phone</p>
                        <a href="tel:+923143415032">
                            +92 314 3415032
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;
