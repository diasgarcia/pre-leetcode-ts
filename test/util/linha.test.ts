import { describe, expect, it } from "vitest";

import { Linha } from "../../src/util/linha.js";
import type { StatusLinha } from "../../src/util/linha.js";

describe("Linha", () => {
  it("cria uma linha de teste aprovada", () => {
    // Act
    const linha = Linha.teste(true, "caso", "1", "1");

    // Assert
    expect(linha).toMatchObject({
      tipo: "TESTE",
      status: "PASS",
      nome: "caso",
      obtido: "1",
      esperado: "1",
      detalhe: "-",
    });
  });

  it("cria uma linha de teste reprovada", () => {
    // Act
    const linha = Linha.teste(false, "caso", "1", "2");

    // Assert
    expect(linha).toMatchObject({
      status: "FAIL",
      detalhe: "valores diferentes",
    });
  });

  it.each([
    [true, "PASS"],
    [false, "FAIL"],
  ] as const)("cria uma linha de resumo", (passou, status) => {
    // Act
    const linha = Linha.resumo(passou, "1/1", "1/1", "detalhe");

    // Assert
    expect(linha).toMatchObject({
      tipo: "RESUMO",
      status,
      nome: "testes",
      obtido: "1/1",
      esperado: "1/1",
      detalhe: "detalhe",
    });
  });

  it.each<readonly [StatusLinha, string]>([
    ["PASS", "\u001B[32m"],
    ["FAIL", "\u001B[31m"],
    ["OK", "\u001B[32m"],
    ["ALERTA", "\u001B[33m"],
    ["SKIP", "\u001B[90m"],
    ["INDISP", "\u001B[33m"],
    ["ERRO", "\u001B[31m"],
  ])("colore o status %s", (status, codigo) => {
    // Arrange
    const linha = Linha.complexidade(status, "metodo", "1", "<= 5", "baixa");

    // Act
    const colorido = linha.colorirStatus(status);

    // Assert
    expect(linha.tipo).toBe("CCN");
    expect(colorido).toBe(`${codigo}${status}\u001B[0m`);
  });
});
