import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Spinner from '../common/Spinner';
import { getSinglePost } from '../../actions/postsActions';
import PostItem from './PostItem';
import CommentForm from './CommentForm';
import CommentFeed from './CommentFeed';

class SinglePost extends Component {
  componentDidMount() {
    this.props.getSinglePost(this.props.match.params.id);
  }

  render() {
    const { post, loading } = this.props.posts;
    let postContent = <Spinner />;

    if (post !== null && !loading && Object.keys(post).length !== 0) {
      postContent = (
        <div>
          <PostItem post={post} showActions={false} />
          <CommentForm postId={post._id} />
          <CommentFeed postId={post._id} comments={post.comments} />
        </div>
      );
    }
    return (
      <div className="post">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <Link to="/posts" className="btn btn-light mb-3">
                Go Back
              </Link>
              {postContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SinglePost.propTypes = {
  post: PropTypes.object.isRequired,
  getSinglePost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  posts: state.posts
});

export default connect(mapStateToProps, { getSinglePost })(SinglePost);
