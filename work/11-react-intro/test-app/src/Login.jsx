import { useState } from "react";
import Game from './Game';

function Login() {
	const [isLogin, setIsLogin] = useState(false);
	const [username, setUsername] = useState("");
	const [errMsg, setErrMsg] = useState("")
	const error = "Username Invalid";

	const handleLogin = (e) => {
		e.preventDefault();
		if(username === 'dog' || !username.match(/^[A-Za-z0-9_]+$/)) {
			setErrMsg(error);
			setUsername("");
		} else {
			setIsLogin(true);
			setErrMsg("");
		}

	}

	const login = (
		<div className="login-card">
			<form className="login">
				<label>Username: </label>
				<input value={username} onInput={(e) => setUsername(e.target.value)} />
				<button onClick={handleLogin}>Login</button>
			</form>

			<p>{errMsg}</p>
		</div>
	)

	const game = (
		<div className='guess'>
			<Game user={username} />
			<button className="logout" onClick={() => {setIsLogin(false); setUsername("")}}>Logout</button>
		</div>
	)

	return (
		<div>
			{isLogin ? game : login}
		</div>
	)
}

export default Login;