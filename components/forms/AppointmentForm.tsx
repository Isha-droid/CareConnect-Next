import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { redirect, useRouter } from "next/navigation";
import {
  addAppointment,
  fetchPendingAppointments,
  updateAppointment,
} from "@/lib/actions/appointmet.actions";
import { Doctors } from "@/constants";
import { IAppointment } from "@/models/Appointment";

interface Appointment {
  _id: string;
  userId: string;
  patientId: string;
  primaryPhysician: string;
  priority: "normal" | "urgent";
  schedule: Date;
  reason: string;
  note?: string;
  cancellationReason?: string;
}

interface AppointmentFormData {
  primaryPhysician: string;
  priority: "normal" | "urgent";
  schedule: Date;
  reason: string;
  note?: string;
  cancellationReason?: string;
}

const getAppointmentSchema = (type: "create" | "cancel" | "schedule") =>
  z.object({
    primaryPhysician: z.string().nonempty("Doctor is required"),
    priority: z.enum(["normal", "urgent"]),
    schedule: z.date(),
    reason:
      type === "create" || type === "schedule"
        ? z.string().nonempty("Reason is required")
        : z.string().optional(),
    note:
      type === "create"
        ? z.string().optional()
        : z.string().nullish("Note is not allowed"),
    cancellationReason:
      type === "cancel"
        ? z.string().nonempty("Cancellation reason is required")
        : z.string().optional(),
  });

