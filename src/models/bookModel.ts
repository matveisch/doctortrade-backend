import mongoose, { Document, Schema } from 'mongoose';

export interface BookType extends Document {
  title: string;
  description: string;
  pathTitle: string;
}

const BookSchema = new Schema({
  title: { type: String, required: true, maxLength: 100 },
  description: { type: String, required: true, maxLength: 100 },
  pathTitle: { type: String, required: true, maxLength: 100 },
});

export default mongoose.model<BookType>('Book', BookSchema);
