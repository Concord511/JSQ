var bodyEl = document.querySelector(".body");
var containerEl = document.querySelector(".content-container");
var highScoresEl = document.querySelector("#high-scores");
var timerEl = document.querySelector("#time");
var playerScore = 0;
var timeLeft = 300;
var buttonOff = false;
var playing = false;
var nextQuestion = 0;
var currentQuestion = 0;
var highScores = [];
var questions = [
    {
        qId: 0,
        qText: "I am question #1",
        qOption1: "Correct Answer 1",
        qOption2: "Answer 2",
        qOption3: "Answer 3",
        qOption4: "Answer 4",
        qAnswer: "a"
    },
    {
        qId: 1,
        qText: "I am question #2",
        qOption1: "Answer 1",
        qOption2: "Correct Answer 2",
        qOption3: "Answer 3",
        qOption4: "Answer 4",
        qAnswer: "b"
    },
    {
        qId: 2,
        qText: "I am question #3",
        qOption1: "Answer 1",
        qOption2: "Answer 2",
        qOption3: "Correct Answer 3",
        qOption4: "Answer 4",
        qAnswer: "c"
    },
    {
        qId: 3,
        qText: "I am question #4",
        qOption1: "Answer 1",
        qOption2: "Answer 2",
        qOption3: "Answer 3",
        qOption4: "Correct Answer 4",
        qAnswer: "d"
    }
];

// function that removes child elements from, and appends new child element (argument) to content-container
var injectContent = function(htmlEl) {
    var oldQuestion = document.querySelector(".question-container");
    var oldScores = document.querySelector(".highscores-container");
    var oldAnswer = document.querySelector(".answer");
    if (oldQuestion) {
        oldQuestion.remove();
    }
    if (oldAnswer) {
        oldAnswer.remove();
    }
    if (oldScores) {
        oldScores.remove();
    }
    
    containerEl.appendChild(htmlEl);
}

// function to handle clicking answer buttons
var buttonHandler = function(event) {
    // set targetId equal to the buttons id attribute
    var targetId = event.target.getAttribute("id");

    // if the start button is clicked, build the first question
    if (targetId === "start-button") {
        playing = true;
        buildQuestionEl(questions[0]);
    }
    // if the next button is clicked, build the next question
    else if (targetId === "next-button") {
        buttonOff = false;
        if (questions[nextQuestion]) {
            buildQuestionEl(questions[nextQuestion]);
        }
        else {
            playing = false;
            buildFinalScoreEl();
        }
    }
    else if (targetId === "high-scores") {
        buildHighScoresEl();
    }
    else if (targetId === "go-back") {
        if (playing) {
            buildQuestionEl(questions[currentQuestion]);
        }
        else {
            playerScore = 0;
            timeLeft = 300;
            nextQuestion = 0;
            currentQuestion = 0;
            buildWelcomeEl();
        }
    }
    else if (targetId === "clear-scores") {
        highScores = [];
        localStorage.removeItem("highScores");
        buildHighScoresEl();
    }
    else {
        // pull the second character from the button id representing to question ID
        if (!buttonOff && targetId != null) {
            var qId = targetId[1];

            if (targetId[0] === "a") {
                checkAnswer("a", questions[qId].qAnswer);
            }
            else if (targetId[0] === "b") {
                checkAnswer("b", questions[qId].qAnswer);
            }
            else if (targetId[0] === "c") {
                checkAnswer("c", questions[qId].qAnswer);
            }
            else if (targetId[0] === "d") {
                checkAnswer("d", questions[qId].qAnswer);
            }
        }
    }
}

var finalScoreHandler = function(event) {
    event.preventDefault();
    var formEl = document.querySelector("form");
    var inputEl = document.querySelector("input").value;
    
    if (inputEl) {
        formEl.reset();
        addHighScore(playerScore, inputEl);
    }
    else {
        alert("Please enter your initials.");
    }
}

