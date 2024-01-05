export interface EncryptOptions {
  /**
   * Time to expires encrypted data
   *
   * @default 1d
   *
   * @example 10h
   * @example 7d
   *
   */
  expiresIn: `${number}d` | `${number}h`;
}

export abstract class Encrypter {
  abstract encrypt(
    payload: Record<string, unknown>,
    options?: EncryptOptions,
  ): Promise<string>;

  /**
   * @param token string
   * @throws InvalidTokenError
   */
  abstract verify<T extends object>(token: string): Promise<T>;
}
