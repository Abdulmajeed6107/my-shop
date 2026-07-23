
const ContactUs = () => {
    return (
        <div className="mt-4 bg-light w-100">
            <h3 className="mb-4">Get in Touch</h3>
            <div className="d-flex flex-column align-items-start justify-content-start">
                <p className="">We are here to assist you. Reach out to us through any of the following channels:</p>
                <div className="d-flex flex-column align-items-start justify-content-start ms-4">
                    <div className="d-flex align-items-center mb-4 justify-content-center">
                        <div className="d-flex align-items-center justify-content-center me-3" style={{ width: "25px", height: "25px", minWidth: "25px" }}>
                            <i className="bi bi-whatsapp fs-4 ms-3 mt-4"></i>
                        </div>
                        <div className="text-break">
                            <p className="mb-0 text-muted small text-uppercase fw-bold">WhatsApp</p>
                            <a href="https://wa.me/923143415032" target="_blank" rel="noopener noreferrer" className="text-decoration-none fs-6" style={{ color: 'var(--text)' }}>
                                +92 314 3415032
                            </a>
                        </div>
                    </div>
                    <div className="d-flex align-items-center justify-content-center mb-4">
                        <div className="d-flex align-items-center justify-content-center me-3" style={{ width: "50px", height: "50px", minWidth: "50px" }}>
                            <i className="bi bi-envelope-fill fs-4 mt-4"></i>
                        </div>
                        <div className="text-break">
                            <p className="mb-0 text-muted small text-uppercase fw-bold d-flex">Email</p>
                            <a href="mailto:majeedzr7741@gmail.com" className="text-decoration-none fs-6" style={{ color: 'var(--text)' }}>
                                majeedzr7741@gmail.com
                            </a>
                        </div>
                    </div>

                    <div className="d-flex align-items-center justify-content-center mb-4">
                        <div className="d-flex align-items-center justify-content-center me-3" style={{ width: "50px", height: "50px", minWidth: "50px" }}>
                            <i className="bi bi-telephone-fill fs-4 mt-4"></i>
                        </div>
                        <div className="text-break">
                            <p className="mb-0 text-muted small text-uppercase fw-bold d-flex">Phone</p>
                            <a href="tel:+923143415032" className="text-decoration-none fs-6" style={{ color: 'var(--text)' }}>
                                +92 314 3415032
                            </a>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}
export default ContactUs;