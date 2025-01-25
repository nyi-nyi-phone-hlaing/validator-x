### `README.md`:

# validator-x

A set of essential and user-specific validation utilities for Express applications, built using `express-validator`. This package provides reusable validation functions for common use cases like URL, phone number, email, username, and more.

## Installation

To install the package, run the following command:

```bash
npm install validator-x
```

## Usage

You can use the utility functions in your Express application by importing them from the package.

```javascript
const express = require("express");
const {
  checkURL,
  checkPhoneNumber,
  checkUsername,
  checkEmail,
} = require("validator-x");
const { validationResult } = require("express-validator");

const app = express();

// Example route using the validation functions
app.post(
  "/register",
  [
    checkUsername("username"), // Validate username
    checkEmail("email"), // Validate email
    checkPhoneNumber("phone"), // Validate phone number
    checkURL("website"), // Validate URL
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    res.send("User registered successfully!");
  }
);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
```

## Validation Functions

### `checkName = ( fieldName = "name", min = 2, max = 50, allowSpaces = true, allowSpecialChars = false )`

```javascript
checkName("name", 4, 20, false, true);
```

### checkEmail = ( fieldName = "email", required = true, allowedDomains = [] )

```javascript
// Optional list of allowed domains (e.g., ["gmail.com", "yahoo.com"])
checkName("email", false, ["gamil.com"]);
```

### checkPassword = ( fieldName = "password", minLength = 8, maxLength = 23, requireUppercase = true, requireLowercase = true, requireNumber = true, requireSpecialChar = true )

```javascript
checkPassword("password", 6, 30, true, false, false, true);
```

### `checkURL(fieldName = 'url')`

Validates if the input field is a valid URL.

```javascript
checkURL("website");
```

### `checkPhoneNumber(fieldName = 'phone')`

Validates if the input field is a valid phone number.

```javascript
checkPhoneNumber("phone");
```

### `checkDate(fieldName = 'date')`

Validates if the input field is a valid date.

```javascript
checkDate("birthdate");
```

### `checkNumber(fieldName = 'number', min = 1, max = 100)`

Validates if the input field is a number within a specified range.

```javascript
checkNumber("age", 18, 65);
```

### `checkLength(fieldName = 'text', min = 4, max = 16)`

Validates if the input field is a string with a specified length range.

```javascript
checkLength("username", 4, 16);
```

### `checkAlphanumeric(fieldName = 'text')`

Validates if the input field contains only alphanumeric characters (letters and numbers).

```javascript
checkAlphanumeric("username");
```

### `checkAlpha(fieldName = 'text')`

Validates if the input field contains only alphabetic characters (letters).

```javascript
checkAlpha("firstName");
```

### `checkCustomPattern(fieldName = 'text', regex, errorMessage = 'Invalid input format')`

Validates if the input field matches a custom regex pattern.

```javascript
checkCustomPattern(
  "postalCode",
  /^[A-Za-z0-9]{5,10}$/,
  "Invalid postal code format"
);
```

### `checkCreditCard(fieldName = 'card')`

Validates if the input field is a valid credit card number.

```javascript
checkCreditCard("creditCard");
```

### `checkJSON(fieldName = 'data')`

Validates if the input field is a valid JSON string.

```javascript
checkJSON("data");
```

### `checkBoolean(fieldName = 'flag')`

Validates if the input field is a boolean value.

```javascript
checkBoolean("isActive");
```

### `checkUniqueEmail(fieldName = 'email')`

Validates if the email is unique in the database.

```javascript
checkUniqueEmail("email");
```

### `checkUniqueUsername(fieldName = 'username', model)`

Validates if the username is unique in the specified model's database.

```javascript
checkUniqueUsername("username", UserModel);
```

### `checkCustomUnique(fieldName, model, field)`

Validates if the field is unique in the specified model's database.

```javascript
checkCustomUnique("username", UserModel, "username");
```

### `checkArray(fieldName = 'items')`

Validates if the input field is an array.

```javascript
checkArray("items");
```

### `checkPhoneNumberByLocale(fieldName = 'phone', locale = 'any')`

Validates if the phone number is valid for the specified locale.

```javascript
checkPhoneNumberByLocale("phone", "en-US");
```

### `checkLocalizedEmail(fieldName = 'email', locale = 'en-US')`

Validates if the email is valid for the specified locale.

```javascript
checkLocalizedEmail("email", "en-US");
```

### `checkCurrency(fieldName = 'amount', currencySymbol = '$')`

Validates if the amount is a valid currency value.

```javascript
checkCurrency("amount", "$");
```

### `checkLocalizedDate(fieldName = 'date', format = 'YYYY-MM-DD')`

Validates if the date is in the specified format.

```javascript
checkLocalizedDate("date", "MM/DD/YYYY");
```

### `checkStreetAddress(fieldName = 'address')`

Validates if the street address is within a valid length.

```javascript
checkStreetAddress("address");
```

### `checkPostalCode(fieldName = 'postalCode', locale = 'US')`

Validates if the postal code is valid for the specified locale.

```javascript
checkPostalCode("postalCode", "US");
```

### `checkCityName(fieldName = 'city')`

Validates if the city name contains only alphabetic characters.

```javascript
checkCityName("city");
```

### `checkUniqueFieldByLocale(fieldName = 'username', model, locale = 'en-US')`

Validates if the field is unique in the specified locale's database.

```javascript
checkUniqueFieldByLocale("username", UserModel, "en-US");
```

### `checkLatinText(fieldName = 'text')`

Validates if the text contains only Latin characters (A-Z, a-z).

```javascript
checkLatinText("username");
```

### `checkGender(fieldName = 'gender', locale = 'en-US')`

Validates if the gender value is one of the valid options.

```javascript
checkGender("gender", "en-US");
```

### `checkTimezone(fieldName = 'timezone', validTimezones = [...])`

Validates if the timezone is part of the predefined list of valid IANA timezones.

```javascript
checkTimezone("timezone", [
  "Africa/Abidjan",
  "Europe/London",
  "America/New_York",
]);
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### Explanation:

- **Installation**: This section provides users with the command to install the package.
- **Usage**: This section shows how to use the validation functions in an Express app.
- **Validation Functions**: A list of all the validation functions you provide, with examples of how to use each one.

## Author

This package was created by [Nyi Nyi Phone Hlaing](https://github.com/nyi-nyi-phone-hlaing), a passionate software developer focused on building tools that make development easier and more efficient. Nyi Nyi is a MERN Stack Developer and a tech enthusiast, working towards becoming a professional full-stack developer and contributing to open-source projects.

You can find more information about Nyi Nyi's work at [GitHub](https://github.com/nyi-nyi-phone-hlaing) or [YouTube](https://www.youtube.com/@nyi_nyi_phone_hlaing).

Feel free to adjust the details based on your actual package and use case.
