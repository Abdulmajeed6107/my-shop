import About from './AboutUs';
import './BootomPage.css';
import CategoryBootom from './Categories';
import Information from './Information';
import ContactUs from './ContactUs';

const BootomPage = () => {
    return (
        <section className="bottom-page-section">
            <div className="container-fluid bottom-page-wrapper px-3 px-md-4 px-lg-5">
                <div className="row g-3 g-lg-4">
                    <div className="col-12 col-md-6 col-lg-3">
                        <div className="bottom-page-card">
                            <About />
                        </div>
                    </div>

                    <div className="col-12 col-md-6 col-lg-3">
                        <div className="bottom-page-card">
                            <CategoryBootom />
                        </div>
                    </div>

                    <div className="col-12 col-md-6 col-lg-3">
                        <div className="bottom-page-card">
                            <Information />
                        </div>
                    </div>

                    <div className="col-12 col-md-6 col-lg-3">
                        <div className="bottom-page-card">
                            <ContactUs />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BootomPage;
