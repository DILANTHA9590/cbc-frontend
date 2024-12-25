import "./homepage.css"
import { Link } from "react-router-dom"//limk use karaddi e kiyanne button nav valayrta vge link use karaddi meka 
//import karaganna oni


export default function Homepage() {

    return (
        <>
            <header>
                <h1>Welcome to My Website</h1>
            </header>
            <nav>
                <a href="#">Home</a>
                <a href="#about">About</a>
                <a href="#services">Services</a>
                <a href="#contact">Contact</a>
            </nav>
            <div class="hero">
                <h1>Your Adventure Starts Here</h1>
                <p>Discover amazing experiences, beautiful destinations, and more.</p>
            </div>
            <div class="content">
                <h2>Our Services</h2>
                <p>We offer a wide range of services to make your journey unforgettable. Explore our website to learn more!</p>
            </div>
            <footer class="footer">
                <p>&copy; 2024 My Website. All rights reserved.</p>
            </footer>

            <Link to="/login">Login</Link>
        </>
    )

}

