import { User } from "../../core/auth/entities/User";

export const persistLocalStorageUser = (user: User) => {
    localStorage.setItem("user", JSON.stringify(user));
};

export const clearLocalStorageUser = () => {
    localStorage.removeItem("user");
};