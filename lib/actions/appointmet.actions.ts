"use server"
import Appointment, {IAppointment} from "@/models/Appointment";

import connectDB from "@/config/dbConnect";

connectDB()
export const addAppointment = async (appointmentData: Partial<IAppointment>): Promise<IAppointment> => {
  try {
    //Check if there's already an appointment with the same doctor and schedule
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
    const data= JSON.parse(JSON.stringify(savedAppointment))

    return data;
  } catch (error) {
    // Handle any errors
    throw new Error(`Error adding appointment: ${error.message}`);
  }
};
;
