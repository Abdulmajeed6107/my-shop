import MyNavbar from '../../components/Navbarcustom';
import TopHeader from '../../components/TopHeader';
import './Header.css';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';

export default function Header() {
    const navigate = useNavigate();

    return (
        <>
            <TopHeader />
            <MyNavbar />

            {/* Hero Banners Section */}
            <div className="container-fluid px-2 px-md-4 px-lg-5 my-4">
                <div className="row g-4">

                    {/* Big Banner Column */}
                    {/* <div className="col-lg-7 col-12"> */}
                    {/* <div className="hero-card position-relative h-75"> */}
                    {/* Background Image */}
                    {/* <img
                                src="./images/Bannar Big.png"
                                alt="Fabric and fashion banner"
                                className='float-end'
                            /> */}

                    {/* Overlay Text Content */}
                    {/* <div className="banner-overlay glass-content-card ps-4 ps-sm-5 pe-3 py-4">
                                <h1 className="main-banner-title mb-2 mb-md-3">
                                    Fabric & Fashion <br />
                                    House
                                </h1>

                                <div className="d-flex gap-4 mb-3">
                                    <span className="sale-text fs-5 fw-semibold d-none d-sm-inline">Sale up to</span>
                                    <span className="offcolor-badge sale-badge-container rounded">30% OFF</span>
                                </div> */}

                    {/* <p className="banner-description fs-6 mb-4 d-none d-md-block">
                                    Free shipping on all your orders.
                                </p>

                                <div>
                                    <button
                                        className="btn-shop-now-premium  btn btn-shop-now rounded-pill px-4 py-2 px-md-5 py-md-3 d-inline-flex align-items-center gap-2"
                                        onClick={() => navigate('/products')}
                                    >
                                        Shop Now
                                        <i className="bi bi-arrow-right fs-5"></i>
                                    </button> */}
                    {/* </div>
                            </div>
                        </div>
                    </div> */}
                    <div className="col-lg-7 col-12">
                        <div className="hero-card position-relative h-75">
                            {/* Background Image Layer */}
                            <div className="banner-image-wrapper">
                                <img
                                    src="./images/Bannar Big.png"
                                    alt="Fabric and fashion banner"
                                    className='float-end image-fade-target'
                                />
                            </div>

                            {/* Independent Structural Overlay Layer */}
                            <div className="banner-overlay">
                                {/* The actual styling container for text/buttons */}
                                <div className="glass-content-card ps-4 ps-sm-5 pe-3 py-4">
                                    <h1 className="main-banner-title mb-2 mb-md-3">
                                        Fabric & Fashion <br />
                                        House
                                    </h1>

                                    <div className="d-flex gap-4 mb-3">
                                        <span className="sale-text fs-5 fw-semibold d-none d-sm-inline">Sale up to</span>
                                        <span className="offcolor-badge sale-badge-container rounded">30% OFF</span>
                                    </div>

                                    <p className="banner-description fs-6 mb-4 d-none d-md-block">
                                        Free shipping on all your orders.
                                    </p>

                                    <div>
                                        <button
                                            className="btn-shop-now-premium btn btn-shop-now rounded-pill px-4 py-2 px-md-5 py-md-3 d-inline-flex align-items-center gap-2"
                                            onClick={() => navigate('/products')}
                                        >
                                            Shop Now
                                            <i className="bi bi-arrow-right fs-5"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* Small Promotional Banners Column */}
                    <div className="col-lg-4 col-12 d-flex flex-column gap-4">

                        {/* Summer Sale Card */}
                        <div className="hero-card position-relative flex-grow-1">
                            <img
                                src="./images/BG 1.jpg"
                                alt="Summer Sale Banner"
                                className="hero-card-img w-100 h-100"
                            />
                            <div className="promo-overlay-left-premium">
                                <span className="premium-label-orange mb-1">Summer Sale</span>
                                <h2 className="promo-title-main mb-1">75% OFF</h2>
                                <p className="promo-subtitle mb-3">Only Dupattas & Stolles</p>
                                <div>
                                    <button
                                        className="btn-shop-now-premium"
                                        onClick={() => navigate('/products')}
                                    >
                                        Shop Now
                                        <i className="bi bi-arrow-right"></i>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Best Deal Card */}
                        <div className="hero-card position-relative flex-grow-1">
                            <img
                                src="./images/BG 2.png"
                                alt="Best Deal Banner"
                                className="hero-card-img w-100 h-100"
                            />
                            <div className="promo-overlay-center-premium text-white">
                                <span className="promo-label-white text-uppercase fw-semibold mb-1 " style={{ fontSize: '11px', letterSpacing: '1.5px' }}>
                                    Best Deal
                                </span>
                                <h3 className="fw-bold mb-3 px-2" style={{ fontSize: '1.45rem', lineHeight: '1.25' }}>
                                    Special Products Deal of the Month
                                </h3>
                                <div>
                                    <button
                                        className="btn-shop-now-premium"
                                        onClick={() => navigate('/products')}
                                    >
                                        Shop Now
                                        <i className="bi bi-arrow-right"></i>
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
            <Footer />
        </>
    );
}