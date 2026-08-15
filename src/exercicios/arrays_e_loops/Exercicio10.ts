import { finalizar, iniciar, resultado } from "../../util/index.js";

/**
 * Exercício 10 — Encontrar dois números com soma-alvo
 *
 * Enunciado:
 *
 * Escreva a função temParComSoma, que recebe um array de números e um valor
 * alvo e retorna true se existirem dois elementos distintos (em índices
 * diferentes) cuja soma seja igual ao alvo. Se o array tiver menos de 2
 * elementos, o resultado deve ser false.
 *
 * Exemplos:
 *
 * temParComSoma([2, 7, 11, 15], 9)  ->  true
 * temParComSoma([1, 2, 3, 4], 100)  ->  false
 * temParComSoma([5], 5)             ->  false
 * temParComSoma([5, 5], 10)         ->  true
 *
 * Restrições:
 *
 * - Não use métodos prontos de coleção como includes, indexOf ou reduce; use laços manuais.
 * - Dois elementos distintos significam posições diferentes no array, mesmo que os valores sejam iguais.
 * - O array pode estar vazio, conter números negativos, zeros, valores grandes e duplicados.
 * - Use dois laços aninhados, um para cada elemento do par.
 *
 * Complexidade esperada:
 *
 * - Tempo: O(n²), em que n é a quantidade de elementos do array.
 * - Espaço: O(1).
 */
export function temParComSoma(numeros: readonly number[], alvo: number): boolean {

    for (let i = 0; i < numeros.length; i++) {
        const numero = numeros[i];

        for (let j = i + 1; j < numeros.length; j++) {
            const proximo = numeros[j];
            
            if (numero !== undefined && proximo !== undefined && numero + proximo === alvo) {
                return true;
            }
        }
    }

    return false;
}

iniciar({
    arquivoFonte: import.meta.url,
    limiteCiclomatico: 6,
    metodos: ["temParComSoma"],
});

resultado("par no início", true, temParComSoma([2, 7, 11, 15], 9));
resultado("par no fim", true, temParComSoma([1, 2, 3, 4, 5], 9));
resultado("par com negativos", true, temParComSoma([-3, 1, 5, 8], 5));
resultado("alvo zero com positivo e negativo", true, temParComSoma([-4, 2, 4, 7], 0));
resultado("sem par", false, temParComSoma([1, 2, 3, 4], 100));
resultado("array vazio", false, temParComSoma([], 5));
resultado("um único elemento", false, temParComSoma([5], 5));
resultado("dois elementos que somam", true, temParComSoma([3, 8], 11));
resultado("dois elementos que não somam", false, temParComSoma([3, 8], 10));
resultado("elementos iguais que somam o alvo", true, temParComSoma([5, 5], 10));

finalizar();
