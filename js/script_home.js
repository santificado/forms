// Função para alternar entre os layouts
document.getElementById("btn-materias").addEventListener("click", function() {
    // Exibe o layout de matérias e esconde o de provas
    document.getElementById("layout-materias").classList.add("active");
    document.getElementById("layout-provas").classList.remove("active");
    
    // Adiciona a classe 'active' ao botão de matérias e remove do botão de provas
    this.classList.add("active");
    document.getElementById("btn-provas").classList.remove("active");
});

document.getElementById("btn-provas").addEventListener("click", function() {
    // Exibe o layout de provas e esconde o de matérias
    document.getElementById("layout-provas").classList.add("active");
    document.getElementById("layout-materias").classList.remove("active");
    
    // Adiciona a classe 'active' ao botão de provas e remove do botão de matérias
    this.classList.add("active");
    document.getElementById("btn-materias").classList.remove("active");
});
document.getElementById("notification-btn").addEventListener("click", function () {
    const notificationMessage = document.getElementById("notification-message");

    // Adicione a mensagem personalizada aqui:
    notificationMessage.textContent = "Nova atualização! Adição do Quiz - Lipideos";

    // Mostre a mensagem
    notificationMessage.classList.add("visible");

    // Opcional: oculte a mensagem após alguns segundos
    setTimeout(() => {
        notificationMessage.classList.remove("visible");
    }, 5000); // 5 segundos
});
