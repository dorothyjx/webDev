import { useEffect, useState } from "react";
import CreateComment from "./CreateComment";
import { fetchAllComments } from "./services";

function Comments ({
	comments,
	onCreateComment,
	id,
}) {
	  // All this code before the return is to make the return easier to skim
	const SHOW = {  // a constant used only in this component
		EMPTY: 'empty',
		COMMENTS: 'comments',
	};

	let show;
	if(!comments || !Object.values(comments).length) {
		show = SHOW.EMPTY;
	} else {
		show = SHOW.COMMENTS;
	}
	
	return (
		<div>
			{ show === SHOW.EMPTY && (
				<p>No comments yet, add one!</p>
			)}
			<CreateComment id={id} onCreateComment={onCreateComment} />
			
			{ show === SHOW.COMMENTS && (
				<ul>
					{ Object.values(comments).map( (comment) => (
						
						<li className="comment" key={comment.userId}>
							<p>{comment.username}: {comment.comment}</p>
							{/* <CommentItem comment={comment}/> */}
						</li>
					))}
				</ul>
			)}

		</div>
	)
}

export default Comments;