// function that builds the welcome screen
var buildWelcomeEl = function() {
    var divEl = document.createElement("div");
    divEl.className = "question-container";
   
    var h1El = document.createElement("h1");
    h1El.className = "question-title"
    h1El.textContent = "JavaScript Quiz";
    
    var pEl = document.createElement("p");
    pEl.className = "question-title";
    pEl.textContent = "This is a timed quiz on JavaScript. Try and answer as many questions as you can before the timer expires. Incorrect answers will cause your timer to decrease by 10 seconds.";
    pEl.classname = "question-text";

    var buttonEl = document.createElement("button");
    buttonEl.textContent = "Get Started!";
    buttonEl.className = "question-button";
    buttonEl.setAttribute("id", "start-button");

    divEl.appendChild(h1El);
    divEl.appendChild(pEl);
    divEl.appendChild(buttonEl);

    injectContent(divEl);
}

// function that builds questions from passed question object
var buildQuestionEl = function(questionObj) {
    buttonOff = false;

    // create elements
    var divEl = document.createElement("div");
    var h1El = document.createElement("h1");
    var btnEl1 = document.createElement("button");
    var btnEl2 = document.createElement("button");
    var btnEl3 = document.createElement("button");
    var btnEl4 = document.createElement("button");

    // assign elements classes
    divEl.className = "question-container";
    h1El.className = "question-title"
    btnEl1.className = "question-button"
    btnEl2.className = "question-button"
    btnEl3.className = "question-button"
    btnEl4.className = "question-button"

    // assign elements text
    h1El.textContent = questionObj.qText;
    btnEl2.textContent = questionObj.qOption2;
    btnEl1.textContent = questionObj.qOption1;
    btnEl3.textContent = questionObj.qOption3;
    btnEl4.textContent = questionObj.qOption4;

    // assign buttons dynamic IDs corresponding to the answer they represent and the qId of the question being asked.
    btnEl1.setAttribute("id", "a" + questionObj.qId);
    btnEl2.setAttribute("id", "b" + questionObj.qId);
    btnEl3.setAttribute("id", "c" + questionObj.qId);
    btnEl4.setAttribute("id", "d" + questionObj.qId);

    //append elements to divEl
    divEl.appendChild(h1El);
    divEl.appendChild(btnEl1);
    divEl.appendChild(btnEl2);
    divEl.appendChild(btnEl3);
    divEl.appendChild(btnEl4);

    // call injectContent function and pass it the div element
    injectContent(divEl);
}

var buildFinalScoreEl = function() {
    var highScoresEl = document.createElement("div");
    var h1El = document.createElement("h1");
    var formEl = document.createElement("form");
    var initialsLabelEl = document.createElement("label");
    var initialsEl = document.createElement("input");
    var inputContainerEl = document.createElement("div");
    var submitButton = document.createElement("button");

    highScoresEl.className = "question-container";
    h1El.className = "question-title";
    formEl.className = "form";
    initialsLabelEl.className = "form-label"
    initialsEl.className = "form-input";
    submitButton.className = "question-button";
    
    initialsLabelEl.setAttribute("for", "initialsInput")
    initialsEl.setAttribute("type", "text");
    initialsEl.setAttribute("placeholder", "Initials");
    initialsEl.setAttribute("name", "initialsInput");
    initialsEl.setAttribute("maxlength", 3);

    h1El.textContent = "Your score: " + playerScore;
    initialsLabelEl.textContent = "Initials:";
    inputContainerEl.appendChild(initialsLabelEl);
    inputContainerEl.appendChild(initialsEl);
    formEl.appendChild(inputContainerEl);
    formEl.appendChild(submitButton);
    highScoresEl.appendChild(h1El);
    highScoresEl.appendChild(formEl);
    submitButton.textContent = "Submit Score";

    buildHighScoresEl(highScoresEl);
}

