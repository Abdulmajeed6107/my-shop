import { useState } from "react";
import TopHeader from "../components/TopHeader";
import { useNavigate } from "react-router-dom";
import MyNavbar from "./Navbarcustom";

export default function FavoritesPage() {

    const [favorites, setFavorites] = useState(
        JSON.parse(localStorage.getItem("favorites")) || []
    );
    // const baseUrl = "http://localhost:3000";
    const navigate = useNavigate();
    

    const removeFromFavorites = (id) => {
        const updated = favorites.filter(f => f.id !== id);
        localStorage.setItem("favorites", JSON.stringify(updated));
        setFavorites(updated);
        window.dispatchEvent(new Event("favoritesUpdated"));
    };

    return (
        <>
            <TopHeader />
            <MyNavbar />
            <div className="container mt-5">
                <h2>My Favorites</h2>
                {favorites.length === 0 ? (
                    <p>No favorites yet!</p>
                ) : (
                    <div className="row g-4">
                        {favorites.map(item => (
                            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={item.id}>
                                <div className="card h-100 shadow-sm">
                                    <img src={item.image} className="card-img-top" alt={item.name} />
                                    <div className="card-body">
                                        <h5>{item.name}</h5>
                                        <p className="text-success fw-bold">${item.price}</p>
                                        <button className="btn btn-primary btn-sm me-2"
                                            onClick={() => navigate('/product/productDetail/' + item.id)}>
                                            View
                                        </button>
                                        <button className="btn btn-outline-danger btn-sm"
                                            onClick={() => removeFromFavorites(item.id)}>
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}