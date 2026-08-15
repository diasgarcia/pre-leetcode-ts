import type {
  AnaliseDeComplexidade,
  AnalisadorDeComplexidade,
} from "./analisador-de-complexidade.js";
import { Comparacao } from "./comparacao.js";
import { Linha } from "./linha.js";
import type { StatusLinha } from "./linha.js";
import { Tabela } from "./tabela.js";

export interface ConfiguracaoDaSessao {
  readonly arquivoFonte: string | URL;
  readonly limiteCiclomatico: number;
  readonly metodosRegistrados: readonly string[];
  readonly tabela: Tabela;
  readonly analisadorCiclomatico: AnalisadorDeComplexidade;
}

export class SessaoDeTestes {
  private readonly arquivoFonte: string | URL;
  private readonly limiteCiclomatico: number;
  private readonly metodosRegistrados: readonly string[];
  private readonly tabela: Tabela;
  private readonly analisadorCiclomatico: AnalisadorDeComplexidade;
  private readonly testes: Linha[] = [];

  private totalFalhas = 0;
  private finalizada = false;

  public constructor(configuracao: ConfiguracaoDaSessao) {
    this.validarArquivoFonte(configuracao.arquivoFonte);
    this.validarLimite(configuracao.limiteCiclomatico);

    this.arquivoFonte = configuracao.arquivoFonte;
    this.limiteCiclomatico = configuracao.limiteCiclomatico;
    this.metodosRegistrados = this.validarMetodos(
      configuracao.metodosRegistrados,
    );
    if (!(configuracao.tabela instanceof Tabela)) {
      throw new TypeError("tabela inválida");
    }
    this.validarAnalisador(configuracao.analisadorCiclomatico);
    this.tabela = configuracao.tabela;
    this.analisadorCiclomatico = configuracao.analisadorCiclomatico;
  }

  public registrar(caso: string, comparacao: Comparacao): void {
    this.garantirAberta();
    if (typeof caso !== "string") {
      throw new TypeError("caso deve ser uma string");
    }
    if (caso.trim().length === 0) {
      throw new RangeError("caso não pode estar vazio");
    }
    if (!(comparacao instanceof Comparacao)) {
      throw new TypeError("comparação inválida");
    }

    if (!comparacao.passou) this.totalFalhas += 1;
    this.testes.push(
      Linha.teste(
        comparacao.passou,
        caso,
        comparacao.obtido,
        comparacao.esperado,
      ),
    );
  }

  public finalizar(): void {
    if (this.finalizada) return;

    const possuiTestes = this.testes.length > 0;
    const todosPassaram = possuiTestes && this.totalFalhas === 0;
    const relatorio = [
      ...this.testes,
      this.criarResumo(todosPassaram),
      ...this.criarLinhasDeComplexidade(todosPassaram),
    ];

    this.tabela.imprimir(relatorio);
    this.finalizada = true;
  }

  public estaFinalizada(): boolean {
    return this.finalizada;
  }

  private criarResumo(todosPassaram: boolean): Linha {
    const totalTestes = this.testes.length;
    const obtido = `${String(totalTestes - this.totalFalhas)}/${String(totalTestes)}`;
    const esperado = `${String(totalTestes)}/${String(totalTestes)}`;
    let detalhe: string;

    if (totalTestes === 0) {
      detalhe = "nenhum teste registrado";
    } else if (todosPassaram) {
      detalhe = "todos passaram";
    } else {
      detalhe = `${String(this.totalFalhas)} ${this.totalFalhas === 1 ? "falhou" : "falharam"}`;
    }

    return Linha.resumo(todosPassaram, obtido, esperado, detalhe);
  }

  private criarLinhasDeComplexidade(todosPassaram: boolean): readonly Linha[] {
    if (this.metodosRegistrados.length === 0) return [];

    if (!todosPassaram) {
      const detalhe =
        this.testes.length === 0
          ? "nenhum teste registrado"
          : "testes falharam";
      return this.metodosRegistrados.map((metodo) =>
        Linha.complexidade("SKIP", metodo, "-", "-", detalhe),
      );
    }

    const analise = this.analisadorCiclomatico.analisar(
      this.arquivoFonte,
      this.metodosRegistrados,
    );
    if (!analise.disponivel) {
      return this.criarLinhasIndisponiveis(analise);
    }

    return this.metodosRegistrados.map((metodo) => {
      const complexidade = analise.complexidades.get(metodo);
      return complexidade === undefined
        ? Linha.complexidade(
            "ERRO",
            metodo,
            "-",
            "-",
            "método não encontrado",
          )
        : this.criarLinhaDeComplexidade(metodo, complexidade);
    });
  }

  private criarLinhasIndisponiveis(
    analise: Extract<AnaliseDeComplexidade, { readonly disponivel: false }>,
  ): readonly Linha[] {
    return this.metodosRegistrados.map((metodo) =>
      Linha.complexidade(
        "INDISP",
        metodo,
        "-",
        "-",
        analise.detalheFalha,
      ),
    );
  }

  private criarLinhaDeComplexidade(
    metodo: string,
    complexidade: number,
  ): Linha {
    const proporcao = complexidade / this.limiteCiclomatico;
    let classificacao: string;

    if (proporcao <= 0.4) classificacao = "baixa";
    else if (proporcao <= 0.7) classificacao = "moderada";
    else classificacao = "alta";

    const status: StatusLinha =
      complexidade <= this.limiteCiclomatico ? "OK" : "ALERTA";
    return Linha.complexidade(
      status,
      metodo,
      String(complexidade),
      `<= ${String(this.limiteCiclomatico)}`,
      classificacao,
    );
  }

  private garantirAberta(): void {
    if (this.finalizada) {
      throw new Error(
        "não é possível registrar resultados após finalizar()",
      );
    }
  }

  private validarArquivoFonte(arquivoFonte: string | URL): void {
    const caminhoVazio =
      typeof arquivoFonte === "string" && arquivoFonte.trim().length === 0;
    if (!(arquivoFonte instanceof URL) && typeof arquivoFonte !== "string") {
      throw new TypeError("arquivo fonte deve ser um caminho ou uma URL");
    }
    if (caminhoVazio) {
      throw new RangeError("arquivo fonte não pode estar vazio");
    }
  }

  private validarLimite(limite: number): void {
    if (!Number.isInteger(limite) || limite <= 0) {
      throw new RangeError(
        "limite ciclomático deve ser um inteiro maior que zero",
      );
    }
  }

  private validarAnalisador(
    analisador: unknown,
  ): asserts analisador is AnalisadorDeComplexidade {
    if (
      typeof analisador !== "object" ||
      analisador === null ||
      !("analisar" in analisador) ||
      typeof analisador.analisar !== "function"
    ) {
      throw new TypeError("analisador ciclomático inválido");
    }
  }

  private validarMetodos(metodos: unknown): readonly string[] {
    if (!Array.isArray(metodos)) {
      throw new TypeError("métodos devem ser um array");
    }

    const nomesUnicos = new Set<string>();
    const validados: string[] = [];
    for (const metodo of metodos) {
      if (typeof metodo !== "string") {
        throw new TypeError("nome de método deve ser uma string");
      }
      if (metodo.trim().length === 0) {
        throw new RangeError("nome de método não pode estar vazio");
      }
      if (nomesUnicos.has(metodo)) {
        throw new RangeError(`método duplicado: ${metodo}`);
      }
      nomesUnicos.add(metodo);
      validados.push(metodo);
    }

    return Object.freeze(validados);
  }
}
