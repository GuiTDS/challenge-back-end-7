import mongoose from 'mongoose';

const destinationSchema = new mongoose.Schema({
  id: { type: mongoose.Types.ObjectId },
  name: { type: String, required: [true, 'Name must be provided!'] },
  price: { type: Number, required: [true, 'Price must be provided!'] },
  photo_1: { type: String, required: [true, 'Photo 1 must be provided!'] },
  photo_2: { type: String, required: [true, 'Photo 2 must be provided!'] },
  meta: { type: String, required: [true, 'Meta must be provided!'], maxlength: [160, 'Maximum 160 characters allowed!'] },
  description_text: { type: String },
}, { versionKey: false });

const destination = mongoose.model('destination', destinationSchema);

export { destinationSchema, destination };
