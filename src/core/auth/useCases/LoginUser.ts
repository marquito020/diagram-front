import { AuthRepository } from "../ports/AuthRepository";
import { User } from "../entities/User";

export class LoginUser {
  constructor(private authRepository: AuthRepository) {}

  async execute(email: string, password: string): Promise<User> {
    const user = await this.authRepository.login(email, password);
    return user;
  }
}
