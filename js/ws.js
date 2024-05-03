// Get DOM elements
const elements = {
    wordText: document.querySelector(".word"),
    hintText: document.querySelector(".hint span"),
    timeText: document.querySelector(".time b"),
    inputField: document.querySelector("input"),
    refreshBtn: document.querySelector(".refresh-word"),
    checkBtn: document.querySelector(".check-word"),
    contentBox: document.querySelector(".container .content"),
    startArea: document.querySelector(".startArea"),
    scoreArea: document.querySelector(".score"),
    modal: document.getElementById("myModal"),
    modalContent: document.querySelector(".modal-content"),
    modalText: document.getElementById("modalText"),
    closeBtn: document.querySelector(".close")
};

// Game variables
let correctWord, timer;
let score = 0; 

// Initialize game timer
const initTimer = maxTime => {
    clearInterval(timer);
    timer = setInterval(() => {
        if(maxTime > 0) {
            maxTime--;
            return elements.timeText.innerText = maxTime;
        }
        endGame(true);
    }, 1000);
}

// Start the game
const startGame = () => {
    elements.contentBox.style.display = "block";
    elements.startArea.style.display = "none";
    initGame(); 
}

// End the game
const endGame = (isTimeOff) => {
    clearInterval(timer);
    elements.contentBox.style.display = "none";
    elements.startArea.style.display = "block";
    elements.modal.style.display = "block";
    elements.modalContent.classList.add("modal-wrong");
    elements.modalText.innerHTML = `
    <center><br>${isTimeOff ? "Time off!" : "Wrong word entered!"} <b>${correctWord.toUpperCase()}</b> was the correct word.
    <br>You Lost The Game ! :(
    </center><br>`;
}

// Win the game
const winGame = () => {
    clearInterval(timer);
    elements.contentBox.style.display = "none";
    elements.startArea.style.display = "block";
    elements.modal.style.display = "block";
    elements.modalContent.classList.add("modal-correct");
    elements.modalText.innerHTML = `<br><center>Congrats You WIN THE GAME !!!!!!`;
}

// Initialize the game
const initGame = () => {
    initTimer(30);
    let randomObj = words[Math.floor(Math.random() * words.length)];
    let wordArray = randomObj.word.split("");
    for (let i = wordArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }
    
    elements.wordText.innerText = wordArray.join("");
    elements.hintText.innerText = randomObj.hint;
    correctWord = randomObj.word.toLowerCase();;
    elements.inputField.value = "";
    elements.inputField.setAttribute("maxlength", correctWord.length);
    elements.scoreArea.innerHTML = score;

    if(score > 9)
        winGame();
}

// Check if the entered word is correct
const checkWord = () => {
    let userWord = elements.inputField.value.toLowerCase();

    if(!userWord) { 
        showError("Please enter the word to check!");
        return;
    }

    if(userWord !== correctWord) { 
        if(score >= 1) {
            score = score - 1; 
            elements.scoreArea.innerHTML = score;
        }
        showError(`Oops! <b>${userWord}</b> is not the correct word.`);
        return;
    }
  
    showSuccess(`Congrats! <b>${correctWord.toUpperCase()}</b> is the correct word`);
    score++;
    initGame();
}

// Show error message
const showError = (message) => {
    showModal(message, "modal-wrong");
}

// Show success message
const showSuccess = (message) => {
    showModal(message, "modal-correct");
}

// Show modal with message
const showModal = (message, modalClass) => {
    elements.modal.style.display = "block";
    elements.modalContent.classList.remove("modal-wrong");
    elements.modalContent.classList.remove("modal-correct");
    elements.modalContent.classList.add(modalClass);
    elements.modalText.innerHTML = `<br>${message}`;
}

// Event listeners
elements.refreshBtn.addEventListener("click", initGame);
elements.checkBtn.addEventListener("click", checkWord);
elements.closeBtn.addEventListener("click", () => {
    elements.modal.style.display = "none";
});

// Start the game when the page loads
startGame();
