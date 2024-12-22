import mongoose, { Schema, SchemaType } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema(
  {
    videoFile: {
      type: String, // cloud service using to get URL
      required: true,
    },
    thumbnail: {
      type: String, // cloud service using to get URL
      required: true,
    },
    thumbnail: {
      type: String, // cloud service using to get URL
      required: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    title: {
      type: String,
      required: true,
    },

    desciption: {
      type: String,
      required: true,
    },

    views: {
      type: Number,
      default: 0,
    },
    duration: {
      type: Number,
      required: true,
    },

    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

videoSchema.plugin(mongooseAggregatePaginate);

export const Video = mongoose.model("Video", videoSchema);
