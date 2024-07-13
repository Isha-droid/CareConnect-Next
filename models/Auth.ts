import mongoose, { Schema, Document, Model } from 'mongoose';

interface IAuthe extends Document {
  email: string;
  phone: string;
  name: string;
  registered: boolean;
}

const autheSchema: Schema<IAuthe> = new Schema({
  email: { type: String, required: true },
  phone: { type: String, required: true },
  name: { type: String, required: true },
  registered: { type: Boolean, default: false }
});

// Check if the model is already compiled before defining it
const Authe: Model<IAuthe> = mongoose.models.Authe || mongoose.model<IAuthe>('Authe', autheSchema);

export default Authe;
export { IAuthe };
