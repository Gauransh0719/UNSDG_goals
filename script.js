const quizContainer = document.getElementById('quiz');
const submitButton = document.getElementById('submitBtn');
const resultContainer = document.getElementById('result');
const moreFunButton = document.getElementById('moreFunBtn');
const games = document.getElementById('games')

moreFunButton.addEventListener('click', function() {
    window.location.href = 'new_page.html'; // Replace 'new_page.html' with the URL of your new page
});

games.addEventListener('click', function(){
window.location.href = 'game.html';
});


const myQuestions = [
    {
        question: "Which UN Sustainable Development Goal number does this logo represent?",
        logo: "sdg 2.png",
        answer: "Goal 2"
    },
    {
        question: "Which UN Sustainable Development Goal number does this logo represent?",
        logo: "sdg 5.png",
        answer: "Goal 5"
    },
    {
        question: "Which UN Sustainable Development Goal number does this logo represent?",
        logo: "sdg 11.png",
        answer: "Goal 11"
    },
    {
        question: "Which UN Sustainable Development Goal number does this logo represent?",
        logo: "sdg 3 real.jpg",
        answer: "Goal 3"
    },
    {
        question: "Which UN Sustainable Development Goal number does this logo represent?",
        logo: "sdg 14.png",
        answer: "Goal 14"
    },
    {
        question: "What does SDG 6 aim to achieve?",
        options: {
            a: "Ensure access to water and sanitation for all",
            b: "End hunger, achieve food security and improved nutrition",
            c: "Promote sustained, inclusive and sustainable economic growth",
            d: "Ensure healthy lives and promote well-being for all at all ages"
        },
        answer: "a"
    },
    {
        question: "What does SDG 7 aim to achieve?",
        options: {
            a: "Ensure access to water and sanitation for all",
            b: "Ensure access to affordable, reliable, sustainable and modern energy for all",
            c: "Promote sustained, inclusive and sustainable economic growth",
            d: "Ensure healthy lives and promote well-being for all at all ages"
        },
        answer: "b"
    },
    {
        question: "What does SDG 8 aim to achieve?",
        options: {
            a: "End poverty in all its forms everywhere",
            b: "End hunger, achieve food security and improved nutrition",
            c: "Promote sustained, inclusive and sustainable economic growth",
            d: "Ensure healthy lives and promote well-being for all at all ages"
        },
        answer: "c"
    },
    {
        question: "What does SDG 9 aim to achieve?",
        options: {
            a: "End poverty in all its forms everywhere",
            b: "End hunger, achieve food security and improved nutrition",
            c: "Build resilient infrastructure, promote inclusive and sustainable industrialization, and foster innovation",
            d: "Ensure healthy lives and promote well-being for all at all ages"
        },
        answer: "c"
    },
    {
        question: "What does SDG 10 aim to achieve?",
        options: {
            a: "End poverty in all its forms everywhere",
            b: "Reduce inequality within and among countries",
            c: "Build resilient infrastructure, promote inclusive and sustainable industrialization, and foster innovation",
            d: "Ensure healthy lives and promote well-being for all at all ages"
        },
        answer: "b"
    }
    // Add more questions as needed
];

function buildQuiz() {
    const output = [];

    myQuestions.forEach((currentQuestion, questionNumber) => {
        let questionString = `<div class="question">`;
        questionString += `<p>${currentQuestion.question}</p>`;
        if (currentQuestion.logo) {
            questionString += `<img src="${currentQuestion.logo}" alt="Logo" width="100">`;
        }
        questionString += `</div>`;
        questionString += `<div class="answers">`;
        if (currentQuestion.options) {
            for (const option in currentQuestion.options) {
                questionString += `<label>`;
                questionString += `<input type="radio" name="question${questionNumber}" value="${option}">`;
                questionString += `${option}: ${currentQuestion.options[option]}`;
                questionString += `</label><br>`;
            }
        }
        questionString += `</div>`;
        output.push(questionString);
    });

    quizContainer.innerHTML = output.join('');
}

function showLogoAnswers() {
    const logoContainers = quizContainer.querySelectorAll('.question');

    // Display correct answer next to each logo question
    for (let i = 0; i < logoContainers.length; i++) {
        const correctAnswerElement = document.createElement('p');
        correctAnswerElement.textContent = `Correct answer: ${myQuestions[i].answer}`;
        correctAnswerElement.style.fontWeight = 'bold';
        correctAnswerElement.style.color = 'blue'; // All correct answers are shown in green for consistency
        logoContainers[i].appendChild(correctAnswerElement);
    }
}

function showResults() {
    const answerContainers = quizContainer.querySelectorAll('.answers');
    const logoAnswers = quizContainer.querySelectorAll('.logoAnswer');
    let numCorrect = 0;

    // Check answers for logo questions
    for (let i = 0; i < logoAnswers.length; i++) {
        const userAnswer = logoAnswers[i].value.trim().toLowerCase();
        const correctAnswer = myQuestions[i].answer.toLowerCase();

        if (userAnswer === correctAnswer) {
            numCorrect++;
            logoAnswers[i].style.color = 'green';
        } else {
            logoAnswers[i].style.color = 'red';
        }
    }

    // Check answers for MCQ questions
    myQuestions.slice(5).forEach((currentQuestion, questionNumber) => {
        const answerContainer = answerContainers[questionNumber + 5];
        const selector = `input[name=question${questionNumber + 5}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;

        if (userAnswer === currentQuestion.answer) {
            numCorrect++;
            answerContainers[questionNumber + 5].style.color = 'green';
        } else {
            answerContainers[questionNumber + 5].style.color = 'pink';
        }
    });

    resultContainer.innerHTML = `You scored ${numCorrect} out of ${myQuestions.length}`;
    showLogoAnswers(); // Display correct answers next to logos
}



buildQuiz();

submitButton.addEventListener('click', showResults);
