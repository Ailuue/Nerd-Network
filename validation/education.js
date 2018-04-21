const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateExperienceInput(data) {
  let errors = {};

  dataFields = ['school', 'degree', 'studyfield', 'from'];
  dataFields.forEach(field => {
    data[field] = !isEmpty(data[field]) ? data[field] : '';
    if (Validator.isEmpty(data[field])) {
      field === 'from'
        ? (errors[field] = `${field} date is required`)
        : field === 'studyfield'
          ? (errors[field] = `field of study is required`)
          : (errors[field] = `${field} field is required`);
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
