export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const SELECT_REDDIT = 'SELECT_REDDIT';
export const INVALIDATE_REDDIT = 'INVALIDATE_REDDIT';

// 外で使える
export const selectReddit = reddit => ({
  type: SELECT_REDDIT,
  reddit
});

// 外で使える
export const invalidateReddit = reddit => ({
  type: INVALIDATE_REDDIT,
  reddit
});

// 外で使える
export const requestPosts = reddit => ({
  type: REQUEST_POSTS,
  reddit
});

// 外で使える
export const receivePosts = (reddit, json) => ({
  type: RECEIVE_POSTS,
  reddit,
  posts: json.data.children.map(child => child.data),
  receivedAt: Date.now()
});

// 外部URLからJSONデータを取り出す
const fetchPosts = reddit => dispatch => {
  dispatch(requestPosts(reddit));
  return fetch(`http://localhost:9000/bank/all`)
  // return fetch(`https://www.reddit.com/r/${reddit}.json`)
    .then(response => response.json())
    .then(json => {
      console.log("------------------");
      console.log(json);
      console.log(json[0]);
      console.log(json[1]);
      console.log("------------------");
      dispatch(receivePosts(reddit, json));
    });
};

// 外で使えない
const shouldFetchPosts = (state, reddit) => {
  const posts = state.postsByReddit[reddit];
  if (!posts) {
    return true
  }
  if (posts.isFetching) {
    return false
  }
  return posts.didInvalidate
};

export const fetchPostsIfNeeded = reddit => (dispatch, getState) => {
  if (shouldFetchPosts(getState(), reddit)) {
    return dispatch(fetchPosts(reddit))
  }
};
