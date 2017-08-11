export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const SELECT_BANK = 'SELECT_BANK';
export const INVALIDATE_BANK = 'INVALIDATE_BANK';

// 外で使える
export const selectBank = bank => ({
  type: SELECT_BANK,
  bank
});

// 外で使える
export const invalidateBank = bank => ({
  type: INVALIDATE_BANK,
  bank
});

// 外で使える
export const requestPosts = bank => ({
  type: REQUEST_POSTS,
  bank
});

// 外で使える
export const receivePosts = (bank, json) => ({
  type: RECEIVE_POSTS,
  bank,
  posts: json.map(child => child.data),
  receivedAt: Date.now()
});

// 外部URLからJSONデータを取り出す
const fetchPosts = bank => dispatch => {
  dispatch(requestPosts(bank));
  return fetch(`http://localhost:9000/bank/all`)
  // return fetch(`https://www.bank.com/r/${bank}.json`)
    .then(response => response.json())
    .then(json => {
      console.log("------------------");
      console.log(json);
      console.log(json[0]);
      console.log(json[1]);
      console.log("------------------");
      dispatch(receivePosts(bank, json));
    });
};

// 外で使えない
const shouldFetchPosts = (state, bank) => {
  const posts = state.postsByBank[bank];
  if (!posts) {
    return true
  }
  if (posts.isFetching) {
    return false
  }
  return posts.didInvalidate
};

export const fetchPostsIfNeeded = bank => (dispatch, getState) => {
  if (shouldFetchPosts(getState(), bank)) {
    return dispatch(fetchPosts(bank))
  }
};
