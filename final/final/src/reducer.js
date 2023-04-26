import {
	LOGIN_STATUS,
	CLIENT,
	ACTIONS,
  } from './constants';
  
  export const initialState = {
	error: '',
	username: '',
	loginStatus: LOGIN_STATUS.PENDING,
	isPostPending: false,
	posts: {},
	lastAddedPostId: '',
  };
  
  function reducer(state, action) {
	switch(action.type) {
  
		case ACTIONS.LOG_IN:   // actions are the change in state, not how that change happened
			return {
				...state,
				error: '', // constantly resetting this is a "pain point", and a sign of something to improve!
				loginStatus: LOGIN_STATUS.IS_LOGGED_IN,
				username: action.username,
			};
	
		case ACTIONS.START_LOADING_POSTS:
			return {
				...state,
				error: '',
				isPostPending: true, // Perhaps make this a "status" value like login?
			};
  
		case ACTIONS.LOG_OUT:
			return {
				...state,
				error: '',
				isPostPending: false,
				posts: {},
				loginStatus: LOGIN_STATUS.NOT_LOGGED_IN,
				lastAddedPostId: '',
				username: '',
			};
	
		case ACTIONS.REPORT_ERROR:
			// We could move the "pick the message" logic from Status.jsx here. Better? It depends.
			return {
				...state,
				error: action.error || 'ERROR', // ERROR is just to ensure a truthy value
			};

		case ACTIONS.LIKE:
			return {
				...state,
				posts: {
					...state.posts,
					[action.post.id]: action.post
				},
			}
	
		case ACTIONS.UPDATE_POSTS:
			return {
				...state,
				error: '',
				isPostPending: false,
				lastAddedPostId: '',
				posts: action.posts,
			};
  
		case ACTIONS.ADD_POST:
			return {
				...state,
				posts: {
					...state.posts,
					
					[action.post.id]: action.post,
				},
			};
			
		case ACTIONS.ADD_COMMENT:
			return {
				...state,
				posts: {
					...state.posts,
					
					[action.res.postId]: action.res.userData[action.res.postId].comments,
				}
			};
  
	  default:
		throw new Error({ error: CLIENT.UNKNOWN_ACTION, detail: action }); // reporting detail for debugging aid, not shown to user
	}
  }
  
  export default reducer;