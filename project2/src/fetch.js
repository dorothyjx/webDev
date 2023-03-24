export function fetchSession() {
	return fetch("/api/session")
	.catch((err) => {
		return Promise.reject({error: "network-error"});
	})
	.then((res) => {
		if (!res.ok) {
		return Promise.reject({ error: "Invalid User" });
		}
		return res.json();
	})
}

export function fetchLogin(username) {
	return fetch('/api/session/', {
		method: 'POST',
		headers: {
			'content-type': 'application/json', 
		},
		body: JSON.stringify( { username } ),
	})
	.catch( err => Promise.reject({ error: 'network-error' }) )
	.then( response => {
		if(!response.ok) {
			return response.json().then( err => Promise.reject(err) );
		}
		return response.json(); 
	});
}

export function fetchLogout() {
	return fetch('/api/session/', {
		method: 'DELETE',
		headers: {
			'content-type': 'application/json', 
		},
	})
	.catch((err) => Promise.reject({ error: "network-error" }))
	.then( res => {
		if(!res.ok) {
			return res.json().then( err => Promise.reject(err));
		}
		return res.json();
	})
}


export function fetchHistory() {
    return fetch('/api/chat')
	.catch(() => Promise.reject({ error: 'networkError' }))
	.then( res => {
		if(!res.ok) {
			return res.json().then( err => Promise.reject(err));
		}
		return res.json();
	});
}

export function fetchNewMessage(text) {
    return fetch('/api/chat', {
		method: 'POST',
		headers: new Headers({
			'content-type': 'application/json',
		}),
		body: JSON.stringify({ text }),
	})
	.catch(() => Promise.reject({ error: 'networkError' }))
	.then( res => {
		if(!res.ok) {
			return res.json().then( err => Promise.reject(err));
		}
		return res.json();
	});
}


export function fetchAllUsers() {
	console.log("81");
	console.log(fetch('/api/sessionusers'));
	return fetch('/api/sessionusers')
	.catch(() => Promise.reject({ error: 'networkError' }))
	.then( res => {
		if(!res.ok) {
			console.log("error");
			return res.json().then( err => Promise.reject(err));
		}
		console.log(res);
		return res.json();
	});
}