import { describe, expect, it, vi } from "vitest";

import type {
  AnaliseDeComplexidade,
  AnalisadorDeComplexidade,
} from "../../src/util/analisador-de-complexidade.js";
import { Comparacao } from "../../src/util/comparacao.js";
import {
  SessaoDeTestes,
  type ConfiguracaoDaSessao,
} from "../../src/util/sessao-de-testes.js";
import { Tabela } from "../../src/util/tabela.js";

interface ContextoDaSessao {
  readonly sessao: SessaoDeTestes;
  readonly obterSaida: () => string;
  readonly analisar: ReturnType<typeof vi.fn<AnalisadorDeComplexidade["analisar"]>>;
}

interface OpcoesDaFabrica {
  readonly limite?: number;
  readonly metodos?: readonly string[];
  readonly analise?: AnaliseDeComplexidade;
}

function criarContexto(opcoes: OpcoesDaFabrica = {}): ContextoDaSessao {
  let saida = "";
  const analisar = vi.fn<AnalisadorDeComplexidade["analisar"]>(() =>
    opcoes.analise ?? {
      disponivel: true,
      complexidades: new Map<string, number>(),
    },
  );
  const sessao = new SessaoDeTestes({
    arquivoFonte: import.meta.url,
    limiteCiclomatico: opcoes.limite ?? 10,
    metodosRegistrados: opcoes.metodos ?? [],
    tabela: new Tabela((conteudo) => {
      saida += conteudo;
    }),
    analisadorCiclomatico: { analisar },
  });

  return { sessao, obterSaida: () => saida, analisar };
}

function criarConfiguracaoValida(): ConfiguracaoDaSessao {
  return {
    arquivoFonte: new URL(import.meta.url),
    limiteCiclomatico: 10,
    metodosRegistrados: [],
    tabela: new Tabela(() => undefined),
    analisadorCiclomatico: {
      analisar: () => ({
        disponivel: true,
        complexidades: new Map<string, number>(),
      }),
    },
  };
}

