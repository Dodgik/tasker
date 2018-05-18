const React = require('react');
import { withRouter } from 'react-router'
import { connect } from 'react-redux';
import * as tasksActions from '../actions/tasks_actions';
import { Link } from 'react-router-dom';


class View extends React.Component {
  constructor(props, context) {
    super(props, context);
    
    this.id = props.match.params.id;
    if (props.preview) {
      this.state = { id: '', preview: true, ...props.preview };
    } else if (this.id) {
      const task = props.list.find(item => item.id == this.id)
      this.state = { ...task };
    } else {
      this.props.history.push('/');
    }
  }

  render() {
    const src = this.state.image_path || this.state.src;
    return (
      <div className="card border-dark">
        {this.state.preview && (<h5 className="card-header">Preview</h5>)}
        <div className="card-body">
          <div className="input-group mb-2">
            <div className="input-group-prepend">
              <span className="input-group-text input-min-width">User Name</span>
            </div>
            <span className="form-control">{this.state.username}</span>
          </div>
          <div className="input-group mb-2">
            <div className="input-group-prepend">
              <span className="input-group-text input-min-width">Email</span>
            </div>
            <span className="form-control">{this.state.email}</span>
          </div>
          <div className="input-group mb-2">
            <div className="input-group-prepend">
              <span className="input-group-text input-min-width">Image</span>
            </div>
            <div className="form-control">
              {src && <img src={src} className="rounded image-preview" alt="..." />}
            </div>
          </div>
          <div className="input-group mb-2">
            <div className="input-group-prepend">
              <span className="input-group-text input-min-width">Text</span>
            </div>
            <span className="form-control" style={{'height': '86px'}}>{this.state.text}</span>
          </div>
          <div className="input-group mb-2">
            <div className="input-group-prepend">
              <span className="input-group-text input-min-width">Status</span>
            </div>
            <div className="form-control">{this.state.status ? 'DONE' : 'TODO'}</div>
          </div>
        </div>
        <div className="card-footer">
          <div className="btn-group justify-content-center w-100">
            <Link to="/create" className="btn btn-secondary font-weight-bold">Cancel</Link>
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  list: state.tasks.list,
  preview: state.tasks.preview,
});

export default withRouter(connect(mapStateToProps)(View));
