import { describe, expect, it } from "vitest";

import { Cor } from "../../src/util/cor.js";

describe("Cor", () => {
  it.each([
    [Cor.VERDE, "\u001B[32m"],
    [Cor.VERMELHO, "\u001B[31m"],
    [Cor.CINZA, "\u001B[90m"],
    [Cor.AMARELO, "\u001B[33m"],
    [Cor.RESET, "\u001B[0m"],
  ])("aplica e expõe o código ANSI", (cor, codigo) => {
    // Arrange
    const texto = "valor";

    // Act
    const colorido = cor.aplicar(texto);

    // Assert
    expect(colorido).toBe(`${codigo}${texto}\u001B[0m`);
    expect(cor.toString()).toBe(codigo);
  });
});
