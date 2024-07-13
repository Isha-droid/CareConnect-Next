import connectDB from "@/config/dbConnect";
import Authe, { IAuthe } from "@/models/Auth";
import mongoose from 'mongoose';
import PatientRegister, { IPatientRegister } from "@/models/PatientRegister";

// Function to create a new Auth document
const createAuthUser = async (name: string, email: string, phone: string): Promise<IAuthe> => {
  try {
    connectDB();
    const newUser = new Authe({
      name,
      email,
      phone,
      registered: false,
    });

    const savedUser = await newUser.save();

    return savedUser.toObject(); // Convert Mongoose document to plain JavaScript object
  } catch (error) {
    console.error("Error creating auth user:", error);
    throw error;
  }
};

// Function to get an Auth user by userId
const getAuthUser = async (userId: string): Promise<IAuthe | null> => {
  try {
    const user = await Authe.findById(userId);

    if (user) {
      return user.toObject(); // Convert Mongoose document to plain JavaScript object
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
      patient: savedPatient.toObject()
    };

  } catch (error) {
    if (error.code === 11000 || error.code === 11001) {
      console.log('Patient with this email or phone already exists:', error.message);
      return { message: 'You have already registered' };
    }
    console.error('Error saving patient data:', error);
    throw error;
  }
};

export { createAuthUser, getAuthUser, savePatientData };
