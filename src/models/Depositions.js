import mongoose from 'mongoose';

const depositionSchema = new mongoose.Schema({
  id: { type: mongoose.Types.ObjectId },
  name: { type: String, required: [true, 'Name must be provided!'] },
  deposition: { type: String, required: [true, 'Deposition must be provided!'] },
  photo: { type: String, required: [true, 'Photo must be provided!'] },
}, { versionKey: false });

const depositions = mongoose.model('depositions', depositionSchema);

export { depositionSchema, depositions };
