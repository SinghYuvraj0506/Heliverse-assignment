import mongoose, { Schema } from "mongoose";
import { DomainEnum, GenderEnum } from "../constants.js";

const userSchema = new Schema({
  id: {
    type: Number
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  avatar: {
    type: String,
    default: `https://via.placeholder.com/200x200.png`,
  },
  gender: {
    type: String,
    enum: GenderEnum,
    required: true,
  },
  available: {
    type: Boolean,
    default:true
  },
  domain: {
    type: String,
    enum: DomainEnum,
    required: true,
  },
});

userSchema.pre("save",async function(next){
  try {

    // when document is saved ----------------------
    if (!this.isNew) {
      return next();
    }

    // Access the model to get the length of the collection
    const User = this.constructor;
    const count = await User.countDocuments();

    // Set the value of the new field 'id' to the length of the collection + 1
    this.id = count + 1;

    next();
  } catch (error) {
    next(error);
  }
})

export const Users = mongoose.model("user", userSchema);
