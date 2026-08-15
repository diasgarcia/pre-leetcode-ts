import { AnalisadorCiclomatico } from "./analisador-ciclomatico.js";
import type { AnalisadorDeComplexidade } from "./analisador-de-complexidade.js";
import { Comparacao } from "./comparacao.js";
import { SessaoDeTestes } from "./sessao-de-testes.js";
import { Tabela } from "./tabela.js";
import type { Escritor } from "./tabela.js";

const LIMITE_CICLOMATICO_PADRAO = 10;

export interface OpcoesDeTeste {
  readonly arquivoFonte: string | URL;
  readonly limiteCiclomatico?: number;
  readonly metodos?: readonly string[];
}

export class Testador {
  private sessaoAtual: SessaoDeTestes | undefined;

  public constructor(
    private readonly escrever: Escritor = (conteudo) => {
      process.stdout.write(conteudo);
    },
    private readonly analisador: AnalisadorDeComplexidade =
      new AnalisadorCiclomatico(),
  ) {}

  public iniciar(opcoes: OpcoesDeTeste): void {
    if (this.sessaoAtual !== undefined && !this.sessaoAtual.estaFinalizada()) {
      throw new Error(
        "finalizar() deve ser chamado antes de iniciar uma nova sessão",
      );
    }

    this.sessaoAtual = new SessaoDeTestes({
      arquivoFonte: opcoes.arquivoFonte,
      limiteCiclomatico:
        opcoes.limiteCiclomatico ?? LIMITE_CICLOMATICO_PADRAO,
      metodosRegistrados: opcoes.metodos ?? [],
      tabela: new Tabela(this.escrever),
      analisadorCiclomatico: this.analisador,
    });
  }

  public resultado(caso: string, esperado: unknown, obtido: unknown): void;
  public resultado(
    caso: string,
    esperado: number,
    obtido: number,
    delta: number,
  ): void;
  public resultado(
    caso: string,
    esperado: unknown,
    obtido: unknown,
    delta?: number,
  ): void {
    let comparacao: Comparacao;
    if (delta === undefined) {
      comparacao = Comparacao.entre(esperado, obtido);
    } else {
      if (typeof esperado !== "number" || typeof obtido !== "number") {
        throw new TypeError(
          "comparação com delta aceita apenas valores numéricos",
        );
      }
      comparacao = Comparacao.comTolerancia(esperado, obtido, delta);
    }

    this.obterSessaoAtual().registrar(caso, comparacao);
  }

  public finalizar(): void {
    this.obterSessaoAtual().finalizar();
  }

  private obterSessaoAtual(): SessaoDeTestes {
    if (this.sessaoAtual === undefined) {
      throw new Error("iniciar() deve ser chamado antes dos resultados");
    }
    return this.sessaoAtual;
  }
}

const testadorPadrao = new Testador();

export function iniciar(opcoes: OpcoesDeTeste): void {
  testadorPadrao.iniciar(opcoes);
}

export function resultado(
  caso: string,
  esperado: unknown,
  obtido: unknown,
): void;
export function resultado(
  caso: string,
  esperado: number,
  obtido: number,
  delta: number,
): void;
export function resultado(
  caso: string,
  esperado: unknown,
  obtido: unknown,
  delta?: number,
): void {
  if (delta === undefined) {
    testadorPadrao.resultado(caso, esperado, obtido);
    return;
  }
  if (typeof esperado !== "number" || typeof obtido !== "number") {
    throw new TypeError("comparação com delta aceita apenas valores numéricos");
  }
  testadorPadrao.resultado(caso, esperado, obtido, delta);
}

export function finalizar(): void {
  testadorPadrao.finalizar();
}

export function mapa(
  ...pares: (readonly [string, number])[]
): Map<string, number> {
  return new Map(pares);
}
