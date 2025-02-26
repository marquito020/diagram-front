export interface Diagram {
    _id: string;
    name: string;
    anfitrion: { firstName: string; lastName: string };
    participantes: { firstName: string; lastName: string }[];
}