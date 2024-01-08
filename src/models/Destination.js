import mongoose from 'mongoose';

const destinationSchema = new mongoose.Schema({
  id: { type: mongoose.Types.ObjectId },
  name: { type: String, required: [true, 'Name must be provided!'] },
  price: { type: Number, required: [true, 'Price must be provided!'] },
  photo: { type: String, required: [true, 'Photo must be provided!'] },
}, { versionKey: false });

const destination = mongoose.model('destination', destinationSchema);

export { destinationSchema, destination };
