import mongoose, { Schema, Document } from 'mongoose';

export interface UserType extends Document {
  firstName: string;
  secondName?: string;
  email: string;
  password: string;
  loggedIn: boolean;

  isAdmin: boolean;
  confirmed: boolean;
  courses: {
    type: mongoose.Types.ObjectId;
    ref: 'Course';
  }[];
  books: {
    type: mongoose.Types.ObjectId;
    ref: 'Book';
  }[];

  facebook?: string;
  telegram?: string;
  linkedin?: string;
}

const UserSchema: Schema = new Schema<UserType>({
  firstName: { type: String, required: true, maxLength: 100 },
  secondName: { type: String, required: false, maxLength: 100 },
  email: { type: String, required: true },
  password: { type: String, required: true, maxLength: 100 },
  loggedIn: { type: Boolean, required: true, default: false },

  isAdmin: { type: Boolean, required: true },
  confirmed: { type: Boolean, required: true, default: false },
  courses: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
  books: [{ type: Schema.Types.ObjectId, ref: 'Book' }],

  facebook: { type: String, required: false },
  telegram: { type: String, required: false },
  linkedin: { type: String, required: false },
});

export default mongoose.model<UserType>('User', UserSchema);
