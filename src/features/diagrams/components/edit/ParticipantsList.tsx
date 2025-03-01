import React from 'react';
import { DiagramUser } from '../../types/diagramTypes';

interface ParticipantsListProps {
    participants: DiagramUser[];
    onRemoveParticipant: (userId: string) => void;
    isRemovingParticipant: boolean;
    emptyMessage: string;
}

const ParticipantsList: React.FC<ParticipantsListProps> = ({
    participants,
    onRemoveParticipant,
    isRemovingParticipant,
    emptyMessage
}) => {
    return (
        <div className="bg-gray-50 rounded-md p-3">
            {participants && participants.length > 0 ? (
                <ul className="space-y-2">
                    {participants.map(user => (
                        <li key={user._id} className="flex items-center justify-between bg-white p-2 rounded-md shadow-sm">
                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white text-sm">
                                    {user.firstName[0]}{user.lastName[0]}
                                </div>
                                <div>
                                    <p className="text-sm font-medium">{user.firstName} {user.lastName}</p>
                                    <p className="text-xs text-gray-500">{user.email}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => onRemoveParticipant(user._id)}
                                className="text-red-500 hover:text-red-700 disabled:text-gray-400"
                                disabled={isRemovingParticipant}
                                type="button"
                            >
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-sm text-gray-500">
                    {emptyMessage}
                </p>
            )}
        </div>
    );
};

export default ParticipantsList;
