import { Link } from 'react-router-dom';
import './Navbarcustom.css';

const MyNavbar = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-dark mt-4 mb-4 sticky-top shadow-sm">
            <div className="container-fluid">
                <Link className="navbar-brand text-light" to="/"></Link>
                <button className="navbar-toggler custom-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav d-flex align-items-center gap-3 w-100">
                        <Link className="nav-link text-white" to="/">Home</Link>
                        <Link className="nav-link text-white" to="/products">Shop</Link>
                        
                        {/* Summer Dropdown */}
                        <div className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle text-white" to="/products?season=summer" id="summerDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Summer Collection
                            </Link>
                            <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="summerDropdown">
                                <li><Link className="dropdown-item" to="/products?season=summer">All Summer</Link></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><Link className="dropdown-item" to="/products?season=summer&category=Suit">Summer Suits</Link></li>
                                <li><Link className="dropdown-item" to="/products?season=summer&category=Dupattas">Dupattas</Link></li>
                                <li><Link className="dropdown-item" to="/products?season=summer&category=Stoller">Stollers</Link></li>
                                <li><Link className="dropdown-item" to="/products?season=summer&category=Scarf">Scarves</Link></li>
                            </ul>
                        </div>

                        {/* Winter Dropdown */}
                        <div className="nav-item dropdown">
                            <Link className="nav-link dropdown-toggle text-white" to="/products?season=winter" id="winterDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Winter Collection
                            </Link>
                            <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="winterDropdown">
                                <li><Link className="dropdown-item" to="/products?season=winter">All Winter</Link></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><Link className="dropdown-item" to="/products?season=winter&category=Suit">Winter Suits</Link></li>
                                <li><Link className="dropdown-item" to="/products?season=winter&category=Dupattas">Dupattas</Link></li>
                                <li><Link className="dropdown-item" to="/products?season=winter&category=Stoller">Stollers</Link></li>
                                <li><Link className="dropdown-item" to="/products?season=winter&category=Scarf">Scarves</Link></li>
                            </ul>
                        </div>

                        <Link className='nav-link text-white' to="/my-orders">My Orders</Link>
                        <Link className="nav-link text-white" to="/about">About Us</Link>
                        <Link className="nav-link text-white" to="/contact">Contact Us</Link>
                    </div>
                    <div className='d-flex align-items-center flex-nowrap'>
                        <i className="bi bi-telephone-plus text-white"></i>
                        <a href="tel:+923143415032" className='nav-link px-4 text-white text-nowrap'>(+92) 314-3415032</a>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default MyNavbar;