import { DiagramParticipant } from "../../types/diagramTypes";

interface Props {
    participants: DiagramParticipant[];
    maxDisplay?: number;
}

export default function DiagramParticipants({ participants, maxDisplay = 3 }: Props) {
    const displayParticipants = participants.slice(0, maxDisplay);
    const remainingCount = participants.length - maxDisplay;

    return (
        <div className="flex items-center">
            <div className="flex -space-x-2">
                {displayParticipants.map((participant, index) => (
                    <div
                        key={participant._id}
                        className="relative"
                        title={`${participant.firstName} ${participant.lastName}`}
                    >
                        <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white text-sm border-2 border-white">
                            {participant.firstName[0]}
                            {participant.lastName[0]}
                        </div>
                    </div>
                ))}
                {remainingCount > 0 && (
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-sm border-2 border-white">
                        +{remainingCount}
                    </div>
                )}
            </div>
            <span className="ml-3 text-sm text-gray-500">
                {participants.length} participante{participants.length !== 1 ? 's' : ''}
            </span>
        </div>
    );
} 