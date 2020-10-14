(function() {
    var questions = [{
            question: "Which statement will output $x on the screen?",
            choices: ["echo \“\$x\”;", "echo \“$$x\”;", " echo \“/$x\”;", "echo \“$x;"],
            correctAnswer: 0,
            isbalnk: false,
        },
        {
            question: "What does PHP stands for?",
            choices: ["Person Home Page", "Pretext Hypertext Processor", "Preprocessor Home Page", "Hypertext Preprocessor "],
            correctAnswer: 3,
            isbalnk: false,
        },
        {
            question: "Varialbles always start with a .... in PHP ",
            choices: ["Pond-Sign", "Yen-Sign", "Dollar-Sign", "Euro-Sign"],
            correctAnswer: 2,
            isbalnk: false,
        },
        {
            question: "Which of the below namespace declaration is right ",
            choices: ["namespace ORA:", "namespace 1_RA;", "namespace ORA;", "namespace ORA_#:"],
            correctAnswer: 2,
            isbalnk: false,
        },
        {
            question: "Multiple namespaces cannot be defined in the same file (True/False)",
            choices: ["True", "False"],
            isbalnk: false,
            correctAnswer: 1,
        },
        {
            question: "Which version of PHP introduced Try/catch Exception?",
            choices: ["PHP 4", " PHP 5", "PHP 5.3", "PHP 6"],
            correctAnswer: "1",
            isbalnk: false,
        },
        {
            question: "A PHP script should start with ___ and end with ___:",
            choices: ["< php >", "< ? php ?>", "< ? ? >", "< ?php ? >"],
            correctAnswer: 3,
            isbalnk: false,
        },
        {
            question: "Which PHP function among the following is used to find files?",
            choices: ["glob()", "file()", "fold()", "get_file()"],
            correctAnswer: 0,
            isbalnk: false,
        },
        {
            question: "PHP’s numerically indexed array begin with position __.",
            choices: ["1", "2", "0", "-1"],
            correctAnswer: 2,
            isbalnk: false,
        },
        {
            question: "Equivalent statement to $add+=$add is:",
            choices: ["$add = $add", "$add = $add + 1", "$add = $add +$add", "$add = $add + $add + 1"],
            correctAnswer: 2,
            isbalnk: false,

        }
    ];

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
