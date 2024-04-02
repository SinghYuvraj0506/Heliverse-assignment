import { body } from "express-validator";

const teamCreationValidator = () => {
  return [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("users").custom((value, { req }) => {
      if (!Array.isArray(value) || value.length === 0) {
        throw new Error("Users must be a non-empty array");
      }
      return true;
    }),
  ];
};

export { teamCreationValidator };
