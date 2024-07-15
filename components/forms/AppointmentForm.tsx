import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
  addAppointment,
  fetchPendingAppointments,
  updateAppointment,
} from "@/lib/actions/appointmet.actions";
import { Doctors } from "@/constants";

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

const getAppointmentSchema = (type: "create" | "cancel") =>
  z.object({
    primaryPhysician: z.string().nonempty("Doctor is required"),
    priority: z.enum(["normal", "urgent"]),
    schedule: z.date(),
    reason:
      type === "create"
        ? z.string().nonempty("Reason is required")
        : z.string().optional(),
    note: type === "create" ? z.string().optional() : z.string().optional(),
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
  type: "create" | "cancel";
}> = ({ userId, patientId, type }) => {
  const router = useRouter();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<string | null>(
    null
  );
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
      primaryPhysician: "",
      priority: "normal",
      schedule: new Date(),
      reason: "",
      note: "",
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
      fetchAppointments();
    }
  }, [userId, type]);

  const onSubmit = async (data: AppointmentFormData) => {
    try {
      const newAppointment = await addAppointment({
        ...data,
        userId,
        patientId,
      });
      toast.success("Appointment added successfully");
      router.push(
        `/patients/${userId}/new-appointment/success?appointmentId=${newAppointment._id}`
      );

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
      // Update appointment with cancellation reason and status
      const updatedUser=await updateAppointment(appointmentId, {
        cancellationReason,
        status: "cancelled",
      });

      // Handle UI updates or notifications (e.g., toast notifications)
      if (updatedUser) {
        toast.success(
          `Appointment with ID ${appointmentId} cancelled successfully`
        );
      }
      

      // Remove cancelled appointment from state or UI list
      setAppointments((prevAppointments) =>
        prevAppointments.filter((appointment) => appointment._id !== appointmentId)
      );

      // Reset cancellation reason form field (if using a form library like react-hook-form)
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
        <th className="border border-gray-700 px-4 py-2">Physician</th>
        <th className="border border-gray-700 px-4 py-2">Schedule</th>
        <th className="border border-gray-700 px-4 py-2">Reason</th>
      </tr>
    </thead>
    <tbody>
      {appointments.map((appointment) => (
        <tr
          key={appointment._id}
          className={`bg-gray-700 text-white cursor-pointer ${
            selectedAppointmentId === appointment._id ? "bg-gray-600" : ""
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

      {type === "create" && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-6 bg-gray-800 text-white space-y-6"
        >
          <div className="space-y-4">
            <h1 className="text-2xl text-pink-500">New Appointment</h1>
            <p className="text-gray-400">Request a new appointment.</p>
          </div>

          <CustomFormField error={errors.primaryPhysician}>
            <select
              {...register("primaryPhysician")}
              className="w-full p-4 bg-gray-700 text-white border border-pink-500 rounded focus:outline-none"
            >
              <option value="">Select a doctor</option>
              {/* Assuming doctors is an array of available doctors */}
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
              onChange={(date) => setValue("schedule", date)}
              showTimeSelect
              dateFormat="MM/dd/yyyy h:mm aa"
              className="w-full p-4 bg-gray-700 text-white border border-pink-500 rounded focus:outline-none"
            />
          </CustomFormField>

          <CustomFormField error={errors.reason}>
            <textarea
              {...register("reason")}
              placeholder="Reason for appointment"
              className="w-full p-4 bg-gray-700 text-white border border-pink-500 rounded focus:outline-none"
            />
          </CustomFormField>

          <CustomFormField error={errors.note}>
            <textarea
              {...register("note")}
              placeholder="Additional notes (optional)"
              className="w-full p-4 bg-gray-700 text-white border border-pink-500 rounded focus:outline-none"
            />
          </CustomFormField>

          <SubmitButton isLoading={false}>Request Appointment</SubmitButton>
        </form>
      )}
    </div>
  );
};

export default AppointmentForm;
