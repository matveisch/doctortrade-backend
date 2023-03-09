import mongoose, { Schema, Document } from 'mongoose';
import { SectionType } from './sectionModel';
import { CourseType } from './courseModel';

export interface VideoType extends Document {
  name: string;
  path: string;
  watched: boolean;
  course: CourseType;
  description: string;
  section: SectionType;
}

const VideoSchema: Schema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  path: { type: String, required: true },
  watched: { type: Boolean, required: true },
  description: { type: String, required: true },
  course: { type: Schema.Types.ObjectId, ref: 'Course' },
  section: { type: Schema.Types.ObjectId, ref: 'Section' },
});

export default mongoose.model<VideoType>('Video', VideoSchema);
