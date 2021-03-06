import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import { createProfile, getCurrentProfile } from '../../actions/profileActions';

class UpdateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      handle: '',
      company: '',
      website: '',
      location: '',
      level: '',
      skills: '',
      bio: "I'm a proud nerd!",
      twitter: '',
      facebook: '',
      linkedin: '',
      youtube: '',
      instagram: '',
      githubprofile: '',
      errors: {}
    };
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    //Check for existing values and replace (EDIT MODE)
    if (
      nextProps.profile.profile &&
      Object.keys(nextProps.profile.profile).length > 0
    ) {
      const { skills, social, ...profile } = nextProps.profile.profile;
      this.setState(prevState => ({
        ...prevState,
        ...profile,
        ...social,
        skills: skills.join(',')
      }));
    }
  }

  toggleSocial = () => {
    this.setState(prevState => ({
      displaySocialInputs: !prevState.displaySocialInputs
    }));
  };

  onSubmit = event => {
    event.preventDefault();

    const profileData = {};

    Object.keys(this.state).forEach(value => {
      if (value === 'handle') {
        profileData.handle = this.state.handle.toLowerCase();
      } else {
        profileData[value] = this.state[value];
      }
    });

    this.props.createProfile(profileData, this.props.history);
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  checkEditButton = () => {
    if (this.props.location.state) {
      return (
        <button
          className="btn btn-light"
          onClick={() => this.props.history.push('/dashboard')}
        >
          Go Back
        </button>
      );
    } else {
      return null;
    }
  };

  checkEditTitle = () => {
    if (this.props.location.state) {
      return 'Edit ';
    } else {
      return 'Create ';
    }
  };

  checkEditMessage = () => {
    if (!this.props.location.state) {
      return <p className="lead text-center">Tell us about your nerdy self!</p>;
    }
  };

  render() {
    const { errors, displaySocialInputs } = this.state;

    let socialInputs;

    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder="Twitter Profile URL"
            name="twitter"
            icon="fab fa-twitter"
            value={this.state.twitter}
            onChange={this.onChange}
            error={errors.twitter}
          />
          <InputGroup
            placeholder="Facebook Profile URL"
            name="facebook"
            icon="fab fa-facebook"
            value={this.state.facebook}
            onChange={this.onChange}
            error={errors.facebook}
          />
          <InputGroup
            placeholder="Linkedin Profile URL"
            name="linkedin"
            icon="fab fa-linkedin"
            value={this.state.linkedin}
            onChange={this.onChange}
            error={errors.linkedin}
          />
          <InputGroup
            placeholder="Youtube Profile URL"
            name="youtube"
            icon="fab fa-youtube"
            value={this.state.youtube}
            onChange={this.onChange}
            error={errors.youtube}
          />
          <InputGroup
            placeholder="Instagram Profile URL"
            name="instagram"
            icon="fab fa-instagram"
            value={this.state.instagram}
            onChange={this.onChange}
            error={errors.instagram}
          />
          <InputGroup
            placeholder="GitHub Profile URL"
            name="githubprofile"
            icon="fab fa-github"
            value={this.state.githubprofile}
            onChange={this.onChange}
            error={errors.githubprofile}
          />
        </div>
      );
    }

    //Select options for status
    const options = [
      { label: '* Select Your Nerd Level', value: 0 },
      { label: 'Level 1 Nerd', value: 'Level 1' },
      { label: 'Level 2 Nerd', value: 'Level 2' },
      { label: 'Level 3 Nerd', value: 'Level 3' },
      { label: 'Level 4 Nerd', value: 'Level 4' },
      { label: 'Level 5 Nerd', value: 'Level 5' },
      { label: 'Level 6 Nerd', value: 'Level 6' },
      { label: 'Level 7 Nerd', value: 'Level 7' },
      { label: 'Level 8 Nerd', value: 'Level 8' },
      { label: 'Level 9 Nerd', value: 'Level 9' },
      { label: 'Level 10 Nerd', value: 'Level 10' }
    ];
    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              {this.checkEditButton()}
              <h1 className="display-4 text-center">
                {this.checkEditTitle()}
                Nerd Profile
              </h1>
              {this.checkEditMessage()}
              <small className="d-block pb-3">* are required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Your Handle"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="What should your fellow nerds call you? (We can't have too many Spocks...)"
                />
                <SelectListGroup
                  placeholder="Nerd Level"
                  name="level"
                  value={this.state.level}
                  onChange={this.onChange}
                  options={options}
                  error={errors.level}
                  info="Let everyone know just how much of a nerd you are."
                />
                <TextFieldGroup
                  placeholder="Company"
                  name="company"
                  value={this.state.company}
                  onChange={this.onChange}
                  error={errors.company}
                  info="Whom do you WORK for!?"
                />
                <TextFieldGroup
                  placeholder="Website"
                  name="website"
                  value={this.state.website}
                  onChange={this.onChange}
                  error={errors.website}
                  info="Where is your internet home base?"
                />
                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                  info="Where has The Matrix placed you?"
                />
                <TextFieldGroup
                  placeholder="Skills"
                  name="skills"
                  value={this.state.skills}
                  onChange={this.onChange}
                  error={errors.skills}
                  info="Where did you place your skillpoints? (!Use comma separated values!"
                />
                <TextAreaFieldGroup
                  placeholder="Bio"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                  error={errors.bio}
                  info="What's your origin story?"
                />

                <div className="mb-3">
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={this.toggleSocial}
                  >
                    Add Links to Your Other Social Networks
                  </button>
                  <span className="text-muted">Optional</span>
                </div>
                {socialInputs}
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UpdateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  UpdateProfile
);
