const startBtn = document.getElementById('startBtn');
const questionContainer = document.getElementById('questionContainer');
const questionEl = document.getElementById('question');
const answersEl = document.getElementById('answers');
const timerEl = document.getElementById('timeLeft');
const gameOverEl = document.getElementById('gameOver');
const initialsEl = document.getElementById('initials');
const saveScoreBtn = document.getElementById('saveScoreBtn');

let questions = [
    {
        question: "Array's in Javascript can be used to store _____?",
        answers: ['Numbers and strings', 'Other arrays', 'Booleans', 'All the above'],
        correctAnswer: 3
    },

    {
        question: "What's the capital of France?",
        answers: ['Berlin', 'Paris', 'Madrid', 'Rome'],
        correctAnswer: 1
    },

    {
        question: "What's the capital of France?",
        answers: ['Berlin', 'Paris', 'Madrid', 'Rome'],
        correctAnswer: 1
    },

    {
        question: "What's the capital of France?",
        answers: ['Berlin', 'Paris', 'Madrid', 'Rome'],
        correctAnswer: 1
    },

    {
        question: "What's the capital of France?",
        answers: ['Berlin', 'Paris', 'Madrid', 'Rome'],
        correctAnswer: 1
    },

    // ... more questions
];

let currentQuestionIndex = 0;
let timeLeft = 100;
let timer;

startBtn.addEventListener('click', startGame);

function startGame() {
    startBtn.style.display = 'none';
    questionContainer.style.display = 'block';
    timer = setInterval(updateTimer, 1000);
    displayQuestion();
}

function updateTimer() {
    timeLeft--;
    timerEl.textContent = timeLeft;

    if (timeLeft <= 0) {
        endGame();
    }
}

function displayQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionEl.textContent = currentQuestion.question;
    answersEl.innerHTML = '';
    currentQuestion.answers.forEach((answer, index) => {
        const btn = document.createElement('button');
        btn.textContent = answer;
        btn.addEventListener('click', () => checkAnswer(index));
        answersEl.appendChild(btn);
    });
}

function checkAnswer(answerIndex) {
    if (answerIndex !== questions[currentQuestionIndex].correctAnswer) {
        timeLeft -= 10;  // penalize for wrong answer
    }
    
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
        endGame();
    }
}

function endGame() {
    clearInterval(timer);
    questionContainer.style.display = 'none';
    gameOverEl.style.display = 'block';
}

saveScoreBtn.addEventListener('click', saveScore);

function saveScore() {
    const initials = initialsEl.value;
    const score = timeLeft;
    localStorage.setItem('initials', initials);
    localStorage.setItem('score', score);
    // save initials and score to local storage
}