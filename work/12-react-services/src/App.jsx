import { useState, useEffect } from 'react';
import './App.css';

import {
  LOGIN_STATUS,
  CLIENT,
  SERVER,
} from './constants';
import {
  fetchSession,
  fetchLogin,
  fetchLogout,
  fetchWords,
  fetchAddWord,
} from './services';

import LoginForm from './LoginForm';
import Word from './Word';
import Loading from './Loading';
import Controls from './Controls';
import Status from './Status';
import AddWordForm from './AddWordForm';

function App() {

  // Here we define our "top level" state
  // These values are passed down to other components
  // We COULD have fewer states if we used objects to track multiple state values
  // But here I've done them as individual values to keep it basic
  //
  const [ error, setError ] = useState('');
  const [ username, setUsername] = useState('');
  const [ loginStatus, setLoginStatus ] = useState(LOGIN_STATUS.PENDING); // one variable covers multiple cases
  const [ isWordPending, setIsWordPending ] = useState(false);
  const [ words, setWords ] = useState({});

  // We also pass "action" functions that do things and update state
  // The top level state has a BUNCH of these
  // We can move these elsewhere - we'll look at that later
  // For now, recognize the benefit of keeping the JSX returned at the bottom of this component
  // clean and readable because we have all of these state-management functions here

  function onLogin( username ) {
    setIsWordPending(true);
    fetchLogin(username)
    .then( fetchedWords => {
      setError(''); // in case another action had set an error
      setWords( fetchedWords );
      setIsWordPending(false);
      setUsername(username);
      setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN);
    })
    .catch( err => {
      setError(err?.error || 'ERROR');
    });
  }

  function onLogout() {
    setError('');
    setUsername('');
    setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
    setWords({});
    fetchLogout() // We don't really care about results
    .catch( err => {
      setError(err?.error || 'ERROR'); // Ensure that the error ends up truthy
    });
  }

  function onAddWord(newword) {
    fetchAddWord(newword)
    .then( word => {
      console.log(word)
      // Notice we get the id of the new todo from the returned todo
      // Don't modify existing state object!
      setWords({ // Create new object
        //...words, // copy contents of existing state object
        id:word.id,
        newword: word.newword,
      });
      setError('')
      
    })
    .catch( err => {
      setError(err?.error || 'ERROR'); // Ensure that the error ends up truthy
    });
  }

  function checkForSession() {
    fetchSession()
    .then( session => { // The returned object from the service call
      setUsername(session.username);
      setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN); // We do not have todos yet!
      return fetchWords(); // By returning this promise we can chain the original promise
    })
    .catch( err => {
      if( err?.error === SERVER.AUTH_MISSING ) {
        return Promise.reject({ error: CLIENT.NO_SESSION }) // Expected, not a problem
      }
      return Promise.reject(err); // Pass any other error unchanged
    })
    .then( word => {
      setWords(word);
    })
    .catch( err => {
      if( err?.error === CLIENT.NO_SESSION ) { // expected "error"
        setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
        // Not yet logged in isn't a reported error
        return;
      }
      // For unexpected errors, report them
      setError(err?.error || 'ERROR'); // Ensure that the error ends up truthy
    });

  }


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
      <main className="">
        { error && <Status error={error}/> }
        { loginStatus === LOGIN_STATUS.PENDING && <Loading className="login__waiting">Loading user...</Loading> }
        { loginStatus === LOGIN_STATUS.NOT_LOGGED_IN && <LoginForm onLogin={onLogin}/> }
        { loginStatus === LOGIN_STATUS.IS_LOGGED_IN && (
          <div className="content">
            <p>Hello, {username}</p>
            <Controls onLogout={onLogout}/>
            <Word 
              isWordPending={isWordPending}
              word={words}
            />
            <AddWordForm onAddWord={onAddWord}/>
          </div>
        )}

      </main>
    </div>
  );
}

export default App;
