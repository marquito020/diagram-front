export enum ModalConstants {
    EDIT_DIAGRAM = 'edit-diagram',
    CREATE_DIAGRAM = 'create-diagram',
    DELETE_DIAGRAM = 'delete-diagram',
    SHARE_DIAGRAM = 'share-diagram',
    ADD_PARTICIPANT = 'add-participant',
    DELETE_PARTICIPANT = 'delete-participant',
}

export const ModalIcons = {
    [ModalConstants.EDIT_DIAGRAM]: 'pencil-alt',
    [ModalConstants.CREATE_DIAGRAM]: 'plus',
    [ModalConstants.DELETE_DIAGRAM]: 'trash',
    [ModalConstants.SHARE_DIAGRAM]: 'share',
    [ModalConstants.ADD_PARTICIPANT]: 'user-plus',
}

export const ModalButtons = {
    [ModalConstants.EDIT_DIAGRAM]: 'Guardar',
    [ModalConstants.CREATE_DIAGRAM]: 'Crear',
    [ModalConstants.DELETE_DIAGRAM]: 'Eliminar',
    [ModalConstants.SHARE_DIAGRAM]: 'Compartir',
    [ModalConstants.ADD_PARTICIPANT]: 'Añadir',
}

export const ModalTitles = {
    [ModalConstants.EDIT_DIAGRAM]: 'Editar Diagrama',
    [ModalConstants.CREATE_DIAGRAM]: 'Crear Diagrama',
    [ModalConstants.DELETE_DIAGRAM]: 'Eliminar Diagrama',
    [ModalConstants.SHARE_DIAGRAM]: 'Compartir Diagrama',
    [ModalConstants.ADD_PARTICIPANT]: 'Añadir Participante',
}

export const ModalDescriptions = {
    [ModalConstants.EDIT_DIAGRAM]: 'Edita el nombre del diagrama y añade nuevos participantes.',
    [ModalConstants.CREATE_DIAGRAM]: 'Crea un nuevo diagrama. Podrás editarlo y compartirlo más tarde.',
    [ModalConstants.DELETE_DIAGRAM]: '¿Estás seguro de querer eliminar este diagrama?',
    [ModalConstants.SHARE_DIAGRAM]: 'Comparte el diagrama con otros usuarios.',
    [ModalConstants.ADD_PARTICIPANT]: 'Ingresa el correo electrónico del participante que deseas añadir.',
}

export const ModalPlaceholders = {
    [ModalConstants.EDIT_DIAGRAM]: 'Nombre del diagrama',
    [ModalConstants.CREATE_DIAGRAM]: 'Nombre del diagrama',
    [ModalConstants.ADD_PARTICIPANT]: 'Correo electrónico del participante',
}

export const ModalLabels = {
    [ModalConstants.EDIT_DIAGRAM]: 'Nombre del diagrama',
    [ModalConstants.CREATE_DIAGRAM]: 'Nombre del diagrama',
    [ModalConstants.ADD_PARTICIPANT]: 'Correo electrónico del participante',
}

export const ModalAddParticipantLabels = {
    [ModalConstants.ADD_PARTICIPANT]: 'Participantes por añadir:',
    [ModalConstants.EDIT_DIAGRAM]: 'Participantes compartidos:',
    [ModalConstants.DELETE_PARTICIPANT]: 'Participante a eliminar:',
}

export const ModalSharedParticipantsDescription = {
    [ModalConstants.EDIT_DIAGRAM]: 'No hay participantes compartidos',
}

// required: "El nombre es requerido",

export const ModalRequired = {
    [ModalConstants.CREATE_DIAGRAM]: 'El nombre es requerido',
    [ModalConstants.EDIT_DIAGRAM]: 'El nombre es requerido',
    [ModalConstants.ADD_PARTICIPANT]: 'El correo electrónico es requerido',
}

export const ModalMinLength = {
    [ModalConstants.CREATE_DIAGRAM]: 3,
    [ModalConstants.EDIT_DIAGRAM]: 3,
    [ModalConstants.ADD_PARTICIPANT]: 3,
}

export const ModalMinLengthMessage = {
    [ModalConstants.CREATE_DIAGRAM]: 'El nombre debe tener al menos 3 caracteres',
    [ModalConstants.EDIT_DIAGRAM]: 'El nombre debe tener al menos 3 caracteres',
    [ModalConstants.ADD_PARTICIPANT]: 'El correo electrónico debe tener al menos 3 caracteres',
}











