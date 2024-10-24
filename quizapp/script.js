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

// audio element
let audio = document.getElementById("");


let youwinsfx = document.getElementById("winaudio")
let booingsfx = document.getElementById("youfail")

// Quiz state variables
let currentQuestionIndex = 0;
let score = 0;
let highscore = 0;
// let questiontrackernum = 0;

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
startbutton.addEventListener('click',()=>{
    homepagestart();
    btnclick();
    
} )
backbtn.addEventListener('click',()=>{
    btnclick();
    goback();
})
nextbtn.addEventListener('click',nextbutton)


// functions 
console.log(currentQuestionIndex);

// question tracker 
function pagetracker(){
    let questiontrackernum = currentQuestionIndex +1
    tracker.innerHTML = "0"+questiontrackernum +  "/ 05"
}

// highscore tracker 
function highscr(){
    if(highscore<= score){
        highscore = score;
        highscoretext.innerHTML = "SCORE: " + highscore
    }
}

console.log(score);

// Start the quiz from the homepage
function homepagestart(){
    pagetracker();
    currentQuestionIndex =0
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
    questiontrackernum =  currentQuestionIndex

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
        correctaudio();
        selectedbutton.classList.add("correct")
        answerselected()
        nextbtn.classList.remove("hide")
    }
    else{
        wrongsfx();
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

// use to move between questions 
function nextbutton(){
    console.log(score);
    btnclick();
     pagetracker()
     currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length)
        {
        
            loadquestions();
        }else{
            questionpage.classList.add("hide");
            result();

        }

}

// that handle the result page 
function result(){
    highscr()
    resultpage.classList.remove("hide")
    if (score === 5){
        scoremessage.innerHTML  = "Champ! Perfect Score!";
        congratsfx();
        
    } else if (score >= 3){
        scoremessage.innerHTML = "Good Job!"
        congratsfx();
    } else {
        scoremessage.innerHTML = "Damn, you suck!";
        youfail();
    }

    scoretxt.innerHTML = score + "/"+ 5
}

// reset the code 
function reset(){
    while(ansbox.firstChild){
        ansbox.removeChild(ansbox.firstChild);
    }
}
    
// back button 
function goback(){
    if(questionpage.style.display !== "none"){
        questionpage.classList.add("hide")
        homepage.classList.remove("hide")
    }
}

// audio funtions 
function btnclick(){
    var audio = document.getElementById("audio");
    audio.play();
}

function wrongsfx(){
      const incorrectsfx = document.getElementById("wronaudio")
    incorrectsfx.play();
   
}
function correctaudio(){
    const correctsfx = document.getElementById("correctaudio");
    correctsfx.play();
}
function congratsfx(){
    const hurry = document.getElementById("winaudio");
    hurry.play();
}

function youfail(){
    const boosfx = document.getElementById("youfail");
    boosfx.play();
}



homebtn.addEventListener('click',()=>{
    if(!resultpage.classList.contains("hide")){
        resultpage.classList.add("hide");
        homepage.classList.remove("hide");
        currentQuestionIndex = 0;
        questiontrackernum = 1
    }
    btnclick();
    
})

replaybtn.addEventListener('click', ()=>{
    if(!resultpage.classList.contains("hide"))
    {  
        resultpage.classList.add("hide");
        currentQuestionIndex= 0;
        questiontrackernum =1
        questionpage.classList.remove("hide");
        startquiz();
        
    }
    
    
    btnclick();
    console.log(replaybtn);
})

