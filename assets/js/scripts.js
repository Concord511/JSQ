var containerEl = document.querySelector(".content-container");
var highScoresEl = document.querySelector("#high-scores");
var playerScore = 0;
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
    var oldChild = document.querySelector(".question-container");
    if (oldChild) {
        oldChild.remove();
    }

    containerEl.appendChild(htmlEl);
}

// function to handle clicking answer buttons
var buttonHandler = function(event) {
    // set targetId equal to the buttons id attribute
    var targetId = event.target.getAttribute("id");

    // pull the second character from the button id representing to question ID
    var qId = targetId[1];

    if (targetId === null) {
        return false;
    }
    else if (targetId === "start-button") {
        buildQuestionEl(questions[0]);
    }
    else if (targetId[0] === "a") {
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

// function to check the answer clicked
var checkAnswer = function(playerAnswer, correctAnswer) {
    if (playerAnswer === correctAnswer) {
        correct();
    }
    else {
        incorrect();
    }
}

// function that creates an element with a top border, appends it to content-container, increments the score, and generates a button to move to the next question
var correct = function() {

}

// function that create an element with a top border, appends it to content-container, decrements the timer, and generates a button to move to the next question
var incorrect = function() {
    
}

containerEl.addEventListener("click", buttonHandler);


buildWelcomeEl();