var buildHighScoresEl = function(displayEl) {
    var divEl = document.createElement("div");
    var scoreH1El = document.createElement("h1");
    var buttonContainerEl = document.createElement("div");
    var goBackEl = document.createElement("button");
    var clearScoresEl = document.createElement("button");

    divEl.className = "highscores-container";
    scoreH1El.className = "question-title";
    goBackEl.className = "question-button";
    clearScoresEl.className = "question-button";
    buttonContainerEl.className = "final-buttons";

    goBackEl.setAttribute("id", "go-back");
    clearScoresEl.setAttribute("id", "clear-scores");

    scoreH1El.textContent = "High Scores:"
    goBackEl.textContent = "Go back";
    clearScoresEl.textContent = "Clear High Scores";

    if (displayEl != null) {
        divEl.appendChild(displayEl);
    }
    divEl.appendChild(scoreH1El);
    sortHighScores(highScores);
    console.log("Length is: " + highScores.length);
    for (var i = 0; i < highScores.length; i++) {
        console.log(highScores[i]);
        var scoreContainerEl = document.createElement("div");
        var scoreEl = document.createElement("span");
        var initialsEl = document.createElement("span");
        scoreContainerEl.className = "score-container";
        scoreEl.className = "score-text";
        initialsEl.className = "score-text";
        scoreEl.textContent = highScores[i].score;
        initialsEl.textContent = highScores[i].initials;
        scoreContainerEl.appendChild(scoreEl);
        scoreContainerEl.appendChild(initialsEl);
        divEl.appendChild(scoreContainerEl);
    }
    buttonContainerEl.appendChild(goBackEl);
    buttonContainerEl.appendChild(clearScoresEl);
    divEl.appendChild(buttonContainerEl);
    injectContent(divEl);
}

var buildAnswerDisplay = function(playerAnswer, correctAnswer, playerCorrect) {
    buttonOff = true;

    var answerEl = document.createElement("div");
    var answerTextEl = document.createElement("span");
    var nextButtonEl = document.createElement("button");
    var answerButton = document.querySelector("#" + correctAnswer + currentQuestion);
    var playerAnswerButton = document.querySelector("#" + playerAnswer + currentQuestion);
    answerEl.className = "answer";

    if (playerCorrect === true) {
        answerTextEl.className = "correct";
        answerTextEl.textContent = "Correct!";
        answerButton.className = "question-button correct-answer";
    }
    else if (playerCorrect === false) {
        answerTextEl.className = "incorrect";
        answerTextEl.textContent = "Incorrect!";
        answerButton.className = "question-button correct-answer";
        playerAnswerButton.className = "question-button incorrect-answer";
    }

    nextButtonEl.className = "question-button";
    nextButtonEl.setAttribute("id", "next-button");
    if (questions[nextQuestion]) {
        nextButtonEl.textContent = "Next Question!";
    }
    else {
        nextButtonEl.textContent = "Finish!";
    }

    answerEl.appendChild(answerTextEl);
    answerEl.appendChild(nextButtonEl);
    containerEl.appendChild(answerEl);
    currentQuestion++;
    nextQuestion++;
}

// function to build high scores page
var addHighScore = function(newScore, playerInitials) {
    var highScoreObj = {};
    highScoreObj.score = newScore;
    highScoreObj.initials = playerInitials;
    highScores.push(highScoreObj);
    sortHighScores(highScores);
    saveHighScore(highScores);
    buildHighScoresEl();
    console.log("after building the high scores page from the addHighScore function: ");
    console.log(highScores);
}

// add the players high score to the highScores array of objects, sort the array, and store in localStorage
var saveHighScore = function(highScoresArray) {
    localStorage.setItem("highScores", JSON.stringify(highScoresArray));
}

// load the array of highScore objects from localStorage
var loadHighScores = function() {
    var tempScores = localStorage.getItem("highScores");
    if (tempScores === undefined || tempScores === null) {
        return [];
    }
    else {
        tempScores = JSON.parse(tempScores);
        return tempScores;
    }
}

// sort 
var sortHighScores = function(highScoresArray) {
    var newArray = highScoresArray;
    newArray.sort(function(a, b) {
        return b.score - a.score;
    })
    highScores = newArray;
}

// function to check the answer clicked
var checkAnswer = function(playerAnswer, correctAnswer) {
    if (playerAnswer === correctAnswer) {
        buildAnswerDisplay(playerAnswer, correctAnswer, true);
        playerScore += 10;
    }
    else {
        buildAnswerDisplay(playerAnswer, correctAnswer, false);
        timeLeft -= 10;
    }
}

bodyEl.addEventListener("click", buttonHandler);
containerEl.addEventListener("submit", finalScoreHandler);

highScores = loadHighScores();
buildWelcomeEl();