import {Link} from "react-router-dom";

export default function PostItem({ post }) {
    return (
        <div className="post-item">

            <div className="post-item-image-wrapper">
                <img src={post?.image.url} alt={post.title} className="post-item-image" />
            </div>

            <div className="post-item-info-wrapper">
                <div className="post-item-info">

                    <div className="post-item-author">
                        <strong>Author: </strong>
                        <Link
                        className="post-item-username"
                        to={`/profile/${post.user?._id}`}
                        >
                        {post.user?.username}
                        </Link>
                    </div>

                    <div className="post-item-date">
                        {new Date(post?.createdAt).toDateString()} {/* عرض التاريخ بشكل مختصر */}
                    </div>

                </div>

                <div className="post-item-details">
                    {/* <h4 className="post-item-title">{post.title}</h4> */}
                    <Link className="post-item-category" to={`/posts/categories/${post?.category}`} >{post?.category}</Link>
                </div>

                <p className="post-item-description">
                    {post?.description}
                    lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>

                <Link className="post-item-link" to={`/posts/details/${post?._id}`}>
                    Read more...
                </Link>

            </div>

        </div>
    )
}