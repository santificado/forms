function submitQuiz() {
    // Respostas corretas para cada pergunta
    const correctAnswers = {
        q1: "Patologia é a ciência que estuda as doenças.",
        q2: "a",
        q3: "Hipóxia é a condição em que tem pouco oxigênio disponível para as células, enquanto isquemia é quando as células param de receber sangue. Uma é consequência da outra, pois a isquemia leva a hipóxia, já que o sangue é fonte de oxigênio para as células.",
        q4: "Grande tumefação mitocondrial, perda de cristas, depósitos floculares na matriz, bolhas e solução de continuidade da membrana.",
        q5: "A apoptose é a morte celular programada, é fundamental para o desenvolvimento dos organismos vivos, por exemplo a menstruação onde o óvulo não é fecundado, logo é eliminado através do fluido menstrual. Outro exemplo é a deleção de células intestinais renováveis.",
        q6: "a",
        q7: "Uma lesão irreversível leva a necrose. Os agentes de agressores podem produzir necrose por: redução de energia, (ex: hipóxia, anóxia) (inibição do processo respiratório); produção de radicais livres; ações diretas sobre as enzimas (toxinas e agentes químicos); agressão direta a membrana citoplastica (criação de canais hidrofílicos).",
        q8: "Picnose celular é a intensa contração e condensação da cromatina, tornando núcleo intensamente basófilo, de aspecto homogêneo e bem menor do que o normal. Cariólise é a digestão da cromatina, desaparecimento da atividade tintorial do núcleo a ponto de não ser mais possível identificá-lo em coloração de rotina. Cariorrexe fragmentação e dispersão do núcleo no citoplasma.",
        q9: "d", // Resposta correta para a pergunta de múltipla escolha
        q10: "A necrose que aparece na hepatite lítica, onde ocorre lise ou esfarelo. zona necrosa adquire consistência mole, semi fluida.",
        q11: "", // Placeholder para a resposta da imagem, caso seja utilizada
        q12: "Existem gangrena seca, úmida e gasosa. A seca é comum nas extremidades do corpo onde há desidratação do tecido necrosado, normalmente ocorre devido a processos isquêmicos como na diabetes. A gangrena úmida, há uma invasão de micro-organismos no órgão necrosado que tendem a se liquefazer e acumular gás com odor pútrido e acumular bolhas junto com o material liquido. Já na gasosa o tecido necrosado é contaminado com germes do gênero Clostridium, eles produzem enzimas proteolíticas e lipolíticas e grande quantidade de gás.",
        q13: "Inflamação é a resposta do organismo a uma agressão, seja por agentes físicos, químicos ou biológicos. Seus sinais cardinais incluem rubor, calor, tumor, dor e perda de função.",
        q14: "Necrose coagulativa é um tipo de morte celular em que a arquitetura básica dos tecidos mortos é preservada por pelo menos alguns dias. Este tipo é comum em infartos em todos os órgãos sólidos, exceto no cérebro.",
        q15: "Os radicais livres, que são moléculas instáveis e altamente reativas, podem causar dano celular oxidativo, levando à necrose ao danificar lipídios, proteínas e ácidos nucleicos nas células.",
        q16: "Necrose por coagulação é caracterizada pela preservação da arquitetura celular durante a morte celular, enquanto a necrose por liquefação ocorre quando as células são digeridas por suas próprias enzimas, resultando em uma massa líquida viscosa.",
        q17: "b", 
        q18: "c", 
        q19: "b", 
        q20: "a" ,
    };

    // Obter todas as perguntas e inicializar as variáveis para a contagem de acertos e perguntas
    const form = document.getElementById('quizForm');
    let correctCount = 0;
    const totalQuestions = Object.keys(correctAnswers).length;

    // Iterar sobre cada pergunta e comparar as respostas fornecidas com as corretas
    for (let key in correctAnswers) {
        const userAnswer = form[key].value.trim().toLowerCase();
        const correctAnswer = correctAnswers[key].trim().toLowerCase();

        // Se a resposta estiver correta, aumente a contagem de acertos
        if (userAnswer === correctAnswer) {
            correctCount++;
            form[key].classList.add('correct');
            form[key].classList.remove('incorrect');
        } else {
            form[key].classList.add('incorrect');
            form[key].classList.remove('correct');
        }

        // Criar ou atualizar o elemento que exibe a resposta correta ao lado da resposta do usuário
        let answerFeedback = document.getElementById(`${key}-feedback`);
        if (!answerFeedback) {
            answerFeedback = document.createElement('div');
            answerFeedback.id = `${key}-feedback`;
            form[key].parentNode.appendChild(answerFeedback);
        }
        answerFeedback.innerHTML = `Resposta correta: <strong>${correctAnswers[key]}</strong>`;
        answerFeedback.style.color = (userAnswer === correctAnswer) ? 'green' : 'red';
    }

    // Calcular a porcentagem de acertos
    const scorePercentage = (correctCount / totalQuestions) * 100;

    // Exibir o resultado para o usuário
    const resultElement = document.getElementById('result');
    resultElement.style.display = 'block';
    resultElement.innerHTML = `Você acertou ${correctCount} de ${totalQuestions} perguntas. <br>Porcentagem de acertos: ${scorePercentage.toFixed(2)}%`;
}
