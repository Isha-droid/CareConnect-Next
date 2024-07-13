import mongoose, { Schema, Document, Model } from 'mongoose';

// Define the interface for the PatientRegister document
interface IPatientRegister extends Document {
  email: string;
  phone: string;
  name: string;
  privacyConsent: boolean;
  gender: 'male' | 'female' | 'other';
  birthDate: string;
  address: string;
  occupation: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  insuranceProvider: string;
  insurancePolicyNumber: string;
  allergies: string;
  currentMedication: string;
  familyMedicalHistory: string;
  pastMedicalHistory: string;
  identificationType: 'passport' | 'drivingLicense' | 'nationalID';
  identificationNo: string;
  identificationDocumentId: string;
  primaryPhysician: string;
  identificationDocument: any; // Adjust the type as needed for file handling
}

// Check if the model is already compiled before defining it
const PatientRegister: Model<IPatientRegister> = mongoose.models.PatientRegister || mongoose.model<IPatientRegister>('PatientRegister', new Schema({
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  name: { type: String, required: true },
  privacyConsent: { type: Boolean, required: true, default: false },
  gender: { type: String, required: true, enum: ['male', 'female', 'other'] },
  birthDate: { type: String, required: true },
  address: { type: String, required: true },
  occupation: { type: String, required: true },
  emergencyContactName: { type: String, required: true },
  emergencyContactNumber: { type: String, required: true },
  insuranceProvider: { type: String, required: true },
  insurancePolicyNumber: { type: String, required: true },
  allergies: { type: String, required: true },
  currentMedication: { type: String, required: true },
  familyMedicalHistory: { type: String, required: true },
  pastMedicalHistory: { type: String, required: true },
  identificationType: { type: String, required: true, enum: ['passport', 'drivingLicense', 'nationalID'] },
  identificationNo: { type: String, required: true },
  identificationDocumentId: { type: String, required: true },
  primaryPhysician: { type: String, required: true },
  identificationDocument: { type: Schema.Types.Mixed, required: true }, // Adjust the type as needed for file handling
}));

export default PatientRegister;
export { IPatientRegister };
