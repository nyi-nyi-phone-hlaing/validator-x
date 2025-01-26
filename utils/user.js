const { body } = require("express-validator");

const checkName = (
  fieldName = "name",
  min = 2,
  max = 50,
  allowSpaces = true,
  allowSpecialChars = false
) => {
  let regex;

  if (allowSpecialChars) {
    // If special characters are allowed, allow letters, spaces, hyphens, apostrophes, and underscores
    regex = allowSpaces
      ? /^[a-zA-Z\s\-_'_]+$/ // Allow letters, spaces, hyphens, apostrophes, and underscores
      : /^[a-zA-Z\-_'_]+$/; // Allow letters, hyphens, apostrophes, and underscores
  } else {
    // If special characters are not allowed, only allow letters (and spaces if allowed)
    regex = allowSpaces
      ? /^[a-zA-Z\s]+$/ // Allow letters and spaces
      : /^[a-zA-Z]+$/; // Only allow letters
  }

  return [
    body(fieldName)
      .trim()
      .isLength({ min, max })
      .withMessage(
        `${fieldName} must be between ${min} and ${max} characters long`
      )
      .matches(regex)
      .withMessage(
        `${fieldName} can only contain ${
          allowSpaces ? "letters, spaces" : "letters"
        }${allowSpecialChars ? ", hyphens, apostrophes, and underscores" : ""}`
      ),
  ];
};

const checkEmail = (
  fieldName = "email", // Field name to validate
  required = true, // Whether the email is required or optional
  allowedDomains = [] // Optional list of allowed domains (e.g., ["gmail.com", "yahoo.com"])
) => {
  let rule = body(fieldName)
    .trim()
    .isEmail()
    .withMessage(`${fieldName} must be a valid email address`);

  if (required) {
    rule = rule.notEmpty().withMessage(`${fieldName} is required`);
  }

  if (allowedDomains.length > 0) {
    const domainPattern = allowedDomains.join("|").replace(/\./g, "\\.");
    const regex = new RegExp(`@(${domainPattern})$`);
    rule = rule
      .matches(regex)
      .withMessage(
        `${fieldName} must be from an allowed domain (${allowedDomains.join(
          ", "
        )})`
      );
  }

  return [rule];
};

const checkPassword = (
  fieldName = "password", // Field name to validate
  minLength = 8, // Minimum length for the password
  maxLength = 23, // Maximum length for the password
  requireUppercase = true, // Require at least one uppercase letter
  requireLowercase = true, // Require at least one lowercase letter
  requireNumber = true, // Require at least one number
  requireSpecialChar = true // Require at least one special character
) => {
  let rule = body(fieldName)
    .trim()
    .isLength({ min: minLength, max: maxLength })
    .withMessage(
      `${fieldName} must be between ${minLength} and ${maxLength} characters long`
    );

  if (requireUppercase) {
    rule = rule
      .matches(/[A-Z]/)
      .withMessage(`${fieldName} must contain at least one uppercase letter`);
  }

  if (requireLowercase) {
    rule = rule
      .matches(/[a-z]/)
      .withMessage(`${fieldName} must contain at least one lowercase letter`);
  }

  if (requireNumber) {
    rule = rule
      .matches(/\d/)
      .withMessage(`${fieldName} must contain at least one number`);
  }

  if (requireSpecialChar) {
    rule = rule
      .matches(/[!@#$%^&*(),.?":{}|<>]/)
      .withMessage(`${fieldName} must contain at least one special character`);
  }

  return [rule];
};

module.exports = { checkName, checkEmail, checkPassword };
