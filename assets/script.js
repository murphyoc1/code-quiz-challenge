var startButtonEl = document.querySelector("#begin-button");
var mainEl = document.querySelector("#quiz");
var headerEl = document.querySelector("header");
var viewHighScoreEl = document.querySelector("#view-high-score");

// array section of questions to ask 

let questions = [
    {
        question: "What is not a data type for JavaScript?",
        answers: ["Boolean Type", "Undefined Type", "String Type", "Script Type"],
        result : ["wrong", "wrong", "wrong", "right"]
    },
    {
        question: "Which of the following values are known as Falsy values?",
        answers: ["null", "nah", "fail", "'-'"],
        result : ["right", "wrong", "wrong", "wrong"]
    },
    {
        question: "How do you make an arry in JavaScript?",
        answers: ["{item. item. item}", "[item, item, item]", "{item, item, item}", "[item. item. item]"],
        result : ["wrong", "right", "wrong", "wrong"]
    }
    {
        question: "What is the difference between Java and JavaScript?",
        answers: ["Both are programing languages", "JavaScript needs to be compiled", "JavaScript is run on a browser only", "Java is run in only the browser"],
        result : ["wrong", "wrong", "right", "wrong"]
    }
    {
        question: "What is the result of 2 + 5 + '3'?",
        answers: ["10", "7 + '3'", "73", "253"],
        result : ["wrong", "wrong", "right", "wrong"]
    }
];

var time = document.querySelector("#timer").textContent;
var questionCounter = 0;
var score = 0;
var highScoreList = [];

// function makes question
var askQuestion = function() {
    mainEl.innerHTML = "";
    var questionEl = document.createElement("div");

    questionEl.innerHTML = "<h1 class='main-title question-title'>" + questions[questionCounter].question + "</h1>";

    questionEl.appendChild(generateAnswers());

    mainEl.appendChild(questionEl);
    document.querySelector(".answers-container").addEventListener("click", displayResult);
};

// create answers 
var generateAnswers = function() {
    var answerContEl = document.createElement("div");
    answerContEl.className = "answers-container";
    //pull question 
    var currentQuestion = questions[questionCounter];

    for (i = 0; i < currentQuestion.answers.length; i++) {
        var answerButtonEl = document.createElement("button");
        answerButtonEl.type = "button";
        answerButtonEl.className = "answer-btn";
        if (currentQuestion.result[i] === "right") {
            answerButtonEl.setAttribute("value","right");
        }
        else if (currentQuestion.result[i] === "wrong") {
            answerButtonEl.setAttribute("value", "Wrong");
        }
        answerButtonEl.innerHTML = currentQuestion.answers[i];
        answerContEl.appendChild(answerButtonEl);
    }
    return answerContEl;
};

// display result of answer to question
var displayResult = function(event) {
    selectedAnswer = event.target.value;
    if (selectedAnswer === "right") {
        var resultMessage = document.createElement("div");
        resultMessage.innerHTML = "<h2>Right!</h2>"
        mainEl.appendChild(resultMessage);
        score++;
    }
    else if (selectedAnswer === "wrong") {
        var resultMessage = document.createElement("div");
        resultMessage.innerHTML = "<h2>Wrong!</h2>"
        mainEl.appendChild(resultMessage);
    }

    document.querySelector(".answers-container").removeEventListener("click", displayResult);
    questionCounter++;

    // end quiz when questions run out
    if (questionCounter === questions.length) {
        setTimeout(quizOver, 1000);
    }
    else {
        setTimeout(askQuestion, 1000);
    }
};

// function to show score and create score holding class
var quizOver = function() {
    mainEl.innerHTML = "";
    var scoreForm = document.createElement("div");
    scoreForm.innerHTML = "<h1>All Done!</h1><p>Your final score is " + score + ".</p>";
    scoreForm.className = "score-page";

    var enterScore = document.createElement("div");
    enterScore.innerHTML = "<form class='score-form' id='score-form'><p>Enter initials: </p><div><input type='text' name='initials' /></div><div><button type='submit' id='submit-score'>Submit</submit></div></form>";
    scoreForm.appendChild(enterScore);
    mainEl.appendChild(scoreForm);
    document.querySelector("#score-form").addEventListener("submit", formScoreHandler);
};

// 
var formScoreHandler = function(event) {
    var initialsInput = document.querySelector("input[name='initials']").value;
    var scoreObj = {initials: initialsInput, score: score};
    event.preventDefault();

    highScoreList.push(scoreObj);
    localStorage.setItem("high-score", JSON.stringify(highScoreList));
    showScores();
};

//saves local storage and displays stored scores
var loadScores = function() {
    var storedScores = localStorage.getItem("high-score");
    storedScores = JSON.parse(storedScores);

    if(!storedScores) {
        return false;
    }
    for (var i = 0; i < storedScores.length; i++) {
        highScoreList.push(storedScores[i]);
    }
};

// shows the list of high scores stored in local storage
var showScores = function() {
    headerEl.innerHTML = "";
    mainEl.innerHTML = "";

    var scoreListPage = document.createElement("div");
    scoreListPage.className = "score-list-page";

    var scoreListPageHeading = document.createElement("h1");
    scoreListPageHeading.innerHTML = ("High scores");

    var scoreList = document.createElement("ul");

    // sorts scores from highest to lowest
    var highScoreList = orderScores();
    for (i = 0; i < highScoreList.length; i++) {
        var scoreEl = document.createElement("li");
        scoreEl.innerHTML = (i + 1) + ". " + highScoreList[i].initials + " - " + highScoreList[i].score;

        // add alternating styling
        if (i%2 === 0) {
            scoreEl.className = "primary-score";
        }
        else {
            scoreEl.className = "secondary-score";
        }
        scoreList.appendChild(scoreEl);
    }

    var scoreButtons = document.createElement("div");
    scoreButtons.innerHTML = "<button type='button' name='go-back'>Go Back</button><button type='button' name='clear'>Clear High Scores</button>";
    scoreButtons.className = "score-buttons";

    scoreListPage.appendChild(scoreListPageHeading);
    scoreListPage.appendChild(scoreList);
    scoreListPage.appendChild(scoreButtons);

    mainEl.appendChild(scoreListPage);

    // adds functionality to buttons on high scores page
    document.querySelector("button[name='go-back']").addEventListener("click", function() {location.reload();});
    document.querySelector("button[name='clear']").addEventListener("click", clearScores);
};

// function to sort scores
var orderScores = function() {
    highScoreList.sort((a, b)=> {
        return b.score - a.score;
    })
    
    return highScoreList;
};

var clearScores = function() {
    localStorage.clear();
    highScoreList = []; 
    showScores();
};

// on page reload, scores are loaded from local storage
loadScores();

// add button functionality for home page
startButtonEl.addEventListener("click", askQuestion);
startButtonEl.addEventListener("click", startTimer);
viewHighScoreEl.addEventListener("click", showScores);