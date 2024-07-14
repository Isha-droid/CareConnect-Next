"use server"
import connectDB from "@/config/dbConnect";
import Authe, { IAuthe } from "@/models/Auth";
import PatientRegister, { IPatientRegister } from "@/models/PatientRegister";
import { databases } from "../appwrite.config";

connectDB();

// Function to create a new Auth document
const createAuthUser = async (name: string, email: string, phone: string): Promise<AuthUserResponse> => {
  try {
    // Check if user already exists
    const existingUser = await Authe.findOne({ email });
    if (existingUser) {
      return { patient: existingUser, message: 'User already exists' };
    }

    // Create new user if not exists
    const newUser = new Authe({
      name,
      email,
      phone,
      registered: false,
    });

    const savedUser = await newUser.save();
    const data= JSON.parse(JSON.stringify(savedUser))
    return { patient: data, message: 'User registered successfully' };
  } catch (error) {
    console.error("Error creating auth user:", error);
    return { patient: null, message: 'Server error' };
  }
};


// Function to get an Auth user by userId
const getAuthUser = async (userId: string): Promise<IAuthe | null> => {
  try {
    const user = await Authe.findById(userId);
    const data= JSON.parse(JSON.stringify(user))
    if (user) {
      return data; // Convert Mongoose document to plain JavaScript object
    }
    return null;
  } catch (error) {
    console.error("Error fetching auth user:", error);
    throw error;
  }
};

const savePatientData = async (patientData: Partial<IPatientRegister>): Promise<{ message: string, patient?: IPatientRegister }> => {
  try {
    
    const newPatient = new PatientRegister(patientData);
    const savedPatient = await newPatient.save();

    // Update registered status in Auth if patient registration is successful and email matches
    const updatedAuthUser = await Authe.findOneAndUpdate(
      { email: patientData.email },
      { registered: true },
    );
    console.log(updatedAuthUser)
    const data= JSON.parse(JSON.stringify(updatedAuthUser))

    if (!updatedAuthUser) {
      console.log('Auth user not found for email:', patientData.email);
    }

    return {
      message: 'Patient registered successfully!',
      patient: data // Convert Mongoose document to plain JavaScript object
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


const getPatientByEmail = async (email: string): Promise<{ message: string, patient?: IPatientRegister }> => {
  try {
    // Find patient by email
    const patient = await PatientRegister.findOne({ email });

    if (!patient) {
      return { message: 'Patient not found' };
    }
    const data= JSON.parse(JSON.stringify(patient))

    return {
      message: 'Patient data retrieved successfully!',
      patient: data // Convert Mongoose document to plain JavaScript object
    };

  } catch (error) {
    console.error('Error fetching patient data by email:', error);
    throw error;
  }
};


export { createAuthUser, getAuthUser, savePatientData, getPatientByEmail };
