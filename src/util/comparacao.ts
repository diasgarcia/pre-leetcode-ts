import { inspect, isDeepStrictEqual } from "node:util";

export class Comparacao {
  private constructor(
    public readonly passou: boolean,
    public readonly obtido: string,
    public readonly esperado: string,
  ) {}

  public static entre(esperado: unknown, obtido: unknown): Comparacao {
    return new Comparacao(
      isDeepStrictEqual(esperado, obtido),
      Comparacao.formatar(obtido),
      Comparacao.formatar(esperado),
    );
  }

  public static comTolerancia(
    esperado: number,
    obtido: number,
    delta: number,
  ): Comparacao {
    if (!Number.isFinite(delta) || delta < 0) {
      throw new RangeError(
        "delta deve ser um número finito maior ou igual a zero",
      );
    }

    const valoresIguais = Object.is(esperado, obtido);
    const dentroDaTolerancia = Math.abs(esperado - obtido) <= delta;

    return new Comparacao(
      valoresIguais || dentroDaTolerancia,
      String(obtido),
      String(esperado),
    );
  }

  private static formatar(valor: unknown): string {
    if (valor === null) return "null";
    if (valor === undefined) return "undefined";
    if (Array.isArray(valor)) {
      return `[${valor.map((item) => Comparacao.formatar(item)).join(", ")}]`;
    }
    if (valor instanceof Map) {
      const entradas = [...valor].map(
        ([chave, item]) =>
          `${Comparacao.formatar(chave)}=${Comparacao.formatar(item)}`,
      );
      return `{${entradas.join(", ")}}`;
    }
    if (valor instanceof Set) {
      return `[${[...valor].map((item) => Comparacao.formatar(item)).join(", ")}]`;
    }
    if (typeof valor === "object") {
      return inspect(valor, {
        breakLength: Infinity,
        compact: true,
        depth: null,
        sorted: true,
      });
    }
    if (typeof valor === "function") {
      return valor.name.length > 0 ? valor.name : "função anônima";
    }
    if (typeof valor === "string") return valor;
    return inspect(valor, { breakLength: Infinity, compact: true });
  }
}
