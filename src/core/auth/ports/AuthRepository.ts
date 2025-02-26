import { User } from "../entities/User";

export interface AuthRepository {
  login(email: string, password: string): Promise<User>;
  register(user: User): Promise<User>; // Añadimos el método register
}