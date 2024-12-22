import mongoose, { Schema, SchemaType } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      lowerCase: true,
      trim: true,
      index: true, // make searchable
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowerCase: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String, // use cloud service url
      required: true,
    },
    coverImage: {
      type: String, // use cloud service url
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },

    refreshToken: {
      type: String,
    },

    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("passwords")) return;
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

//design custom method

userSchema.method.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.method.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      userName: this.userName,
      fullName: this.fullName,
    },

    process.env.ACCESS_TOKEN_SECRET,
    {
      expireIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};
userSchema.method.generateRefeshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },

    process.env.REFESH_TOKEN_SECRET,
    {
      expireIn: process.env.REFESH_TOKEN_EXPIRY,
    }
  );
};

export const User = mongoose.model("User", userSchema);
