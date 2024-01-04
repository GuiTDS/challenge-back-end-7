import mongoose from 'mongoose';

const depositionSchema = new mongoose.Schema({
  id: { type: mongoose.Types.ObjectId },
  name: { type: String },
  deposition: { type: String },
  photo: { type: String },
}, { versionKey: false });

const depositions = mongoose.model('depositions', depositionSchema);

export { depositionSchema, depositions };
