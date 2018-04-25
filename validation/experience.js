const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateExperienceInput(data) {
  let errors = {};

  dataFields = ['title', 'company', 'location', 'from'];
  dataFields.forEach(field => {
    data[field] = !isEmpty(data[field]) ? data[field] : '';
    if (Validator.isEmpty(data[field])) {
      field === 'from'
        ? (errors[field] = capitalize(`${field} date is required`))
        : (errors[field] = capitalize(`${field} field is required`));
    }
  });

  if (!Validator.isISO8601(data.from)) {
    errors.from = 'Please format to YYYY-MM-DD';
  }

  if (data.to && !Validator.isISO8601(data.to)) {
    errors.to = 'Please format to YYYY-MM-DD';
  }

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
