import { finalizar, iniciar, resultado } from "../../util/index.js";

/**
 * Exercício 06 — Retornar o índice de um valor
 *
 * Enunciado:
 *
 * Escreva a função retornarIndice, que recebe um array de números e um valor
 * alvo e retorna o índice da primeira ocorrência do alvo no array. Se o alvo
 * não estiver presente, o resultado deve ser -1. Se houver valores duplicados,
 * deve ser retornado o índice da primeira ocorrência.
 *
 * Exemplos:
 *
 * retornarIndice([3, 8, 1, 42, 7], 42)  ->  3
 * retornarIndice([3, 8, 1, 42, 7], 10)  ->  -1
 * retornarIndice([], 7)                 ->  -1
 * retornarIndice([7, 7, 7], 7)          ->  0
 *
 * Restrições:
 *
 * - Não use métodos prontos de coleção como indexOf, includes ou findIndex; use um laço manual.
 * - O array pode estar vazio, conter números negativos, zeros, valores grandes e duplicados.
 * - Se o alvo não estiver no array, o resultado deve ser -1.
 * - Se houver duplicados, retorne o índice da primeira ocorrência.
 *
 * Complexidade esperada:
 *
 * - Tempo: O(n), em que n é a quantidade de elementos do array.
 * - Espaço: O(1).
 */
export function retornarIndice(numeros: readonly number[], alvo: number): number {

    for (let indice = 0; indice < numeros.length; indice++) {
        if (numeros[indice] === alvo) {
            return indice;
        }
    }

    return -1;
}

iniciar({
    arquivoFonte: import.meta.url,
    limiteCiclomatico: 4,
    metodos: ["retornarIndice"],
});

resultado("alvo no início", 0, retornarIndice([7, 3, 8, 1], 7));
resultado("alvo no meio", 2, retornarIndice([3, 8, 1, 42, 7], 1));
resultado("alvo no fim", 4, retornarIndice([3, 8, 1, 42, 7], 7));
resultado("array vazio", -1, retornarIndice([], 7));
resultado("alvo ausente", -1, retornarIndice([3, 8, 1, 42, 7], 10));
resultado("um único elemento presente", 0, retornarIndice([-5], -5));
resultado("duplicados retornam primeira ocorrência", 1, retornarIndice([5, 7, 7, 3], 7));
resultado("valor negativo presente", 1, retornarIndice([-5, -10, -1, -3], -10));
resultado("zero presente", 2, retornarIndice([4, 8, 0, 2], 0));

finalizar();
