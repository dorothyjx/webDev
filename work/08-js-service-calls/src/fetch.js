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

export function fetchUpdateWord(word) {
	return fetch('/api/word/', {
		method: 'PUT',
		headers: {
			'content-type': 'application/json', 
		},
		body: JSON.stringify( { word } ),
	})
	.catch((err) => Promise.reject({ error: "network-error" }))
	.then( res => {
		if(!res.ok) {
			return response.json().then( err => Promise.reject(err) );
		}
		return res.json();
	})
}

export function getWord() {
	return fetch('/api/word/')
	.catch((err) => Promise.reject({ error: "network-error" }))
	.then( res => {
		if(!res.ok) {
			return response.json().then( err => Promise.reject(err) );
		}
		return res.json();
	})
}