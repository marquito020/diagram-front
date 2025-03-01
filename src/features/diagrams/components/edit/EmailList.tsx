import React from 'react';

interface EmailListProps {
    emails: string[];
    onRemove: (email: string) => void;
    label: string;
}

const EmailList: React.FC<EmailListProps> = ({
    emails,
    onRemove,
    label
}) => {
    if (emails.length === 0) return null;

    return (
        <div className="mt-3">
            <h4 className="text-sm font-medium text-gray-700 mb-2">
                {label}
            </h4>
            <div className="space-y-2">
                {emails.map((email, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-md">
                        <span className="text-sm text-gray-600">{email}</span>
                        <button
                            onClick={() => onRemove(email)}
                            className="text-red-500 hover:text-red-700"
                            type="button"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EmailList;
