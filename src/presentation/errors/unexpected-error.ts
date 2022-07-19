export class UnexpectedError extends Error {
  constructor() {
    super("Algo inesperado aconteceu. Por favor, tente mais tarde!");
    this.name = "UnexpectedError";
  }
}
