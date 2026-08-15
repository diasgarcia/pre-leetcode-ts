import { finalizar, iniciar, resultado } from "../../util/index.js";

/**
 * Exercício 03 — Encontrar o maior número
 *
 * Enunciado:
 *
 * Escreva a função encontrarMaior, que recebe um array de números e retorna o
 * maior valor presente nele. Se o array estiver vazio, o resultado deve ser 0.
 *
 * Exemplos:
 *
 * encontrarMaior([3, 8, 1, 42, 7])  ->  42
 * encontrarMaior([])                ->  0
 * encontrarMaior([-5, -10, -1])     ->  -1
 *
 * Restrições:
 *
 * - Não use métodos prontos como Math.max, reduce ou forEach; use um laço manual.
 * - O array pode estar vazio, conter números negativos, zeros, valores grandes e duplicados.
 * - Se o array estiver vazio, o resultado deve ser 0.
 *
 * Complexidade esperada:
 *
 * - Tempo: O(n), em que n é a quantidade de elementos do array.
 * - Espaço: O(1).
 */
export function encontrarMaior(numeros: readonly number[]): number {

    let maiorNumero: number | undefined = numeros[0];

    if (maiorNumero === undefined) {
        return 0;
    }

    for (const numero of numeros) {
        if (numero > maiorNumero) {
            maiorNumero = numero;
        }
    }

    return maiorNumero;
}

iniciar({
    arquivoFonte: import.meta.url,
    limiteCiclomatico: 4,
    metodos: ["encontrarMaior"],
});

resultado("array comum", 42, encontrarMaior([3, 8, 1, 42, 7]));
resultado("array vazio", 0, encontrarMaior([]));
resultado("um único elemento", -5, encontrarMaior([-5]));
resultado("maior no início", 9, encontrarMaior([9, 1, 2, 3]));
resultado("maior no meio", 25, encontrarMaior([4, 8, 25, 3, 7]));
resultado("maior no fim", 100, encontrarMaior([1, 2, 3, 100]));
resultado("valores negativos", -1, encontrarMaior([-5, -10, -1, -3]));
resultado("valores iguais", 7, encontrarMaior([7, 7, 7]));
resultado("zeros", 0, encontrarMaior([0, 0, 0]));

finalizar();
