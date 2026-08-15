import { finalizar, iniciar, resultado } from "../../util/index.js";

/**
 * Exercício 07 — Inverter um array
 *
 * Enunciado:
 *
 * Escreva a função inverter, que recebe um array de números e retorna um NOVO
 * array com os mesmos elementos na ordem inversa. O array original não deve
 * ser modificado: a função apenas lê a entrada e devolve outro array.
 *
 * Exemplos:
 *
 * inverter([1, 2, 3, 4, 5])  ->  [5, 4, 3, 2, 1]
 * inverter([])               ->  []
 * inverter([7])              ->  [7]
 * inverter([-2, -3, -4])     ->  [-4, -3, -2]
 *
 * Restrições:
 *
 * - Não use métodos prontos de coleção como reverse, toReversed ou map; use um laço manual.
 * - O array original deve permanecer intacto após a chamada.
 * - O array retornado deve ser um array novo, diferente do array de entrada.
 * - O array pode estar vazio, conter números negativos, zeros, valores grandes e duplicados.
 *
 * Complexidade esperada:
 *
 * - Tempo: O(n), em que n é a quantidade de elementos do array.
 * - Espaço: O(n), por causa do novo array retornado.
 */
export function inverter(numeros: readonly number[]): number[] {
    const invertido: number[] = [];

    for (let indice = 0; indice < numeros.length; indice++) {
        
        const numero = numeros[numeros.length - 1 - indice];
        if (numero !== undefined) {
            invertido[indice] = numero;
        }
    }

    return invertido;
}

iniciar({
    arquivoFonte: import.meta.url,
    limiteCiclomatico: 4,
    metodos: ["inverter"],
});

resultado("array comum", [5, 4, 3, 2, 1], inverter([1, 2, 3, 4, 5]));
resultado("array vazio", [], inverter([]));
resultado("um único elemento", [7], inverter([7]));
resultado("dois elementos", [20, 10], inverter([10, 20]));
resultado("comprimento par", [4, 3, 2, 1], inverter([1, 2, 3, 4]));
resultado("comprimento ímpar", [3, 2, 1], inverter([1, 2, 3]));
resultado("valores negativos e zero", [-10, 0, -5], inverter([-5, 0, -10]));
resultado("duplicados", [9, 9, 4, 4], inverter([4, 4, 9, 9]));

const original = [1, 2, 3, 4, 5];
inverter(original);
resultado("não modifica o array original", [1, 2, 3, 4, 5], original);

finalizar();
