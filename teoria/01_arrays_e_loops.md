# Módulo 1 — Arrays e loops

Teoria completa do módulo 1 da trilha Pré-LeetCode TypeScript.

Este módulo ensina a base de quase todo problema de algoritmo: percorrer um array
com laços para **contar**, **acumular** e **buscar** informações. Antes de
pensar em estruturas sofisticadas, é preciso dominar o percurso manual de
coleções.

---

## 1. O que é um array

Um array é uma coleção **ordenada** de valores. A ordem importa: cada valor
ocupa uma posição própria, chamada de **índice**, e pode aparecer mais de uma
vez (arrays aceitam duplicados).

Em TypeScript, arrays são objetos com métodos prontos (`push`, `map`, `filter`,
`reduce`, etc.). Neste módulo, porém, o objetivo é praticar **laços manuais**:
percorrer o array você mesmo, elemento por elemento, em vez de delegar o
trabalho a um método pronto.

### Declarando arrays

```ts
const numeros: number[] = [1, 2, 3, 4, 5];
const nomes: string[] = ["ana", "bia", "caio"];
const vazio: number[] = [];
```

Tipos de array são escritos com o tipo do elemento seguido de `[]`. Também
existe a forma `Array<number>`, mas `number[]` é o padrão mais comum.

### Arrays somente leitura (`readonly`)

Quando uma função recebe um array e **não deve modificá-lo**, usamos o tipo
`readonly number[]`. Ele permite ler elementos e consultar `length`, mas
impede alterações como reatribuir posições ou chamar `push`/`pop`:

```ts
function primeiroElemento(numeros: readonly number[]): number {
  return numeros[0];
}
```

Usar `readonly` é uma boa prática: deixa explícito que a função apenas lê a
coleção, e o TypeScript garante isso na compilação. Nos exercícios deste
módulo, as assinaturas já virão com `readonly`.

---

## 2. Índices

Cada elemento de um array é acessado pelo seu **índice**, que começa em `0`:

```ts
const numeros: number[] = [10, 20, 30, 40];
//                          0   1   2   3

numeros[0]; // 10 — primeiro elemento
numeros[2]; // 30
numeros[3]; // 40 — último elemento
numeros.length; // 4 — quantidade de elementos
numeros[numeros.length - 1]; // 40 — sempre o último elemento
```

Regras importantes:

- Os índices válidos vão de `0` até `length - 1`.
- `length` guarda a **quantidade** de elementos, não o índice do último.
- Acessar uma posição fora dos limites (`numeros[4]`, por exemplo) não lança
  erro: em JavaScript/TypeScript retorna `undefined`. Esse é um dos erros mais
  comuns em loops: escrever `i <= numeros.length` e ler uma posição que não
  existe.

---

## 3. Laços (loops)

Laço é uma estrutura que repete um bloco de código enquanto uma condição for
verdadeira. Em TypeScript há três formas principais de percorrer um array.

### 3.1 `for` clássico (por índice)

```ts
for (let i = 0; i < numeros.length; i += 1) {
  console.log(numeros[i]);
}
```

O `for` clássico tem três partes:

1. **Inicialização** (`let i = 0`): cria o contador, começando no primeiro índice.
2. **Condição** (`i < numeros.length`): o loop continua enquanto for verdadeira.
3. **Incremento** (`i += 1`): atualiza o contador ao final de cada repetição.

Ele é a escolha certa quando precisamos do **índice** — por exemplo, para
comparar um elemento com o vizinho, ou para saber em que posição algo foi
encontrado.

### 3.2 `for...of` (por valor)

```ts
for (const numero of numeros) {
  console.log(numero);
}
```

O `for...of` percorre os **valores** diretamente, sem se preocupar com índices.
É a forma mais legível quando a posição não importa: só queremos visitar cada
elemento. A variável do laço (`numero`) é declarada com `const` porque cada
repetição recebe um novo valor.

**Quando usar qual:**

- Preciso do índice? Use `for` clássico.
- Só preciso do valor? Use `for...of`.

### 3.3 `while`

```ts
let i = 0;
while (i < numeros.length) {
  console.log(numeros[i]);
  i += 1;
}
```

O `while` repete enquanto a condição for verdadeira. Para percorrer arrays ele
faz o mesmo que o `for` clássico, porém com mais linhas. Ele brilha quando o
número de repetições **não é conhecido de antemão** — por exemplo, "continue
enquanto a condição X for verdadeira". Para os exercícios do módulo 1, o `for`
clássico e o `for...of` resolvem a maioria dos casos.

### Laço que não executa nenhuma vez

Se a condição inicial já é falsa, o laço não executa nenhuma repetição. Com um
array vazio, `i < 0` é falso, então o bloco interno nunca roda. Esse
comportamento é importante: programas que percorrem arrays precisam funcionar
corretamente também quando o array está vazio.

---

## 4. Padrões de percurso

Existem quatro padrões que reaparecem em praticamente todos os problemas com
arrays. Eles são a "caixa de ferramentas" deste módulo.

### 4.1 Percorrer

Visitar todos os elementos, geralmente para imprimir, transformar ou validar:

```ts
for (const numero of numeros) {
  console.log(numero);
}
```

### 4.2 Contar

Percorrer e incrementar um contador quando uma condição é satisfeita. O
contador começa em `0`:

