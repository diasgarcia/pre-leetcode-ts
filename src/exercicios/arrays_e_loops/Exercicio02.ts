import { finalizar, iniciar, resultado } from "../../util/index.js";

/**
 * Exercício 02 — Contar números pares
 *
 * Enunciado:
 *
 * Escreva a função contarPares, que recebe um array de números e retorna a
 * quantidade de números pares presentes nele. Lembre-se de que 0 é par e de
 * que números negativos também podem ser pares. Se o array estiver vazio, o
 * resultado deve ser 0.
 *
 * Exemplos:
 *
 * contarPares([1, 2, 3, 4, 5, 6])  ->  3
 * contarPares([])                  ->  0
 * contarPares([-4, -3, 0, 2])      ->  3
 *
 * Restrições:
 *
 * - Não use métodos prontos de coleção como filter, reduce ou forEach; use um laço manual.
 * - O array pode estar vazio, conter números negativos, zeros e valores grandes.
 * - 0 é considerado par.
 *
 * Complexidade esperada:
 *
 * - Tempo: O(n), em que n é a quantidade de elementos do array.
 * - Espaço: O(1).
 */
export function contarPares(numeros: readonly number[]): number {

    let quantidade = 0;
    for (const numero of numeros) {
        if (numero % 2 === 0) {
            quantidade = quantidade + 1;
        }
    }

    return quantidade;
}

iniciar({
    arquivoFonte: import.meta.url,
    limiteCiclomatico: 3,
    metodos: ["contarPares"],
});

resultado("array comum", 3, contarPares([1, 2, 3, 4, 5, 6]));
resultado("array vazio", 0, contarPares([]));
resultado("um único par", 1, contarPares([8]));
resultado("um único ímpar", 0, contarPares([7]));
resultado("todos pares", 4, contarPares([2, 4, 6, 8]));
resultado("nenhum par", 0, contarPares([1, 3, 5, 9]));
resultado("negativos e zeros", 3, contarPares([-4, -3, 0, 2]));
resultado("valores grandes", 2, contarPares([1_000_000, 999_999, 500_002]));

finalizar();
