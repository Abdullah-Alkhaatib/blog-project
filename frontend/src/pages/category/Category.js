import { useEffect } from "react";
import PostList from "../../components/posts/PostList";
import { posts } from "../../dummyData";
import "./category.css";
import { useParams } from "react-router-dom";

export default function Category() {

    const { category } = useParams();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [category]);

    return (
        <section className="category">
            <h1 className="category-title">Posts based on {category}</h1>
            <PostList posts={posts} />
        </section>
    );
}