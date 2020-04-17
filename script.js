/*-------selecting elements--------*/
const word = document.getElementById('word');
const wrong = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const notification = document.getElementById('notification-container');
const popup = document.getElementById('popup-container');
const finalMessage = document.getElementById('final-message');
const hangmanBodyParts = document.querySelectorAll('.figure-part');

//declare an array of words
const words = ['rose','computer','hangman','pulchritudinous','graveyard',
                'ironhack', 'lockdown', 'javascript', 'college', 'always',
               'salt', 'practical', 'also', 'brief', 'country', 'muscle', 'neighborhood', 'beyond', 'grew', 'pig'];
let selectedWord = words[Math.floor(Math.random()*words.length)];

const correctLetters = [];
const wrongLetters = [];

//show hidden word
function displayWord(){
    word.innerHTML = `${selectedWord.split('').map(letter =>`<span class="letter">${correctLetters.includes(letter) ? letter : ''}</span>`
    ).join('')}`;

    const innerWord = word.innerText.replace(/\n/g,'');          //remove newline character
    if(innerWord === selectedWord){
        finalMessage.innerText = 'Congratulations, You won!';
        popup.style.display = 'flex';
    }
}

//show notification
function showNotification(){
 notification.classList.add('show');

 setTimeout(() => {
    notification.classList.remove('show');
 },1500);
}

//show wrong letters
function showWrongLetters(){
   wrong.innerHTML =`${wrongLetters.length > 0 ? `<p>Wrong</p><span>${wrongLetters}</span>`:''}`;
    hangmanBodyParts.forEach((part,index) => {
        const num = wrongLetters.length;

        if(index < num){
            part.style.display = 'block';
        }
        else{
            part.style.display = 'none';
        }

        //check if game has been lost
        if(wrongLetters.length === hangmanBodyParts.length){
            finalMessage.innerText = `Sorry, you have lost, the answer is "${selectedWord}"`;
            popup.style.display = 'flex';
        }
    });
}

/*------when user strikes a key------*/
window.addEventListener('keydown', e => {
     if(e.keyCode >= 65 && e.keyCode <= 90){
         const letter = e.key;
         if (selectedWord.includes(letter)){
             if(!correctLetters.includes(letter)){
             correctLetters.push(letter);
             displayWord();
             }
             else{
                 showNotification();
             }
         }
         else{
             if(!wrongLetters.includes(letter)){
             wrongLetters.push(letter);
             showWrongLetters();
             }
             else{
                 showNotification();
             }
         }
     }
});

/*------play again------*/
playAgainBtn.addEventListener('click', () =>{
    //empty the arrays
    correctLetters.splice(0);
    wrongLetters.splice(0);
   
    selectedWord = words[Math.floor(Math.random()*words.length)];

    displayWord();

    showWrongLetters();

    popup.style.display='none';

}); 


displayWord();
