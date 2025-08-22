import {Link, useParams} from "react-router-dom";
import {posts} from "../../dummyData";
import "./postDetails.css"

export default function PostDetails() {

    // const params = useParams();
    // console.log(params); // {id: '1'}

    const {id} = useParams();
    const post = posts.find(p => p._id === parseInt(id));

    return (
        <section className="post-details">
            <div className="post-details-image-wrapper">
                <img src={post.image} alt={post.title} className="post-details-image" />
                <form className="update-post-image-form">
                    <label htmlFor="file" className="update-post-image-label">
                        <i className="bi bi-image-fill"></i>
                        Select new image
                    </label>
                    <input type="file" name="file" id="file" />
                    <button type="submit">Upload</button>
                </form>
            </div>

            <h1 className="post-details-title">{post.title}</h1>

            <div className="post-details-user-info">
                <img src={post.user.image} alt={post.user.name} className="post-details-user-image" />
                <div className="post-details-user">
                    <strong>
                        <Link to="profile/1">{post.user.username}</Link>
                    </strong>
                    <span>{post.createdAt}</span>
                </div>
            </div>

            <p className="post-details-description">
                {post.description}
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>

            <div className="post-details-icon-wrapper">
                <div>
                    <i className="bi bi-hand-thumbs-up"></i>
                    <small>{post.likes.length} likes</small>
                </div>
                <div>
                    <i className="bi bi-pencil-square"></i>
                    <i className="bi bi-trash-fill"></i>
                </div>
            </div>
        </section>
    );
}