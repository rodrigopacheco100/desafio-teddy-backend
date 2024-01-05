import { Entity } from '@/core/entity';

export interface UserProps {
  email: string;
  password: string;
}

export class User extends Entity<UserProps> {
  get email() {
    return this.props.email;
  }

  set email(email: string) {
    this.props.email = email;
  }

  get password() {
    return this.props.password;
  }

  set password(password: string) {
    this.props.password = password;
  }

  static create(props: UserProps) {
    return new User(props);
  }

  static from(props: WithId<UserProps>) {
    return new User(props);
  }
}
