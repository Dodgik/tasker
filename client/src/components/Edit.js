const React = require('react');
import { connect } from 'react-redux';
import * as tasksActions from '../actions/tasks_actions';
import { Link } from 'react-router-dom';


class Edit extends React.Component {
  constructor(props, context) {
    super(props, context);
    
    this.id = props.match.params.id;
    const task = props.list.find(item => item.id == this.id)
    this.state = { ...task };
  }
  
  componentWillReceiveProps(nextProps) {
    if (nextProps.actionTask) {
      const task = nextProps.list.find(item => item.id == this.id)
      let state = { ...nextProps.actionTask, ...task };

      if (this.state.sending && !state.sending && !state.error) {
        this.props.history.push('/')
      }
      
      this.setState(state);
    }
  }
  
  handleEditClick = (e) => {
    const task = {
      id: this.state.id,
      status: this.state.status,
      text: this.state.text.replace(/(\r\n|\n|\r)/gm, ' '),
    };
    this.props.setTask(task);
  }

  handleChangeText = (e) => {
    this.setState({ text: e.target.value });
  }

  handleChangeStatus = (e) => {
    const value = e.target.checked ? 10 : 0;
    this.setState({ status: value });
  }

  render() {
    const { error } = this.props.actionTask;
    return (
      <div className="card border-dark">
        <h5 className="card-header">Edit task</h5>
        <div className="card-body">
          <div className="input-group mb-2">
            <div className="input-group-prepend">
              <span className="input-group-text input-min-width">Task</span>
            </div>
            <span className="form-control">{this.state.id}</span>
          </div>
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
              <img src={this.state.image_path} className="rounded image-preview" alt="..."/>
            </div>
          </div>
          <div className="input-group mb-2">
            <div className="input-group-prepend">
              <span className="input-group-text input-min-width">Text</span>
            </div>
            <textarea
              className={error ? ("form-control is-invalid") : ("form-control")}
              rows="3" placeholder="Text"
              defaultValue={this.state.text}
              onChange={this.handleChangeText}>
            </textarea>
            {error && (<div className="invalid-feedback">{error}</div>)}
          </div>
          <div className="input-group mb-2">
            <div className="input-group-prepend">
              <span className="input-group-text input-min-width">Status</span>
            </div>
            <div className="form-control">
              <div className="custom-control custom-checkbox">
                <input type="checkbox" className="custom-control-input" id="statusEdit"
                  defaultChecked={this.state.status}
                  onChange={this.handleChangeStatus} />
                <label className="custom-control-label ml-1" htmlFor="statusEdit">DONE</label>
              </div>
            </div>
          </div>
        </div>
        <div className="card-footer">
          <div className="btn-group justify-content-center w-100">
            <button type="button" className="btn btn-primary font-weight-bold" onClick={this.handleEditClick}>Save</button>
            <Link to="/" className="btn btn-secondary font-weight-bold">Cancel</Link>
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  list: state.tasks.list,
  actionTask: state.tasks.actionTask,
});

const mapDispatchToProps = dispatch => ({
  setTask: (task) => {
    dispatch(tasksActions.setTask(task));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
