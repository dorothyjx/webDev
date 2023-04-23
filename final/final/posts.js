const uuid = require('uuid').v4;
const posts = require('./userData');

// We could make this an ES6 class
// or a constructor function
// But here we'll just make a new object
// without using the `new` operator
// and return it

// const id1 = uuid();
// const id2 = uuid();
// const posts = {
//     // The below syntax lets you use a variable value as the key
//     // if the value of id1 is "asdf", the property is "asdf", not "id1"
//     [id1]: {
//       id: id1,
//       post: 'Nap',
//       likes: 7,
//     },
//     [id2]: {
//       id: id2,
//       post: 'Dog',
//       likes: 17,
//     },
// };

function makePostList() {
	// const id1 = uuid();
	// const id2 = uuid();


  const postList = {};

//   const posts = {
//     // The below syntax lets you use a variable value as the key
//     // if the value of id1 is "asdf", the property is "asdf", not "id1"
//     [id1]: {
//       id: id1,
//       post: 'Nap',
//       likes: 7,
//     },
//     [id2]: {
//       id: id2,
//       post: 'Dog',
//       likes: 17,
//     },
//   };

  postList.contains = function contains(id) {
    // This !! syntax coerces the value to a boolean
    // First by giving us the reverse of the truthy/falsy value,
    // then by reversing it to true/false
    return !!posts[id];
  };

  postList.getPosts = function getPosts() {
    return posts;
  };

  postList.addPost = function addPost(post) {
    const id = uuid();
    posts[id] = {
      id,
      post,
      likes: 0,
    };
    return id;
  };

  postList.getPost = function getPost(id) {
    return posts[id];
  };

  postList.updatePost = function updatePost(id, post) {
    // this uses ?? because we need to accept `false` as a legit value
	console.log("57====", posts[id])
    posts[id] = post;

  };


  postList.deletePost = function deletePost(id) {
    delete posts[id];
  };

  return postList;
};

module.exports = {
	// posts
	// id1,
	// id2,
  	makePostList,
};