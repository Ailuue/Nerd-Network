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
        {profile && Object.keys(profile).length > 0 ? (
          <NavItem>
            <NavLink tag={Link} to={`/profile/${profile.handle}`}>
              Profile
            </NavLink>
          </NavItem>
        ) : null}
        <NavItem>
          <NavLink tag={Link} to="/dashboard">
            Dashboard
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink onClick={this.onLogoutClick}>
            <img
              src={user.avatar}
              alt={user.name}
              title="Gravatar is required to see an image"
              style={{ width: '25px', marginRight: '5px' }}
            />
            Logout
          </NavLink>
        </NavItem>
      </Nav>
    );

    const guestLinks = (
      <Nav className="ml-auto" navbar>
        <NavItem>
          <NavLink tag={Link} to="/register">
            Sign Up
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to="/login">
            Login
          </NavLink>
        </NavItem>
      </Nav>
    );

    const posts = (
      <NavItem>
        <NavLink tag={Link} to="/posts">
          The Conversation
        </NavLink>
      </NavItem>
    );

    return (
      <nav className="nav-bar">
        <Navbar color="dark" dark expand="md">
          <NavbarBrand tag={Link} to="/">
            Nerd Network
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="mr-auto" navbar nav>
              <NavItem>
                <NavLink to="/profiles">Fellow Nerds</NavLink>
              </NavItem>
              {isAuthenticated ? posts : null}
            </Nav>
            {isAuthenticated ? authLinks : guestLinks}
          </Collapse>
        </Navbar>
      </nav>
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
