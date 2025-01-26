const { body } = require("express-validator");

// Check if URL is valid
const checkURL = (fieldName = "url") => [
  body(fieldName).isURL().withMessage(`${fieldName} must be a valid URL`),
];

// Check if phone number is valid
const checkPhoneNumber = (fieldName = "phone") => [
  body(fieldName)
    .isMobilePhone("any", { strictMode: false })
    .withMessage(`${fieldName} must be a valid phone number`),
];

// Check if date is valid
const checkDate = (fieldName = "date") => [
  body(fieldName).isDate().withMessage(`${fieldName} must be a valid date`),
];

// Check if number is within the range
const checkNumber = (fieldName = "number", min = 1, max = 100) => [
  body(fieldName)
    .isInt({ min, max })
    .withMessage(`${fieldName} must be a number between ${min} and ${max}`),
];

// Check if text length is within the range
const checkLength = (fieldName = "text", min = 4, max = 16) => [
  body(fieldName)
    .isLength({ min, max })
    .withMessage(`${fieldName} must be between ${min} and ${max} characters`),
];

// Check if text contains only alphanumeric characters
const checkAlphanumeric = (fieldName = "text") => [
  body(fieldName)
    .isAlphanumeric()
    .withMessage(`${fieldName} can only contain letters and numbers`),
];

// Check if text contains only alphabetic characters
const checkAlpha = (fieldName = "text") => [
  body(fieldName)
    .isAlpha()
    .withMessage(`${fieldName} can only contain alphabetic characters`),
];

// Check if text matches a custom regex pattern
const checkCustomPattern = (
  fieldName = "text",
  regex,
  errorMessage = "Invalid input format"
) => [body(fieldName).matches(regex).withMessage(errorMessage)];

// Check if the field is a valid credit card number
const checkCreditCard = (fieldName = "card") => [
  body(fieldName)
    .isCreditCard()
    .withMessage(`${fieldName} must be a valid credit card number`),
];

// Check if the field is a valid JSON string
const checkJSON = (fieldName = "data") => [
  body(fieldName).custom((value) => {
    try {
      JSON.parse(value);
      return true;
    } catch (error) {
      throw new Error(`${fieldName} must be a valid JSON string`);
    }
  }),
];

// Check if the field is a boolean
const checkBoolean = (fieldName = "flag") => [
  body(fieldName)
    .isBoolean()
    .withMessage(`${fieldName} must be a boolean value`),
];

// Check if email is unique (using the passed model)
const checkUniqueEmail = (fieldName = "email", model) => [
  body(fieldName)
    .custom(async (value) => {
      const existingUser = await model.findOne({ email: value });
      if (existingUser) {
        throw new Error(`${fieldName} is already taken`);
      }
      return true; // Return true if no existing user with the same email
    })
    .withMessage(`${fieldName} must be unique`),
];

// Check if the field (username) is unique (using the passed model)
const checkUnique = (
  fieldName = "username",
  model,
  key = "username",
  message = ""
) => [
  body(fieldName)
    .custom(async (value) => {
      // Dynamically create the query object based on 'key'
      const query = {};
      query[key] = value;

      const existingUser = await model.findOne(query);
      if (existingUser) {
        throw new Error(`${existingUser.key} is already taken`);
      }
      return true; // Return true if no existing user with the same field value
    })
    .withMessage(message),
];

// Generalized check for unique fields in any model (using the passed model and field)
const checkCustomUnique = (fieldName, model, field) => [
  body(fieldName)
    .custom(async (value) => {
      const existingRecord = await model.findOne({ [field]: value });
      if (existingRecord) {
        throw new Error(`${fieldName} is already taken`);
      }
      return true; // Return true if no record with the same value exists
    })
    .withMessage(`${fieldName} must be unique`),
];

const checkArray = (fieldName = "items") => [
  body(fieldName)
    .isArray()
    .withMessage(`${fieldName} must be an array`)
    .notEmpty()
    .withMessage(`${fieldName} cannot be empty`),
];

// Phone number validation based on locale
const checkPhoneNumberByLocale = (fieldName = "phone", locale = "any") => [
  body(fieldName)
    .isMobilePhone(locale, { strictMode: false })
    .withMessage(
      `${fieldName} must be a valid phone number for locale ${locale}`
    ),
];

