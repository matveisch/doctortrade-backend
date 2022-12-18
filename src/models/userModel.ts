import mongoose, { Schema, Document } from "mongoose";

export interface UserType extends Document {
  firstName?: string;
  secondName?: string;
  username: string;
  password: string;
  phone: string;
  email: string;
}

const UserSchema: Schema = new Schema({
  firstName: { type: String, required: false, maxLength: 100 },
  secondName: { type: String, required: false, maxLength: 100 },
  username: { type: String, required: true, maxLength: 100 },
  password: { type: String, required: true, maxLength: 100 },
  phone: { type: String, required: true },
  email: { type: String, required: true },
});

export default mongoose.model<UserType>("User", UserSchema);
