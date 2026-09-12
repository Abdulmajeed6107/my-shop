import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const CATEGORIES = ["Uncategorized", "Dupattas", "Stoller", "Scarf", "Suit", "Women", "Men", "Children"]; // adjust as needed

const UpdateProduct = () => {

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [sku, setSku] = useState("");
    const [category, setCategory] = useState("Uncategorized");
    const [season, setSeason] = useState("summer");
    const [image, setImage] = useState(null);
    const [oldImage, setOldImage] = useState("");
    const { id } = useParams();
    console.log("PARAM ID:", id);

    const navigate = useNavigate();

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products/${id}`);

                console.log("STATUS:", response.status);
                console.log("CONTENT TYPE:", response.headers.get("content-type"));

                const data = await response.json();
                console.log("API DATA:", data);

                if (data.status === false) {
                    console.log(data.message);
                    return;
                }

                setName(data.product.name || "");
                setPrice(data.product.price || "");
                setDescription(data.product.description || "");
                setSku(data.product.sku || "");
                setCategory(data.product.category || "Uncategorized");
                setSeason(data.product.season || "summer");
                setOldImage(data.product.image || "");
            } catch (e) {
                console.log("error fetching product", e)
            }
        }
        getData();

    }, [id]
    );

    const updateProduct = async () => {

        const formData = new FormData();

        formData.append("name", name);
        formData.append("price", price);
        formData.append("description", description);
        formData.append("sku", sku);
        formData.append("category", category);
        formData.append("season", season);
        // only send image if user selected new one
        if (image) {
            formData.append("image", image);
        }

        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/products/${id}`,
            {
                method: "PUT",
                body: formData,

            }
        );


        const data = await response.json();

        console.log(data);
        navigate('/products');
    }



    return (
        <div className="d-flex flex-column p-5">
            <h1 className="mb-3">Update product</h1>
            <input
                type="text"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                value={name}
            />


            <input
                type="number"
                placeholder="Price"
                onChange={(e) => setPrice(e.target.value)}
                value={price}

            />


            <textarea
                type="text"
                placeholder="Description"
                onChange={(e) => setDescription(e.target.value)}
                value={description}

            />


            <input
                type="text"
                placeholder="SKU"
                onChange={(e) => setSku(e.target.value)}
                value={sku}

            />

            <label className="fw-semibold mt-2">Category</label>
            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            >
                {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                        {cat}
                    </option>
                ))}
            </select>

            <label className="fw-semibold mt-2">Collection / Season</label>
            <select
                value={season}
                onChange={(e) => setSeason(e.target.value)}
            >
                <option value="summer">Summer Collection</option>
                <option value="winter">Winter Collection</option>
                <option value="all">All Seasons</option>
            </select>

            {
                oldImage &&
                <img
                    src={oldImage || "/placeholder.png"}
                    width="100"
                />
            }

            <input
                type="file"
                placeholder="Image"
                onChange={(e) => setImage(e.target.files[0])}
            // value={image}

            />


            <button onClick={updateProduct}>
                Update Product
            </button>

        </div>
    )
}


export default UpdateProduct;