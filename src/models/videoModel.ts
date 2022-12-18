import mongoose, { model, Schema, Model, Document } from "mongoose";

export interface VideoType extends Document {
  name: string;
  path: string;
  courseName: string;
}

const VideoSchema: Schema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  path: { type: String, required: true },
  courseName: { type: String, required: true, maxLength: 100 },
});

export default mongoose.model<VideoType>("Video", VideoSchema);
