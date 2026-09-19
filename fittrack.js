// @ts-nocheck
// =========================================
// FITTRACK
// =========================================


// =========================================
// ATIVIDADES
// =========================================

const nomeAtividade =
    document.getElementById("nomeAtividade");

const tipoAtividade =
    document.getElementById("tipoAtividade");

const botaoAdicionar =
    document.getElementById("adicionarAtividade");

const listaAtividades =
    document.getElementById("listaAtividades");

const totalAtividades =
    document.getElementById("totalAtividades");


let atividades = 18;

let novasAtividades =
    JSON.parse(
        localStorage.getItem("fittrackAtividades")
    ) || [];


// =========================================
// CONTADOR
// =========================================

function atualizarContador() {

    totalAtividades.textContent =
        atividades + novasAtividades.length;

}


// =========================================
// ÍCONE
// =========================================

function escolherIcone(tipo) {

    const icones = {

        "Treino": "🏋️",

        "Corrida": "🏃",

        "Caminhada": "🚶",

        "Esporte": "⚽",

        "Outro": "📌"

    };

    return icones[tipo] || "📌";

}


// =========================================
// MOSTRAR ATIVIDADE
// =========================================

function criarAtividade(atividadeSalva) {

    const atividade =
        document.createElement("div");

    atividade.classList.add(
        "fit-atividade"
    );


    const icone =
        escolherIcone(
            atividadeSalva.tipo
        );


    atividade.innerHTML = `

        <div class="fit-atividade-info">

            <div class="fit-atividade-icone">
                ${icone}
            </div>

            <div>

                <h4>
                    ${atividadeSalva.nome}
                </h4>

                <span>
                    ${atividadeSalva.tipo}
                </span>

            </div>

        </div>


        <button
            class="fit-remover"
            type="button"
        >
            Remover
        </button>

    `;


    listaAtividades.appendChild(
        atividade
    );


    const botaoRemover =
        atividade.querySelector(
            ".fit-remover"
        );


    botaoRemover.addEventListener(
        "click",
        function () {

            atividade.remove();


            novasAtividades =
                novasAtividades.filter(
                    function (item) {

                        return item.id !==
                            atividadeSalva.id;

                    }
                );


            localStorage.setItem(
                "fittrackAtividades",
                JSON.stringify(
                    novasAtividades
                )
            );


            atualizarContador();


            if (
                listaAtividades.children.length === 0
            ) {

                listaAtividades.innerHTML = `
                    <p class="fit-vazio">
                        Nenhuma nova atividade registrada.
                    </p>
                `;

            }

        }
    );

}


// =========================================
// CARREGAR ATIVIDADES
// =========================================

function carregarAtividades() {

    if (
        novasAtividades.length === 0
    ) {

        return;

    }


    const mensagemVazia =
        document.querySelector(
            ".fit-vazio"
        );


    if (mensagemVazia) {

        mensagemVazia.remove();

    }


    novasAtividades.forEach(
        function (atividade) {

            // Compatibilidade com atividades
            // antigas que não possuem ID.

            if (!atividade.id) {

                atividade.id =
                    Date.now() +
                    Math.random();

            }


            criarAtividade(
                atividade
            );

        }
    );


    localStorage.setItem(
        "fittrackAtividades",
        JSON.stringify(
            novasAtividades
        )
    );

}


// =========================================
// ADICIONAR ATIVIDADE
// =========================================

botaoAdicionar.addEventListener(
    "click",
    function () {

        const nome =
            nomeAtividade.value.trim();

        const tipo =
            tipoAtividade.value;


        if (
            nome === "" ||
            tipo === ""
        ) {

            alert(
                "Preencha o nome e o tipo da atividade."
            );

            return;

        }


        const novaAtividade = {

            id:
                Date.now() +
                Math.random(),

            nome:
                nome,

            tipo:
                tipo

        };


        novasAtividades.push(
            novaAtividade
        );


        localStorage.setItem(
            "fittrackAtividades",
            JSON.stringify(
                novasAtividades
            )
        );


        const mensagemVazia =
            document.querySelector(
                ".fit-vazio"
            );


        if (mensagemVazia) {

            mensagemVazia.remove();

        }


        criarAtividade(
            novaAtividade
        );


        atualizarContador();


        nomeAtividade.value = "";

        tipoAtividade.value = "";

        nomeAtividade.focus();

    }
);


