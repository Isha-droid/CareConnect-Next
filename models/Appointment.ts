import mongoose, { Schema, Document } from 'mongoose';

export interface IAppointment extends Document {
  userId:string;
  patientId: string;
  primaryPhysician: string;
  schedule: Date;
  reason: string;
  status: string;
  note?: string;
  cancellationReason?: string;
  priority: string;
}

const AppointmentSchema: Schema = new Schema({
  userId: {type: String, required:true},
  patientId: { type: String, required: true },
  primaryPhysician: { type: String, required: true },
  schedule: { type: Date, required: true },
  reason: { type: String, required: true },
  status: { type: String, default: 'pending' },
  note: { type: String },
  cancellationReason: { type: String },
  priority: { type: String, required: true },
});

// Check if the model has already been compiled
const Appointment = mongoose.models.Appointment ||
  mongoose.model<IAppointment>('Appointment', AppointmentSchema);

  

export default Appointment;
export type { IAppointment };