```ts
function contarPositivos(numeros: readonly number[]): number {
  let contador = 0;
  for (const numero of numeros) {
    if (numero > 0) {
      contador += 1;
    }
  }
  return contador;
}
```

### 4.3 Acumular

Percorrer e combinar todos os valores em um único resultado. A variável que
guarda o resultado parcial é chamada de **acumulador**, e precisa de um valor
**inicial** que faça sentido para a operação:

```ts
function produto(numeros: readonly number[]): number {
  let total = 1;
  for (const numero of numeros) {
    total *= numero;
  }
  return total;
}
```

Observe o papel do valor inicial: no produto ele é `1` (elemento neutro da
multiplicação). No padrão de **soma**, o valor inicial correto é `0` — e é
exatamente esse caso que você vai praticar no **Exercício 01 — Somar todos os
elementos**, aplicando o padrão de acumulação com um `for...of` (ou `for`
clássico) e um acumulador.

### 4.4 Buscar

Percorrer até encontrar o que se procura e **interromper** o laço no primeiro
acerto, usando `return` dentro do loop:

```ts
function primeiroPar(numeros: readonly number[]): number | undefined {
  for (const numero of numeros) {
    if (numero % 2 === 0) {
      return numero;
    }
  }
  return undefined; // nenhum par encontrado
}
```

A busca pode devolver o valor encontrado ou o índice da posição. O importante
é o padrão: `return` dentro do laço encerra a função (e o laço) imediatamente.

---

## 5. Casos extremos

Um bom algoritmo de array precisa funcionar para todas as entradas possíveis,
não só para o exemplo feliz. Os casos que mais derrubam soluções:

### Array vazio

O laço não executa nenhuma vez. O resultado é o valor inicial do acumulador ou
do contador: soma de vazio é `0`, contagem de vazio é `0`, produto de vazio
precisa ser decidido com cuidado. Sempre pergunte: "o que minha função retorna
para `[]`?".

### Um único elemento

O laço executa exatamente uma vez. Confira se o resultado de `[x]` faz sentido
(por exemplo, soma de `[7]` é `7`).

### Valores negativos

Somas e produtos mudam de sinal. Uma soma pode terminar negativa; não assuma
que "a soma sempre cresce".

### Zeros

Zeros são elementos legítimos. Eles não alteram uma soma, mas anulam um
produto e não contam como positivos. O programa deve tratá-los como qualquer
outro valor.

### Valores grandes

JavaScript/TypeScript representam números com ponto flutuante de 64 bits
(`number`). Inteiros são exatos até `2^53 - 1`; a partir daí há perda de
precisão. Para os problemas deste módulo isso raramente é um obstáculo, mas é
bom saber que acumular muitos valores grandes pode crescer rápido.

---

## 6. Complexidade de tempo e espaço

Complexidade é a forma padrão de descrever como um algoritmo se comporta
quando a entrada cresce. É medida em função do tamanho da entrada, chamado de
`n` (quantidade de elementos do array).

### Tempo O(n) — linear

Um laço que percorre todos os `n` elementos executa um número de passos
proporcional a `n`: `n = 100` custa cerca de 100 passos, `n = 100000` custa
cerca de 100000. Dizemos que o algoritmo é **O(n)** (lê-se "ó de ene").

Padrões do módulo:

- Percorrer, contar, acumular e buscar com um único laço: **O(n)**.
- Dois laços aninhados (um dentro do outro) já seriam **O(n²)** — cada um dos
  `n` elementos visitando os outros `n`.

### Espaço O(1) — constante

Espaço mede memória extra usada pelo algoritmo, além da entrada. Quando
usamos apenas variáveis simples (um acumulador, um contador, um índice), o
espaço extra não cresce com `n`: é **O(1)**.

Um contraexemplo: criar um array novo do mesmo tamanho do original gastaria
**O(n)** de espaço extra.

### Por que isso importa

No LeetCode, a solução é avaliada não só por estar correta, mas por ter uma
complexidade razoável. Um loop `for...of` simples (O(n) de tempo, O(1) de
espaço) é o padrão de qualidade para os problemas deste módulo.

---

## 7. Problemas do LeetCode relacionados

Quando o módulo estiver concluído, estes problemas do LeetCode são boas
práticas do que foi estudado:

- 1480 — Running Sum of 1d Array (Soma acumulada de um array)
- 1672 — Richest Customer Wealth (Cliente mais rico)
- 485 — Max Consecutive Ones (Unos consecutivos máximos)
- 1295 — Find Numbers with Even Number of Digits (Números com quantidade par de dígitos)
- 724 — Find Pivot Index (Índice pivô)
- 217 — Contains Duplicate (Contém duplicados)

Apenas os títulos, propositalmente: a resolução fica por sua conta quando
chegar a hora.

---

## Resumo do módulo

1. Array é uma coleção ordenada; índices começam em `0` e vão até `length - 1`.
2. `for` clássico quando o índice importa; `for...of` quando só o valor importa; `while` quando a repetição é controlada por condição.
3. Os quatro padrões: percorrer, contar, acumular e buscar.
4. Sempre teste o array vazio, o array unitário, negativos, zeros e valores grandes.
5. Um único laço = tempo O(n) e espaço O(1), o alvo dos exercícios deste módulo.