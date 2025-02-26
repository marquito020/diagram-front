import { User } from "../../auth/entities/User";

export interface Diagram {
    _id: string;
    name: string;
    user: User;
    sharedUsers?: User[];
    createdAt: string;
    updatedAt: string;
}
