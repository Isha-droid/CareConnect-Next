"use server"
import connectDB from "@/config/dbConnect";
import Authe, { IAuthe } from "@/models/Auth";
import mongoose from 'mongoose';
import PatientRegister, { IPatientRegister } from "@/models/PatientRegister"; // Adjust the path as per your project structure

// Function to create a new Auth document
const createAuthUser = async (name: string, email: string, phone: string): Promise<IAuthe> => {
  try {
    // Create a new Auth document
    connectDB();
    const newUser = new Authe({
      name,
      email,
      phone,
      registered: false,
    });

    // Save the document to the database
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
    // Create a new instance of PatientRegister with the provided data
    const newPatient = new PatientRegister(patientData);

    // Save the new patient data to the database
    const savedPatient = await newPatient.save();

    return {
      message: 'Patient registered successfully!',
      patient: savedPatient.toObject() // Convert Mongoose document to plain JavaScript object
    };

  } catch (error) {
    if (error.code === 11000 || error.code === 11001) {
      // 11000 and 11001 are MongoDB duplicate key error codes for unique constraint violation
      console.log('Patient with this email or phone already exists:', error.message);
      return { message: 'You have already registered' }; // Return a message object
    }
    console.error('Error saving patient data:', error);
    throw error;
  }
};

export { createAuthUser, getAuthUser, savePatientData };
