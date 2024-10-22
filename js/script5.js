// script.js

let currentPage = 1;
const totalPages = 14; // Total de perguntas/páginas

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
    const totalQuestions = totalPages;
    let resultHtml = '<h3>Resultado do Quiz</h3>';

    // Itera sobre todos os elementos do formulário
    document.querySelectorAll('.page').forEach(page => {
        page.querySelectorAll('[data-correct]').forEach(element => {
            const userAnswer = element.tagName === 'SELECT' ? element.options[element.selectedIndex].value : element.value.trim();
            const correctAnswer = element.getAttribute('data-correct').trim();
            
            // Verifica se a resposta do usuário está correta
            if (userAnswer === correctAnswer) {
                score++;
                resultHtml += `<p>${element.name}: <span class="correct">Resposta correta!</span></p>`;
            } else {
                // Mostra a resposta correta se a resposta do usuário estiver errada
                resultHtml += `<p>${element.name}: <span class="incorrect">Resposta incorreta.</span> <span class="correct-answer">Resposta correta: ${correctAnswer}</span></p>`;
            }
        });
    });

    // Calcula o percentual de acerto
    const percentage = (score / totalQuestions) * 100;
    resultHtml += `<p>Você acertou ${score} de ${totalQuestions} perguntas.</p>`;
    resultHtml += `<p>Percentual de acerto: ${percentage.toFixed(2)}%</p>`;
    
    // Exibe o resultado no gabarito
    document.getElementById('result').innerHTML = resultHtml;
    document.getElementById('result').style.display = 'block'; // Garante que o gabarito será mostrado

    // Move para o topo da página após a submissão para que o usuário veja o gabarito
    window.scrollTo(0, 0);
}

// Inicializa na primeira página
showPage(currentPage);
