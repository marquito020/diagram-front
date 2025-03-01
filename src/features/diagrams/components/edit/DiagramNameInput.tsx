import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';

interface DiagramNameInputProps {
    register: UseFormRegister<any>;
    errors: FieldErrors;
    label: string;
    placeholder: string;
    required: string;
    minLength: number;
    minLengthMessage: string;
}

const DiagramNameInput: React.FC<DiagramNameInputProps> = ({
    register,
    errors,
    label,
    placeholder,
    required,
    minLength,
    minLengthMessage
}) => {
    return (
        <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            <input
                {...register("name", {
                    required: required,
                    minLength: {
                        value: minLength,
                        message: minLengthMessage
                    }
                })}
                id="name"
                type="text"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={placeholder}
            />
            {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message as string}</p>
            )}
        </div>
    );
};

export default DiagramNameInput;
