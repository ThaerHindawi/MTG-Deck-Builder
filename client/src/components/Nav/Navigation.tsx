import { NavLink } from "react-router-dom";
import './nav-style.css'

export default function Navigation() {
    return (
        <header className="header">
        <div className="logo-wrapper"><h2 className="header-logo">MTG Deck Builder</h2><h3>version 1.0</h3></div>
        <nav className="site-nav">
            <ul className="nav-list">
            <li className="nav-item"><NavLink to="/">Home</NavLink></li>
            <li className="nav-item"><NavLink to="/decks">Decks</NavLink></li>
            <li className="nav-item"><NavLink to="/sets">Sets</NavLink></li>
            <li className="nav-item"><NavLink to="/about">About</NavLink></li>
            <li className="nav-item"><NavLink to="/contact">Contact</NavLink></li>
            <li className="nav-item"><NavLink to="/login">Login</NavLink></li>
            <li className="nav-item"><NavLink to="/register">Register</NavLink></li>
            </ul>
        </nav>
        </header>
    )
}