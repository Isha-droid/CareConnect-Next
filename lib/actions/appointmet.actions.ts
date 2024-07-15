"use server"
import Appointment, { IAppointment } from "@/models/Appointment";

import connectDB from "@/config/dbConnect";

connectDB();

export const addAppointment = async (appointmentData: Partial<IAppointment>): Promise<IAppointment> => {
  try {
    // Check if there's already an appointment with the same doctor and schedule
    const existingAppointment = await Appointment.findOne({
      patientId: appointmentData.patientId,
      primaryPhysician: appointmentData.primaryPhysician,
      schedule: appointmentData.schedule,
      status: { $ne: 'cancelled' }, // Exclude cancelled appointments
    });

    if (existingAppointment) {
      throw new Error('An appointment with the same doctor and schedule already exists.');
    }

    // Create a new instance of the Appointment model with the provided data
    const appointment = new Appointment(appointmentData);

    // Save the appointment to the database
    const savedAppointment = await appointment.save();
    const data = JSON.parse(JSON.stringify(savedAppointment));

    return data;
  } catch (error) {
    // Handle any errors
    throw new Error(`Error adding appointment: ${error.message}`);
  }
};

export const getAppointmentsByUserId = async (userId: string): Promise<IAppointment[]> => {
  try {
    // Find appointments based on the userId (patientId)
    const appointments = await Appointment.find({ patientId: userId });

    // If no appointments are found, you can handle it accordingly (e.g., return an empty array or throw an error)
    if (!appointments.length) {
      throw new Error('No appointments found for the given user ID.');
    }

    const data = JSON.parse(JSON.stringify(appointments));
    return data;
  } catch (error) {
    // Handle any errors
    throw new Error(`Error fetching appointments: ${error.message}`);
  }
};

export const getAppointmentById = async (appointmentId: string): Promise<IAppointment> => {
  try {
    // Find the appointment based on the appointmentId
    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      throw new Error('Appointment not found.');
    }

    const data = JSON.parse(JSON.stringify(appointment));
    return data;
  } catch (error) {
    // Handle any errors
    throw new Error(`Error fetching appointment: ${error.message}`);
  }
};
export const fetchPendingAppointments = async (userId:string) => {
  try {
    const appointments = await Appointment.find({
      userId: userId,
      status: 'pending',
      cancellationReason: ''
    }).exec();
   const data= JSON.parse(JSON.stringify(appointments))
    return data;
  } catch (error) {
    console.error('Error fetching appointments:', error.message);
    throw error;
  }
};

export const updateAppointment = async (
  appointmentId: string,
  updatedFields: Partial<IAppointment>
): Promise<IAppointment> => {
  try {
    // Find the appointment by ID
    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      throw new Error('Appointment not found.');
    }

    // Update specific fields in the appointment
    Object.keys(updatedFields).forEach((key) => {
      appointment[key] = updatedFields[key];
    });

    // Save the updated appointment to the database
    const updatedAppointment = await appointment.save();

    // Return the updated appointment object
    const data = JSON.parse(JSON.stringify(updatedAppointment));
    return data;
  } catch (error) {
    // Handle any errors
    throw new Error(`Error updating appointment: ${error.message}`);
  }
};