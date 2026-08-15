---
description: Valida e revisa a implementação do exercício atual
agent: mentor
subtask: false
---

# /revisar

Revise o exercício atual seguindo obrigatoriamente o fluxo do agente mentor.

1. Leia `AGENTS.md`.
2. Leia `PROGRESSO.md`.
3. Identifique o arquivo atual.
4. Chame o subagente `verificador`.
5. Se a tipagem ou os testes falharem, pare.
6. Se os testes passarem, chame o subagente `revisor`.
7. Só aprove quando verificação E revisão forem aprovadas.
8. Se aprovado, chame `criador-exercicio`.
9. Atualize `PROGRESSO.md` com o novo estado.
10. Crie **somente um** próximo exercício.
11. Pare e aguarde o aluno.

Observações adicionais fornecidas pelo aluno:

$ARGUMENTS
