const quizData = [
    {
        question: "1. Which company developed React?",
        options: ["Google", "Facebook (Meta)", "Microsoft", "Apple"],
        answer: 1
    },
    {
        question: "2. Node.js is built on which JavaScript engine?",
        options: ["Java Virtual Machine", "V8 JavaScript Engine", "Python Runtime", "C++ Engine"],
        answer: 1
    },
    {
        question: "3. What is Express.js primarily used for?",
        options: ["Frontend Styling", "Database Management", "Backend Web Framework", "Version Control"],
        answer: 2
    },
    {
        question: "4. What type of database is MongoDB?",
        options: ["Relational Database", "NoSQL (Document) Database", "Graph Database", "Network Database"],
        answer: 1
    },
    {
        question: "5. Which data format is most commonly used to send and receive data in a REST API?",
        options: ["XML", "JSON", "HTML", "CSV"],
        answer: 1
    },
    {
        question: "6. What does HTML stand for?",
        options: ["Hyper Text Markup Language", "High Tech Multi Language", "Hyper Transfer Markup Language", "Home Tool Markup Language"],
        answer: 0
    },
    {
        question: "7. What is CSS used for?",
        options: ["Storing database records", "Styling and designing web pages", "Writing application logic", "Managing servers"],
        answer: 1
    },
    {
        question: "8. What is the primary purpose of Git?",
        options: ["Code Debugging", "Version Control System", "Database Querying", "API Testing"],
        answer: 1
    },
    {
        question: "9. Which of the following is a frontend framework/library?",
        options: ["Node.js", "Django", "React", "MongoDB"],
        answer: 2
    },
    {
        question: "10. Which HTTP method is typically used to securely submit data to a server?",
        options: ["GET", "POST", "FETCH", "PUSH"],
        answer: 1
    }
];

let currentQuestionIndex = 0;
let score = 0;
let isAnswered = false;
let timer;
let timeLeft = 20;

const questionContainer = document.getElementById("question-container");
const optionsContainer = document.getElementById("options-container");
const nextBtn = document.getElementById("next-btn");
const resultContainer = document.getElementById("result");
const quizBox = document.getElementById("quiz-box");
const timeDisplay = document.getElementById("time");
const scoreText = document.getElementById("score-text");
const timerBox = document.getElementById("timer");

// 'Next Question' बटन को हमेशा के लिए छुपा देते हैं क्योंकि अब सब ऑटोमैटिक होगा
if (nextBtn) {
    nextBtn.style.display = "none";
}

function startTimer() {
    timeLeft = 20;
    timeDisplay.innerText = timeLeft;

    timer = setInterval(() => {
        timeLeft--;
        timeDisplay.innerText = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            handleTimeout();
        }
    }, 1000);
}

function handleTimeout() {
    if (isAnswered) return;
    isAnswered = true;

    const correctIndex = quizData[currentQuestionIndex].answer;
    const allOptions = document.querySelectorAll("#options-container li");
    allOptions.forEach(li => li.style.pointerEvents = "none");

    // समय समाप्त होने पर सही उत्तर दिखाएं
    document.getElementById("option-" + correctIndex).style.backgroundColor = "#d4edda";
    document.getElementById("option-" + correctIndex).style.borderColor = "#28a745";

    // 1.5 सेकंड बाद अपने आप अगले प्रश्न पर जाएं
    setTimeout(() => {
        nextQuestion();
    }, 1500);
}

function loadQuestion() {
    clearInterval(timer);
    isAnswered = false;
    const currentQ = quizData[currentQuestionIndex];
    questionContainer.innerText = currentQ.question;
    optionsContainer.innerHTML = "";

    currentQ.options.forEach((option, index) => {
        const li = document.createElement("li");
        li.innerText = option;
        li.id = "option-" + index;
        li.onclick = () => checkAnswer(index);
        optionsContainer.appendChild(li);
    });

    startTimer();
}

function checkAnswer(selectedIndex) {
    if (isAnswered) return;
    isAnswered = true;
    clearInterval(timer);

    const correctIndex = quizData[currentQuestionIndex].answer;
    const allOptions = document.querySelectorAll("#options-container li");
    allOptions.forEach(li => li.style.pointerEvents = "none");

    if (selectedIndex === correctIndex) {
        score++;
        document.getElementById("option-" + selectedIndex).style.backgroundColor = "#d4edda";
        document.getElementById("option-" + selectedIndex).style.borderColor = "#28a745";
    } else {
        document.getElementById("option-" + selectedIndex).style.backgroundColor = "#f8d7da";
        document.getElementById("option-" + selectedIndex).style.borderColor = "#dc3545";
        
        document.getElementById("option-" + correctIndex).style.backgroundColor = "#d4edda";
        document.getElementById("option-" + correctIndex).style.borderColor = "#28a745";
    }

    // उत्तर देने के 1.5 सेकंड बाद अपने आप अगले प्रश्न पर जाएं
    setTimeout(() => {
        nextQuestion();
    }, 1500);
}

function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        clearInterval(timer);
        quizBox.style.display = "none";
        timerBox.style.display = "none";
        resultContainer.style.display = "block";
        scoreText.innerHTML = `Quiz Completed! 🎉<br>Your Score: ${score} / ${quizData.length}`;
    }
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    resultContainer.style.display = "none";
    quizBox.style.display = "block";
    timerBox.style.display = "block";
    loadQuestion();
}

loadQuestion();