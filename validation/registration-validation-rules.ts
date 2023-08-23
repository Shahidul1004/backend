import { body } from "express-validator";

const registrationValidationRules = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("No email is provided")
      .isEmail()
      .withMessage("Invalid email"),
    body("message").trim().notEmpty().withMessage("No message is provided"),
    body("delay")
      .trim()
      .notEmpty()
      .withMessage("Time delay is not provided")
      .custom((value) => !isNaN(+value))
      .withMessage("Time delay should be a number")
      .custom((value) => +value >= 0)
      .withMessage("Time delay should not be negative value"),
  ];
};

export default registrationValidationRules;
