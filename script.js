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

// MENU MOBILE

const menuBotao = document.querySelector(".menu-mobile");
const menuNav = document.querySelector("header nav");
const linksMenu = document.querySelectorAll("header nav a");

menuBotao.addEventListener("click", () => {

    menuNav.classList.toggle("menu-aberto");

    if (menuNav.classList.contains("menu-aberto")) {
        menuBotao.innerHTML = "<span>×</span>";
        menuBotao.setAttribute("aria-label", "Fechar menu");
    } else {
        menuBotao.innerHTML = "<span>☰</span>";
        menuBotao.setAttribute("aria-label", "Abrir menu");
    }

});

linksMenu.forEach(link => {

    link.addEventListener("click", () => {

        menuNav.classList.remove("menu-aberto");

        menuBotao.innerHTML = "<span>☰</span>";
        menuBotao.setAttribute("aria-label", "Abrir menu");

    });

});