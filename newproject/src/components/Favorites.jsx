import { useState } from "react";
import TopHeader from "../components/TopHeader";
import { useNavigate } from "react-router-dom";
import MyNavbar from "./Navbarcustom";
import '../components/favorites.css';

export default function FavoritesPage() {

    const [favorites, setFavorites] = useState(
        JSON.parse(localStorage.getItem("favorites")) || []
    );
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

            <div className="container py-4">
                <h2 className="mb-4 text-center text-md-start">My Favorites</h2>

                {favorites.length === 0 ? (
                    <p className="text-center">No favorites yet!</p>
                ) : (
                    <div className="row g-3">
                        {favorites.map((item) => (
                            <div className="col-6 col-md-4 col-lg-3" key={item.id}>
                                <div className="card h-100 shadow-sm favorite-card">
                                    <img
                                        src={item.image}
                                        className="card-img-top favorite-img"
                                        alt={item.name}
                                    />

                                    <div className="card-body d-flex flex-column">
                                        <h6 className="card-title mb-2">{item.name}</h6>

                                        <p className="text-success fw-bold mb-3">
                                            ${item.price}
                                        </p>

                                        <div className="mt-auto d-grid gap-2">
                                            <button
                                                className="btn btn-primary btn-sm"
                                                onClick={() =>
                                                    navigate("/product/productDetail/" + item.id)
                                                }
                                            >
                                                View
                                            </button>

                                            <button
                                                className="btn btn-outline-danger btn-sm"
                                                onClick={() => removeFromFavorites(item.id)}
                                            >
                                                Remove
                                            </button>
                                        </div>
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