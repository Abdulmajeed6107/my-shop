import MyNavbar from "./Navbarcustom";
import TopHeader from "./TopHeader";
import './BootomPage.css';
const About = () => {
    return (
          
        <div className="row bg-light rounded">
           
            <h3 className="mb-4">About Us</h3>
            <p className="" >Welcome to our store! We are a team of passionate individuals dedicated to providing the best shopping experience.</p>
            <p className="">Welcome to My Shop — your trusted online store based in Lahore, Pakistan. We started this journey with a simple goal: to bring quality products to your doorstep with honest pricing and reliable service.</p>
            <p className="">From everyday essentials to handpicked favorites, every item in our store is chosen with care. We believe shopping should be easy, fast, and stress-free — that's why we focus on smooth ordering, quick delivery, and friendly support.</p>
            <div className="" >
                <div className="mt-4" style={{ border: "none" }}>
                    <h3 className="">Our Mission</h3>
                    <p className="">To make online shopping simple and accessible for everyone, while building lasting relationships with our customers through trust and quality service.
                    </p>

                </div>
                <div className="mt-4" style={{ border: "none" }}>
                    <h3>Why Choose Us</h3>
                    <p className="">Affordable prices with no hidden costs
                        Fast and reliable delivery across Lahore and beyond
                        Cash on Delivery, JazzCash, EasyPaisa, and card payments
                        Friendly customer support, always ready to help </p>
                </div>
               
            </div>
        </div>
    )

}
export default About;