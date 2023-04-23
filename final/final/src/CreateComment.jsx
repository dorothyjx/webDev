import { useState } from "react";
import { fetchAddComments } from "./services";

function CreateComment ({ id, onCreateComment }){
	const [comment, setComment] = useState("");

	function onSubmit(e) {
		e.preventDefault();
		onCreateComment(id, comment);
		setComment("");
	}

	function onTyping(e) {
		setComment(e.target.value);
	}

	return (
		<form action="#/add" onSubmit={onSubmit}>
			<input className="add-comment" value={comment} onChange={onTyping}  placeholder="Add your comment"/>
			<button type="submit" className="comment-btn">Add Comment</button>
		</form>
	)
}

export default CreateComment;