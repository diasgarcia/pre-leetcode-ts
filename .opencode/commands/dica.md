---
description: Fornece uma dica progressiva sobre o exercício atual sem entregar a solução
agent: revisor
subtask: true
---

# /dica

Leia `AGENTS.md`, `PROGRESSO.md`, a teoria do módulo e o exercício atual.

Forneça **somente uma dica** sobre a dificuldade informada pelo aluno.

$ARGUMENTS

## Política progressiva

- **Sem argumento:** dica nível 1 (pergunta de raciocínio).
- **Argumento `2`:** dica nível 2 (indicação do conceito).
- **Argumento `3`:** dica nível 3 (passos gerais, sem código).
- **Argumento `4`:** pseudocódigo parcial.
- **Argumento `5`:** explicação detalhada, mas ainda sem código completo.

Se o argumento for uma descrição em texto (ex: "não entendi como acumular"), selecione o menor nível de ajuda adequado.

- Nunca entregue automaticamente a implementação TypeScript completa.
- Considere as tentativas já presentes no arquivo atual.
- A dica deve ser curta e terminar com uma pergunta que ajude o aluno a pensar.
