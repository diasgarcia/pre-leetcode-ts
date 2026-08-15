import { finalizar, iniciar, resultado } from "../../util/index.js";

/**
 * Exercício 09 — Verificar se o array está ordenado
 *
 * Enunciado:
 *
 * Escreva a função estaOrdenado, que recebe um array de números e retorna
 * true se ele estiver ordenado de forma não decrescente, ou seja, se cada
 * elemento é menor ou igual ao próximo. Um array vazio e um array com um
 * único elemento são considerados ordenados (true).
 *
 * Exemplos:
 *
 * estaOrdenado([1, 2, 3, 4, 5])  ->  true
 * estaOrdenado([])               ->  true
 * estaOrdenado([7])              ->  true
 * estaOrdenado([3, 1, 2])        ->  false
 *
 * Restrições:
 *
 * - Não use métodos prontos de coleção como sort, every ou reduce; use um laço manual.
 * - O array pode estar vazio, conter números negativos, zeros, valores grandes e duplicados.
 * - Elementos iguais são permitidos, pois a ordem deve ser não decrescente.
 * - A função deve interromper a verificação ao encontrar o primeiro par fora de ordem.
 *
 * Complexidade esperada:
 *
 * - Tempo: O(n), em que n é a quantidade de elementos do array.
 * - Espaço: O(1).
 */
export function estaOrdenado(numeros: readonly number[]): boolean {

    let anterior: number | undefined = numeros[0];
    if (anterior === undefined) {
        return true;
    }

    for (const numero of numeros) {
        if (numero < anterior) {
            return false;
        }

        anterior = numero;
    }

    return true;
}

iniciar({
    arquivoFonte: import.meta.url,
    limiteCiclomatico: 4,
    metodos: ["estaOrdenado"],
});

resultado("ordenado crescente", true, estaOrdenado([1, 2, 3, 4, 5]));
resultado("array vazio", true, estaOrdenado([]));
resultado("um único elemento", true, estaOrdenado([7]));
resultado("desordenado", false, estaOrdenado([3, 1, 2]));
resultado("elementos iguais", true, estaOrdenado([5, 5, 5]));
resultado("decrescente", false, estaOrdenado([5, 4, 3, 2, 1]));
resultado("negativos ordenados", true, estaOrdenado([-5, -3, -1, 0]));
resultado("negativos desordenados", false, estaOrdenado([-1, -3, -5]));
resultado("zeros", true, estaOrdenado([0, 0, 0, 1]));

finalizar();
