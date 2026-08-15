import { Cor } from "./cor.js";

export type TipoLinha = "TESTE" | "RESUMO" | "CCN";

export type StatusLinha =
  | "PASS"
  | "FAIL"
  | "OK"
  | "ALERTA"
  | "SKIP"
  | "INDISP"
  | "ERRO";

const CORES_POR_STATUS: Readonly<Record<StatusLinha, Cor>> = {
  PASS: Cor.VERDE,
  FAIL: Cor.VERMELHO,
  OK: Cor.VERDE,
  ALERTA: Cor.AMARELO,
  SKIP: Cor.CINZA,
  INDISP: Cor.AMARELO,
  ERRO: Cor.VERMELHO,
};

export class Linha {
  private constructor(
    public readonly tipo: TipoLinha,
    public readonly status: StatusLinha,
    public readonly nome: string,
    public readonly obtido: string,
    public readonly esperado: string,
    public readonly detalhe: string,
  ) {}

  public static teste(
    passou: boolean,
    caso: string,
    obtido: string,
    esperado: string,
  ): Linha {
    return new Linha(
      "TESTE",
      passou ? "PASS" : "FAIL",
      caso,
      obtido,
      esperado,
      passou ? "-" : "valores diferentes",
    );
  }

  public static resumo(
    todosPassaram: boolean,
    obtido: string,
    esperado: string,
    detalhe: string,
  ): Linha {
    return new Linha(
      "RESUMO",
      todosPassaram ? "PASS" : "FAIL",
      "testes",
      obtido,
      esperado,
      detalhe,
    );
  }

  public static complexidade(
    status: StatusLinha,
    metodo: string,
    obtido: string,
    esperado: string,
    detalhe: string,
  ): Linha {
    return new Linha("CCN", status, metodo, obtido, esperado, detalhe);
  }

  public colorirStatus(texto: string): string {
    return CORES_POR_STATUS[this.status].aplicar(texto);
  }
}
