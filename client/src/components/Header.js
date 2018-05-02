import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as userActions from '../actions/user_actions';


class Header extends Component {
  handleLogout(e) {
    e.preventDefault();
    this.props.logoutSend();
    return false;
  }

  render() {
    return (
      <div className="row m-0">
        <div className="col-md-4 mt-1 offset-md-4 text-center">
          Welcome,
          <span className="ml-2">{this.props.displayName}</span>
        </div>
        <div className="col-md-4 mt-1 text-right">
          {this.props.loggedIn ? (
            <a href="#" className="font-weight-bold m-2 text-dark" onClick={this.handleLogout.bind(this)}>Logout</a>
          ):(
            <Link to="/login" className="font-weight-bold m-2 text-dark">Login</Link>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.user.loggedIn,
  displayName: state.user.displayName,
});

const mapDispatchToProps = dispatch => ({
  logoutSend: () => {
    dispatch(userActions.logoutSend());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
