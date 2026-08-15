import { describe, expect, it } from "vitest";

import { Cor } from "../../src/util/cor.js";
import { Linha } from "../../src/util/linha.js";
import { Tabela } from "../../src/util/tabela.js";

describe("Tabela", () => {
  it("rejeita um escritor inválido", () => {
    // Act e Assert
    expect(
      () => new Tabela(undefined as unknown as (conteudo: string) => void),
    ).toThrow(TypeError);
  });

  it("imprime o cabeçalho mesmo sem linhas", () => {
    // Arrange
    let saida = "";
    const tabela = new Tabela((conteudo) => {
      saida += conteudo;
    });

    // Act
    tabela.imprimir([]);

    // Assert
    expect(saida).toContain("Tipo");
    expect(saida).toContain("Status");
    expect(saida).toContain("Caso / Metodo");
    expect(saida).toContain("-------------------------");
  });

  it("imprime linhas, cores e o separador do resumo", () => {
    // Arrange
    let saida = "";
    const tabela = new Tabela((conteudo) => {
      saida += conteudo;
    });
    const linhas = [
      Linha.teste(true, "array comum", "6", "6"),
      Linha.teste(false, "array diferente", "5", "6"),
      Linha.resumo(false, "1/2", "2/2", "1 falhou"),
      Linha.complexidade("SKIP", "somar", "-", "-", "-"),
    ];

    // Act
    tabela.imprimir(linhas);

    // Assert
    expect(saida).toContain(Cor.VERDE.aplicar("PASS  "));
    expect(saida).toContain(Cor.VERMELHO.aplicar("FAIL  "));
    expect(saida).toContain(Cor.CINZA.aplicar("       -"));
    expect(saida).toContain(Cor.CINZA.aplicar("-"));
    expect(saida).toContain(Cor.CINZA.toString());
    expect(saida).toContain("valores diferentes");
  });

  it("expande as colunas para conteúdos maiores", () => {
    // Arrange
    let saida = "";
    const tabela = new Tabela((conteudo) => {
      saida = conteudo;
    });
    const nome = "nome de caso muito maior que a largura mínima";
    const valor = "123456789012345";
    const detalhe = "detalhe maior que o mínimo";

    // Act
    tabela.imprimir([
      Linha.complexidade("ALERTA", nome, valor, valor, detalhe),
    ]);

    // Assert
    expect(saida).toContain(nome);
    expect(saida).toContain(valor);
    expect(saida).toContain("------------------------");
    expect(saida).toContain(detalhe);
  });
});
