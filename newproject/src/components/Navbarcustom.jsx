import { Link } from 'react-router-dom';
import './Navbarcustom.css';

const MyNavbar = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-dark mt-4 mb-4 sticky-top">
            <div className="container-fluid">
                <Link className="navbar-brand text-light" to="/"></Link>
                <button className="navbar-toggler custom-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav d-flex navspace gap-3 w-100">
                        <Link className="nav-link text-white" to="/">Home</Link>
                        <Link className="nav-link text-white" to="/products">Shop</Link>
                        <Link className="nav-link text-white" to="/pages">Pages</Link>
                        <Link className="nav-link text-white" to="/blog">Blog</Link>
                        <Link className="nav-link text-white" to="/about">About Us</Link>
                        <Link className="nav-link text-white" to="/contact">Contact Us</Link>
                    </div>
                    <div className='d-flex align-items-center flex-nowrap'>
                        <i className="bi bi-telephone-plus text-white"></i>
                        <a href="tel:+923143415032" className='nav-link px-5 text-white text-nowrap'>(+92) 314-3415032</a>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default MyNavbar;