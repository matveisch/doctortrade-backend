import mongoose, { Schema, Document } from 'mongoose';

export interface NoteType extends Document {
  name: string;
  page: number;
  userId: string;
}

const NoteSchema: Schema = new Schema({
  name: { type: String, required: true, maxLength: 10 },
  page: { type: Number, required: true, min: 1 },
  userId: { type: String, required: true },
});

export default mongoose.model<NoteType>('Note', NoteSchema);
