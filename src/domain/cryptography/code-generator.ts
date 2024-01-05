export abstract class CodeGenerator {
  abstract generate(): Promise<string>;
}
