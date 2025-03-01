import { ModalConstants, ModalTitles, ModalDescriptions, ModalIcons, ModalButtons, ModalPlaceholders, ModalLabels, ModalAddParticipantLabels, ModalSharedParticipantsDescription, ModalRequired, ModalMinLength, ModalMinLengthMessage } from '../../../../../app/constants/modals';

interface ModalConstantsReturn {
    title: string;
    description: string;
    label: string;
    button: string;
    icon: string;
    addParticipantButton: string;
    addParticipantTitle: string;
    addParticipantDescription: string;
    addParticipantPlaceholder: string;
    placeholder: string;
    addParticipantLabel: string;
    sharedParticipantsLabel: string;
    sharedParticipantsDescription: string;
    required: string;
    minLength: number;
    minLengthMessage: string;
}

export const useModalConstants = (): ModalConstantsReturn => {
    return {
        title: ModalTitles[ModalConstants.EDIT_DIAGRAM],
        description: ModalDescriptions[ModalConstants.EDIT_DIAGRAM],
        label: ModalLabels[ModalConstants.EDIT_DIAGRAM],
        button: ModalButtons[ModalConstants.EDIT_DIAGRAM],
        icon: ModalIcons[ModalConstants.EDIT_DIAGRAM],
        addParticipantButton: ModalButtons[ModalConstants.ADD_PARTICIPANT],
        addParticipantTitle: ModalTitles[ModalConstants.ADD_PARTICIPANT],
        addParticipantDescription: ModalDescriptions[ModalConstants.ADD_PARTICIPANT],
        addParticipantPlaceholder: ModalPlaceholders[ModalConstants.ADD_PARTICIPANT],
        placeholder: ModalPlaceholders[ModalConstants.EDIT_DIAGRAM],
        addParticipantLabel: ModalAddParticipantLabels[ModalConstants.ADD_PARTICIPANT],
        sharedParticipantsLabel: ModalAddParticipantLabels[ModalConstants.EDIT_DIAGRAM],
        sharedParticipantsDescription: ModalSharedParticipantsDescription[ModalConstants.EDIT_DIAGRAM],
        required: ModalRequired[ModalConstants.EDIT_DIAGRAM],
        minLength: ModalMinLength[ModalConstants.EDIT_DIAGRAM],
        minLengthMessage: ModalMinLengthMessage[ModalConstants.EDIT_DIAGRAM]
    };
};
