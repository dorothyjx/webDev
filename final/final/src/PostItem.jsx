import Comments from "./Comments";

function PostItem ({
	post,
	onLike,
	onCreateComment,
}) {
	return (
		<>
			<div className="post-card">
				<div className="post">
					<h4 data-id={post.id}>
						Post Detail: {post.post}
					</h4>

					<p>User: {post.username}</p>
					<p>Total Likes: {post.likes}</p>

					<button 
						data-id={post.id}
						className="like" 
						onClick={(e) => {
							e.preventDefault();
							const id = e.target.dataset.id;
							onLike(id);
						}}>Like</button>
				</div>

				<Comments 
					comments={post.comments} 
					onCreateComment={onCreateComment} 
					id={post.id}
				/>
			</div>
		</>
	)
}
export default PostItem;