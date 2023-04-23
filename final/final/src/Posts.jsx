import Loading from "./Loading";
import PostItem from "./PostItem";

function Posts ({
	posts,
	isPostPending,
	onLike,
	onCreateComment
}) {
	  // All this code before the return is to make the return easier to skim
	const SHOW = {  // a constant used only in this component
		PENDING: 'pending',
		EMPTY: 'empty',
		POSTS: 'posts',
	};
	let show;
	if(isPostPending) {
		show = SHOW.PENDING;
	} else if (!Object.keys(posts).length) {
		show = SHOW.EMPTY;
	} else {
		show = SHOW.POSTS;
	}

	// The `Object.values(todos).map()` below returns
	// an array of JSX elements
	return (
		<div className="content">
			{ show === SHOW.PENDING && <Loading className="posts__waiting">Loading Posts...</Loading> }
			{ show === SHOW.EMPTY && (
				<p>No Post Items yet, add one!</p>
			)}
			{ show === SHOW.POSTS && (
				<ul className="posts">
				{ Object.values(posts).map( post => (
					<li key={post.id}>
					<PostItem
						post={post}
						onLike={onLike}
						onCreateComment={onCreateComment}
					/>
					</li>
				))}
				</ul>
			)}
		</div>
	);
}

export default Posts;