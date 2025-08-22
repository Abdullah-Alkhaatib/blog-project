import "./posts-page.css"
import PostList from "../../components/posts/PostList"
import SideBar from "../../components/sidebar/SideBar"
import {posts, categories} from "../../dummyData"
import Pagination from "../../components/pagination/Pagination"

export default function PostPage(){
    return(
        <>
            <section className="posts-page">
                <PostList posts={posts} />
                <SideBar categories={categories} />
            </section>
            <Pagination />
        </>
    )
}