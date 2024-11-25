// Função para alternar entre os layouts
const btnMaterias = document.getElementById("btn-materias");
const btnProvas = document.getElementById("btn-provas");
const layoutMaterias = document.getElementById("layout-materias");
const layoutProvas = document.getElementById("layout-provas");

if (btnMaterias && btnProvas && layoutMaterias && layoutProvas) {
    btnMaterias.addEventListener("click", function () {
        layoutMaterias.classList.add("active");
        layoutProvas.classList.remove("active");
        this.classList.add("active");
        btnProvas.classList.remove("active");
    });

    btnProvas.addEventListener("click", function () {
        layoutProvas.classList.add("active");
        layoutMaterias.classList.remove("active");
        this.classList.add("active");
        btnMaterias.classList.remove("active");
    });
}

// Alternar Modo Escuro
function toggleDarkMode(buttonId) {
    document.body.classList.toggle("dark-mode");
    const button = document.getElementById(buttonId);

    if (button) {
        if (document.body.classList.contains("dark-mode")) {
            button.innerHTML = "🌙";
            localStorage.setItem("darkMode", "enabled");
        } else {
            button.innerHTML = "☀️";
            localStorage.setItem("darkMode", "disabled");
        }
    }
}

const darkModeBtn = document.getElementById("dark-mode-btn");
if (darkModeBtn) {
    darkModeBtn.addEventListener("click", function () {
        toggleDarkMode("dark-mode-btn");
    });
}

// Verificar se o modo escuro está ativo ao carregar
document.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem("darkMode") === "enabled") {
        document.body.classList.add("dark-mode");
        if (darkModeBtn) darkModeBtn.innerHTML = "🌙";
    }
});

// Notificação de Atualização
function showNotification(message = "Notificação padrão") {
    const notificationMessage = document.getElementById("notification-message");

    if (notificationMessage) {
        notificationMessage.textContent = message;
        notificationMessage.classList.add("visible");

        setTimeout(() => {
            notificationMessage.classList.remove("visible");
        }, 5000);
    } else {
        console.error("Elemento com ID 'notification-message' não encontrado!");
    }
}

const notificationBtn = document.getElementById("notification-btn");
if (notificationBtn) {
    notificationBtn.addEventListener("click", function () {
        showNotification("Nova atualização! Adição do Quiz - Lipídeos");
    });
}

// Alternância do Menu Lateral
const hamburgerMenu = document.querySelector(".hamburger-menu");
const sideMenu = document.querySelector(".side-menu");
const menuToggleBtn = document.getElementById("menu-toggle-btn");

function toggleMenu() {
    if (sideMenu) {
        sideMenu.classList.toggle("open");
    }
}

if (hamburgerMenu) {
    hamburgerMenu.addEventListener("click", toggleMenu);
}

if (menuToggleBtn) {
    menuToggleBtn.addEventListener("click", toggleMenu);
}

// Fechar o Menu Lateral ao clicar em qualquer botão dentro
if (sideMenu) {
    sideMenu.querySelectorAll("button").forEach(function (button) {
        button.addEventListener("click", function () {
            sideMenu.classList.remove("open");
        });
    });
}
