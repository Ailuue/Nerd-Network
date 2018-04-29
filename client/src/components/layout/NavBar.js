import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';

import { logoutUser } from '../../actions/authActions';
import { clearCurrentProfile } from '../../actions/profileActions';

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: true
    };
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  onLogoutClick = event => {
    event.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const { profile } = this.props.profile;

    const authLinks = (
      <Nav className="ml-auto" navbar>
        {profile ? (
          <NavItem>
            <NavLink>
              <Link to={`/profile/${profile.handle}`} className="nav-link">
                Profile
              </Link>
            </NavLink>
          </NavItem>
        ) : null}
        <NavItem>
          <NavLink>
            <Link to="/dashboard" className="nav-link">
              Dashboard
            </Link>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink>
            <a href="" onClick={this.onLogoutClick} className="nav-link">
              <img
                src={user.avatar}
                alt={user.name}
                title="Gravatar is required to see an image"
                style={{ width: '25px', marginRight: '5px' }}
              />{' '}
              Logout
            </a>
          </NavLink>
        </NavItem>
      </Nav>
    );

    const guestLinks = (
      <Nav className="ml-auto" navbar>
        <NavItem>
          <NavLink>
            <Link className="nav-link" to="/register">
              Sign Up
            </Link>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink>
            <Link className="nav-link" to="/login">
              Login
            </Link>
          </NavLink>
        </NavItem>
      </Nav>
    );

    const posts = (
      <NavItem>
        <NavLink>
          <Link className="nav-link" to="/posts">
            The Conversation
          </Link>
        </NavLink>
      </NavItem>
    );

    return (
      <div>
        <Navbar color="dark" dark expand="md">
          <NavbarBrand>
            <Link className="navbar-brand" to="/">
              Nerd Network
            </Link>
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink>
                  <Link className="nav-link" to="/profiles">
                    {' '}
                    Fellow Nerds
                  </Link>
                </NavLink>
              </NavItem>
              {isAuthenticated ? posts : null}
            </Nav>
            {isAuthenticated ? authLinks : guestLinks}
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

NavBar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  clearCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(
  NavBar
);
