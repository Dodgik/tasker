import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as userActions from '../actions/user_actions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { login: '', password: '' };
  }

  handleLogin = () => {
    this.props.loginSend({
      login: this.state.login,
      password: this.state.password,
    });
  }

  handleChangeLogin = (e) => {
    this.setState({ login: e.target.value });
  }

  handleChangePassword = (e) => {
    this.setState({ password: e.target.value });
  }
    
  render () {
    if (this.props.loggedIn) {
      return <Redirect to="/" />
    }
    return (
      <div className="m-auto pt-5 w-25">
        <div className="mb-2">
          <input className="form-control" type="text" placeholder="Login" value={this.state.login} onChange={this.handleChangeLogin} />
        </div>
        <div className="mb-2">
          <input className="form-control" type="password" placeholder="Password" value={this.state.password} onChange={this.handleChangePassword} />
        </div>
        {this.props.error ? (<div className="text-danger rounded p-0 mb-2 mt-2 bg-white text-center">{this.props.error}</div>) : (<div className="mb-2 mt-2"></div>)}
        {this.props.sending ? (<div className="mt-2 text-warning text-center">Sending...</div>) : (
          <div className="btn-block text-center">
            <button type="submit" className="btn btn-primary mr-2" onClick={this.handleLogin}>Log In</button>
            <Link to="/" className="btn btn-secondary ml-2">Cancel</Link>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  loggedIn: state.user.loggedIn,
  sending: state.user.sending,
  message: state.user.message,
  error: state.user.error,
});

const mapDispatchToProps = dispatch => ({
  loginSend: (user) => {
    dispatch(userActions.loginSend(user));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);