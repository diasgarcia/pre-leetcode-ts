export type AnaliseDeComplexidade =
  | {
      readonly disponivel: true;
      readonly complexidades: ReadonlyMap<string, number>;
    }
  | {
      readonly disponivel: false;
      readonly detalheFalha: string;
    };

export interface AnalisadorDeComplexidade {
  analisar(
    arquivoFonte: string | URL,
    metodosRegistrados: readonly string[],
  ): AnaliseDeComplexidade;
}
