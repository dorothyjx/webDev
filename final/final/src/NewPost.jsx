import { useState } from "react";

function NewPost ({ onNewPost }){
	const [post, setPost] = useState("");

	function onSubmit(e) {
		e.preventDefault();
		onNewPost(post);
		setPost("");
	}

	function onTyping(e) {
		setPost(e.target.value);
	}

	return (
		<form action="#/add" onSubmit={onSubmit} className="new-post">
			<input className="add-post" value={post} onChange={onTyping} placeholder="Create your Post"/>
			<button type="submit" className="post-btn">Create Post</button>
		</form>
	)
}

export default NewPost;