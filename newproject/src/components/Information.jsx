import { Link } from "react-router-dom";
import Contact from "../pages/contact/Contact";
// import ContactUs from "./ContactUs";

const Information = () => {

    return (
        <div className="container mt-4">
            <h3 className="mb-4">Information</h3>
            <p className="">Here you can find all the information about our company and services.</p>

            <ul>
                {/* <li className="FAQ"> <a href="#faq" className="" style={{ textDecoration: 'none', color: 'inherit' }}>Frequently Asked Questions</a></li> */}
                <li className="">
                    <Link to="/locator" className="" style={{ textDecoration: 'none', color: 'inherit' }}>
                        Store Locator
                    </Link>
                </li>                <li className="">
                    <Link to="/policies" className="" style={{ textDecoration: 'none', color: 'inherit' }}>
                        Policies
                    </Link>
                </li>
                <li className="">
                    <Link to="/contact/" className="" style={{ textDecoration: 'none', color: 'inherit' }}>
                        Contact Us
                    </Link>
                </li>
            </ul>
        </div>
    )
}
export default Information;