import { AuthRepository } from "../ports/AuthRepository";
import { User } from "../entities/User";

export class RegisterUser {
    constructor(private authRepository: AuthRepository) { }

    async execute(user: User): Promise<User> {
        const newUser = await this.authRepository.register(user);
        return newUser;
    }
}