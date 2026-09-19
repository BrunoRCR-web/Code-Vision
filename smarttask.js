// @ts-nocheck

// =========================================
// SMARTTASK
// =========================================

const nomeTarefa =
    document.getElementById("nomeTarefa");

const prioridadeTarefa =
    document.getElementById("prioridadeTarefa");

const categoriaTarefa =
    document.getElementById("categoriaTarefa");

const botaoAdicionar =
    document.getElementById("adicionarTarefa");

const listaTarefas =
    document.getElementById("listaTarefas");

const totalTarefas =
    document.getElementById("totalTarefas");

const tarefasPendentes =
    document.getElementById("tarefasPendentes");

const tarefasConcluidas =
    document.getElementById("tarefasConcluidas");


// =========================================
// DADOS
// =========================================

let tarefas =
    JSON.parse(
        localStorage.getItem("smarttaskTarefas")
    ) || [];

let filtroAtual = "todas";


// =========================================
// SALVAR
// =========================================

function salvarTarefas() {

    localStorage.setItem(
        "smarttaskTarefas",
        JSON.stringify(tarefas)
    );

}


// =========================================
// ATUALIZAR DASHBOARD
// =========================================

function atualizarDashboard() {

    const total = tarefas.length;

    const concluidas =
        tarefas.filter(
            function (tarefa) {
                return tarefa.concluida;
            }
        ).length;

    const pendentes =
        total - concluidas;

    totalTarefas.textContent = total;
    tarefasPendentes.textContent = pendentes;
    tarefasConcluidas.textContent = concluidas;

}


// =========================================
// PRIORIDADE
// =========================================

function classePrioridade(prioridade) {

    if (prioridade === "Alta") {
        return "smart-prioridade-alta";
    }

    if (prioridade === "Média") {
        return "smart-prioridade-media";
    }

    return "smart-prioridade-baixa";

}


// =========================================
// FILTRAR TAREFAS
// =========================================

function obterTarefasFiltradas() {

    if (filtroAtual === "pendentes") {

        return tarefas.filter(
            function (tarefa) {
                return !tarefa.concluida;
            }
        );

    }

    if (filtroAtual === "concluidas") {

        return tarefas.filter(
            function (tarefa) {
                return tarefa.concluida;
            }
        );

    }

    return tarefas;

}


// =========================================
// CRIAR ELEMENTO DA TAREFA
// =========================================

function criarTarefaElemento(tarefa) {

    const elemento =
        document.createElement("div");

    elemento.classList.add(
        "smart-tarefa"
    );

    if (tarefa.concluida) {

        elemento.classList.add(
            "concluida"
        );

    }

    elemento.innerHTML = `

        <div class="smart-tarefa-check">

            <button
                type="button"
                class="smart-check"
                title="Concluir tarefa"
            >
                ${tarefa.concluida ? "✓" : ""}
            </button>

        </div>

        <div class="smart-tarefa-info">

            <h4>
                ${tarefa.nome}
            </h4>

            <div class="smart-tarefa-detalhes">

                <span class="${classePrioridade(tarefa.prioridade)}">
                    ${tarefa.prioridade}
                </span>

                <span>
                    ${tarefa.categoria}
                </span>

            </div>

        </div>

        <button
            type="button"
            class="smart-remover"
        >
            Remover
        </button>

    `;

    listaTarefas.appendChild(
        elemento
    );


    // =====================================
    // CONCLUIR
    // =====================================

    const botaoCheck =
        elemento.querySelector(
            ".smart-check"
        );

    botaoCheck.addEventListener(
        "click",
        function () {

            tarefa.concluida =
                !tarefa.concluida;

            salvarTarefas();

            atualizarLista();

            atualizarDashboard();

        }
    );


    // =====================================
    // REMOVER
    // =====================================

    const botaoRemover =
        elemento.querySelector(
            ".smart-remover"
        );

    botaoRemover.addEventListener(
        "click",
        function () {

            tarefas =
                tarefas.filter(
                    function (item) {

                        return item.id !== tarefa.id;

                    }
                );

            salvarTarefas();

            atualizarLista();

            atualizarDashboard();

        }
    );

}


// =========================================
// ATUALIZAR LISTA
// =========================================

function atualizarLista() {

    listaTarefas.innerHTML = "";

    const tarefasFiltradas =
        obterTarefasFiltradas();

    if (
        tarefasFiltradas.length === 0
    ) {

        let mensagem =
            "Nenhuma tarefa criada.";

        if (
            filtroAtual === "pendentes"
        ) {

            mensagem =
                "Nenhuma tarefa pendente.";

        }

        if (
            filtroAtual === "concluidas"
        ) {

            mensagem =
                "Nenhuma tarefa concluída.";

        }

        listaTarefas.innerHTML = `

            <p class="smart-vazio">
                ${mensagem}
            </p>

        `;

        return;
    }

    tarefasFiltradas.forEach(
        function (tarefa) {

            criarTarefaElemento(
                tarefa
            );

        }
    );

}


// =========================================
// ADICIONAR TAREFA
// =========================================

botaoAdicionar.addEventListener(
    "click",
    function () {

        const nome =
            nomeTarefa.value.trim();

        const prioridade =
            prioridadeTarefa.value;

        const categoria =
            categoriaTarefa.value;


        if (
            nome === "" ||
            prioridade === "" ||
            categoria === ""
        ) {

            alert(
                "Preencha todos os campos da tarefa."
            );

            return;
        }


        const novaTarefa = {

            id:
    Date.now() +
    Math.random(),

            nome:
                nome,

            prioridade:
                prioridade,

            categoria:
                categoria,

            concluida:
                false

        };


        tarefas.push(
            novaTarefa
        );

        salvarTarefas();

        atualizarLista();

        atualizarDashboard();


        // Limpar formulário

        nomeTarefa.value = "";

        prioridadeTarefa.value = "";

        categoriaTarefa.value = "";

        nomeTarefa.focus();

    }
);


// =========================================
// FILTROS
// =========================================

const botoesFiltro =
    document.querySelectorAll(
        ".smart-filtro"
    );


botoesFiltro.forEach(
    function (botao) {

        botao.addEventListener(
            "click",
            function () {

                botoesFiltro.forEach(
                    function (item) {

                        item.classList.remove(
                            "ativo"
                        );

                    }
                );

                botao.classList.add(
                    "ativo"
                );

                filtroAtual =
                    botao.dataset.filtro;

                atualizarLista();

            }
        );

    }
);


// =========================================
// TECLA ENTER
// =========================================

nomeTarefa.addEventListener(
    "keydown",
    function (evento) {

        if (
            evento.key === "Enter"
        ) {

            botaoAdicionar.click();

        }

    }
);


// =========================================
// INICIALIZAÇÃO
// =========================================

atualizarLista();

atualizarDashboard();