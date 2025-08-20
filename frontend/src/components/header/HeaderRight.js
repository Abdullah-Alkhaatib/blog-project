import { Link } from "react-router-dom"

export default function HeaderRight({toggle, setToggle}) {
    return (
        <div className="header-right">
            <Link to="/login" className="header-right-link">
                <i className="bi bi-box-arrow-right"></i>
                <span>Login</span>
            </Link>
            <Link to="/register" className="header-right-link">
                <i className="bi bi-person-plus"></i>
                <span>Register</span>
            </Link>
        </div>
    )
}