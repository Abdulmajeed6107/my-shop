import React from 'react';
import About from './AboutUs';
import './BootomPage.css';
import CategoryBootom from './Categories';
import Information from './Information';
import ContactUs from './ContactUs';

const BootomPage = () => {

    return (
        <div className="container-fluid mt-5 bg-light rounded">
            <div className="row g-4">
                <div className="col-12 col-sm-6 col-md-6 col-lg-3  text-center">
                    <div className="container mt-4 card mt-5" style={{border: "none" }}>
                        <About />

                    </div>
                    
                </div>
                <div className="col-12 col-sm-6 col-md-6 col-lg-3 text-center text-white">
                    <div className="container card mt-5 bg-light" style={{border: "none" }}>
                        <CategoryBootom />

                    </div>

                </div>
                <div className="col-12 col-sm-6 col-md-6 col-lg-3 text-center text-white">
                    <div className="container card mt-3 bg-light" style={{border: "none" }}>
                        <Information />

                    </div>

                </div>
                <div className="col-12 col-sm-6 col-md-6 col-lg-3 text-center">
                    <div className="card mt-3 bg-light" style={{ border: "none" }}>
                        <ContactUs />

                    </div>

                </div>
            </div>

        </div>

    )
}
export default BootomPage