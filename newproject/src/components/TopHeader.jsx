import React from 'react';
import { Link } from 'react-router-dom';
import './TopHeader.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';



const TopHeader = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [search, setSearch] = useState("");

    const [favorites, setFavorites] = useState(
        JSON.parse(localStorage.getItem("favorites")) || []
    );

    useEffect(() => {
        const syncFavorites = () => {
            setFavorites(JSON.parse(localStorage.getItem("favorites")) || []);
        };

        window.addEventListener("favoriteUpdated", syncFavorites);
        return () => window.removeEventListener("favoritesUpdated", syncFavorites)
    }, []);

    const handleSearch = () => {
        navigate(`/products?search=${search}`);
    }

    const [cartItems, setCartItems] = useState(
        JSON.parse(localStorage.getItem("cartItems")) || []
    );

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // Fix 2: Listen for localStorage cart changes across the app
    useEffect(() => {
        const syncCart = () => {
            setCartItems(JSON.parse(localStorage.getItem("cartItems")) || []);
        };

        window.addEventListener("storage", syncCart);
        window.addEventListener("cartUpdated", syncCart); // custom event

        return () => {
            window.removeEventListener("storage", syncCart);
            window.removeEventListener("cartUpdated", syncCart);
        };
    }, []);

    const userName = user ? user.username : "Guest";

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);
        navigate('/login');
    };


    return (
        <div className="top-header-container py-3 px-2 px-md-4 px-lg-5 border-bottom bg-white w-100">
            <div className="d-flex flex-wrap flex-md-nowrap justify-content-between align-items-center gap-3">

                {/* Logo - order 1 on all screen sizes */}
                <div className="logo-section order-1">
                    <Link to="/" className="d-block">
                        <img
                            src="/images/Logo.png"
                            alt="logo"
                            className="logo-img rounded-5"
                        />
                    </Link>
                </div>

                {/* Search Bar - order 3 on mobile/tablet (wraps to next line), order 2 on desktop */}
                <div className="search-section order-3 order-md-2 flex-grow-1">
                    <div className="search-wrapper w-100">
                        <input
                            type="text"
                            placeholder="Search..."
                            className="search-input w-100 rounded-start-2 ps-5"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyDown={(e)=> e.key === "Enter" && handleSearch()}
                        />
                        <i className="bi bi-search search-icon-left"></i>
                        <button className="btn3 search-btn rounded-end-2 px-3" onClick={handleSearch}>
                            Search
                        </button>
                    </div>
                </div>

                {/* User/Cart Actions - order 2 on all screen sizes */}
                <div className="actions-section order-2 order-md-3 d-flex align-items-center gap-2 gap-sm-3 gap-lg-4">

                    {/* User Profile */}
                    <div className="d-flex gap-2 align-items-center justify-content-center">
                        <i className="bi bi-person fs-4"></i>
                        <p className="mb-0 user-name-text" >{userName}</p>
                        <select
                            className="profiedropdown"
                            name="profile"
                            id="profile"
                            onChange={(e) => {
                                if (e.target.value === "Logout") {
                                    handleLogout();
                                } else if (e.target.value === "Profile") {
                                    const user = JSON.parse(localStorage.getItem("user"));

                                    navigate('/profile', { state: { user } });
                                } 
                            }}
                        >
                            <option>Acount</option>
                            <option value="Profile">Profile</option>
                            <option value="Setting">Settings</option>
                            <option value="Logout">Logout</option>

                        </select>
                    </div>

                    {/* Favorites & Cart items */}
                    <div className="d-flex align-items-center gap-2 gap-sm-3">
                        <div className='position-relative' style={{cursor: 'pointer'}} onClick={()=> navigate('/favorite')} >
                            <i className="bi bi-heart fs-3 text-dark cursor-pointer"></i>
                            {
                                favorites.length > 0 && (
                                    <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'
                                      style={{fontSize: "10px", minWidth: "18px"}}
                                    >
                                        {favorites.length}
                                    </span>
                                )
                            }

                        </div>

                        <img
                            src="/images/Devider.png"
                            alt="devider"
                            className="d-none d-sm-inline-block devider-img"
                        />

                        <Link to="/cart" className="d-flex gap-2 gap-sm-3 align-items-center cursor-pointer text-decoration-none text-dark">
                            <div className="position-relative">

                                <i className="bi bi-bag fs-3"></i>

                                {/* Cart item count badge */}
                                {cartItems.length > 0 && (
                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                                        style={{ fontSize: "10px", minWidth: "18px" }}

                                    >
                                        {cartItems.length > 99 ? "99+" : cartItems.length}
                                    </span>
                                )}

                            </div>
                            <div className="d-none d-lg-flex flex-column text-start lh-sm">
                                <span className="cart-title">Shopping cart</span>
                                <span className="cart-price fw-semibold">
                                    ${cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0).toFixed(2)}

                                </span>
                            </div>
                        </Link>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default TopHeader;