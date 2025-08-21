import { Link } from "react-router-dom";
import "./sidebar.css";

export default function SideBar({categories}) {
    return (
        <div className="sidebar">
            <h5 className="sidebar-title">Categories</h5>
            <ul className="sidebar-links">
                {categories.map((category) => (
                    <Link
                        to={`/posts/categories/${category.title}`}
                        key={category._id}
                        className="sidebar-link"
                    >
                        {category.title}
                    </Link>
                ))}
            </ul>
        </div>
    );
}
