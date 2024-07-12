import React from 'react';
import { Control, Controller } from 'react-hook-form';

interface CustomFormFieldProps {
  name: string;
  control: Control<any>;
  label: string;
  renderSkeleton: ({ name, control }: { name: string; control: Control<any> }) => React.ReactNode;
}

const CustomFormField: React.FC<CustomFormFieldProps> = ({ name, control, label, renderSkeleton }) => (
  <div className="mb-4">
    <label htmlFor={name} className="block text-gray-400 text-sm mb-2">{label}</label>
    {renderSkeleton({ name, control })}
  </div>
);

export default CustomFormField;
