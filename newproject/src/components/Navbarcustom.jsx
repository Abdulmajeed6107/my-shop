
import './Navbarcustom.css'
const MyNavbar = () => {
     
    return (
     <nav className="navbar navbar-expand-lg  bg-dark mt-4 mb-4 sticky-top">
                <div className="container-fluid">
                    <a className="navbar-brand text-light" href="#"></a>
                    <button className="navbar-toggler custom-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav d-flex navspace gap-3 w-100">
                            <a className="nav-link text-white" href="/">Home</a>
                            <a className="nav-link text-white" href="/products">Shop</a>
                            <a className="nav-link text-white" href="">Pages</a>
                            <a className="nav-link text-white" href="">Blog</a>
                            <a className="nav-link text-white" href="/about">About Us</a>
                            <a className="nav-link text-white" href="">Contact Us</a>



                        </div>
                        <div className='d-flex align-items-center flex-nowrap'>
                            <i className="bi bi-telephone-plus text-white"></i>
                            <a href="" className=' nav-link px-5 text-white text-nowrap'>(+92) 314-3415032</a>
                        </div>


                    </div>
                </div>
            </nav>
    )
}
export default MyNavbar;