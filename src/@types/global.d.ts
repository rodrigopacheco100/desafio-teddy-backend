export {};

declare global {
  /**
   * Now declare things that go in the global namespace,
   * or augment existing declarations in the global namespace.
   */
  type TypedOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

  type WithId<T> = T & { id: string };
  type WithoutId<T> = Omit<T, 'id'>;

  type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

  namespace Express {
    export interface Request {
      user: {
        id: string;
      };
    }
  }
}
