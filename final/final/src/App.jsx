import { useEffect, useReducer } from 'react';
import reducer, { initialState } from './reducer';
import './App.css';
import {
  LOGIN_STATUS,
  CLIENT,
  SERVER,
  ACTIONS,
} from './constants';
import {
  fetchSession,
  fetchLogin,
  fetchLogout,
  fetchAddPost,
  fetchAllComments,
  fetchUpdatePost,
  fetchPosts,
  fetchAddComments,
} from './services';
import LoginForm from './LoginForm';
import Loading from './Loading';
import Controls from './Controls';
import Status from './Status';
import PostItem from './PostItem';
import Posts from './Posts';
import NewPost from './NewPost';
import CreateComment from './CreateComment';

function App() {
    // All our global state is from the reducer
  // Some "local" state will remain in various components
  const [state, dispatch] = useReducer(reducer, initialState);

  // We also pass "action" functions that do things and update state
  // The top level state has a BUNCH of these
  // We can move these elsewhere if we think it helps
  // - to move, these would have to get dispatch somehow
  // - such as adding dispatch to the params
  // - or having a function that takes dispatch and returns these functions
  // For now, recognize the benefit of keeping the JSX returned at the bottom of this component
  // clean and readable because we have all of these state-management functions here

  function onLogin( username ) {
    dispatch({ type: ACTIONS.START_LOADING_POSTS });
    fetchLogin(username)
    .then( fetchedPosts => {
      dispatch({ type: ACTIONS.LOG_IN, username });
      dispatch({ type: ACTIONS.UPDATE_POSTS, posts: fetchedPosts.userData });
    })
    .catch( err => {
      dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error })
    });
  }

  function onLogout() {
    dispatch({ type: ACTIONS.LOG_OUT });
    fetchLogout() // We don't really care about server results
    .catch( err => {
      dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error })
    });
  }

  function onRefresh() {
    dispatch({ type: ACTIONS.START_LOADING_POSTS });
    fetchPosts()
    .then( posts => {
      dispatch({ type: ACTIONS.UPDATE_POSTS, posts });
    })
    .catch( err => {
      dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error })
    });
  }

  function checkForSession() {
    fetchSession()
    .then( session => { // The returned object from the service call
      dispatch({ type: ACTIONS.LOG_IN, username: session.username });
      return fetchPosts(); // By returning this promise we can chain the original promise
    })
    .catch( err => {
      if( err?.error === SERVER.AUTH_MISSING ) {
        return Promise.reject({ error: CLIENT.NO_SESSION }) // Expected, not a problem
      }
      return Promise.reject(err); // Pass any other error unchanged
    })
    .then( posts => {
      dispatch({ type: ACTIONS.UPDATE_POSTS, posts});
    })
    .catch( err => {
      if( err?.error === CLIENT.NO_SESSION ) { // expected "error"
        dispatch({ type: ACTIONS.LOG_OUT });
        // Not yet logged in isn't a reported error
        return;
      }
      // For unexpected errors, report them
      dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error })
    });
  }

  function onNewPost(post) {
    fetchAddPost(post)
    .then( post => {
      dispatch({ type: ACTIONS.ADD_POST, post})
    })
    fetchPosts()
    .then( posts => {
      dispatch({ type: ACTIONS.UPDATE_POSTS, posts})
    })
    .catch( err => {
      dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error })
    });
  } 

  function onCreateComment(id, comment) {
    fetchAddComments(id, comment)
    .then ( res => {
      dispatch({ type: ACTIONS.ADD_COMMENT, res})
    })
    fetchPosts()
    .then( posts => {
      dispatch({ type: ACTIONS.UPDATE_POSTS, posts})
    })
    .catch( err => {
      dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error })
    });
  }

  function onLike(id) {
    fetchUpdatePost(id, { likes: state.posts[id].likes + 1 })
    .then( post => {
      dispatch({ type: ACTIONS.LIKE, post})
    })
    .catch( err => {
      dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error })
    });
  }

  console.log("##########")
  console.log(state.posts)


  // Here we use a useEffect to perform the initial loading
  // Initial loading isn't triggered by an event like most service calls
  useEffect(
    () => {
      checkForSession();
    },
    [] // Only run on initial render
  );


  return (
    <div className="App">
      <main>
        { state.error && <Status error={state.error}/> }
        { state.loginStatus === LOGIN_STATUS.PENDING && <Loading className="login__waiting">Loading user...</Loading> }
        { state.loginStatus === LOGIN_STATUS.NOT_LOGGED_IN && <LoginForm onLogin={onLogin}/> }
        { state.loginStatus === LOGIN_STATUS.IS_LOGGED_IN && (
          <div className='content'> 
            <div className='header'>
              <h1>Welcome to BBS</h1>
              <p>Hello, {state.username}</p>
              <Controls onLogout={onLogout} onRefresh={onRefresh}/>
            </div>

            <NewPost onNewPost={onNewPost} />

            <Posts 
              isPostPending={state.isPostPending}
              posts={state.posts}
              lastAddedPostId={state.lastAddedPostId}
              onLike={onLike}
              onCreateComment={onCreateComment}
            />

          </div>
        )}
      </main>
    </div>
  );
}

export default App;
