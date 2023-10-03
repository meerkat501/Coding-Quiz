const startBtn = document.getElementById('startBtn');
const questionContainer = document.getElementById('questionContainer');
const questionEl = document.getElementById('question');
const answersEl = document.getElementById('answers');
const timerEl = document.getElementById('timeLeft');
const gameOverEl = document.getElementById('gameOver');
const initialsEl = document.getElementById('initials');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const highScoreBtn = document.getElementById('highScoreBtn');
const highScoreModal = document.getElementById('highScoreModal');
const closeHighScoresBtn = document.getElementById('closeHighScores');
const restartBtn = document.getElementById('restartBtn');

let questions = [
    {
        question: "Array's in Javascript can be used to store _____?",
        answers: ['Numbers and strings', 'Other arrays', 'Booleans', 'All the above'],
        correctAnswer: 3
    },

    {
        question: "What does HTML stand for?",
        answers: ['Hyper Text Markup Language', 'Hyper Trainer Maker Language', 'Hyper Text Max Level', 'Hoops Test Meow Language'],
        correctAnswer: 0
    },

    {
        question: "In JavaScript, which keyword is used to declare a variable?",
        answers: ['Let', 'Var', 'getElement', 'document'],
        correctAnswer: 1
    },

    {
        question: "CSS stands for _______?",
        answers: ['Creative style sheet', 'Computer Shoe Style', 'Creating Style Sheet', 'Cascading Style Sheet'],
        correctAnswer: 3
    },

    {
        question: "Which JavaScript method is used to store data in the client's local storage?",
        answers: ['localstorage.setdata()', 'localstorage.setitem()', 'localstorage.storelocal()', 'localstorage.setlocal()'],
        correctAnswer: 1
    },

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
    document.getElementById('score').textContent = "Score: " + timeLeft;
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
        timeLeft -= 25;  // penalize for wrong answer
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

function saveScore() {
    const initials = initialsEl.value;
    const score = timeLeft;

    // Retrieve the current high scores from localStorage
    const highScores = JSON.parse(localStorage.getItem('highScores') || '[]');
    
    highScores.push({ initials, score });

    // Sort scores in descending order and keep the top 5
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(5);

    localStorage.setItem('highScores', JSON.stringify(highScores));

}

highScoreBtn.addEventListener('click', () => {
    displayHighScores();
    highScoreModal.style.display = 'block';  
});

closeHighScoresBtn.addEventListener('click', () => {
    highScoreModal.style.display = 'none';   
});

function displayHighScores() {
    const highScores = JSON.parse(localStorage.getItem('highScores') || '[]');
    const highScoresList = document.getElementById('highScoresList');
    highScoresList.innerHTML = '';
    
    highScores.forEach(scoreEntry => {
        const listItem = document.createElement('li');
        listItem.textContent = `${scoreEntry.initials}: ${scoreEntry.score}`;
        highScoresList.appendChild(listItem);
    });
}

function endGame() {
    clearInterval(timer);
    questionContainer.style.display = 'none';
    gameOverEl.style.display = 'block';
    displayHighScores();  // Displays the high scores
}

restartBtn.addEventListener('click', () => {
    restartGame();
});

function restartGame() {
    currentQuestionIndex = 0;    // Reset question index
    timeLeft = 100;              // Reset timer
    gameOverEl.style.display = 'none';  // Hide game over screen (if shown)
    startGame();                 // Start the game
}