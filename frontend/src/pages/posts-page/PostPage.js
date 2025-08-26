import "./posts-page.css"
import PostList from "../../components/posts/PostList"
import SideBar from "../../components/sidebar/SideBar"
import {categories} from "../../dummyData"
import Pagination from "../../components/pagination/Pagination"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, getPostsCount } from "../../redux/apiCalls/postApiCall"

const POST_PER_PAGE = 3; // عدد المشاركات في كل صفحة

export default function PostPage(){

    const dispatch = useDispatch();
    const { postsCount, posts } = useSelector((state) => state.post);

    const [currentPage, setCurrentPage] = useState(1);
    const pages =Math.ceil(postsCount / POST_PER_PAGE); // حساب عدد الصفحات

    useEffect(() => {
        dispatch(fetchPosts(currentPage));
        window.scrollTo(0, 0);
    }, [dispatch, currentPage]);

    useEffect(() => {
        dispatch(getPostsCount()); // رح اخليه يشتغل مره وحده
    }, [dispatch]);

    return(
        <>
            <section className="posts-page">
                <PostList posts={posts} />
                <SideBar categories={categories} />
            </section>
            <Pagination pages={pages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </>
    )
}