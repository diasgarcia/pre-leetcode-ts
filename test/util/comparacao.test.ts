import { describe, expect, it } from "vitest";

import { Comparacao } from "../../src/util/comparacao.js";

describe("Comparacao", () => {
  it("compara valores profundamente", () => {
    // Arrange
    const esperado = {
      array: [1, [2, 3]],
      mapa: new Map([["a", 1]]),
      conjunto: new Set([1, 2]),
    };
    const obtido = {
      array: [1, [2, 3]],
      mapa: new Map([["a", 1]]),
      conjunto: new Set([1, 2]),
    };

    // Act
    const comparacao = Comparacao.entre(esperado, obtido);

    // Assert
    expect(comparacao.passou).toBe(true);
    expect(comparacao.obtido).toContain("array");
  });

  it("identifica valores diferentes", () => {
    // Act
    const comparacao = Comparacao.entre([1, 2], [1, 3]);

    // Assert
    expect(comparacao).toMatchObject({
      passou: false,
      obtido: "[1, 3]",
      esperado: "[1, 2]",
    });
  });

  it.each([
    [null, "null"],
    [undefined, "undefined"],
    [[["a"], ["b"]], "[[a], [b]]"],
    [new Map<string, number>([["a", 1]]), "{a=1}"],
    [new Set(["a", "b"]), "[a, b]"],
    [{ b: 2, a: 1 }, "{ a: 1, b: 2 }"],
    ["texto", "texto"],
    [42, "42"],
    [Symbol.for("id"), "Symbol(id)"],
  ])("formata o valor %#", (valor, formatado) => {
    // Act
    const comparacao = Comparacao.entre(valor, valor);

    // Assert
    expect(comparacao.obtido).toBe(formatado);
    expect(comparacao.esperado).toBe(formatado);
  });

  it("formata funções nomeadas e anônimas", () => {
    // Arrange
    function nomeada(): number {
      return 1;
    }
    const anonima = Object.defineProperty(() => undefined, "name", { value: "" });

    // Act
    const nomeadaFormatada = Comparacao.entre(nomeada, nomeada);
    const anonimaFormatada = Comparacao.entre(anonima, anonima);

    // Assert
    expect(nomeadaFormatada.obtido).toBe("nomeada");
    expect(anonimaFormatada.obtido).toBe("função anônima");
  });

  it("aceita NaN e valores dentro da tolerância", () => {
    // Act
    const iguais = Comparacao.comTolerancia(Number.NaN, Number.NaN, 0);
    const aproximados = Comparacao.comTolerancia(10, 10.1, 0.1);

    // Assert
    expect(iguais.passou).toBe(true);
    expect(aproximados.passou).toBe(true);
  });

  it("reprova valores fora da tolerância", () => {
    // Act
    const comparacao = Comparacao.comTolerancia(10, 10.2, 0.1);

    // Assert
    expect(comparacao).toMatchObject({
      passou: false,
      obtido: "10.2",
      esperado: "10",
    });
  });

  it.each([-1, Number.NaN, Number.POSITIVE_INFINITY])(
    "rejeita o delta inválido %s",
    (delta) => {
      // Act e Assert
      expect(() => Comparacao.comTolerancia(1, 1, delta)).toThrow(RangeError);
    },
  );
});
