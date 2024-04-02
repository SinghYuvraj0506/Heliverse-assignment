import { body } from "express-validator";
import { AvailableDomains, AvailableGenders } from "../constants.js";

const userCreationValidator = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email is invalid"),
    body("first_name")
      .trim()
      .notEmpty()
      .withMessage("First Name is required"),
    body("last_name")
      .trim()
      .notEmpty()
      .withMessage("Last Name is required"),
    body("gender")
        .isIn(AvailableGenders)
        .withMessage("Invalid gender"),
    body("domain")
        .isIn(AvailableDomains)
        .withMessage("Invalid domain"),
    body("available")
        .isBoolean()
        .withMessage("Invalid availability"),
  ];
};


const userUpdateValidator = () => {
  return [
    body("email")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email is invalid"),
    body("first_name")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("First Name is required"),
    body("last_name")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("Last Name is required"),
    body("gender")
      .optional()
      .isIn(AvailableGenders)
      .withMessage("Invalid gender"),
    body("domain")
      .optional()
      .isIn(AvailableDomains)
      .withMessage("Invalid domain"),
    body("available")
      .optional()
      .isBoolean()
      .withMessage("Invalid availability"),
  ];
};



export {userCreationValidator,userUpdateValidator}