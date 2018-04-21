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
    'instagram'
  ];
  dataFields = ['handle', 'status', 'skills'];
  dataFields.forEach(field => {
    data[field] = !isEmpty(data[field]) ? data[field] : '';
    if (Validator.isEmpty(data[field])) {
      errors[field] = `${field} field is required`;
    }
  });

  if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.email = 'Handle must be between 2 and 40 characters';
  }

  if (!isEmpty(data.website)) {
    siteUrls.forEach(url => {
      if (!Validator.isURL(data[url])) {
        errors[url] = 'Not a valid URL';
      }
    });
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
