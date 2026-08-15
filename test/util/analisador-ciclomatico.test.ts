import {
  afterAll,
  beforeAll,
  describe,
  expect,
  it,
} from "vitest";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

import { AnalisadorCiclomatico } from "../../src/util/analisador-ciclomatico.js";

const CODIGO_FONTE = `
declare function semCorpo(valor: number): void;
export default function () { return 1; }

export function simples(): number {
  return 1;
}

export function completa(valor: number): number {
  let total = valor + 1;
  if (valor > 0) total += 1;
  for (let indice = 0; indice < 1; indice += 1) total += indice;
  for (const item of [1]) total += item;
  for (const chave in { a: 1 }) total += chave.length;
  while (total < 0) total += 1;
  do total += 1; while (total < 0);
  try { total += 1; } catch { total = 0; }
  switch (valor) {
    case 1: total += 1; break;
    case 2: total += 2; break;
    default: total += 3;
  }
  const sinal = valor > 0 ? 1 : 0;
  const logico = ((valor > 0 && valor < 10) || valor === 20) ?? false;
  return total + sinal + Number(logico);
}

export const seta = (valor: number): number => valor > 0 ? valor : 0;
export const expressao = function (): number { return 1; };
export let semInicializador: number;
export const numero = 1;
export const [desestruturada] = function (): number { return 1; };

export function externa(): number {
  function interna(valor: number): number {
    if (valor > 0) return valor;
    return 0;
  }
  return interna(1);
}

abstract class Base {
  public abstract metodoAbstrato(): void;
}

export class Exemplo extends Base {
  public metodo(valor: number): number { return valor || 0; }
  public ["literal"](): number { return 1; }
  public 1(): number { return 1; }
  public [Symbol.iterator](): Iterator<number> { return [][Symbol.iterator](); }
  public campo = (): number => 1;
  public ["campoLiteral"] = function (): number { return 1; };
  public [Symbol.toStringTag] = (): string => "Exemplo";
  public semValor?: () => number;
  public valor = 1;
  public metodoAbstrato(): void {}
}
`;

describe("AnalisadorCiclomatico", () => {
  let diretorioTemporario: string;
  let arquivoTs: string;
  let arquivoTsx: string;

  beforeAll(() => {
    diretorioTemporario = mkdtempSync(join(tmpdir(), "pre-leetcode-ts-"));
    arquivoTs = join(diretorioTemporario, "exemplo.ts");
    arquivoTsx = join(diretorioTemporario, "exemplo.tsx");
    writeFileSync(arquivoTs, CODIGO_FONTE, "utf8");
    writeFileSync(arquivoTsx, CODIGO_FONTE, "utf8");
  });

  afterAll(() => {
    rmSync(diretorioTemporario, { force: true, recursive: true });
  });

  it("calcula a CCN de funções, métodos e propriedades", () => {
    // Arrange
    const analisador = new AnalisadorCiclomatico();
    const metodos = [
      "simples",
      "completa",
      "seta",
      "expressao",
      "externa",
      "interna",
      "metodo",
      "literal",
      "1",
      "campo",
      "campoLiteral",
      "ausente",
    ];

    // Act
    const analise = analisador.analisar(arquivoTs, metodos);

    // Assert
    expect(analise.disponivel).toBe(true);
    if (!analise.disponivel) throw new Error("análise deveria estar disponível");
    expect(Object.fromEntries(analise.complexidades)).toEqual({
      simples: 1,
      completa: 14,
      seta: 2,
      expressao: 1,
      externa: 1,
      interna: 2,
      metodo: 2,
      literal: 1,
      1: 1,
      campo: 1,
      campoLiteral: 1,
    });
  });

  it("aceita uma URL de arquivo", () => {
    // Arrange
    const analisador = new AnalisadorCiclomatico();

    // Act
    const analise = analisador.analisar(pathToFileURL(arquivoTs), ["simples"]);

    // Assert
    expect(analise).toMatchObject({ disponivel: true });
  });

  it("aceita uma URL de arquivo em texto e arquivos TSX", () => {
    // Arrange
    const analisador = new AnalisadorCiclomatico();
    const url = pathToFileURL(arquivoTsx).toString();

    // Act
    const analise = analisador.analisar(url, ["simples"]);

    // Assert
    expect(analise).toMatchObject({ disponivel: true });
  });

  it("rejeita URLs que não apontam para arquivos locais", () => {
    // Arrange
    const analisador = new AnalisadorCiclomatico();

    // Act
    const analise = analisador.analisar(new URL("https://example.com/exercicio.ts"), [
      "simples",
    ]);

    // Assert
    expect(analise).toEqual({
      disponivel: false,
      detalheFalha: "arquivo fonte não encontrado",
    });
  });

  it("trata URLs de arquivo inválidas", () => {
    // Arrange
    const analisador = new AnalisadorCiclomatico();

    // Act
    const analise = analisador.analisar("file://%", ["simples"]);

    // Assert
    expect(analise.disponivel).toBe(false);
  });

  it("informa quando o arquivo não existe", () => {
    // Arrange
    const analisador = new AnalisadorCiclomatico();
    const inexistente = join(diretorioTemporario, "inexistente.ts");

    // Act
    const analise = analisador.analisar(inexistente, ["simples"]);

    // Assert
    expect(analise).toEqual({
      disponivel: false,
      detalheFalha: "arquivo fonte não encontrado",
    });
  });
});
