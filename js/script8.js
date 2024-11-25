let currentPage = 1;
const totalPages = 9;

// Função para exibir a página atual
function showPage(pageNumber) {
    document.querySelectorAll('.page').forEach((page, index) => {
        page.style.display = (index === pageNumber - 1) ? 'block' : 'none';
    });
}

// Inicializa a primeira página
showPage(currentPage);

// Função para avançar para a próxima página
function nextPage() {
    if (currentPage < totalPages) {
        currentPage++;
        showPage(currentPage);
    }
}

// Função para voltar à página anterior
function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        showPage(currentPage);
    }
}

function submitQuiz() {
    const pages = document.querySelectorAll('.page');
    const results = document.getElementById('result');
    let score = 0;
    let output = '';
    let questionCounter = 0;

    // Itera sobre cada página
    pages.forEach((page, pageIndex) => {
        const questions = page.querySelectorAll('.question');
        
        questions.forEach((question) => {
            questionCounter++;

            const selectedOption = question.querySelector('input[type="radio"]:checked');
            const correctOption = question.querySelector('input[data-correct="true"]');
            const userAnswer = question.querySelector('input[type="text"], textarea');
            const correctAnswer = question.querySelector('input[data-correct-answer]')?.getAttribute('data-correct-answer');

            if (selectedOption) {
                // Verifica as respostas das perguntas de múltipla escolha
                if (selectedOption === correctOption) {
                    score++;
                    output += `<p class="correct">Pergunta ${questionCounter}: <span class="answer-text-correct">Correta!</span></p>`;
                } else {
                    output += `<p class="incorrect">Pergunta ${questionCounter}: <span class="answer-text-incorrect">Errada!</span> Resposta correta: <span class="answer-text-correct">${correctOption.parentNode.innerText}</span></p>`;
                }
            } else if (userAnswer && correctAnswer) {
                // Verifica as respostas das perguntas dissertativas
                if (userAnswer.value.trim().toLowerCase() === correctAnswer.trim().toLowerCase()) {
                    score++;
                    output += `<p class="correct">Pergunta ${questionCounter}: <span class="answer-text-correct">Correta!</span></p>`;
                } else {
                    output += `<p class="incorrect">Pergunta ${questionCounter}: <span class="answer-text-incorrect">Errada!</span> </br>Sua resposta: <span class="answer-text-incorrect">${userAnswer.value}</span></br>Resposta correta: <span class="answer-text-correct">${correctAnswer}</span></p>`;
                }
            } else {
                output += `<p class="incorrect">Pergunta ${questionCounter}: <span class="answer-text-incorrect">Não respondida!</span></p>`;
            }
        });
    });

    // Exibe os resultados com a contagem final de acertos
    results.innerHTML = `<h3>Resultados:</h3>${output}<p class="final-score">Você acertou ${score} de ${questionCounter} perguntas.</p>`;
    results.style.display = 'block';
}
