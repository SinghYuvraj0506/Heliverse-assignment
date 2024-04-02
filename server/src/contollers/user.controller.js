import { Users } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"

// fetch users controller --------------------------
export const ViewUsers = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 20,
    search = "",
    domain,
    gender,
    available,
  } = req.query;

  const pipeline = [
    {
      $addFields: {
        fullName: {
          $concat: ["$first_name", " ", "$last_name"],
        },
      },
    },
    {
      $match: {
        fullName: {
          $regex: new RegExp(`.*${search}.*`, "i"),
        },
        domain: domain ? { $eq: domain } : { $ne: null },
        available: ["true","false"].includes(available) ? { $eq: available === "true" ? true : false } : { $ne: null },
        gender: gender ? { $eq: gender } : { $ne: null },
      },
    },
    {
      $project:{
        id:1,
        fullName:1,
        avatar:1,
        gender:1,
        domain:1,
        available:1
      }
    }
  ]

  // counting total results -----------------------------------
  const userCount = await Users.aggregate([
    ...pipeline,
    {
        $count:"count"
    }
  ])

   // fetching the users for corresponfing pages -----------------------------------
  const users = await Users.aggregate(pipeline)
    .skip((parseInt(page) - 1) * parseInt(limit))
    .limit(parseInt(limit));


  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { data: users, page, limit, count: users?.length , totalUsers:userCount[0]?.count , totalPages:Math.ceil(userCount[0]?.count/limit) },
        "User fetched Successfully!!"
      )
    );
});

// get user data from id controller --------------------------
export const getUser = asyncHandler(async (req, res) => {
    const {id} = req.params

    const user = await Users.findOne({id:id})

    if(!user){
        throw new ApiError(400,"User Not Found!!")
    }


    return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        user,
        "User Found Successfully"
      )
    )
})

// create new user controller --------------------------
export const createUser = asyncHandler(async (req, res) => {

    const {email,first_name,last_name,avatar,gender,available,domain} = req.body

    const user = await Users.create({
      email,first_name,last_name,avatar,gender,available,domain
    })

    return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        user,
        "User created successfully"
      )
    )
})

// update user using id controller --------------------------
export const updateUser = asyncHandler(async(req,res)=>{
  const {id} = req.params

  let user = await Users.findOne({id:id})

  if(!user){
    throw new ApiError(400,"User not found!!!!!!!")
  }

  user = await Users.findByIdAndUpdate(
    user?._id,
    {
      $set:{
        ...req.body
      }
    },
    {new:true}
  )

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        user,
        "User updated successfully"
      )
    )

})


// delete user using id controller --------------------------
export const deleteUser = asyncHandler(async(req,res)=>{
  const {id} = req.params

  let user = await Users.findOne({id:id})

  if(!user){
    throw new ApiError(400,"User not found!!!!!!!")
  }

  user = await Users.findByIdAndDelete(
    user?._id
  )

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        null,
        "User Deleted successfully"
      )
    )

})