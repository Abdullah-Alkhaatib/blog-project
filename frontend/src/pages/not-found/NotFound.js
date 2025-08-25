import {Link} from "react-router-dom";
import "./not-found.css"

export default function NotFound() {
    return (
        <section className="not-found">
            <div className="not-found-title">404 - Not Found</div>
            <h1 className="not-found-text">The page you are looking for does not exist.</h1>

            <Link to="/" className="not-found-link">
                Go back to Home page
            </Link>
        </section>
    );
}