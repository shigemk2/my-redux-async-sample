import React from 'react'
import PropTypes from 'prop-types'

const Posts = ({posts}) => (
  <ul>
    {posts.map((post, i) =>
      <li key={i}>{post.name}</li>
    )}
  </ul>
);

Posts.propTypes = {
  posts: PropTypes.array.isRequired
};

export default Posts
