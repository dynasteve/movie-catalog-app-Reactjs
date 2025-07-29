import { Link } from "react-router-dom";
import '../css/Navbar.css'

export default function NavBar() {
    return(
        <div className="navbar">
            <div className="navbar-brand">
                <Link to='/'>Watcher's Hub</Link>
            </div>
            <div className="navbar-links">
                <Link to='/' className="nav-link">Home</Link>
                <Link to='/favourites' className="nav-link">Favourites</Link>
                <Link to='/about' className="nav-link">About</Link>
                <Link to='/contact-us' className="nav-link">Contact</Link>
            </div>

        </div>
    )
}