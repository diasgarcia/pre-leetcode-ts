import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const raizDoProjeto = fileURLToPath(new URL("..", import.meta.url));
const caminhoDoProgresso = `${raizDoProjeto}PROGRESSO.md`;

function obterArquivoAtual(): string | undefined {
    let conteudo: string;
    try {
        conteudo = readFileSync(caminhoDoProgresso, "utf8");
    } catch {
        return undefined;
    }

    const padrao = /Arquivo atual: (src\/exercicios\/[^\s]+\.ts)/;
    const correspondencia = padrao.exec(conteudo);
    return correspondencia?.[1];
}

const arquivo = obterArquivoAtual();
if (arquivo === undefined) {
    process.stderr.write(
        "PROGRESSO.md não indica um arquivo de exercício atual.\n",
    );
    process.exit(1);
}

const resultado = spawnSync(
    process.execPath,
    ["--import", "tsx", arquivo],
    { cwd: raizDoProjeto, stdio: "inherit" },
);
if (resultado.error !== undefined) {
    process.stderr.write(
        `Não foi possível executar ${arquivo}: ${resultado.error.message}\n`,
    );
    process.exit(1);
}
process.exit(resultado.status ?? 1);
