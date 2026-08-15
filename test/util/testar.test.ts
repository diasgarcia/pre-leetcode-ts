import { describe, expect, it, vi } from "vitest";

import type { AnalisadorDeComplexidade } from "../../src/util/analisador-de-complexidade.js";
import {
  finalizar,
  iniciar,
  mapa,
  resultado,
  Testador,
} from "../../src/util/index.js";

describe("Testador", () => {
  it("exige que a sessão seja iniciada", () => {
    // Arrange
    const testador = new Testador(() => undefined);

    // Act e Assert
    expect(() => {
      testador.resultado("caso", 1, 1);
    }).toThrow(
      "iniciar() deve ser chamado",
    );
    expect(() => {
      testador.finalizar();
    }).toThrow("iniciar() deve ser chamado");
  });

  it("controla o ciclo de vida e encaminha os resultados", () => {
    // Arrange
    let saida = "";
    const analisar = vi.fn<AnalisadorDeComplexidade["analisar"]>(() => ({
      disponivel: true,
      complexidades: new Map([["calcular", 6]]),
    }));
    const testador = new Testador(
      (conteudo) => {
        saida += conteudo;
      },
      { analisar },
    );
    testador.iniciar({
      arquivoFonte: import.meta.url,
      limiteCiclomatico: 5,
      metodos: ["calcular"],
    });

    // Act
    testador.resultado("objeto", { valor: 1 }, { valor: 1 });
    testador.resultado("decimal", 10, 10.1, 0.1);

    // Assert
    expect(() => {
      testador.iniciar({ arquivoFonte: import.meta.url });
    }).toThrow("finalizar() deve ser chamado");

    testador.finalizar();
    const primeiraSaida = saida;
    testador.finalizar();

    expect(saida).toBe(primeiraSaida);
    expect(saida).toContain("2/2");
    expect(saida).toContain("ALERTA");
    expect(analisar).toHaveBeenCalledOnce();

    testador.iniciar({ arquivoFonte: import.meta.url });
    testador.resultado("falha", 1, 2);
    testador.finalizar();
    expect(saida).toContain("1 falhou");
  });

  it("rejeita valores não numéricos em comparações com delta", () => {
    // Arrange
    const testador = new Testador(() => undefined);
    const resultadoComDelta = testador.resultado.bind(testador) as (
      caso: string,
      esperado: unknown,
      obtido: unknown,
      delta: number,
    ) => void;
    testador.iniciar({ arquivoFonte: import.meta.url });

    // Act e Assert
    expect(() => {
      resultadoComDelta("caso", "1", 1, 0.1);
    }).toThrow(TypeError);
    expect(() => {
      resultadoComDelta("caso", 1, "1", 0.1);
    }).toThrow(TypeError);
  });

  it("usa o analisador padrão sem exigi-lo quando os testes falham", () => {
    // Arrange
    const testador = new Testador(() => undefined);
    testador.iniciar({
      arquivoFonte: import.meta.url,
      metodos: ["inexistente"],
    });
    testador.resultado("falha", true, false);

    // Act e Assert
    expect(() => {
      testador.finalizar();
    }).not.toThrow();
  });
});

describe("fachada pública", () => {
  it("executa uma sessão pelo testador padrão", () => {
    // Arrange
    const escrever = vi
      .spyOn(process.stdout, "write")
      .mockImplementation(() => true);

    try {
      iniciar({ arquivoFonte: import.meta.url });

      // Act
      resultado("inteiro", 1, 1);
      resultado("decimal", 1, 1.01, 0.1);
      finalizar();

      // Assert
      expect(escrever).toHaveBeenCalledOnce();
      expect(String(escrever.mock.calls[0]?.[0])).toContain("2/2");
    } finally {
      escrever.mockRestore();
    }
  });

  it("rejeita valores não numéricos com delta", () => {
    // Arrange
    const resultadoComDelta = resultado as (
      caso: string,
      esperado: unknown,
      obtido: unknown,
      delta: number,
    ) => void;

    // Act e Assert
    expect(() => {
      resultadoComDelta("caso", "1", 1, 0.1);
    }).toThrow(TypeError);
    expect(() => {
      resultadoComDelta("caso", 1, "1", 0.1);
    }).toThrow(TypeError);
  });

  it("constrói mapas tipados", () => {
    // Act
    const vazio = mapa();
    const frequencias = mapa(["a", 1], ["b", 2], ["a", 3]);

    // Assert
    expect(vazio).toEqual(new Map());
    expect(frequencias).toEqual(
      new Map([
        ["a", 3],
        ["b", 2],
      ]),
    );
  });
});
