import { useEffect } from "react";
import PostList from "../../components/posts/PostList";
import "./category.css";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostsBasedOnCategory } from "../../redux/apiCalls/postApiCall";


export default function Category() {

    const dispatch = useDispatch();
    const {postsCat} = useSelector(state => state.post);

    const { category } = useParams(); // Get the category from the URL

    useEffect(() => {
        dispatch(fetchPostsBasedOnCategory(category));
        window.scrollTo(0, 0);
    }, [dispatch, category]);

    return (
        <section className="category">
            {postsCat.length === 0 ?
            <>
                <h1 className="category-not-found">
                    Posts with <span>{category}</span> Category not found
                </h1>
                <Link className="category-not-found-link" to="/posts">
                    Go to posts page
                </Link>
            </>
            :
            <>
                <h1 className="category-title">Posts based on {category}</h1>
                <PostList posts={postsCat} />
            </>
            }
        </section>
    );
}