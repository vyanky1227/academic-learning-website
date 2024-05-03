// Selecting all required elements
const startBtn = document.querySelector(".start_btn button");
const infoBox = document.querySelector(".info_box");
const exitBtn = infoBox.querySelector(".buttons .quit");
const continueBtn = infoBox.querySelector(".buttons .restart");
const quizBox = document.querySelector(".quiz_box");
const resultBox = document.querySelector(".result_box");
const optionList = document.querySelector(".option_list");

let queCount = 0;
let userScore = 0;

// Event listeners for buttons
startBtn.addEventListener("click", () => {
    infoBox.classList.add("activeInfo");
});

exitBtn.addEventListener("click", () => {
    infoBox.classList.remove("activeInfo");
});

continueBtn.addEventListener("click", () => {
    infoBox.classList.remove("activeInfo");
    quizBox.classList.add("activeQuiz");
    showQuestion(queCount);
});

// Other functions
function showQuestion(index) {
    if (index >= questions.length) {
        // If all questions are answered, show the result
        showResult();
        return;
    }
    const queText = document.querySelector(".que_text");
    const que = questions[index];
    queText.textContent = que.question;

    const options = que.options.map((option, idx) => {
        return `<div class="option" onclick="optionSelected(this)">
                    <span>${option}</span>
                </div>`;
    });
    optionList.innerHTML = options.join("");
}

function optionSelected(answer) {
    let userAns = answer.textContent;
    let correctAns = questions[queCount].answer;
    if (userAns === correctAns) {
        userScore += 1;
    }
    queCount++;
    showQuestion(queCount);
}

function showResult() {
    quizBox.classList.remove("activeQuiz");
    resultBox.classList.add("activeResult");
    const scoreText = resultBox.querySelector(".score_text");
    scoreText.textContent = `Your score: ${userScore} / ${questions.length}`;
}
