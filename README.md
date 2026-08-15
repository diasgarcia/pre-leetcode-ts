# Pré-LeetCode TypeScript

Trilha progressiva de algoritmos e estruturas de dados em TypeScript para quem já
conhece a sintaxe da linguagem, mas ainda não se sente preparado para resolver
problemas do LeetCode.

O projeto ensina fundamentos e padrões de resolução antes de apresentar
problemas no estilo LeetCode. O objetivo é desenvolver raciocínio, não decorar
soluções.

## Como funciona

1. Leia a teoria do módulo atual.
2. Resolva um exercício por vez.
3. Execute os testes preparados no próprio exercício.
4. Peça uma revisão antes de avançar.
5. Consulte `PROGRESSO.md` para saber o próximo passo.

As regras completas da mentoria e os comandos de desenvolvimento ficam em
`AGENTS.md`.

## Estrutura

```text
pre-leetcode-ts/
├── src/util/          ← infraestrutura de testes (tabela, sessão, CCN)
├── src/exercicios/    ← exercícios da trilha (criados a cada módulo)
├── test/util/         ← testes unitários da infraestrutura (100% de cobertura)
├── teoria/            ← conteúdo dos módulos iniciados (criada por módulo)
├── .opencode/         ← agentes, comandos e Skills do OpenCode
├── AGENTS.md          ← regras da mentoria e do projeto
└── PROGRESSO.md       ← estado atual da trilha
```

## Comandos

| Comando | Ação |
|---|---|
| `npm run verify` | Lint, typecheck, testes com cobertura e build |
| `npm run test` | Executa os testes unitários da infraestrutura |
| `npm run coverage` | Executa os testes e gera o relatório de cobertura |
| `npx tsx <arquivo>` | Executa um exercício e mostra a tabela de resultados |

## Roadmap

| Módulo | Conteúdo principal |
|---|---|
| 1 — Arrays e loops | Percorrer, contar, acumular e buscar |
| 2 — Strings | Caracteres, frequência, palíndromos e construção de strings |
| 3 — HashMap e HashSet | Chave/valor, contagem, duplicados e busca O(1) |
| 4 — Dois ponteiros | Início/fim e movimento por condição |
| 5 — Janela deslizante | Faixas contínuas e janelas fixas ou variáveis |
| 6 — Pilha e fila | LIFO, FIFO e estruturas aninhadas |
| 7 — Busca binária | Divisão de intervalo e controle de limites |
| 8 — Recursão | Caso-base e pilha de chamadas |
| 9 — Lista encadeada | Nós, referências e ponteiros lento/rápido |
| 10 — Árvores | DFS, BFS, altura e comparação |
| 11 — Grafos | Vértices, arestas e percursos BFS/DFS |

## OpenCode

O projeto possui configuração nativa para [OpenCode](https://opencode.ai).

### Comandos

| Comando | Ação |
|---|---|
| `/continuar` | Mostra o próximo passo. |
| `/validar` | Verifica tipos e executa os testes. |
| `/revisar` | Valida, revisa e libera o próximo exercício quando aprovado. |
| `/dica [nível]` | Fornece uma dica do nível 1 ao 5. |
| `/proximo` | Cria o próximo exercício permitido. |
| `/progresso` | Mostra o estado da trilha. |
| `/analisar` | Executa os testes e mostra a complexidade ciclomática. |
| `/commit` | Cria um commit quando a branch e o escopo estão corretos. |

### Skills

| Skill | Exemplo de chamada | Ação |
|---|---|---|
| `quiz-do-modulo` | `quero um quiz do módulo 2` | Faz uma pergunta por vez. |
| `leetcode` | `/leetcode easy` | Filtra por `easy`, `medium` ou `hard` dentro do conteúdo já estudado. |
| `retrospectiva-do-modulo` | `faça uma retrospectiva do módulo 2` | Resume aprendizados e pontos para revisar. |

---

**Uso educacional.** Projeto gratuito destinado ao estudo individual.
