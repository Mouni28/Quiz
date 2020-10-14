(function() {
    var questions = [{
        question: "Inside which HTML element do we put the JavaScript?",
        choices: ["javascript", "scripted", "script", "js"],
        correctAnswer: 2,
        isbalnk: false,
    }, {
        question: "Where is the correct place to insert a JavaScript?",
        choices: ["In the head section", "In the body section", "Both in head and body section", "All of the above"],
        correctAnswer: 3,
        isbalnk: false,
    }, {
        question: "The external JavaScript file must contain the script tag.(True or Flase)?",
        choices: ["True", "False"],
        correctAnswer: 1,
        isbalnk: false,
    }, {
        question: "JavaScript is the same as Java.(True or Flase)?",
        choices: ["True", "False"],
        correctAnswer: 0,
        isbalnk: false,
    }, {
        question: "Which event occurs when the user clicks on an HTML element?",
        choices: [],
        isbalnk: true,
        correctAnswer: "onclick",
    }, {
        question: "How do you declare a JavaScript variable?",
        choices: ["var carName", "let carname", "variable carName", "A & B"],
        correctAnswer: 3,
        isbalnk: false,
    }, {
        question: "How do you create a function in JavaScript?",
        choices: ["funtion:myFunction()", "funtion myFunction()", "funtion = myFunction()", "funtion myFunction = new function ()"],
        correctAnswer: 2,
        isbalnk: false,
    }, {
        question: "Can you pass a anonymous function as an argument to another function?",
        choices: ["True", "False"],
        correctAnswer: 0,
        isbalnk: false,
    }, {
        question: "JavaScript is Case Sensitive.(True or Flase)?",
        choices: ["True", "False"],
        correctAnswer: 0,
        isbalnk: false,
    }, {
        question: "Which is not a primitive data type in JavaScript?",
        choices: ["boolean", "number", "string", "character"],
        correctAnswer: 3,
        isbalnk: false,
    }];

    var questionCounter = 0;
    var selections = [];
    var lockSelection = [false, false, false, false, false, false, false, false, false, false];
    var markReview = [false, false, false, false, false, false, false, false, false, false];
    var quiz = $('#quizque');


    displayNext();

    $('#exit').on('click', function(e) {
        e.preventDefault();
        endQuiz();
    })

    $('#mark').on('click', function(e) {
        e.preventDefault();
        mark();
        if (quiz.is(':animated')) {
            return false;
        }
        choose();

        if ((selections[questionCounter] == -3)) {
            alert('Please Answer the question.');
        } else {
            questionCounter++;
            displayNext();
        }
    })


    $('#next').on('click', function(e) {
        e.preventDefault();


        if (quiz.is(':animated')) {
            return false;
        }
        unmark();
        choose();

        if ((selections[questionCounter] == -3)) {
            alert('Please Answer the question.');
        } else {
            questionCounter++;
            displayNext();
        }
    });


    $('#prev').on('click', function(e) {
        e.preventDefault();

        if (quiz.is(':animated')) {
            return false;
        }
        choose();
        questionCounter--;
        displayNext();
    });


    $('#start').on('click', function(e) {
        e.preventDefault();

        if (quiz.is(':animated')) {
            return false;
        }
        questionCounter = 0;
        selections = [];
        var lockSelection = [false, false, false, false, false, false, false, false, false, false];
        var markReview = [false, false, false, false, false, false, false, false, false, false];
        displayNext();
        $('#start').hide();
    });

    function createQuestionElement(index) {
        var qElement = $('<div>', {
            id: 'question'
        });

        var header = $('<h2>Question ' + (index + 1) + ':</h2>');
        qElement.append(header);

        var question = $('<p>').append(questions[index].question);
        qElement.append(question);

        var radioButtons = createOptions(index);
        qElement.append(radioButtons);

        return qElement;
    }


    function createOptions(index) {
        var radioList = $('<ul>');
        var item;
        var input = '';

        if (questions[index].isbalnk) {
            item = $('<li>');
            if (lockSelection[index]) {
                input = '<input disabled type="text" name="answer" />';
            } else {
                input = '<input type="text" name="answer" />';
            }
            item.append(input);
            radioList.append(item);
        } else {
            for (var i = 0; i < questions[index].choices.length; i++) {
                item = $('<li>');
                if (lockSelection[index]) {
                    input = '<input disabled type="radio" name="answer" value=' + i + ' />';
                } else {
                    input = '<input type="radio" name="answer" value=' + i + ' />';
                }
                input += questions[index].choices[i];
                item.append(input);
                radioList.append(item);
            }
        }

        return radioList;
    }

    function removeAnswer() {
        var aElement = $('#inneranswer');
        aElement.remove();
    }


    function choose() {
        if (questions[questionCounter].isbalnk) {

            if (markReview[questionCounter]) {
                selections[questionCounter] = $('input[name="answer"]').val();
                if (selections[questionCounter] == "" || selections[questionCounter] == undefined) {
                    selections[questionCounter] = -2;
                }
            } else if (lockSelection[questionCounter]) {
                selections[questionCounter] = $('input[name="answer"]').val();
                if (selections[questionCounter] == "" || selections[questionCounter] == undefined) {
                    selections[questionCounter] = -1;
                }
            } else {
                selections[questionCounter] = $('input[name="answer"]').val();
            }

            if (selections[questionCounter] == "" || selections[questionCounter] == undefined) {
                selections[questionCounter] = -3
            }
        } else {
            if (markReview[questionCounter]) {
                selections[questionCounter] = +$('input[name="answer"]:checked').val();
                if (isNaN(selections[questionCounter])) {
                    selections[questionCounter] = -2;
                }
            } else if (lockSelection[questionCounter]) {
                selections[questionCounter] = +$('input[name="answer"]:checked').val();
                if (isNaN(selections[questionCounter])) {
                    selections[questionCounter] = -1;
                }
            } else {
                selections[questionCounter] = +$('input[name="answer"]:checked').val();
            }
            if (isNaN(selections[questionCounter])) {
                selections[questionCounter] = -3;
            }
        }

    }

    function mark() {
        markReview[questionCounter] = true;
    }

    function unmark() {
        markReview[questionCounter] = false;
    }

    function lock() {
        lockSelection[questionCounter] = true;
        var input = $('input[type=radio]');
        if (questions[questionCounter].isbalnk) {
            input = $('input[type=text]');
        }
        var i = 0;
        for (i = 0; i < input.length; i++) {
            input[i].disabled = true
        }
    }

    function displayNext() {
        quiz.fadeOut(function() {
            $('#question').remove();

            if (questionCounter < questions.length) {
                var nextQuestion = createQuestionElement(questionCounter);
                quiz.append(nextQuestion).fadeIn();
                if (!(isNaN(selections[questionCounter]))) {
                    $('input[value=' + selections[questionCounter] + ']').prop('checked', true);
                }

                if (questionCounter === 1) {
                    $('#prev').show();
                } else if (questionCounter === 0) {

                    $('#prev').hide();
                    $('#next').show();
                    $('#exit').show();
                    $('#mark').show()
                }
            } else {
                var scoreElem = displayScore();
                quiz.append(scoreElem).fadeIn();
                $('#next').hide();
                $('#prev').hide();
                $('#exit').hide();
                $('#mark').hide();
                $('#start').show();
            }
        });
    }

    function endQuiz() {
        questionCounter = questions.length;
        displayNext();
    }

    function displayScore() {
        console.log(selections);
        var score = $('<p>', { id: 'question' });

        var questonWiseMarks = '';

        var numCorrect = 0;
        for (var i = 0; i < questions.length; i++) {

            if (selections[i] != undefined) {
                if (selections[i].toString().toLowerCase() === questions[i].correctAnswer.toString()) {
                    numCorrect++;
                    questonWiseMarks += '<br><h3>Question ' + (i + 1) + ' you got 1 Point';
                } else {
                    questonWiseMarks += '<br><h3>Question ' + (i + 1) + ' you got 0 Point';
                }
            } else {
                questonWiseMarks += '<br><h3>Question ' + (i + 1) + ' you got 0 Point';
            }
        }

        score.append(questonWiseMarks);

        score.append('<br>Your Total Score is ' + numCorrect + '/' + questions.length);
        return score;
    }
})();
