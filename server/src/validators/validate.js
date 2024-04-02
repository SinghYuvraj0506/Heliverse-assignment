import { validationResult } from "express-validator";
import { ApiError } from "../utils/ApiError.js";

export const validate = (req, res, next) => {

  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  
  console.log(errors)
  throw new ApiError(422, "Received data is not valid");
};
