import { Cor } from "./cor.js";
import type { Linha, TipoLinha } from "./linha.js";

export type Escritor = (conteudo: string) => void;

interface Dimensoes {
  readonly nome: number;
  readonly valor: number;
  readonly detalhe: number;
}

export class Tabela {
  private static readonly LARGURA_MINIMA_NOME = 25;
  private static readonly LARGURA_MINIMA_VALOR = 8;
  private static readonly LARGURA_MINIMA_DETALHE = 8;

  private readonly escrever: Escritor;

  public constructor(escrever: Escritor) {
    if (typeof escrever !== "function") {
      throw new TypeError("escritor deve ser uma função");
    }
    this.escrever = escrever;
  }

  public imprimir(linhas: readonly Linha[]): void {
    const dimensoes = this.calcularDimensoes(linhas);
    const conteudo = [
      "",
      this.formatarCabecalho(dimensoes),
      this.formatarTracos(dimensoes),
    ];
    let tipoAnterior: TipoLinha | undefined;

    for (const linha of linhas) {
      if (tipoAnterior === "TESTE" && linha.tipo !== "TESTE") {
        conteudo.push(Cor.CINZA.aplicar(this.formatarSeparador(dimensoes)));
      }
      conteudo.push(this.formatarLinha(linha, dimensoes));
      tipoAnterior = linha.tipo;
    }

    this.escrever(`${conteudo.join("\n")}\n`);
  }

  private calcularDimensoes(linhas: readonly Linha[]): Dimensoes {
    let larguraNome = Tabela.LARGURA_MINIMA_NOME;
    let larguraValor = Tabela.LARGURA_MINIMA_VALOR;
    let larguraDetalhe = Tabela.LARGURA_MINIMA_DETALHE;

    for (const linha of linhas) {
      larguraNome = Math.max(larguraNome, linha.nome.length);
      larguraValor = Math.max(
        larguraValor,
        linha.obtido.length,
        linha.esperado.length,
      );
      larguraDetalhe = Math.max(larguraDetalhe, linha.detalhe.length);
    }

    return {
      nome: larguraNome,
      valor: larguraValor,
      detalhe: larguraDetalhe,
    };
  }

  private formatarCabecalho(dimensoes: Dimensoes): string {
    return this.formatarCampos(
      "Tipo",
      "Status",
      "Caso / Metodo",
      "Obtido",
      "Esperado",
      "Detalhe",
      dimensoes,
    );
  }

  private formatarTracos(dimensoes: Dimensoes): string {
    return this.formatarCampos(
      "------",
      "------",
      "-".repeat(dimensoes.nome),
      "-".repeat(dimensoes.valor),
      "-".repeat(dimensoes.valor),
      "-".repeat(dimensoes.detalhe),
      dimensoes,
    );
  }

  private formatarSeparador(dimensoes: Dimensoes): string {
    return `  ------  ------  ${"-".repeat(dimensoes.nome)}  ${"-".repeat(dimensoes.valor)}  ${"-".repeat(dimensoes.valor)}  ${"-".repeat(dimensoes.detalhe)}`;
  }

  private formatarLinha(linha: Linha, dimensoes: Dimensoes): string {
    const status = linha.colorirStatus(linha.status.padEnd(6));
    const obtido = linha.obtido.padStart(dimensoes.valor);
    const esperado = linha.esperado.padStart(dimensoes.valor);

    return [
      `  ${linha.tipo.padEnd(6)}  ${status}`,
      linha.nome.padEnd(dimensoes.nome),
      linha.obtido === "-" ? Cor.CINZA.aplicar(obtido) : obtido,
      Cor.CINZA.aplicar(esperado),
      linha.detalhe === "-"
        ? Cor.CINZA.aplicar(linha.detalhe)
        : linha.detalhe,
    ].join("  ");
  }

  private formatarCampos(
    tipo: string,
    status: string,
    nome: string,
    obtido: string,
    esperado: string,
    detalhe: string,
    dimensoes: Dimensoes,
  ): string {
    return `  ${tipo.padEnd(6)}  ${status.padEnd(6)}  ${nome.padEnd(dimensoes.nome)}  ${obtido.padStart(dimensoes.valor)}  ${esperado.padStart(dimensoes.valor)}  ${detalhe}`;
  }
}
