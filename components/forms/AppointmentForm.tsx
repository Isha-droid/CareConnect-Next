import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addAppointment } from '@/lib/actions/appointmet.actions';
import toast from 'react-hot-toast';

const doctors = [
  { name: "Dr. John Doe", image: "/doctor1.jpg" },
  { name: "Dr. Jane Smith", image: "/doctor2.jpg" },
];

const getAppointmentSchema = (type) => z.object({
  primaryPhysician: z.string().nonempty("Doctor is required"),
  priority: z.string().nonempty("Priority is required"),
  schedule: z.date(),
  reason: type !== "cancel" ? z.string().nonempty("Reason is required") : z.string().optional(),
  note: type !== "cancel" ? z.string().optional() : z.string().optional(),
  cancellationReason: type === "cancel" ? z.string().nonempty("Cancellation reason is required") : z.string().optional(),
});

const CustomFormField = ({ children, error }) => (
  <div className="mb-4">
    {children}
    {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
  </div>
);

const SubmitButton = ({ isLoading, children }) => (
  <button type="submit" className="bg-pink-500 text-white px-4 py-2 rounded">
    {isLoading ? "Loading..." : children}
  </button>
);

const AppointmentForm = ({ userId, patientId, type }) => {
  const AppointmentFormValidation = getAppointmentSchema(type);
  const form = useForm({
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

  const onSubmit = async (values) => {
    try {
      const formData = {
        patientId,
        primaryPhysician: values.primaryPhysician,
        schedule: values.schedule,
        reason: values.reason,
        priority: values.priority,
        note: values.note,
        cancellationReason: values.cancellationReason,
      };

      // Log formData to check patientId presence
      console.log(formData);

      const savedAppointment = await addAppointment(formData);
      console.log('Appointment saved:', savedAppointment);
    } catch (error) {
      console.error('Error adding appointment:', error.message);
      // Handle error state or display error message to user
      toast.error(error.message)

    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 bg-gray-800 text-white space-y-6">
      {type === "create" && (
        <div className="space-y-4">
          <h1 className="text-2xl text-pink-500">New Appointment</h1>
          <p className="text-gray-400">Request a new appointment.</p>
        </div>
      )}

      <CustomFormField error={form.formState.errors.primaryPhysician}>
        <select
          {...form.register("primaryPhysician")}
          className="w-full p-4 bg-gray-700 text-white border border-pink-500 rounded focus:outline-none"
        >
          <option value="">Select a doctor</option>
          {doctors.map((doctor, index) => (
            <option key={index} value={doctor.name}>{doctor.name}</option>
          ))}
        </select>
      </CustomFormField>

      <CustomFormField error={form.formState.errors.priority}>
        <select
          {...form.register("priority")}
          className="w-full p-4 bg-gray-700 text-white border border-pink-500 rounded focus:outline-none"
        >
          <option value="normal">Normal</option>
          <option value="urgent">Urgent</option>
        </select>
      </CustomFormField>

      <CustomFormField error={form.formState.errors.schedule}>
        <Controller
          control={form.control}
          name="schedule"
          render={({ field }) => (
            <DatePicker
              placeholderText="Expected appointment date"
              className="w-full p-4 bg-gray-700 text-white border border-pink-500 rounded focus:outline-none"
              selected={field.value}
              onChange={field.onChange}
              showTimeSelect
              dateFormat="MM/dd/yyyy h:mm aa"
            />
          )}
        />
      </CustomFormField>

      <CustomFormField error={form.formState.errors.reason}>
        <textarea
          {...form.register("reason")}
          placeholder="Reason for appointment"
          className="w-full p-4 bg-gray-700 text-white border border-pink-500 rounded focus:outline-none"
        />
      </CustomFormField>

      {form.watch("priority") !== "urgent" && (
        <CustomFormField error={form.formState.errors.note}>
          <textarea
            {...form.register("note")}
            placeholder="Comments/notes"
            className="w-full p-4 bg-gray-700 text-white border border-pink-500 rounded focus:outline-none"
          />
        </CustomFormField>
      )}

      {form.watch("priority") === "urgent" && (
        <p className="text-pink-500">Your appointment is set to the current time.</p>
      )}

      {type === "cancel" && (
        <CustomFormField error={form.formState.errors.cancellationReason}>
          <textarea
            {...form.register("cancellationReason")}
            placeholder="Reason for cancellation"
            className="w-full p-4 bg-gray-700 text-white border border-pink-500 rounded focus:outline-none"
          />
        </CustomFormField>
      )}

      <SubmitButton isLoading={false}>
        {type === "cancel" ? "Cancel Appointment" : "Submit Appointment"}
      </SubmitButton>
    </form>
  );
};

export default AppointmentForm;