const CustomFormField: React.FC<{ error?: any }> = ({ children, error }) => (
  <div className="mb-4">
    {children}
    {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
  </div>
);

const SubmitButton: React.FC<{ isLoading: boolean }> = ({
  isLoading,
  children,
}) => (
  <button type="submit" className="bg-pink-500 text-white px-4 py-2 rounded">
    {isLoading ? "Loading..." : children}
  </button>
);

const AppointmentForm: React.FC<{
  userId: string;
  patientId: string;
  type: "create" | "cancel" | "schedule";
  appointment?: IAppointment;
  appointmentId?: string,
}> = ({ userId, patientId, type, appointment }) => {
  const router = useRouter();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<
    string | null
  >(null);
  const [cancellationReason, setCancellationReason] = useState<string>("");

  const AppointmentFormValidation = getAppointmentSchema(type);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<AppointmentFormData>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      primaryPhysician: appointment ? appointment.primaryPhysician : "",
      priority: appointment ? appointment.priority : "normal",
      schedule: appointment ? new Date(appointment.schedule) : new Date(),
      reason: appointment ? appointment.reason : "",
      note: appointment ? appointment.note : "",
      cancellationReason: "",
    },
  });

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const pendingAppointments = await fetchPendingAppointments(userId);
        setAppointments(pendingAppointments);
      } catch (error) {
        console.error("Error fetching pending appointments:", error.message);
        toast.error("Failed to fetch pending appointments");
      }
    };
  
    if (type === "cancel") {
      if (appointment && !Array.isArray(appointment)) {
        // Convert appointment to array if it's not already an array
        const appointmentArray = [appointment];
        setAppointments(appointmentArray);
      } else {
        fetchAppointments();
      }
    }
  }, [userId, type, appointment]); // Ensure to include appointment in dependencies array
  
  
  const handleSchedule = async (formData: AppointmentFormData) => {
    try {
      const { cancellationReason, note, primaryPhysician, priority, reason, schedule } = formData;
  
      // Example: Fetch appointmentId from your context or state
  
      // Ensure appointmentId and updatedFields are correctly populated from your form data
      const updatedFields = {
        cancellationReason,
        note,
        primaryPhysician,
        priority,
        reason,
        schedule,
        status: 'scheduled', // Adding status as 'scheduled'
      };
      const appointmentId= appointment?._id;
      
      console.log(appointmentId)
      // Call updateAppointment with appointmentId and updatedFields
      const updatedAppointment = await updateAppointment(appointmentId, updatedFields);
  
      console.log('Updated Appointment:', updatedAppointment);
      toast.success("appointment scheduled successfully")
      router.push("http://localhost:3000/admin")
    } catch (error) {
      console.error('Error scheduling appointment:', error);
      // Handle error state or display error message
    }
  };
  

  const onSubmit = async (data: AppointmentFormData) => {
    try {

      if(type=="schedule"){
        handleSchedule(data);
        
      }else{

        const newAppointment = await addAppointment({
          ...data,
          userId,
          patientId,
        });
        toast.success("Appointment added successfully");
        router.push(
          `/patients/${userId}/new-appointment/success?appointmentId=${newAppointment._id}`
        );
      }
    } catch (error) {
      console.error("Error adding appointment:", error.message);
      toast.error("Failed to add appointment");
    }
  };

  const onCancelAppointment = async (
    appointmentId: string,
    cancellationReason: string
  ) => {
    try {
      const updatedUser = await updateAppointment(appointmentId, {
        cancellationReason,
        status: "cancelled",
      });

      if (updatedUser) {
        toast.success(
          `Appointment with ID ${appointmentId} cancelled successfully`
        );
      }

      setAppointments((prevAppointments) =>
        prevAppointments.filter(
          (appointment) => appointment._id !== appointmentId
        )
      );

      setCancellationReason("");
    } catch (error) {
      console.error("Error cancelling appointment:", error.message);
      toast.error("Failed to cancel appointment");
    }
  };

  const handleRowClick = (
    appointmentId: string,
    cancellationReason: string
  ) => {
    setSelectedAppointmentId(appointmentId);
    setCancellationReason(cancellationReason);
  };

  return (
    <div className="p-6 bg-gray-800 text-white">
      {type === "cancel" && (
        <div>
          <h1 className="text-2xl text-pink-500">Cancel Your Appointment</h1>

          {appointments.length > 0 ? (
            <div className="mt-4">
              <h2 className="text-xl text-white mb-2">Pending Appointments</h2>
              <div className="overflow-x-auto">
                <table className="table-auto min-w-full divide-y divide-gray-700">
                  <thead>
                    <tr className="bg-gray-800 text-white">
                      <th className="border border-gray-700 px-4 py-2">
                        Physician
                      </th>
                      <th className="border border-gray-700 px-4 py-2">
                        Schedule
                      </th>
                      <th className="border border-gray-700 px-4 py-2">
                        Reason
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.map((appointment) => (
                      <tr
                        key={appointment._id}
                        className={`bg-gray-700 text-white cursor-pointer ${
                          selectedAppointmentId === appointment._id
                            ? "bg-gray-600"
                            : ""
                        }`}
                        onClick={() =>
                          handleRowClick(
                            appointment._id,
                            appointment.cancellationReason || ""
                          )
                        }
                      >
                        <td className="border border-gray-700 px-4 py-2">
                          {appointment.primaryPhysician}
                        </td>
                        <td className="border border-gray-700 px-4 py-2">
                          {new Date(appointment.schedule).toLocaleString()}
                        </td>
                        <td className="border border-gray-700 px-4 py-2">
                          {appointment.reason}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <p>No pending appointments to cancel.</p>
          )}

          {selectedAppointmentId && (
            <>
              <CustomFormField error={errors.cancellationReason}>
                <textarea
                  {...register("cancellationReason", {
                    required: "Cancellation reason is required",
                  })}
                  placeholder="Reason for cancellation"
                  className="w-full p-4 bg-gray-700 text-white border border-pink-500 rounded focus:outline-none mt-4"
                  value={cancellationReason}
                  onChange={(e) => setCancellationReason(e.target.value)}
                />
                {errors.cancellationReason && (
                  <span className="text-sm text-pink-500">
                    {errors.cancellationReason.message}
                  </span>
                )}
              </CustomFormField>

              <button
                onClick={() =>
                  onCancelAppointment(selectedAppointmentId, cancellationReason)
                }
                className="bg-pink-500 text-white px-4 py-2 rounded mt-4"
              >
                Cancel Appointment
              </button>
            </>
          )}
        </div>
      )}

      {(type === "create" || type === "schedule") && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`p-6 bg-gray-800 text-white space-y-6 ${
            type === "schedule" ? "scrollable-form" : ""
          }`}
        >
          <div className="space-y-4">
            <h1 className="text-2xl text-pink-500">
              {type === "create"
                ? "Create an Appointment"
                : "Schedule an Appointment"}
            </h1>

            <CustomFormField error={errors.primaryPhysician}>
              <select
                {...register("primaryPhysician")}
                className="w-full p-4 bg-gray-700 text-white border border-pink-500 rounded focus:outline-none"
              >
                <option value="">Select a doctor</option>
                {Doctors.map((doctor, index) => (
                  <option key={index} value={doctor.name}>
                    {doctor.name}
                  </option>
                ))}
              </select>
            </CustomFormField>

            <CustomFormField error={errors.priority}>
              <select
                {...register("priority")}
                className="w-full p-4 bg-gray-700 text-white border border-pink-500 rounded focus:outline-none"
              >
                <option value="normal">Normal</option>
                <option value="urgent">Urgent</option>
              </select>
            </CustomFormField>

            <CustomFormField error={errors.schedule}>
              <DatePicker
                selected={watch("schedule")}
                onChange={(date) => setValue("schedule", date || new Date())}
                showTimeSelect
                dateFormat="Pp"
                className="w-full p-4 bg-gray-700 text-white border border-pink-500 rounded focus:outline-none"
              />
            </CustomFormField>

            <CustomFormField error={errors.reason}>
              <textarea
                {...register("reason")}
                placeholder="Reason"
                className="w-full p-4 bg-gray-700 text-white border border-pink-500 rounded focus:outline-none"
              />
            </CustomFormField>

            {type === "create" && type === "schedule" && (
              <CustomFormField error={errors.note}>
                <textarea
                  {...register("note")}
                  placeholder="Note"
                  className="w-full p-4 bg-gray-700 text-white border border-pink-500 rounded focus:outline-none"
                />
              </CustomFormField>
            )}
          </div>

          <SubmitButton isLoading={false}>
            {type === "create" ? "Create Appointment" : "Schedule Appointment"}
          </SubmitButton>
        </form>
      )}
    </div>
  );
};

export default AppointmentForm;
