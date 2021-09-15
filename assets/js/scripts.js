var bodyEl = document.querySelector(".body");
var containerEl = document.querySelector(".content-container");
var highScoresEl = document.querySelector("#high-scores");
var timerEl = document.querySelector("#time");
var playerScore = 0;
var timeLeft = 60;
var buttonOff = false;
var playing = false;
var timerInterval = null;
var nextQuestion = 0;
var currentQuestion = 0;
var highScores = [];
var questions = [
    {
        qId: 0,
        qText: "How do you declare a variable in JavaScript?",
        qOption1: "var x = 0;",
        qOption2: "integer x = 0;",
        qOption3: "var x.",
        qOption4: "variable int x",
        qAnswer: "a"
    },
    {
        qId: 1,
        qText: 'Which of the following will not declare a new variable, isString, to equal "I am totally a string."',
        qOption1: 'var isString = "I am totally a string."',
        qOption2: 'var isString = "I ", "am ", "totally ", "a ", "string."',
        qOption3: 'var isString = "I " + "am " + "totally " + "a " + "string."',
        qOption4: 'var isString = "I am tota" + "lly a string."',
        qAnswer: "b"
    },
    {
        qId: 2,
        qText: "A variable created inside of a function is considered to have _______ scope.",
        qOption1: "global",
        qOption2: "indifferent",
        qOption3: "local",
        qOption4: "super",
        qAnswer: "c"
    },
    {
        qId: 3,
        qText: "A function that calls itself is commonly referred to as a _______ function",
        qOption1: "mimic",
        qOption2: "self-reliant",
        qOption3: "automatic",
        qOption4: "recursive",
        qAnswer: "d"
    },
    {
        qId: 4,
        qText: "When declaring a variable, do you need to initialize it with a value?",
        qOption1: "Yes",
        qOption2: "Yes, but only when assigning an integer.",
        qOption3: "No",
        qOption4: "No, unless assigning a boolean.",
        qAnswer: "c"
    },
    {
        qId: 5,
        qText: "Which operand is used to assign a value to a variable?",
        qOption1: "=",
        qOption2: "--",
        qOption3: "===",
        qOption4: "++",
        qAnswer: "a"
    },
    {
        qId: 6,
        qText: "Which of these represents a boolean value?",
        qOption1: "undefined",
        qOption2: "null",
        qOption3: "0",
        qOption4: "true",
        qAnswer: "d"
    },
    {
        qId: 7,
        qText: "What will the following code log?\nvar i = 0;\ni++;\ni = i + 13;\ni = i / 2;\nconsole.log(i);",
        qOption1: "6.5",
        qOption2: "0",
        qOption3: "undefined",
        qOption4: "7",
        qAnswer: "d"
    },
    {
        qId: 8,
        qText: "If a variable is initialized without a value, what will console logging the variable return?",
        qOption1: "null",
        qOption2: "true",
        qOption3: "undefined",
        qOption4: "false",
        qAnswer: "c"
    },
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
        startTimer();
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
            if (questions[currentQuestion]) {
                buildQuestionEl(questions[currentQuestion]);
            }
            else {
                playing = false;
                buildFinalScoreEl()
            }
        }
        else {
            playerScore = 0;
            timeLeft = 60;
            document.querySelector("#time").textContent = timeLeft;
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

// form input handler for entering score
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

// start timer
var startTimer = function() {
    timerInterval = setInterval(function() {
        var timeEl = document.querySelector("#time");
        if (timeLeft <= 0 && playing === true) {
            clearInterval(timerInterval);
            timeEl.textContent = 0;
            playing = false;
            buildFinalScoreEl(true);
        }
        else {
            timeLeft--;
            timeEl.textContent = timeLeft;
        }
    }, 1000);
}

// stop timer function
var stopTimer = function() {
    clearInterval(timerInterval);
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

// build the final score DOM elements and pass them to the buildHighScore function as an argument
var buildFinalScoreEl = function(outOfTime) {
    playing = false;
    stopTimer();

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

    if (outOfTime) {
        h1El.textContent = "You ran out of time! Your score: " + playerScore;
    }
    else {
        h1El.textContent = "Your score: " + playerScore;
    }
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

// build the high score DOM elements and append pass them to the injectContent function as an argument
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
    for (var i = 0; i < highScores.length; i++) {
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

// build and change DOM elements to display the player's answer and the correct answer
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

// sort array of high scores
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