describe("SessaoDeTestes", () => {
  it.each([
    [42, TypeError],
    ["  ", RangeError],
  ])("rejeita o arquivo fonte inválido %#", (arquivoFonte, erro) => {
    // Arrange
    const configuracao = criarConfiguracaoValida();

    // Act e Assert
    expect(
      () =>
        new SessaoDeTestes({
          ...configuracao,
          arquivoFonte: arquivoFonte as unknown as string,
        }),
    ).toThrow(erro);
  });

  it.each([0, 1.5])("rejeita o limite ciclomático %s", (limite) => {
    // Arrange
    const configuracao = criarConfiguracaoValida();

    // Act e Assert
    expect(
      () =>
        new SessaoDeTestes({
          ...configuracao,
          limiteCiclomatico: limite,
        }),
    ).toThrow(RangeError);
  });

  it.each([
    [null, TypeError],
    [[1], TypeError],
    [["  "], RangeError],
    [["somar", "somar"], RangeError],
  ])("rejeita os métodos inválidos %#", (metodos, erro) => {
    // Arrange
    const configuracao = criarConfiguracaoValida();

    // Act e Assert
    expect(
      () =>
        new SessaoDeTestes({
          ...configuracao,
          metodosRegistrados: metodos as unknown as readonly string[],
        }),
    ).toThrow(erro);
  });

  it("rejeita uma tabela inválida", () => {
    // Arrange
    const configuracao = criarConfiguracaoValida();

    // Act e Assert
    expect(
      () =>
        new SessaoDeTestes({
          ...configuracao,
          tabela: null as unknown as Tabela,
        }),
    ).toThrow(TypeError);
  });

  it.each([null, undefined, {}])("rejeita o analisador inválido %#", (analisador) => {
    // Arrange
    const configuracao = criarConfiguracaoValida();

    // Act e Assert
    expect(
      () =>
        new SessaoDeTestes({
          ...configuracao,
          analisadorCiclomatico: analisador as AnalisadorDeComplexidade,
        }),
    ).toThrow(TypeError);
  });

  it.each([
    [null, TypeError],
    ["  ", RangeError],
  ])("rejeita o caso inválido %#", (caso, erro) => {
    // Arrange
    const { sessao } = criarContexto();

    // Act e Assert
    expect(() => {
      sessao.registrar(
        caso as unknown as string,
        Comparacao.entre(1, 1),
      );
    }).toThrow(erro);
  });

  it("rejeita uma comparação inválida", () => {
    // Arrange
    const { sessao } = criarContexto();

    // Act e Assert
    expect(() => {
      sessao.registrar("caso", null as unknown as Comparacao);
    }).toThrow(TypeError);
  });

  it("finaliza sem testes e permanece idempotente", () => {
    // Arrange
    const { sessao, obterSaida, analisar } = criarContexto();

    // Act
    sessao.finalizar();
    const primeiraSaida = obterSaida();
    sessao.finalizar();

    // Assert
    expect(sessao.estaFinalizada()).toBe(true);
    expect(obterSaida()).toBe(primeiraSaida);
    expect(primeiraSaida).toContain("0/0");
    expect(primeiraSaida).toContain("nenhum teste registrado");
    expect(analisar).not.toHaveBeenCalled();
  });

  it("pula a complexidade quando nenhum teste foi registrado", () => {
    // Arrange
    const { sessao, obterSaida, analisar } = criarContexto({
      metodos: ["somar"],
    });

    // Act
    sessao.finalizar();

    // Assert
    expect(obterSaida()).toContain("SKIP");
    expect(obterSaida()).toContain("nenhum teste registrado");
    expect(analisar).not.toHaveBeenCalled();
  });

  it("resume uma execução aprovada sem métodos para analisar", () => {
    // Arrange
    const { sessao, obterSaida, analisar } = criarContexto();
    sessao.registrar("caso", Comparacao.entre(1, 1));

    // Act
    sessao.finalizar();

    // Assert
    expect(obterSaida()).toContain("1/1");
    expect(obterSaida()).toContain("todos passaram");
    expect(analisar).not.toHaveBeenCalled();
  });

  it.each([
    [1, "1 falhou"],
    [2, "2 falharam"],
  ])("resume %s falha(s) e pula a análise", (quantidade, detalhe) => {
    // Arrange
    const { sessao, obterSaida, analisar } = criarContexto({
      metodos: ["somar"],
    });
    for (let indice = 0; indice < quantidade; indice += 1) {
      sessao.registrar(`caso ${String(indice)}`, Comparacao.entre(1, 2));
    }

    // Act
    sessao.finalizar();

    // Assert
    expect(obterSaida()).toContain(detalhe);
    expect(obterSaida()).toContain("testes falharam");
    expect(analisar).not.toHaveBeenCalled();
  });

  it("informa quando a análise está indisponível", () => {
    // Arrange
    const { sessao, obterSaida } = criarContexto({
      metodos: ["somar", "contar"],
      analise: {
        disponivel: false,
        detalheFalha: "falha controlada",
      },
    });
    sessao.registrar("caso", Comparacao.entre(true, true));

    // Act
    sessao.finalizar();

    // Assert
    expect(obterSaida().match(/INDISP/g)).toHaveLength(2);
    expect(obterSaida().match(/falha controlada/g)).toHaveLength(2);
  });

  it("classifica as complexidades e informa métodos ausentes", () => {
    // Arrange
    const metodos = ["baixa", "moderada", "alta", "limite", "alerta", "ausente"];
    const { sessao, obterSaida, analisar } = criarContexto({
      metodos,
      analise: {
        disponivel: true,
        complexidades: new Map([
          ["baixa", 4],
          ["moderada", 7],
          ["alta", 8],
          ["limite", 10],
          ["alerta", 11],
        ]),
      },
    });
    sessao.registrar("caso", Comparacao.entre([1], [1]));

    // Act
    sessao.finalizar();

    // Assert
    const saida = obterSaida();
    expect(saida).toContain("baixa");
    expect(saida).toContain("moderada");
    expect(saida).toContain("alta");
    expect(saida).toContain("ALERTA");
    expect(saida).toContain("ERRO");
    expect(saida).toContain("método não encontrado");
    expect(analisar).toHaveBeenCalledWith(import.meta.url, metodos);
  });

  it("impede registros depois da finalização", () => {
    // Arrange
    const { sessao } = criarContexto();
    sessao.finalizar();

    // Act e Assert
    expect(() => {
      sessao.registrar("caso", Comparacao.entre(1, 1));
    }).toThrow("não é possível registrar");
  });
});
