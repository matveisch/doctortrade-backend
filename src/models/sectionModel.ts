import mongoose, { Schema, Document } from 'mongoose';

export interface SectionType extends Document {
  name: string;
  description: string;
}

const SectionSchema: Schema = new Schema({
  name: { type: String, required: true, maxLength: 100 },
  description: { type: String, required: true, maxLength: 100 },
});

export default mongoose.model<SectionType>('Section', SectionSchema);
