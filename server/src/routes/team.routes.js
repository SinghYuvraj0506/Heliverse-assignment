import { Router } from "express";
import { createTeam, viewTeam } from "../contollers/team.controller.js";
import { teamCreationValidator } from "../validators/team.validator.js";
import { validate } from "../validators/validate.js";

const router = Router()

router.route("/").post(teamCreationValidator(),validate,createTeam)
router.route("/:id").get(viewTeam)

export default router;
