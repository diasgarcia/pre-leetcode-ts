export class Cor {
  public static readonly VERDE = new Cor("\u001B[32m");
  public static readonly VERMELHO = new Cor("\u001B[31m");
  public static readonly CINZA = new Cor("\u001B[90m");
  public static readonly AMARELO = new Cor("\u001B[33m");
  public static readonly RESET = new Cor("\u001B[0m");

  private constructor(private readonly codigo: string) {}

  public aplicar(texto: string): string {
    return `${this.codigo}${texto}${Cor.RESET.codigo}`;
  }

  public toString(): string {
    return this.codigo;
  }
}
