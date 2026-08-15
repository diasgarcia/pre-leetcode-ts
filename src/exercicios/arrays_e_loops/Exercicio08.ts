import { finalizar, iniciar, resultado } from "../../util/index.js";

/**
 * Exercício 08 — Contar ocorrências de um número
 *
 * Enunciado:
 *
 * Escreva a função contarOcorrencias, que recebe um array de números e um
 * valor alvo e retorna quantas vezes o alvo aparece no array. Se o array
 * estiver vazio, o resultado deve ser 0.
 *
 * Exemplos:
 *
 * contarOcorrencias([3, 8, 1, 42, 7], 42)  ->  1
 * contarOcorrencias([5, 7, 5, 3, 5, 2], 5)  ->  3
 * contarOcorrencias([], 7)                 ->  0
 * contarOcorrencias([3, 8, 1, 42, 7], 10)  ->  0
 *
 * Restrições:
 *
 * - Não use métodos prontos de coleção como filter, reduce ou forEach; use um laço manual.
 * - O array pode estar vazio, conter números negativos, zeros, valores grandes e duplicados.
 * - Se o alvo não estiver no array, o resultado deve ser 0.
 *
 * Complexidade esperada:
 *
 * - Tempo: O(n), em que n é a quantidade de elementos do array.
 * - Espaço: O(1).
 */
export function contarOcorrencias(numeros: readonly number[], alvo: number): number {

    let contador = 0;
    for (const numero of numeros) {
        if (numero === alvo)  {
            contador++;
        }
    }

    return contador;
}

iniciar({
    arquivoFonte: import.meta.url,
    limiteCiclomatico: 4,
    metodos: ["contarOcorrencias"],
});

resultado("alvo no início", 1, contarOcorrencias([7, 3, 8, 1], 7));
resultado("alvo no meio", 1, contarOcorrencias([3, 8, 1, 42, 7], 1));
resultado("alvo no fim", 1, contarOcorrencias([3, 8, 1, 42, 7], 7));
resultado("múltiplas ocorrências espalhadas", 3, contarOcorrencias([5, 7, 5, 3, 5, 2], 5));
resultado("todas as posições ocupadas", 5, contarOcorrencias([4, 4, 4, 4, 4], 4));
resultado("array vazio", 0, contarOcorrencias([], 7));
resultado("alvo ausente", 0, contarOcorrencias([3, 8, 1, 42, 7], 10));
resultado("um único elemento presente", 1, contarOcorrencias([-5], -5));
resultado("um único elemento ausente", 0, contarOcorrencias([-5], 5));
resultado("valores negativos", 2, contarOcorrencias([-5, -10, -1, -3, -5], -5));
resultado("zeros", 3, contarOcorrencias([0, 1, 0, 2, 0], 0));
resultado("valores grandes", 2, contarOcorrencias([1_000_000, 999_999, 1_000_000], 1_000_000));

finalizar();
