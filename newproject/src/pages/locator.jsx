import MyNavbar from "../components/Navbarcustom";
import TopHeader from "../components/TopHeader";

const Locator = () => {
    return (
        <div>
            <TopHeader />
            <MyNavbar />
            <button className="btn btn-outline-dark ms-3" onClick={() => window.history.back()}>←Back</button>
            <div className="card mt-4 p-4 m-4">
                <h1 className="mb-3">Township Lahore</h1>
                <p>📍 <span className="fw-bold">Address</span>: Bhatti Cloth House, Plot 246, Sector B-1 Block 12 Sector B 1 Lahore,
                    54770, Pakistan B1, Block 12 Sector B 1 Lahore, 54770</p>
                <p>📞 <span className="fw-bold">Contact</span>: 0314-3415032</p>
                <p>📩 <span className="fw-bold">Email</span>: majeedzr7741@gmail.com</p>
                <a href="https://share.google/DUgLAr3UPemSxzcYL">Shop Location</a>
            </div>
        </div>
    )
}
export default Locator;