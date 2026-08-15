import { finalizar, iniciar, resultado } from "../../util/index.js";

/**
 * Exercício 01 — Somar todos os elementos
 *
 * Enunciado:
 *
 * Escreva a função somar, que recebe um array de números e retorna a soma de
 * todos os seus elementos. Se o array estiver vazio, a soma deve ser 0.
 *
 * Exemplos:
 *
 * somar([1, 2, 3, 4, 5])  ->  15
 * somar([])                ->  0
 * somar([-2, -3, -4])      ->  -9
 *
 * Restrições:
 *
 * - Não use métodos prontos de coleção como reduce, forEach ou map; use um laço manual.
 * - O array pode estar vazio, conter números negativos, zeros e valores grandes.
 * - A soma pode ser negativa.
 *
 * Complexidade esperada:
 *
 * - Tempo: O(n), em que n é a quantidade de elementos do array.
 * - Espaço: O(1).
 */
export function somar(numeros: readonly number[]): number {

    let total = 0;
    for (const numero of numeros) {
        total += numero;
    }

    return total;
}

iniciar({
    arquivoFonte: import.meta.url,
    limiteCiclomatico: 3,
    metodos: ["somar"],
});

resultado("array comum", 15, somar([1, 2, 3, 4, 5]));
resultado("array vazio", 0, somar([]));
resultado("um único elemento", 7, somar([7]));
resultado("valores negativos", -9, somar([-2, -3, -4]));
resultado("zeros", 0, somar([0, 0, 0, 0]));
resultado("valores grandes", 1_000_000, somar([500_000, 500_000]));

finalizar();
