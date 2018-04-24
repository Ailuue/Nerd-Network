const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data) {
  let errors = {};
  siteUrls = [
    'website',
    'youtube',
    'twitter',
    'facebook',
    'linkedin',
    'instagram',
    'githubprofile'
  ];
  dataFields = ['handle', 'level', 'skills'];
  dataFields.forEach(field => {
    data[field] = !isEmpty(data[field]) ? data[field] : '';
    if (Validator.isEmpty(data[field])) {
      errors[field] = capitalize(`${field} field is required`);
    }
  });

  if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
    if (!errors.handle) {
      errors.handle = 'Handle must be between 2 and 40 characters';
    }
  }

  siteUrls.forEach(url => {
    if (data[url]) {
      if (!Validator.isURL(data[url])) {
        errors[url] = 'Not a valid URL';
      }
    }
  });

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

function capitalize(str) {
  let firstChar = str.slice(0, 1);
  firstChar = firstChar.toUpperCase();
  str = str.split('');
  str.splice(0, 1);
  str.unshift(firstChar);
  str = str.join('');
  return str;
}
