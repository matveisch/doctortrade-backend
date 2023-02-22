import mongoose, { Schema, Document } from 'mongoose';

export interface CourseType extends Document {
  name: string;
  description: string;
}

const CourseSchema: Schema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  description: { type: String, required: true, maxLength: 100 },
});

export default mongoose.model<CourseType>('Course', CourseSchema);
