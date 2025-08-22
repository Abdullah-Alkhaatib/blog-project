import "./create-post.css"

export default function CreatePost(){
    return(
        <section className="create-post">
            <h1 className="create-post-title">
                Create New Post
            </h1>
            <form className="create-post-form">
                <input type="text" placeholder="Post Title" className="create-post-input"/>

                <select className="create-post-input">
                    <option disabled value="">Select a category</option>
                    <option value="music">Music</option>
                    <option value="coffee">Coffee</option>
                </select>

                <textarea className="create-post-textarea" rows="5" placeholder="Post Description"></textarea>

                <input type="file" name="file" id="file" className="create-post-upload" />

                <button type="submit" className="create-post-btn">Create    </button>

            </form>
        </section>
    )
}