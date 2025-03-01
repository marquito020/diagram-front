export enum ModalConstants {
    EDIT_DIAGRAM = 'edit-diagram',
    CREATE_DIAGRAM = 'create-diagram',
    DELETE_DIAGRAM = 'delete-diagram',
    SHARE_DIAGRAM = 'share-diagram',
}

export const ModalIcons = {
    [ModalConstants.EDIT_DIAGRAM]: 'pencil-alt',
    [ModalConstants.CREATE_DIAGRAM]: 'plus',
    [ModalConstants.DELETE_DIAGRAM]: 'trash',
    [ModalConstants.SHARE_DIAGRAM]: 'share',
}

export const ModalButtons = {
    [ModalConstants.EDIT_DIAGRAM]: 'Guardar',
    [ModalConstants.CREATE_DIAGRAM]: 'Crear',
    [ModalConstants.DELETE_DIAGRAM]: 'Eliminar',
    [ModalConstants.SHARE_DIAGRAM]: 'Compartir',
}

export const ModalTitles = {
    [ModalConstants.EDIT_DIAGRAM]: 'Editar Diagrama',
    [ModalConstants.CREATE_DIAGRAM]: 'Crear Diagrama',
    [ModalConstants.DELETE_DIAGRAM]: 'Eliminar Diagrama',
    [ModalConstants.SHARE_DIAGRAM]: 'Compartir Diagrama',
}

export const ModalDescriptions = {
    [ModalConstants.EDIT_DIAGRAM]: 'Edita el nombre del diagrama y añade nuevos participantes.',
    [ModalConstants.CREATE_DIAGRAM]: 'Crea un nuevo diagrama.',
    [ModalConstants.DELETE_DIAGRAM]: '¿Estás seguro de querer eliminar este diagrama?',
    [ModalConstants.SHARE_DIAGRAM]: 'Comparte el diagrama con otros usuarios.',
}