// Email validation based on a locale
const checkLocalizedEmail = (fieldName = "email") => [
  body(fieldName)
    .isEmail()
    .withMessage(`${fieldName} must be a valid email`)
    .normalizeEmail({ all_lowercase: true })
    .isLength({ max: 255 })
    .withMessage(`${fieldName} cannot exceed 255 characters`),
];

// Currency validation (supports various formats: USD, EUR, etc.)
const checkCurrency = (fieldName = "amount", currencySymbol = "$") => [
  body(fieldName)
    .matches(new RegExp(`^${currencySymbol}\\d+(\\.\\d{1,2})?$`))
    .withMessage(
      `${fieldName} must be a valid currency amount (e.g., ${currencySymbol}100.00)`
    ),
];

// Date validation based on specific locale (ISO, US, EU formats)
const checkLocalizedDate = (fieldName = "date", format = "YYYY-MM-DD") => [
  body(fieldName)
    .isDate({ format })
    .withMessage(`${fieldName} must be in the format ${format}`),
];

// Street Address Validation
const checkStreetAddress = (fieldName = "address") => [
  body(fieldName)
    .isLength({ min: 5, max: 100 })
    .withMessage(`${fieldName} must be between 5 and 100 characters long`),
];

// Postal Code Validation (generic)
const checkPostalCode = (fieldName = "postalCode", locale = "US") => [
  body(fieldName)
    .matches(/^(\d{5})(?:[-\s]?\d{4})?$/) // For example, U.S. zip codes
    .withMessage(
      `${fieldName} must be a valid postal code for locale ${locale}`
    ),
];

// City Name Validation (useful for global cities)
const checkCityName = (fieldName = "city") => [
  body(fieldName)
    .isAlpha()
    .withMessage(`${fieldName} can only contain alphabetic characters`),
];

// Custom Unique Username based on locale or country
const checkUniqueFieldByLocale = (
  fieldName = "username",
  model,
  locale = "en-US"
) => [
  body(fieldName)
    .custom(async (value) => {
      const existingUser = await model.findOne({ [fieldName]: value, locale });
      if (existingUser) {
        throw new Error(
          `${fieldName} is already taken in the ${locale} region`
        );
      }
      return true;
    })
    .withMessage(`${fieldName} must be unique in the ${locale} region`),
];

// Validate text with only Latin characters (useful for certain locales)
const checkLatinText = (fieldName = "text") => [
  body(fieldName)
    .matches(/^[A-Za-z\s]+$/) // Latin letters and spaces only
    .withMessage(`${fieldName} can only contain Latin letters`),
];

// Gender validation for a global application
const checkGender = (fieldName = "gender") => [
  body(fieldName)
    .isIn(["male", "female", "non-binary", "other"]) // You can adjust options based on your localization needs
    .withMessage(`${fieldName} must be one of the valid gender options`),
];

// Timezone validation to ensure uniqueness
const checkTimezone = (
  fieldName = "timezone",
  validTimezones = [
    "Africa/Abidjan",
    "Africa/Cairo",
    "Asia/Kolkata",
    "America/New_York",
    "Europe/London",
  ]
) => [
  body(fieldName)
    .custom((value) => {
      // Check if the value exists in the predefined valid timezones list
      if (!validTimezones.includes(value)) {
        throw new Error(`${value} is not a valid timezone`);
      }
      return true;
    })
    .withMessage(`${fieldName} must be a valid IANA timezone`),
];

// Custom validator function to check if value is part of the allowed enum values
const checkEnum = (fieldName = "role", enumValues = ["user", "admin"]) => {
  return body(fieldName).custom((value) => {
    if (!enumValues.includes(value)) {
      throw new Error(
        `Invalid value. Allowed values are: ${enumValues.join(", ")}`
      );
    }
    return true; // If the value is valid, return true
  });
};

module.exports = {
  checkURL,
  checkPhoneNumber,
  checkDate,
  checkNumber,
  checkLength,
  checkAlphanumeric,
  checkAlpha,
  checkCustomPattern,
  checkCreditCard,
  checkJSON,
  checkBoolean,
  checkUniqueEmail,
  checkUnique,
  checkCustomUnique,
  checkArray,
  checkPhoneNumberByLocale,
  checkLocalizedEmail,
  checkCurrency,
  checkLocalizedDate,
  checkStreetAddress,
  checkPostalCode,
  checkCityName,
  checkUniqueFieldByLocale,
  checkLatinText,
  checkGender,
  checkTimezone,
  checkEnum,
};
