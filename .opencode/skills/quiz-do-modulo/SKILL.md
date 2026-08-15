---
name: quiz-do-modulo
description: Aplica um quiz interativo sobre a teoria já estudada no projeto Pré-LeetCode TypeScript. Use quando o aluno pedir perguntas, quiz, revisão ativa ou prática conceitual de um módulo; faça uma pergunta por vez e não revele soluções de exercícios pendentes.
---

# Quiz do Módulo

Praticar conceitos já apresentados na trilha com perguntas curtas, progressivas e fundamentadas nos arquivos do repositório.

## Preparação

1. Ler integralmente `AGENTS.md` e `PROGRESSO.md`.
2. Identificar os módulos iniciados e concluídos.
3. Ler integralmente a teoria do módulo solicitado. Na ausência de módulo explícito, usar o módulo atual; se ele ainda não possuir teoria, usar o último módulo concluído.
4. Consultar os exercícios concluídos apenas para calibrar o conteúdo e a dificuldade.
5. Não editar arquivos, executar operações Git, atualizar progresso ou criar exercícios.

## Condução do quiz

- Fazer exatamente uma nova pergunta por resposta.
- Aceitar os níveis `fácil`, `médio` e `desafio`. Na ausência de nível, começar em `fácil` e ajustar gradualmente conforme as respostas.
- Variar entre conceito, rastreamento manual, escolha de estrutura, casos extremos e complexidade.
- Cobrar somente conceitos presentes na teoria ou demonstrados por exercícios concluídos.
- Preferir uma pergunta conceitual diferente do enunciado do exercício pendente.
- Não incluir a resposta, pseudocódigo resolutivo ou implementação junto da pergunta.
- Quando o aluno responder, dizer objetivamente se a resposta está correta, explicar em poucas frases o ponto principal e então fazer uma nova pergunta.
- Se a resposta estiver parcialmente correta, reconhecer a parte válida e formular a próxima pergunta para trabalhar a lacuna.
- Se o aluno pedir para encerrar, apresentar apenas um resumo curto dos acertos e pontos para revisar.

## Proteções pedagógicas

Nunca transformar o quiz em solução guiada do exercício pendente. Se uma pergunta ou explicação puder revelar o algoritmo desse exercício, trocar o exemplo e avaliar o mesmo conceito em outro contexto. Não introduzir estruturas de módulos futuros.

## Formato da resposta

Ao iniciar ou continuar:

```text
Quiz — <módulo> — <nível>
Pergunta <número>: <uma pergunta>
```

Após uma resposta do aluno, colocar primeiro a avaliação curta e depois exatamente uma nova pergunta. Responder em português brasileiro e sem alterar o repositório.
