import React from 'react';

interface EmailInputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    onAdd: () => void;
    placeholder: string;
    buttonText: string;
    error: string | null;
    title: string;
    description?: string;
}

const EmailInput: React.FC<EmailInputProps> = ({
    value,
    onChange,
    onKeyPress,
    onAdd,
    placeholder,
    buttonText,
    error,
    title,
    description
}) => {
    return (
        <div>
            <label htmlFor="participant-email" className="block text-sm font-medium text-gray-700 mb-1">
                {title}
            </label>
            {description && (
                <p className="text-sm text-gray-500 mb-2">
                    {description}
                </p>
            )}
            <div className="flex space-x-2">
                <input
                    type="email"
                    id="participant-email"
                    value={value}
                    onChange={onChange}
                    onKeyPress={onKeyPress}
                    className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={placeholder}
                />
                <button
                    type="button"
                    onClick={onAdd}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                    {buttonText}
                </button>
            </div>
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
    );
};

export default EmailInput;
