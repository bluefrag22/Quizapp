// DOM Elements
const startbutton =document.getElementById("startbtn");
const homepage =document.getElementById("homesection");
const questionpage = document.getElementById("questionsection");
const backbtn = document.getElementById("backbtn");
let questiontext= document.getElementById("quizquestions");
const ansbox = document.getElementById("ansbuttons");
const nextbtn = document.getElementById("next");
const replaybtn = document.getElementById("replay");
const homebtn = document.getElementById("home");
const  tracker= document.getElementById("num0fquiz")
const highscoretext =document.getElementById("highscore");
let scoretxt = document.getElementById("score");
let scoremessage = document.getElementById("message");
const resultpage = document.getElementById("result");

// Quiz state variables
let currentQuestionIndex = 0;
let score = 0;
let highscore = 0;
let questiontrackernum = 0;

// Quiz data
const quizData = [
    {
        question: "What is the capital of France?",
        options: [{text: "Rome", correctAnswer: false},
                    {text: "Berlin", correctAnswer: false},
                    {text: "Paris", correctAnswer: true},
                    {text: "Madrid", correctAnswer: false},
                ]
    },

    {
        question: "Which planet is known as the 'Red Planet'?",
        options: [
            {text: "Earth", correctAnswer: false},
             {text: "Jupiter", correctAnswer: false},
            {text: "Mars", correctAnswer: true},
            {text: "Venus", correctAnswer: false},

        ]
    },
    {
        question: "Who wrote the play 'Romeo and Juliet'?",
        options: [
            {text: "William Shakespeare", correctAnswer: true},
             {text: "Charles Dickens", correctAnswer: false},
             {text: "Mark Twain", correctAnswer: false},
            {text: "Jane Austen", correctAnswer: false},
        ],
    },
    {
        question: "What is the largest mammal on Earth?",
        options: [
            {text: "Blue Whale", correctAnswer: true},
            {text: "Giraffe", correctAnswer: false},
            {text: "Great White Shark", correctAnswer: false},
           {text: "Elephant", correctAnswer: false},
            ]
    },
    {
        question: "Which element has the chemical symbol 'O'?",
        options: [
            {text: "Gold", correctAnswer: false},
            {text: "Oxygen", correctAnswer: true},
            {text: "Hydrogen", correctAnswer: false},
           {text: "Carbon", correctAnswer: false},
            ]
            
    }
];

// Event Listeners
startbutton.addEventListener('click', homepagestart)
backbtn.addEventListener('click', goback)
nextbtn.addEventListener('click',nextbutton)


// functions 

// question tracker 
function pagetracker(){
    questiontrackernum++
    tracker.innerHTML = "0"+questiontrackernum +  "/ 05"
}

// highscore tracker 
function highscr(){
    if(highscore<= score){
        highscore = score;
        highscoretext.innerHTML = "SCORE: " + highscore
    }
}

// Start the quiz from the homepage
function homepagestart(){
    pagetracker();
    console.log(resultpage + "hello")
    if(startbutton.style.display !== "none"){
        homepage.classList.add("hide")
        questionpage.classList.remove("hide")
        startquiz();
    }
}

// Initialize quiz variables
function startquiz(){
    loadquestions();
    currentQuestionIndex = 0;
    score = 0;
}

// Load questions for the quiz
function loadquestions(){
    questiontrackernum =  currentQuestionIndex +1

    nextbtn.classList.add("hide")
    reset();
    questiontext.innerHTML = "";
    
    let questionno = currentQuestionIndex +1;
    const currentQuestion= quizData[currentQuestionIndex]
    questiontext.innerHTML = questionno + ". " + currentQuestion.question;



    
    currentQuestion.options.forEach(options => {
        console.log("hello")
        
        const buttonelement = document.createElement("button");
        buttonelement.classList.add("btns")
        buttonelement.innerHTML = options.text;
        ansbox.appendChild(buttonelement);
        console.log("button appended to ansbox");

        if(options.correctAnswer){
            buttonelement.dataset.correctAnswer =options.correctAnswer
        }
        buttonelement.addEventListener('click', selectanwser)
    });

}
    
// Handle answer selection
function selectanwser(e){
    const selectedbutton = e.target;
    const iscorrect = selectedbutton.dataset.correctAnswer

    if(iscorrect){
        score++;
        selectedbutton.classList.add("correct")
        answerselected()
        nextbtn.classList.remove("hide")
    }
    else{
        selectedbutton.classList.add("incorrect")
        answerselected()
        nextbtn.classList.remove("hide")
    }
}

// Disable buttons after an answer is selected
function answerselected(){
    const buttons = ansbox.querySelectorAll('.btns');
        buttons.forEach(button => {
            button.disabled = true;
            if(button.dataset.correctAnswer){
                button.classList.add("correct")
            }
        });
}


function nextbutton(){
     pagetracker()
    if (currentQuestionIndex < quizData.length-1)
        {
            currentQuestionIndex++
            loadquestions();
        }else{
            questionpage.classList.add("hide");
            result();

        }

}


function result(){
    highscr()
    resultpage.classList.remove("hide")
    if (score === 5){
        scoremessage.innerHTML  = "Champ! Perfect Score!";
    } else if (score >= 3){
        scoremessage.innerHTML = "Good Job!";
    } else {
        scoremessage.innerHTML = "Damn, you suck!";
    }

    scoretxt.innerHTML = score + "/"+ 5
}


function reset(){
    while(ansbox.firstChild){
        ansbox.removeChild(ansbox.firstChild);
    }
}
    

function goback(){
    if(questionpage.style.display !== "none"){
        questionpage.classList.add("hide")
        homepage.classList.remove("hide")
    }
}

homebtn.addEventListener('click',()=>{
    if(!resultpage.classList.contains("hide")){
        resultpage.classList.add("hide");
        homepage.classList.remove("hide");
        currentQuestionIndex = 0;
    }
    
})

replaybtn.addEventListener('click', ()=>{
    if(!resultpage.classList.contains("hide"))
    {
        resultpage.classList.add("hide");
        questionpage.classList.remove("hide");
        currentQuestionIndex=0
    }
    console.log(replaybtn);
})