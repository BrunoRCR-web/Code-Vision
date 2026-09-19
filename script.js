// =========================================
// CODEVISION
// ANIMAÇÕES DA PÁGINA PRINCIPAL
// =========================================

const elementosAnimados = document.querySelectorAll(
    ".secao, .numero-card, .card, .projeto"
);


// =========================================
// ESTADO INICIAL
// =========================================

elementosAnimados.forEach(function (elemento) {

    elemento.classList.add("animar");

});


// =========================================
// OBSERVAR ELEMENTOS
// =========================================

const observador = new IntersectionObserver(

    function (elementos) {

        elementos.forEach(function (item) {

            if (item.isIntersecting) {

                item.target.classList.add("visivel");

                observador.unobserve(
                    item.target
                );

            }

        });

    },

    {
        threshold: 0.15
    }

);


// =========================================
// INICIAR OBSERVAÇÃO
// =========================================

elementosAnimados.forEach(function (elemento) {

    observador.observe(
        elemento
    );

});