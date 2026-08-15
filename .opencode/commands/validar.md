---
description: Verifica a tipagem e executa os testes do exercício atual sem revisar nem avançar
agent: verificador
subtask: true
---

# /validar

Leia `PROGRESSO.md`, encontre o exercício atual, verifique a tipagem (`npm run typecheck`) e execute-o (`npm run testar`).

- Não edite arquivos.
- Não revise estilo.
- Não crie o próximo exercício.
- Não atualize progresso.

A saída mostra uma tabela unificada com linhas `TESTE`, `RESUMO` e `CCN`.
O exercício é aprovado quando `RESUMO` tem `Status = PASS`.
Retorne apenas o relatório padronizado de tipagem e testes.
