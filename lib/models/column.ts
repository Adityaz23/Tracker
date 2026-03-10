import mongoose, { Document, mongo, Schema } from "mongoose";

export interface IColumn extends Document {
  name: String;
  boardId: mongoose.Types.ObjectId;
  order: number;
  jobApplications: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const ColumnSchema = new Schema<IColumn>(
  {
    name: {
      type: String,
      required: true,
    },
    boardId: {
      type: Schema.Types.ObjectId,
      ref: "Board",
      required: true,
      index: true,
    },
    order: {
      type: Number,
      required: true,
      default: 0,
    },
    jobApplications: [
      {
        type: Schema.Types.ObjectId,
        ref: "JobApplications",
      },
    ],
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Column ||
  mongoose.model<IColumn>("Column", ColumnSchema);
