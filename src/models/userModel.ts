import mongoose, { Schema, Document } from 'mongoose';

export interface UserType extends Document {
  firstName?: string;
  secondName?: string;
  email: string;
  password: string;
  isAdmin: boolean;
  hasPaid: boolean;
}

const UserSchema: Schema = new Schema({
  firstName: { type: String, required: false, maxLength: 100 },
  secondName: { type: String, required: false, maxLength: 100 },
  email: { type: String, required: true },
  password: { type: String, required: true, maxLength: 100 },
  isAdmin: { type: Boolean, required: true },
  hasPaid: { type: Boolean, required: true },
});

export default mongoose.model<UserType>('User', UserSchema);
