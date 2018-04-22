const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : '';

  if (Validator.isEmpty(data.text)) {
    errors.text = 'Text field is required';
  }

  if (!Validator.isLength(data.text, { min: 10, max: 1000 })) {
    errors.text = 'Post must be between 10 and 1000 characters';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
