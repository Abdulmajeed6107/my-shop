import { Link } from "react-router-dom";

const Information = () => {
    return (
        <div className="bottom-page-content">
            <h3 className="bottom-page-title">Information</h3>
            <p className="bottom-page-text">
                Here you can find all the information about our company and services.
            </p>

            <ul className="bottom-page-list">
                <li>
                    <Link to="/locator">Store Locator</Link>
                </li>
                <li>
                    <Link to="/policies">Policies</Link>
                </li>
                <li>
                    <Link to="/contact">Contact Us</Link>
                </li>
            </ul>
        </div>
    );
};

export default Information;
