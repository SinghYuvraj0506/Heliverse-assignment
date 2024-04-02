import mongoose, { Schema } from "mongoose";

const teamSchema = new Schema({
  name:{
    type:String,
    required:true,
    unique:true
  },
  description:{
    type:String
  },
  users:[
    {type:mongoose.Types.ObjectId,ref:"user"}
  ]
},{
  timestamps:true
});


export const Teams = mongoose.model("team", teamSchema);
