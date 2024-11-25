// Verificar se o modo escuro está ativo ao carregar
document.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem("darkMode") === "enabled") {
        document.body.classList.add("dark-mode");
        document.getElementById("dark-mode-btn")
    }
});

// Alternar o modo escuro
document.getElementById("dark-mode-btn").addEventListener("click", function () {
    const btn = document.getElementById("dark-mode-btn");

    if (document.body.classList.contains("dark-mode")) {
        // Desativar modo escuro
        document.body.classList.remove("dark-mode");
        localStorage.setItem("darkMode", "disabled");
    } else {
        // Ativar modo escuro
        document.body.classList.add("dark-mode");
        localStorage.setItem("darkMode", "enabled");
    }
});

// Função para alternar a visibilidade do menu lateral (Hamburger Menu)a
function toggleMenu() {
    const sideMenu = document.getElementById("side-menu");
    // Adiciona ou remove a classe 'active' que controla a visibilidade do menu
    sideMenu.classList.toggle("active");
}

// Verificar modo escuro ao carregar a página
document.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem("darkMode") === "enabled") {
        document.body.classList.add("dark-mode");
    }
});

