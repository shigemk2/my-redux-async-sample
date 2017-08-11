import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchPostsIfNeeded } from '../actions'
import Posts from '../components/Posts'

// Componentクラス
class App extends Component {
  static propTypes = {
    posts: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired
  };

  componentDidMount() {
    const { dispatch, selectedBank } = this.props;
    dispatch(fetchPostsIfNeeded(selectedBank))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedBank !== this.props.selectedBank) {
      const { dispatch, selectedBank } = nextProps;
      dispatch(fetchPostsIfNeeded(selectedBank))
    }
  }

  handleRefreshClick = e => {
    e.preventDefault();

    const { dispatch, selectedBank } = this.props;
    dispatch(fetchPostsIfNeeded(selectedBank))
  };

  // 描画
  render() {
    const { posts, isFetching, lastUpdated } = this.props;
    const isEmpty = posts.length === 0;
    return (
      <div>
        <p>
          {lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
              {' '}
            </span>
          }
          {!isFetching &&
            <a href="#"
               onClick={this.handleRefreshClick}>
              Refresh
            </a>
          }
        </p>
        {isEmpty
          ? (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
          : <div style={{ opacity: isFetching ? 0.5 : 1 }}>
              <Posts posts={posts} />
            </div>
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { selectedBank, postsByBank } = state;
  const {
    isFetching,
    lastUpdated,
    items: posts
  } = postsByBank[selectedBank] || {
    isFetching: true,
    items: []
  };

  return {
    selectedBank,
    posts,
    isFetching,
    lastUpdated
  }
};

export default connect(mapStateToProps)(App)
