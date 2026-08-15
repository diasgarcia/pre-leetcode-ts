import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";
import ts from "typescript";

import type {
  AnaliseDeComplexidade,
  AnalisadorDeComplexidade,
} from "./analisador-de-complexidade.js";

interface FuncaoNomeada {
  readonly nome: string;
  readonly declaracao: ts.FunctionLikeDeclaration;
}

export class AnalisadorCiclomatico implements AnalisadorDeComplexidade {
  public analisar(
    arquivoFonte: string | URL,
    metodosRegistrados: readonly string[],
  ): AnaliseDeComplexidade {
    const caminho = this.resolverCaminho(arquivoFonte);
    if (caminho === undefined) {
      return this.indisponivel("arquivo fonte não encontrado");
    }

    let codigo: string;
    try {
      codigo = readFileSync(caminho, "utf8");
    } catch {
      return this.indisponivel("arquivo fonte não encontrado");
    }

    const arquivo = ts.createSourceFile(
      caminho,
      codigo,
      ts.ScriptTarget.Latest,
      true,
      caminho.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
    );
    const todasAsComplexidades = this.extrairComplexidades(arquivo);
    const complexidadesRegistradas = new Map<string, number>();

    for (const metodo of metodosRegistrados) {
      const complexidade = todasAsComplexidades.get(metodo);
      if (complexidade !== undefined) {
        complexidadesRegistradas.set(metodo, complexidade);
      }
    }

    return {
      disponivel: true,
      complexidades: complexidadesRegistradas,
    };
  }

  private resolverCaminho(arquivoFonte: string | URL): string | undefined {
    try {
      if (arquivoFonte instanceof URL) {
        return arquivoFonte.protocol === "file:"
          ? fileURLToPath(arquivoFonte)
          : undefined;
      }
      if (arquivoFonte.startsWith("file:")) {
        return fileURLToPath(arquivoFonte);
      }
      return resolve(arquivoFonte);
    } catch {
      return undefined;
    }
  }

  private extrairComplexidades(
    arquivo: ts.SourceFile,
  ): ReadonlyMap<string, number> {
    const complexidades = new Map<string, number>();

    const visitar = (no: ts.Node): void => {
      const funcao = this.obterFuncaoNomeada(no);
      if (funcao !== undefined) {
        complexidades.set(
          funcao.nome,
          this.calcularComplexidade(funcao.declaracao),
        );
      }
      ts.forEachChild(no, visitar);
    };

    visitar(arquivo);
    return complexidades;
  }

  private obterFuncaoNomeada(no: ts.Node): FuncaoNomeada | undefined {
    if (ts.isFunctionDeclaration(no)) {
      return no.name !== undefined && no.body !== undefined
        ? { nome: no.name.text, declaracao: no }
        : undefined;
    }

    if (ts.isMethodDeclaration(no)) {
      const nome = this.obterNomeDaPropriedade(no.name);
      return nome !== undefined && no.body !== undefined
        ? { nome, declaracao: no }
        : undefined;
    }

    if (!ts.isVariableDeclaration(no) && !ts.isPropertyDeclaration(no)) {
      return undefined;
    }

    const inicializador = no.initializer;
    if (
      inicializador === undefined ||
      (!ts.isArrowFunction(inicializador) &&
        !ts.isFunctionExpression(inicializador))
    ) {
      return undefined;
    }

    const nome = ts.isVariableDeclaration(no)
      ? ts.isIdentifier(no.name)
        ? no.name.text
        : undefined
      : this.obterNomeDaPropriedade(no.name);

    return nome === undefined
      ? undefined
      : { nome, declaracao: inicializador };
  }

  private obterNomeDaPropriedade(nome: ts.PropertyName): string | undefined {
    if (
      ts.isIdentifier(nome) ||
      ts.isStringLiteral(nome) ||
      ts.isNumericLiteral(nome)
    ) {
      return nome.text;
    }
    if (
      ts.isComputedPropertyName(nome) &&
      (ts.isStringLiteral(nome.expression) ||
        ts.isNumericLiteral(nome.expression))
    ) {
      return nome.expression.text;
    }
    return undefined;
  }

  private calcularComplexidade(funcao: ts.FunctionLikeDeclaration): number {
    let complexidade = 1;

    const visitar = (no: ts.Node): void => {
      if (ts.isFunctionLike(no)) return;
      if (this.ehPontoDeDecisao(no)) complexidade += 1;
      ts.forEachChild(no, visitar);
    };

    ts.forEachChild(funcao, visitar);
    return complexidade;
  }

  private ehPontoDeDecisao(no: ts.Node): boolean {
    if (
      ts.isIfStatement(no) ||
      ts.isForStatement(no) ||
      ts.isForInStatement(no) ||
      ts.isForOfStatement(no) ||
      ts.isWhileStatement(no) ||
      ts.isDoStatement(no) ||
      ts.isCatchClause(no) ||
      ts.isConditionalExpression(no) ||
      ts.isCaseClause(no)
    ) {
      return true;
    }

    if (!ts.isBinaryExpression(no)) return false;

    return (
      no.operatorToken.kind === ts.SyntaxKind.AmpersandAmpersandToken ||
      no.operatorToken.kind === ts.SyntaxKind.BarBarToken ||
      no.operatorToken.kind === ts.SyntaxKind.QuestionQuestionToken
    );
  }

  private indisponivel(detalheFalha: string): AnaliseDeComplexidade {
    return { disponivel: false, detalheFalha };
  }
}
