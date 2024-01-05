import { type User } from '@/domain/entities/user';
import { type UserRepository } from '@/domain/repositories/user.repository';

export class FakeUserRepository implements UserRepository {
  public users: User[] = [];

  async save(user: User): Promise<void> {
    const userIndex = this.users.findIndex((u) => u.id === user.id);

    if (userIndex < 0) {
      this.users.push(user);
      return;
    }

    this.users[userIndex] = user;
  }

  async findById(id: string): Promise<User | null> {
    const user = this.users.find((user) => user.id === id);

    if (!user) return null;

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((user) => user.email === email);

    if (!user) return null;

    return user;
  }
}
