import { finalizar, iniciar, resultado } from "../../util/index.js";

/**
 * Exercício 04 — Encontrar o menor número
 *
 * Enunciado:
 *
 * Escreva a função encontrarMenor, que recebe um array de números e retorna o
 * menor valor presente nele. Se o array estiver vazio, o resultado deve ser 0.
 *
 * Exemplos:
 *
 * encontrarMenor([3, 8, 1, 42, 7])  ->  1
 * encontrarMenor([])                ->  0
 * encontrarMenor([-5, -10, -1])     ->  -10
 *
 * Restrições:
 *
 * - Não use métodos prontos como Math.min, reduce ou forEach; use um laço manual.
 * - O array pode estar vazio, conter números negativos, zeros, valores grandes e duplicados.
 * - Se o array estiver vazio, o resultado deve ser 0.
 *
 * Complexidade esperada:
 *
 * - Tempo: O(n), em que n é a quantidade de elementos do array.
 * - Espaço: O(1).
 */
export function encontrarMenor(numeros: readonly number[]): number {

    void numeros;
    // TODO: implemente sua solução
    return 0;
}

iniciar({
    arquivoFonte: import.meta.url,
    limiteCiclomatico: 4,
    metodos: ["encontrarMenor"],
});

resultado("array comum", 1, encontrarMenor([3, 8, 1, 42, 7]));
resultado("array vazio", 0, encontrarMenor([]));
resultado("um único elemento", -5, encontrarMenor([-5]));
resultado("menor no início", 1, encontrarMenor([1, 2, 3, 4]));
resultado("menor no meio", 2, encontrarMenor([4, 8, 2, 5, 7]));
resultado("menor no fim", -2, encontrarMenor([1, 2, 3, -2]));
resultado("valores negativos", -10, encontrarMenor([-5, -10, -1, -3]));
resultado("valores iguais", 7, encontrarMenor([7, 7, 7]));
resultado("zeros", 0, encontrarMenor([0, 0, 0]));

finalizar();