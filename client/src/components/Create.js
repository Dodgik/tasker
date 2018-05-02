const React = require('react');
import { withRouter } from 'react-router'
import { connect } from 'react-redux';
import * as tasksActions from '../actions/tasks_actions';
import { Link } from 'react-router-dom';
import Cropper from 'react-cropper';


class Create extends React.Component {
  constructor(props, context) {
    super(props, context);
    
    this.state = {
      username: '',
      email: '',
      text: '',
      src: '',
      image: '',
      ...props.preview,
    };
  }
  
  componentWillReceiveProps(nextProps) {
    if (nextProps.actionTask) {
      let state = { ...nextProps.actionTask };

      if (this.state.sending && !state.sending && !state.error) {
        this.props.history.push('/')
      }
      
      this.setState(state);
    }
  }
  
  togglePreview = () => {
    let task = {
      username: this.refs.username.value,
      email: this.refs.email.value,
      text: this.refs.text.value,
      src: this.state.src,
      image: this.refs.image.files[0],
    }
    this.props.previewTask(task);
    this.props.history.push('/preview');
  }
  
  getCroppedSize = (width, height) => {
    var newWidth = width, newHeight = height;
    if (width > 320) {
      newWidth = 320;
      newHeight = Math.floor(height * 320 / width);
      if (newHeight > 240) {
        newHeight = 240;
        newWidth = Math.floor(width * 240 / height);
      }
    } else if (height > 240) {
      newHeight = 240;
      newWidth = Math.floor(width * 240 / height);
      if (newWidth > 320) {
        newWidth = 320;
        newHeight = Math.floor(height * 320 / width);
      }
    }
    return { width: newWidth, height: newHeight };
  }

  handleCreateClick = (e) => {
    const formData = new FormData();
    formData.append('username', this.refs.username.value);
    formData.append('email', this.refs.email.value);
    formData.append('text', this.refs.text.value);
    
    const { width, height } = this.cropper.img;
    if (width > 320 || height > 240) {
      const croppedSize = this.getCroppedSize(width, height);
      const canvas = this.cropper.getCroppedCanvas(croppedSize);
      canvas.toBlob(blob => {
        formData.append('image', blob);
        this.props.addTask(formData);
      });
    } else {
      const image = this.refs.image.files[0] || this.state.image;
      formData.append('image', image);
      this.props.addTask(formData);
    }
  }

  handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const image = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        this.setState({
          src: event.target.result,
          image: image,
        });
      }
      reader.readAsDataURL(e.target.files[0]);
    }
  }

  handleCloseClick = () => {
    this.props.previewTask(null);
  };
  
  render() {
    const error = this.props.actionTask.error;
    return (
      <div className="card border-dark">
        <h5 className="card-header">Create task</h5>
        <div className="card-body">
          <div className="input-group mb-2">
            <div className="input-group-prepend">
              <span className="input-group-text" style={{'minWidth': '110px'}}>User Name</span>
            </div>
            <input type="text" ref="username" defaultValue={this.state.username}
              className={error && error.username ? ("form-control is-invalid") : ("form-control")} />
            {error && error.username && (<div className="invalid-feedback">{error.username}</div>)}
          </div>
          <div className="input-group mb-2">
            <div className="input-group-prepend">
              <span className="input-group-text" style={{'minWidth': '110px'}}>Email</span>
            </div>
            <input type="text" ref="email" defaultValue={this.state.email}
              className={error && error.email ? ("form-control is-invalid") : ("form-control")} />
            {error && error.email && (<div className="invalid-feedback">{error.email}</div>)}
          </div>
          <div className="input-group mb-2">
            <div className="input-group-prepend">
              <span className="input-group-text" style={{'minWidth': '110px'}}>Image</span>
            </div>
            <div className="custom-file">
              <input type="file" ref="image" id="taskCreateImage" accept=".jpg,.gif,.png"
                onChange={this.handleFileChange.bind(true)}
                className={error && error.image ? ("custom-file-input is-invalid") : ("custom-file-input")} />
              <label className="custom-file-label" htmlFor="taskCreateImage">
                {this.state.src ? (
                  <img src={this.state.src} className="rounded" style={{'width': '26px', 'height': '26px'}} alt="..." ref="imagePreview"/>
                ) : (
                  "Choose image"
                )}
              </label>
            </div>
            {error && error.image && (<div className="invalid-feedback d-block">{error.image}</div>)}
            <Cropper
              style={{ display: 'none' }}
              guides={false}
              src={this.state.src}
              ref={cropper => { this.cropper = cropper; }}
            />
          </div>
          <div className="input-group mb-2">
            <div className="input-group-prepend">
              <span className="input-group-text" style={{'minWidth': '110px'}}>Text</span>
            </div>
            <textarea
              className={error && error.text ? ("form-control is-invalid") : ("form-control")}
              ref="text" rows="3" placeholder="Text"
              defaultValue={this.state.text} >
            </textarea>
            {error && error.text && (<div className="invalid-feedback">{error.text}</div>)}
          </div>
        </div>
        <div className="card-footer">
          <div className="btn-group justify-content-center w-100">
            <button type="button" className="btn btn-primary font-weight-bold" onClick={this.handleCreateClick.bind(true)}>Create</button>
            <button type="button" className="btn btn-light font-weight-bold" onClick={this.togglePreview.bind(true)}>Preview</button>
            <Link to="/" className="btn btn-secondary font-weight-bold" onClick={this.handleCloseClick.bind(true)}>Cancel</Link>
          </div>
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  actionTask: state.tasks.actionTask,
  preview: state.tasks.preview,
});

const mapDispatchToProps = dispatch => ({
  addTask: (task) => {
    dispatch(tasksActions.addTask(task));
  },
  previewTask: (task) => {
    dispatch(tasksActions.previewTask(task));
  },
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Create));
