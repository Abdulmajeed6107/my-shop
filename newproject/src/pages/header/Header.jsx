import MyNavbar from '../../components/Navbarcustom';
import TopHeader from '../../components/TopHeader';
import './Header.css';
import Footer from '../../components/Footer';
import BootomPage from '../../components/BootomPage';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Header() {
    const navigate = useNavigate();
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [loadingProducts, setLoadingProducts] = useState(true);

    useEffect(() => {
        const fetchFeatured = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products?limit=8`);
                const data = await response.json();
                if (data && data.status) {
                    setFeaturedProducts(data.products || []);
                }
            } catch (err) {
                console.error("Error fetching featured products:", err);
            } finally {
                setLoadingProducts(false);
            }
        };
        fetchFeatured();
    }, []);

    return (
        <>
            <TopHeader />
            <MyNavbar />

            {/* Hero Banners Section */}
            <div className="container-fluid px-2 px-md-4 px-lg-5 my-4">
                <div className="row g-4">
                    <div className="col-lg-8 col-12">
                        <div className="hero-card main-hero-banner position-relative rounded-4 overflow-hidden">
                            {/* Background Image Layer */}
                            <div className="banner-image-wrapper h-100">
                                <img
                                    src="./images/Bannar Big.png"
                                    alt="Fabric and fashion banner"
                                    className='float-end image-fade-target w-100 h-100'
                                    style={{ objectFit: 'cover' }}
                                />
                            </div>

                            {/* Independent Structural Overlay Layer */}
                            <div className="banner-overlay">
                                {/* The actual styling container for text/buttons */}
                                <div className="glass-content-card ps-4 ps-sm-5 pe-3 py-4">
                                    <h1 className="main-banner-title mb-2 mb-md-3 text-dark">
                                        Fabric & Fashion <br />
                                        House
                                    </h1>

                                    <div className="d-flex gap-4 mb-3">
                                        <span className="sale-text fs-5 fw-semibold d-none d-sm-inline text-dark">Sale up to</span>
                                        <span className="offcolor-badge sale-badge-container rounded text-white px-2 py-1" style={{ backgroundColor: '#20b2aa' }}>30% OFF</span>
                                    </div>

                                    <p className="banner-description fs-6 mb-4 d-none d-md-block text-secondary">
                                        Free shipping orders minimum 4999 Rs.
                                    </p>

                                    <div>
                                        <button
                                            className="btn-shop-now-premium btn btn-shop-now rounded-pill px-4 py-2 px-md-5 py-md-3 d-inline-flex align-items-center gap-2"
                                            style={{ backgroundColor: '#20b2aa', color: 'white', border: 'none' }}
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
                        {/* Summer Sale Card - Dupatta focus */}
                        <div className="hero-card promo-card-summer position-relative rounded-4 overflow-hidden" style={{ cursor: 'pointer' }} onClick={() => navigate('/products?category=Dupattas')}>
                            <img
                                src="./images/BG 1.jpg"
                                alt="Summer Sale Banner"
                                className="hero-card-img w-100 h-100"
                                style={{ objectFit: 'cover' }}
                            />
                            <div className="promo-overlay-left-premium position-absolute top-50 translate-middle-y ps-4 text-white z-1">
                                <span className="premium-label-orange mb-1 badge bg-warning px-2 py-1 text-dark">Summer Sale</span>
                                <h2 className="promo-title-main mb-1 fw-bold fs-2 text-white">75% OFF</h2>
                                <p className="promo-subtitle mb-3 text-white-50">Only Dupattas & Stollers</p>
                                <div>
                                    <button
                                        className="btn-shop-now-premium btn btn-sm rounded-pill text-white px-3 py-2"
                                        style={{ backgroundColor: '#20b2aa', border: 'none' }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            navigate('/products?category=Dupattas');
                                        }}
                                    >
                                        Shop Dupattas
                                        <i className="bi bi-arrow-right ms-1"></i>
                                    </button>
                                </div>
                            </div>
                            <div className="overlay-dark"></div>
                        </div>

                        {/* Best Deal Card */}
                        <div className="hero-card promo-card-deal position-relative rounded-4 overflow-hidden" style={{ cursor: 'pointer' }} onClick={() => navigate('/products?season=summer&category=Suit')}>
                            <img
                                src="./images/BG 2.png"
                                alt="Best Deal Banner"
                                className="hero-card-img w-100 h-100"
                                style={{ objectFit: 'cover' }}
                            />
                            <div className="promo-overlay-center-premium text-white position-absolute top-50 start-50 translate-middle text-center w-100 px-3 z-1">
                                <span className="promo-label-white text-uppercase fw-semibold mb-1 d-block" style={{ fontSize: '11px', letterSpacing: '1.5px' }}>
                                    Best Deal
                                </span>
                                <h3 className="fw-bold mb-3 px-2 text-white" style={{ fontSize: '1.3rem', lineHeight: '1.25' }}>
                                    Lawn Suit Collection of the Month
                                </h3>
                                <div>
                                    <button
                                        className="btn-shop-now-premium btn btn-sm rounded-pill text-dark px-3 py-2 bg-white fw-semibold"
                                        style={{ border: 'none' }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            navigate('/products?season=summer&category=Suit');
                                        }}
                                    >
                                        Shop Suits
                                        <i className="bi bi-arrow-right ms-1"></i>
                                    </button>
                                </div>
                            </div>
                            <div className="overlay-dark"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Shop by Category Section */}
            <div className="container-fluid px-2 px-md-4 px-lg-5 my-5">
                <div className="d-flex align-items-center mb-4">
                    <h2 className="section-title fw-bold position-relative pb-2 mb-0">Shop by Category</h2>
                    <div className="flex-grow-1 border-bottom ms-4 text-muted opacity-25"></div>
                </div>
                <div className="row g-4">
                    <div className="col-6 col-md-3">
                        <div className="category-card shadow-sm border-0 rounded-3 overflow-hidden position-relative" onClick={() => navigate('/products?category=Dupattas')} style={{ height: '220px', cursor: 'pointer' }}>
                            <img src="./images/BG 1.jpg" alt="Dupattas" className="category-card-img w-100 h-100" style={{ objectFit: 'cover', transition: 'transform 0.5s' }} />
                            <div className="category-overlay position-absolute bottom-0 start-0 w-100 p-3 text-white d-flex flex-column justify-content-end bg-gradient-dark">
                                <h4 className="fw-bold mb-0 fs-5 text-white">Dupattas</h4>
                                <span className="small-link text-uppercase text-teal-accent fw-bold mt-1" style={{ fontSize: '0.8rem', color: '#20b2aa' }}>
                                    Shop Now <i className="bi bi-arrow-right"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="col-6 col-md-3">
                        <div className="category-card shadow-sm border-0 rounded-3 overflow-hidden position-relative" onClick={() => navigate('/products?category=Suit')} style={{ height: '220px', cursor: 'pointer' }}>
                            <img src="./images/Bannar Big.png" alt="Suits" className="category-card-img w-100 h-100" style={{ objectFit: 'cover', transition: 'transform 0.5s' }} />
                            <div className="category-overlay position-absolute bottom-0 start-0 w-100 p-3 text-white d-flex flex-column justify-content-end bg-gradient-dark">
                                <h4 className="fw-bold mb-0 fs-5 text-white">Premium Suits</h4>
                                <span className="small-link text-uppercase text-teal-accent fw-bold mt-1" style={{ fontSize: '0.8rem', color: '#20b2aa' }}>
                                    Shop Now <i className="bi bi-arrow-right"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="col-6 col-md-3">
                        <div className="category-card shadow-sm border-0 rounded-3 overflow-hidden position-relative" onClick={() => navigate('/products?season=summer')} style={{ height: '220px', cursor: 'pointer' }}>
                            <img src="./images/BG 2.jpg" alt="Summer Collection" className="category-card-img w-100 h-100" style={{ objectFit: 'cover', transition: 'transform 0.5s' }} />
                            <div className="category-overlay position-absolute bottom-0 start-0 w-100 p-3 text-white d-flex flex-column justify-content-end bg-gradient-dark">
                                <h4 className="fw-bold mb-0 fs-5 text-white">Summer Collection</h4>
                                <span className="small-link text-uppercase text-teal-accent fw-bold mt-1" style={{ fontSize: '0.8rem', color: '#20b2aa' }}>
                                    Shop Now <i className="bi bi-arrow-right"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="col-6 col-md-3">
                        <div className="category-card shadow-sm border-0 rounded-3 overflow-hidden position-relative" onClick={() => navigate('/products?season=winter')} style={{ height: '220px', cursor: 'pointer' }}>
                            <img src="./images/Bg4.jpeg" alt="Winter Collection" className="category-card-img w-100 h-100" style={{ objectFit: 'cover', transition: 'transform 0.5s' }} />
                            <div className="category-overlay position-absolute bottom-0 start-0 w-100 p-3 text-white d-flex flex-column justify-content-end bg-gradient-dark">
                                <h4 className="fw-bold mb-0 fs-5 text-white">Winter Collection</h4>
                                <span className="small-link text-uppercase text-teal-accent fw-bold mt-1" style={{ fontSize: '0.8rem', color: '#20b2aa' }}>
                                    Shop Now <i className="bi bi-arrow-right"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Featured Products Section */}
            <div className="container-fluid px-2 px-md-4 px-lg-5 my-5">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="d-flex align-items-center flex-grow-1">
                        <h2 className="section-title fw-bold position-relative pb-2 mb-0">Featured Products</h2>
                        <div className="flex-grow-1 border-bottom ms-4 me-4 text-muted opacity-25"></div>
                    </div>
                    <button className="btn btn-outline-dark rounded-pill px-4" onClick={() => navigate('/products')}>
                        View All
                    </button>
                </div>

                {loadingProducts ? (
                    <div className="d-flex justify-content-center my-5">
                        <div className="spinner-border text-teal" style={{ color: '#20b2aa' }} role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : (
                    <div className="row g-3 g-md-4">
                        {featuredProducts.map((product) => (
                            <div className="col-6 col-md-4 col-lg-3 mb-4" key={product.id}>
                                <div 
                                    className="card h-100 product-card shadow-sm border-0 position-relative rounded-3 overflow-hidden"
                                    onClick={() => navigate(`/product/productDetail/${product.id}`)}
                                    style={{ cursor: 'pointer', transition: 'all 0.3s' }}
                                >
                                    {product.category && product.category !== 'Uncategorized' && (
                                        <span className="badge position-absolute top-0 start-0 m-3 z-1 px-2 py-1 text-white" style={{ backgroundColor: '#20b2aa' }}>
                                            {product.category}
                                        </span>
                                    )}
                                    <div className="featured-image-wrapper p-3 bg-light rounded-top d-flex align-items-center justify-content-center" style={{ height: '200px' }}>
                                        <img 
                                            src={product.image || './placeholder.png'} 
                                            alt={product.name} 
                                            className="img-fluid featured-img"
                                            style={{ maxHeight: '100%', objectFit: 'contain', transition: 'transform 0.3s' }}
                                        />
                                    </div>
                                    <div className="card-body d-flex flex-column justify-content-between p-3">
                                        <div>
                                            <h5 className="card-title product-title fs-6 fw-semibold text-truncate mb-1">{product.name}</h5>
                                            <div className="text-warning small mb-2">
                                                {Array.from({ length: 5 }).map((_, i) => (
                                                    <i key={i} className={`bi ${i < Math.floor(product.rating || 5) ? 'bi-star-fill' : 'bi-star'}`}></i>
                                                ))}
                                                <span className="text-muted ms-1">({product.rating || 5})</span>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center mt-2 pt-2 border-top">
                                            <span className="product-price fw-bold text-dark">{product.price} Rs.</span>
                                            <button className="btn btn-sm btn-outline-teal rounded-circle d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px', borderColor: '#20b2aa', color: '#20b2aa' }}>
                                                <i className="bi bi-arrow-right"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Trust Badges / Store Features */}
            <div className="container-fluid px-2 px-md-4 px-lg-5 my-5 py-5 bg-light rounded-4">
                <div className="row text-center g-4">
                    <div className="col-6 col-lg-3">
                        <div className="benefit-item p-3">
                            <i className="bi bi-truck fs-1 mb-2 d-block" style={{ color: '#20b2aa' }}></i>
                            <h5 className="fw-bold fs-6 mb-1 text-dark">Free Shipping</h5>
                            <p className="text-muted small mb-0">On orders minimum 4999 Rs.</p>
                        </div>
                    </div>
                    <div className="col-6 col-lg-3">
                        <div className="benefit-item p-3">
                            <i className="bi bi-shield-check fs-1 mb-2 d-block" style={{ color: '#20b2aa' }}></i>
                            <h5 className="fw-bold fs-6 mb-1 text-dark">Secure Checkout</h5>
                            <p className="text-muted small mb-0">100% protected payments</p>
                        </div>
                    </div>
                    <div className="col-6 col-lg-3">
                        <div className="benefit-item p-3">
                            <i className="bi bi-arrow-counterclockwise fs-1 mb-2 d-block" style={{ color: '#20b2aa' }}></i>
                            <h5 className="fw-bold fs-6 mb-1 text-dark">Easy Returns</h5>
                            <p className="text-muted small mb-0">7 days easy exchange policy</p>
                        </div>
                    </div>
                    <div className="col-6 col-lg-3">
                        <div className="benefit-item p-3">
                            <i className="bi bi-headset fs-1 mb-2 d-block" style={{ color: '#20b2aa' }}></i>
                            <h5 className="fw-bold fs-6 mb-1 text-dark">Dedicated Support</h5>
                            <p className="text-muted small mb-0">Quick assistance anytime</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Newsletter Section */}
            <div className="container-fluid px-2 px-md-4 px-lg-5 my-5">
                <div className="newsletter-card text-center text-white p-5 rounded-4 position-relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
                    <div className="newsletter-content position-relative z-1">
                        <span className="text-uppercase tracking-wider small fw-bold" style={{ color: '#20b2aa', letterSpacing: '2px' }}>Newsletter</span>
                        <h2 className="fw-bold fs-1 mt-2 mb-3 text-white">Join The Club & Get Updates</h2>
                        <p className="lead fs-6 mb-4 mx-auto text-white-50" style={{ maxWidth: '600px' }}>
                            Subscribe to receive notifications about new collections, seasonal arrivals, and special promotions.
                        </p>
                        <div className="d-flex flex-column flex-sm-row justify-content-center align-items-center gap-2" style={{ maxWidth: '500px', margin: '0 auto' }}>
                            <input 
                                type="email" 
                                placeholder="Your Email Address" 
                                className="form-control rounded-pill px-4 py-3 border-0 bg-white text-dark shadow-sm w-100" 
                            />
                            <button className="btn rounded-pill px-5 py-3 text-nowrap fw-semibold shadow-sm w-100 w-sm-auto text-white" style={{ backgroundColor: '#20b2aa', border: 'none' }}>
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <BootomPage />
            <Footer />
        </>
    );
}