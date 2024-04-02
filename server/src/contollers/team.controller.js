import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Teams } from "../models/team.model.js";
import { Users } from "../models/user.model.js";

// create new team controller --------------------------
export const createTeam = asyncHandler(async (req, res) => {
  try {
    const { name, description, users } = req.body;

    let team = await Teams.findOne({name})

    if(team){
        throw new ApiError(400,"Team already exists")
    }

    let checkDomains = {};

    const checkUserPromise = users?.map(async (userId) => {
      let data = await Users.findById(userId);

      if (checkDomains.hasOwnProperty(data?.domain)) {
        throw new ApiError(400, "Unique Domain users are required");
      }

      checkDomains[data?.domain] = true

      Promise.resolve();
    });

    await Promise.all(checkUserPromise);

    team = await Teams.create({
      name,
      description,
      users,
    });

    return res
      .status(200)
      .json(new ApiResponse(200, team, "Team created successfully"));
  } catch (error) {
    throw new ApiError(400, error?.message || "Error occured in creating team");
  }
});

// view team controller -------------------
export const viewTeam = asyncHandler(async (req, res) => {
  const { id } = req.params;

  let team = await Teams.findById(id).populate("users")

  if (!team) {
    throw new ApiError(400, "Team not found!!!!");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, team, "Team fetched successfully"));
});
