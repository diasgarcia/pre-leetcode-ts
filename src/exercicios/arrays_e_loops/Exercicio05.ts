import { finalizar, iniciar, resultado } from "../../util/index.js";

/**
 * Exercício 05 — Verificar se um valor existe
 *
 * Enunciado:
 *
 * Escreva a função verificarExistencia, que recebe um array de números e um
 * valor alvo e retorna true se o alvo estiver presente no array, e false caso
 * contrário. Se o array estiver vazio, o resultado deve ser false.
 *
 * Exemplos:
 *
 * verificarExistencia([3, 8, 1, 42, 7], 42)  ->  true
 * verificarExistencia([3, 8, 1, 42, 7], 10)  ->  false
 * verificarExistencia([], 7)                 ->  false
 *
 * Restrições:
 *
 * - Não use métodos prontos de coleção como includes, indexOf ou find; use um laço manual.
 * - O array pode estar vazio, conter números negativos, zeros e valores grandes.
 * - O array pode conter valores duplicados.
 *
 * Complexidade esperada:
 *
 * - Tempo: O(n), em que n é a quantidade de elementos do array.
 * - Espaço: O(1).
 */
export function verificarExistencia(numeros: readonly number[], alvo: number): boolean {

    for (const numero of numeros) {
        if (numero === alvo) {
            return true;
        }
    }

    return false;
}

iniciar({
    arquivoFonte: import.meta.url,
    limiteCiclomatico: 4,
    metodos: ["verificarExistencia"],
});

resultado("presente no início", true, verificarExistencia([7, 3, 8, 1], 7));
resultado("presente no meio", true, verificarExistencia([3, 8, 1, 42, 7], 1));
resultado("presente no fim", true, verificarExistencia([3, 8, 1, 42, 7], 7));
resultado("array vazio", false, verificarExistencia([], 7));
resultado("um único elemento presente", true, verificarExistencia([-5], -5));
resultado("um único elemento ausente", false, verificarExistencia([-5], 5));
resultado("valor ausente", false, verificarExistencia([3, 8, 1, 42, 7], 10));
resultado("valor negativo presente", true, verificarExistencia([-5, -10, -1, -3], -10));
resultado("duplicados", true, verificarExistencia([7, 7, 7], 7));
resultado("zero presente", true, verificarExistencia([0, 1, 2], 0));

finalizar();
