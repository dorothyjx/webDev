const uuid = require('uuid').v4;
const id1 = uuid();
const id2 = uuid();
const id10 = uuid();
const id11 = uuid();

const userData = {
	[id1]: {
		id: id1,
		post: 'Nap', 
		comments: {
			[id10]: {
				userId: id10,
				username: 'Amy',
				comment: 'he is so cute',
			}, 
			[id11]: {
				userId: id11, 
				username: 'Bob',
				comment: 'I like his belly',
			}
		},
		username: 'Zack',
		likes: 7,
	},
	[id2]: {
		id: id2,
		post: 'Dog', 
		comments: {
			[id10]: {
				userId: id10,
				username: 'Amy',
				comment: 'Look at his belly',
			}, 
			[id11]: {
				userId: id11, 
				username: 'Bob',
				comment: 'Meow',
			}
		},
		username: 'Yang',
		likes: 17,
	}
}

module.exports = {
	userData,
};