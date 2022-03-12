import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepositoryInMemory implements IUsersRepository {
  Users: User[] = [];

  async create({
    driver_license,
    email,
    name,
    password,
  }: ICreateUserDTO): Promise<void> {
    const user = new User();

    Object.assign(user, {
      driver_license,
      email,
      name,
      password,
    });

    this.Users.push(user);
  }
  async findByEmail(email: string): Promise<User> {
    const user = this.Users.find((user) => user.email === email);

    return user;
  }
  async findById(id: string): Promise<User> {
    const user = this.Users.find((user) => user.id === id);

    return user;
  }
}

export { UsersRepositoryInMemory };
