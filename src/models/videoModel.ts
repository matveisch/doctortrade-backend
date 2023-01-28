import mongoose, { Schema, Document } from 'mongoose';
import { SectionType } from './sectionModel';

export interface VideoType extends Document {
  name: string;
  path: string;
  watched: boolean;
  course: string;
  description: string;
  section: SectionType;
}

const VideoSchema: Schema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  path: { type: String, required: true },
  watched: { type: Boolean, required: true },
  description: { type: String, required: true },
  course: { type: String, required: true, maxLength: 100 },
  section: { type: Schema.Types.ObjectId, ref: 'Section' },
});

export default mongoose.model<VideoType>('Video', VideoSchema);
