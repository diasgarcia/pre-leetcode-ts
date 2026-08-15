---
description: Executa o exercicio atual exibindo a analise ciclomatica na tabela unificada
subtask: true
---

# /analisar

1. Leia `PROGRESSO.md` e identifique o exercicio atual.
2. Execute o exercicio com `npx tsx <arquivo>`. A analise ciclomatica aparece na mesma tabela dos testes.
3. Mostre a saida completa para o aluno.
4. Interprete as linhas `CCN`:
   - `OK`: CCN dentro do limite definido no `iniciar(...)`, mostrar classificacao (baixa/moderada/alta)
   - `ALERTA`: CCN acima do limite, sugerir simplificacao mas nao reprovar
   - `SKIP`: testes falharam, orientar corrigir primeiro
   - `INDISP`: arquivo fonte nao encontrado, verificar o caminho passado em `arquivoFonte` (`import.meta.url`)
   - `ERRO`: funcao nao encontrada, verificar nome registrado em `metodos`
5. Nao edite arquivos.
