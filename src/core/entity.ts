import { randomUUID } from 'node:crypto';

export abstract class Entity<Props> {
  private readonly _id: string;
  protected props: Props;

  get id() {
    return this._id;
  }

  protected constructor(props: Props & { id?: string }) {
    this.props = props;
    this._id = props.id ?? randomUUID();
  }

  public equals(entity: Entity<unknown>) {
    if (entity === this) {
      return true;
    }

    if (entity.id === this._id) {
      return true;
    }

    return false;
  }
}
