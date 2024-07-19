"use server";
import connectDB from "@/config/dbConnect";
import Authe, { IAuthe } from "@/models/Auth";
import PatientRegister, { IPatientRegister } from "@/models/PatientRegister";

connectDB();

interface AuthUserResponse {
  patient: any | null;
  message: string;
}

// Function to create a new Auth document
const createAuthUser = async (name: string, email: string, phone: string): Promise<AuthUserResponse> => {
  try {
    // Check if user already exists
    const existingUser = await Authe.findOne({ email });
    if (existingUser) {
      return { patient: JSON.parse(JSON.stringify(existingUser)), message: 'User already exists' };
    }

    // Create new user if not exists
    const newUser = new Authe({
      name,
      email,
      phone,
      registered: false,
    });

    const savedUser = await newUser.save();
    return { patient: JSON.parse(JSON.stringify(savedUser)), message: 'User registered successfully' };
  } catch (error) {
    console.error("Error creating auth user:", error);
    return { patient: null, message: 'Server error' };
  }
};


// Function to get an Auth user by userId
const getAuthUser = async (userId: string): Promise<IAuthe | null> => {
  try {
    const user = await Authe.findById(userId);
    if (user) {
      return JSON.parse(JSON.stringify(user)); // Convert Mongoose document to plain JavaScript object
    }
    return null;
  } catch (error) {
    console.error("Error fetching auth user:", error);
    throw error;
  }
};

// Function to save patient data
const savePatientData = async (patientData: Partial<IPatientRegister>): Promise<{ message: string, patient?: IPatientRegister }> => {
  try {
    const newPatient = new PatientRegister(patientData);
    const savedPatient = await newPatient.save();

    // Update registered status in Auth if patient registration is successful and email matches
    const updatedAuthUser = await Authe.findOneAndUpdate(
      { email: patientData.email },
      { registered: true },
      { new: true } // To return the updated document
    );

    if (!updatedAuthUser) {
      console.log('Auth user not found for email:', patientData.email);
    }

    return {
      message: 'Patient registered successfully!',
      patient: JSON.parse(JSON.stringify(updatedAuthUser)) // Convert Mongoose document to plain JavaScript object
    };

  } catch (error: any) {
    if (error.code === 11000 || error.code === 11001) {
      console.log('Patient with this email or phone already exists:', error.message);
      return { message: 'You have already registered' };
    }
    console.error('Error saving patient data:', error);
    throw error;
  }
};


// Function to get patient by email
const getPatientByEmail = async (email: string): Promise<{ message: string, patient?: IPatientRegister }> => {
  try {
    // Find patient by email
    const patient = await PatientRegister.findOne({ email });

    if (!patient) {
      return { message: 'Patient not found' };
    }

    return {
      message: 'Patient data retrieved successfully!',
      patient: JSON.parse(JSON.stringify(patient)) // Convert Mongoose document to plain JavaScript object
    };

  } catch (error) {
    console.error('Error fetching patient data by email:', error);
    throw error;
  }
};

const getPatientById = async (id: string): Promise<{ message: string, patient?: IPatientRegister }> => {
  try {
    // Find patient by ID
    const patient = await PatientRegister.findById(id);

    if (!patient) {
      return { message: 'Patient not found' };
    }

    return {
      patient: JSON.parse(JSON.stringify(patient)) // Convert Mongoose document to plain JavaScript object
    };

  } catch (error) {
    console.error('Error fetching patient data by ID:', error);
    throw error;
  }
};
const updatePatientData = async (id: string, updatedData: Partial<IPatientRegister>): Promise<{ message: string, patient?: IPatientRegister }> => {
  try {
    // Find the current patient data
    const currentPatient = await PatientRegister.findById(id);
    if (!currentPatient) {
      return { message: 'Patient not found' };
    }

    // Exclude fields that should not be updated
    const { name, email, phone, ...updatableFields } = updatedData;

    // Update only allowed fields
    const updatedPatient = await PatientRegister.findByIdAndUpdate(id, updatableFields, { new: true });

    if (!updatedPatient) {
      return { message: 'Patient update failed' };
    }

    // Update the Auth document if email or phone is updated
    if (email || phone) {
      const updatedAuthUser = await Authe.findOneAndUpdate(
        { email: currentPatient.email },
        { $set: { email: email ?? currentPatient.email, phone: phone ?? currentPatient.phone } },
        { new: true }
      );

      if (!updatedAuthUser) {
        console.log('Auth user not found for email:', currentPatient.email);
      }
    }

    return {
      message: 'Patient updated successfully!',
      patient: JSON.parse(JSON.stringify(updatedPatient)) // Convert Mongoose document to plain JavaScript object
    };

  } catch (error) {
    console.error('Error updating patient data:', error);
    throw error;
  }
};


export { createAuthUser, getAuthUser, savePatientData, getPatientByEmail, getPatientById, updatePatientData};
