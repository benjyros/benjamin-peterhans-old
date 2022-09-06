$(document).ready(function () {
    var words = new Array;
    var wordArray = new Array;
    var previousGuesses = new Array;
    var currentWord;
    var currentClue;
    var wrongAnswerCount;

    $.getJSON("../Datas/wordlist.json", function (data) {
        for (i = 0; i < data.wordlist.length; i++) {
            words[i] = new Array;
            words[i][0] = data.wordlist[i].word;
            words[i][1] = data.wordlist[i].clue;
        }
        titleScreen();
    }) //get json

    function titleScreen() {
        $("#gameContent").append('<div id="gameTitle">HANGMAN</div><div id="startButton" class="button">BEGIN</div>');
        $("#startButton").on("click", function () {
            gameScreen();
        });
    } //display game

    function gameScreen() {
        $('#gameContent').empty();
        $('#gameContent').append('<div id="container"><canvas id="hangman" width="180" height="250"></canvas></div>');
        $('#gameContent').append('<div id="placeholder"></div>');
        $('#gameContent').append('<div id="clueholder"></div>');
        $('#gameContent').append('<div id="input"><label for="letter">Letter: </label><input type="text" maxlength="1" id="letter"><button class="button" id="enterLetter">OK</button></div>');
        $('#gameContent').append('<div id="guesses">Previous guesses:</div>');
        $('#gameContent').append('<div id="feedback"></div>');

        getWord();

        var numberOfTiles = currentWord.length;
        wrongAnswerCount = 0;
        previousGuesses = [];

        for (i = 0; i < numberOfTiles; i++) {
            $('#placeholder').append('<div class="tile" id=t' + i + '></div>');
        }

        $('#clueholder').append("HINT: " + currentClue);

        $('#enterLetter').on("click", onBtnClick);
    } //gamescreen

    function getWord() {
        var rnd = Math.floor(Math.random() * words.length);
        currentWord = words[rnd][0];
        currentClue = words[rnd][1];
        words.splice(rnd, 1);
        wordArray = currentWord.split("");
    } //getword

    function onBtnClick() {
        var letter = $("#letter").val();
        $(this).val('');
        var found = false;
        var previouslyEntered = false;
        var input = (letter).toLowerCase();

        for (i = 0; i < previousGuesses.length; i++) {
            if (input == previousGuesses[i]) {
                previouslyEntered = true;
            }
        }

        if (!previouslyEntered && input != "" && checkLetter(input)) {
            previousGuesses.push(input);

            for (i = 0; i < wordArray.length; i++) {

                if (input == wordArray[i]) {
                    found = true;
                    $('#t' + i).append(input);
                }

            }

            if (found) {
                checkAnswer();
            }
            else {
                wrongAnswer(input);
            }
        }
    }

    function checkLetter(letter) {
        return /^[A-Za-z]*$/.test(letter);
    }

    function checkAnswer() {
        var currentAnswer = "";
        for (i = 0; i < currentWord.length; i++) {
            currentAnswer += ($('#t' + i).text());
        }
        if (currentAnswer == currentWord) {
            victoryMessage();
        };
    } //checkanswer

    function wrongAnswer(a) {
        wrongAnswerCount++;
        $('#guesses').append("  " + a);
        draw(wrongAnswerCount);
        if (wrongAnswerCount == 10) {
            defeatMessage();
        }
    } //wronganswer

    function draw(part) {
        const hangman = document.getElementById('hangman').getContext("2d");
        switch (part) {
            //bottom
            case (1):
                hangman.strokeStyle = "black";
                hangman.lineWidth = 5;
                hangman.beginPath();
                hangman.moveTo(0, 245);
                hangman.lineTo(180, 245);
                hangman.stroke();
                break;
            //pole
            case (2):
                hangman.beginPath();
                hangman.moveTo(30, 245);
                hangman.lineTo(30, 5);
                hangman.stroke();
                break;
            //top
            case (3):
                hangman.beginPath();
                hangman.moveTo(10, 15);
                hangman.lineTo(120, 15);
                hangman.stroke();
                break;
            //rope
            case (4):
                hangman.beginPath();
                hangman.moveTo(110, 15);
                hangman.lineTo(110, 30);
                hangman.stroke();
                break;
            //head
            case (5):
                hangman.beginPath();
                hangman.arc(110, 55, 25, 0, Math.PI * 2, true);
                hangman.closePath();
                hangman.stroke();
                break;
            //spine
            case (6):
                hangman.beginPath();
                hangman.moveTo(110, 80);
                hangman.lineTo(110, 160);
                hangman.stroke();
                break;
            //arm left
            case (7):
                hangman.beginPath();
                hangman.moveTo(110, 90);
                hangman.lineTo(90, 130);
                hangman.stroke();
                break;
            //arm right
            case (8):
                hangman.beginPath();
                hangman.moveTo(110, 90);
                hangman.lineTo(130, 130);
                hangman.stroke();
                break;
            //leg left
            case (9):
                hangman.beginPath();
                hangman.moveTo(110, 160);
                hangman.lineTo(90, 220);
                hangman.stroke();
                break;
            //leg right
            case (10):
                hangman.beginPath();
                hangman.moveTo(110, 160);
                hangman.lineTo(130, 220);
                hangman.stroke();
                break;
        }
    }

    function victoryMessage() {
        $('#enterLetter').off("click", onBtnClick);
        $('#feedback').append("CORRECT!<br><br><div id='replay' class='button'>CONTINUE</div>");
        $('#replay').on("click", function () {
            if (words.length > 0) {
                gameScreen()
            }
            else { finalPage() }
        });
    } //victory 

    function defeatMessage() {
        $('#enterLetter').off("click", onBtnClick);
        $('#feedback').append("You're Dead!<br>(answer = " + currentWord + ")<div id='replay' class='button'>CONTINUE</div>");
        $('#replay').on("click", function () {
            if (words.length > 0) {
                gameScreen()
            }
            else { finalPage() }
        });
    } //defeat 

    function finalPage() {
        $('#gameContent').empty();
        $('#gameContent').append('<div id="finalMessage">You have finished all the words in the game!</div>');
    } //finalpage 
});