// script.js

// Variáveis globais
let currentPage = 1;
const totalPages = 20;

function showPage(pageNumber) {
    // Oculta todas as páginas e exibe apenas a página atual
    for (let i = 1; i <= totalPages; i++) {
        document.getElementById('page' + i).style.display = i === pageNumber ? 'block' : 'none';
    }
    currentPage = pageNumber;
}

function nextPage() {
    // Move para a próxima página se a página atual não for a última
    if (currentPage < totalPages) {
        showPage(currentPage + 1);
    }
}

function prevPage() {
    // Move para a página anterior se a página atual não for a primeira
    if (currentPage > 1) {
        showPage(currentPage - 1);
    }
}

function submitQuiz() {
    let score = 0;
    let totalQuestions = 0;
    let resultHtml = '<h3>Resultado do Quiz</h3>';
    const formElements = document.getElementById('quizForm').elements;

    // Itera sobre todos os elementos do formulário
    for (let element of formElements) {
        if (element.tagName === 'INPUT' || element.tagName === 'SELECT') {
            const userAnswer = element.tagName === 'SELECT' ? element.options[element.selectedIndex].value : element.value;
            const correctAnswer = element.getAttribute('data-correct');
            
            // Verifica se a resposta do usuário está correta
            if (userAnswer === correctAnswer) {
                score++;
                resultHtml += `<p>${element.name}: Resposta correta!</p>`;
            } else if (correctAnswer) {
                // Mostra a resposta correta se a resposta do usuário estiver errada
                resultHtml += `<p>${element.name}: Resposta incorreta. Resposta correta: ${correctAnswer}</p>`;
            }
            totalQuestions++;
        }
    }

    // Calcula o percentual de acerto
    const percentage = (score / totalQuestions) * 100;
    resultHtml += `<p>Você acertou ${score} de ${totalQuestions} perguntas.</p>`;
    resultHtml += `<p>Percentual de acerto: ${percentage.toFixed(2)}%</p>`;
    
    // Exibe o resultado
    document.getElementById('result').innerHTML = resultHtml;
    document.getElementById('result').style.display = 'block';
    showPage(1); // Volta para a primeira página após a submissão
}

// Inicializa na primeira página
showPage(currentPage);