// =========================================
// METAS
// =========================================

const nomeMeta =
    document.getElementById(
        "nomeMeta"
    );

const botaoAdicionarMeta =
    document.getElementById(
        "adicionarMeta"
    );

const listaMetas =
    document.getElementById(
        "listaMetas"
    );


let metas =
    JSON.parse(
        localStorage.getItem(
            "fittrackMetas"
        )
    ) || [];


// =========================================
// SALVAR METAS
// =========================================

function salvarMetas() {

    localStorage.setItem(
        "fittrackMetas",
        JSON.stringify(metas)
    );

}


// =========================================
// CRIAR META
// =========================================

function criarMeta(meta, indice) {

    const elemento =
        document.createElement("div");

    elemento.classList.add(
        "fit-meta"
    );


    elemento.innerHTML = `

        <div class="fit-meta-topo">

            <h3>
                ${meta.nome}
            </h3>

            <span class="fit-meta-percentual">
                ${meta.progresso}%
            </span>

        </div>


        <div class="fit-barra">

            <div
                class="fit-barra-progresso"
                style="width: ${meta.progresso}%"
            ></div>

        </div>


        <div class="fit-meta-acoes">

            <button
                type="button"
                class="aumentar-meta"
            >
                +10%
            </button>

            <button
                type="button"
                class="diminuir-meta"
            >
                -10%
            </button>

            <button
                type="button"
                class="remover-meta"
            >
                Remover
            </button>

        </div>

    `;


    listaMetas.appendChild(
        elemento
    );


    // =====================================
    // AUMENTAR
    // =====================================

    elemento
        .querySelector(
            ".aumentar-meta"
        )
        .addEventListener(
            "click",
            function () {

                metas[indice].progresso += 10;


                if (
                    metas[indice].progresso > 100
                ) {

                    metas[indice].progresso = 100;

                }


                salvarMetas();

                atualizarMetas();

            }
        );


    // =====================================
    // DIMINUIR
    // =====================================

    elemento
        .querySelector(
            ".diminuir-meta"
        )
        .addEventListener(
            "click",
            function () {

                metas[indice].progresso -= 10;


                if (
                    metas[indice].progresso < 0
                ) {

                    metas[indice].progresso = 0;

                }


                salvarMetas();

                atualizarMetas();

            }
        );


    // =====================================
    // REMOVER
    // =====================================

    elemento
        .querySelector(
            ".remover-meta"
        )
        .addEventListener(
            "click",
            function () {

                metas.splice(
                    indice,
                    1
                );


                salvarMetas();

                atualizarMetas();

            }
        );

}


// =========================================
// ATUALIZAR METAS
// =========================================

function atualizarMetas() {

    listaMetas.innerHTML = "";


    if (
        metas.length === 0
    ) {

        listaMetas.innerHTML = `
            <p class="fit-vazio">
                Nenhuma meta criada.
            </p>
        `;

        return;

    }


    metas.forEach(
        function (meta, indice) {

            // Corrige possíveis valores inválidos
            // encontrados no armazenamento.

            if (
                typeof meta.progresso !== "number"
            ) {

                meta.progresso = 0;

            }


            if (
                meta.progresso < 0
            ) {

                meta.progresso = 0;

            }


            if (
                meta.progresso > 100
            ) {

                meta.progresso = 100;

            }


            criarMeta(
                meta,
                indice
            );

        }
    );


    salvarMetas();

}


// =========================================
// ADICIONAR META
// =========================================

botaoAdicionarMeta.addEventListener(
    "click",
    function () {

        const nome =
            nomeMeta.value.trim();


        if (
            nome === ""
        ) {

            alert(
                "Digite o nome da meta."
            );

            return;

        }


        const novaMeta = {

            nome:
                nome,

            progresso:
                0

        };


        metas.push(
            novaMeta
        );


        salvarMetas();

        atualizarMetas();


        nomeMeta.value = "";

        nomeMeta.focus();

    }
);


// =========================================
// INICIALIZAÇÃO
// =========================================

carregarAtividades();

atualizarContador();

atualizarMetas();