import { Router } from "express";
import { ViewUsers, getUser } from "../contollers/user.controller.js";
import { userCreationValidator, userUpdateValidator } from "../validators/user.validator.js";
import { createUser } from "../contollers/user.controller.js";
import { validate } from "../validators/validate.js";
import { deleteUser } from "../contollers/user.controller.js";
import { updateUser } from "../contollers/user.controller.js";

const router = Router()

router.route("/").get(ViewUsers)
router.route("/:id").get(getUser)
router.route("/").post(userCreationValidator(),validate,createUser)
router.route("/:id").put(userUpdateValidator(),validate,updateUser)
router.route("/:id").delete(deleteUser)

export default router;