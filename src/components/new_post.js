import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { createPost } from '../actions/index';
import { Link } from 'react-router';

class NewPost extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  onSubmit(props) {
    this.props.createPost(props)
      .then(() => {
          // blog post has been created, now navigate the user to the index
          // Navigate by calling this.context.router.push with the new path
          this.context.router.push('/');
      });
  }

  render() {
    const { fields: { title, categories, content }, handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <br />
        <div>

            <div className="text-left">
              <h3>Create A New Post</h3>
            </div>
            <div className="text-right">
              <Link to="/" className="btn btn-danger">Cancel</Link>
            </div>
        </div>

        <div className={`form-group ${title.touched && title.invalid ? 'has-danger' : ''}`}>
          <label>Title</label>
          <input type="text" className="form-control" {...title} />
          <div className="text-help">
            {title.touched ? title.error : ''}
          </div>
        </div>

        <div className={`form-group ${categories.touched && categories.invalid ? 'has-danger' : ''}`}>
          <label>Categories</label>
          <input type="text" className="form-control" {...categories} />
          <div className="text-help">
            {categories.touched ? categories.error : ''}
          </div>
        </div>

        <div className={`form-group ${content.touched && content.invalid ? 'has-danger' : ''}`}>
          <label>Content</label>
          <textarea type="text" className="form-control" {...content} />
          <div className="text-help">
            {content.touched ? content.error : ''}
          </div>
        </div>


        <button type="submit" className="btn btn-primary">Publish Post</button>

      </form>

    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.title) {
    errors.title = "Please enter a username";
  }
  if (!values.categories) {
    errors.categories = "Please enter a category";
  }
  if (!values.content) {
    errors.content = "Please add some content";
  }

  return errors;
}

export default reduxForm({
  form: 'NewPostForm',
  fields: ['title', 'categories', 'content'],
  validate
}, null, { createPost })(NewPost);
