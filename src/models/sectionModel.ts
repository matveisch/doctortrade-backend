import mongoose, { Schema, Document } from 'mongoose';
import { CourseType } from './courseModel';

export interface SectionType extends Document {
  name: string;
  description: string;
  course: CourseType;
}

const SectionSchema: Schema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  description: { type: String, required: true, maxLength: 100 },
  course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
});

export default mongoose.model<SectionType>('Section', SectionSchema);
