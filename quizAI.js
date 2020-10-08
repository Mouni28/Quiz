(function () {
    var questions = [{
        question: "What is Artificial intelligence?",
        choices: ["Putting your intelligence into Computer", "Programming with your own intelligence", "Making a Machine intelligent", "Putting more memory into Computer"],
        correctAnswer: 2,
        isbalnk: false,
    }, {
        question: "Artificial Intelligence has its expansion in the following application.",
        choices: ["Planning and Scheduling", "Game Playing","Robotics", "All of the above"],
        correctAnswer: 3,
        isbalnk: false,
    }, {
        question:"The characteristics of the computer system capable of thinking and reasoning is known is",
        choices: ["machine intelligence", "human intelligence", "artificial intelligence", "virtual intelligence"],
        correctAnswer: 2,
        isbalnk: false,
    }, {
        question: "The first AI programming language was called:",
        choices: ["BASIC", "FORTRAN", "IPL", "LISP"],
        correctAnswer: 0,
        isbalnk: false,
    }, {
        question: "What is the term used for describing the judgmental or commonsense part of problem solving?",
        choices: ["Heuristic", "Critical", "Value based", "Analytical"],
        correctAnswer: 0,
        isbalnk: false,
    },{
        question: "What was originally called the \"imitation game\" by its creator?",
        choices: ["The Turing Test", "LISP", "The Logic Theorist", "Cybernetics"],
        correctAnswer: 0,
        isbalnk: false,
    },{
        question: "An AI technique that allows computers to understand associations between objects is:",
        choices: ["heuristic processing", "cognitive science", "relative symbolism", "pattern matching"],
        correctAnswer: 1,
        isbalnk: false,
    },{
        question: "What is the term used to describe the judgmental or commonsense part of problem solving?",
        choices: ["Heuristic", "Critical", "Value based", "Analytical"],
        correctAnswer: 0,
        isbalnk: false,
    },{
        question: "The field that investigates the mechanics of human intelligence is:",
        choices: ["History", "Cognitive Science", "Psychology", "Sociology"],
        correctAnswer: 1,
        isbalnk: false,
    }, {
        question: "Which planning consists of successive representations of different levels?",
        choices: ["hierarchical planning", "non-hierarchical planning", "project planning", "All of the above"],
        correctAnswer: 3,
        isbalnk: false,

    }];

    var questionCounter = 0;
    var selections = [];
    var lockSelection = [false, false, false, false, false, false, false, false, false, false];
    var markReview = [false, false, false, false, false, false, false, false, false, false];
    var quiz = $('#quizque');


    displayNext();

    $('#exit').on('click', function (e) {
        e.preventDefault();
        endQuiz();
    })

    $('#mark').on('click', function (e) {
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


    $('#next').on('click', function (e) {
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


    $('#prev').on('click', function (e) {
        e.preventDefault();
        
        if (quiz.is(':animated')) {
            return false;
        }
        choose();
        questionCounter--;
        displayNext();
    });


    $('#start').on('click', function (e) {
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

        if(questions[index].isbalnk) {
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
        if(questions[questionCounter].isbalnk) {

            if(markReview[questionCounter]) {
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
            
            if(selections[questionCounter] == "" || selections[questionCounter] == undefined) {
                selections[questionCounter] = -3
            }
        } else {
            if(markReview[questionCounter]) {
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
            if(isNaN(selections[questionCounter])) {
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
        if(questions[questionCounter].isbalnk) {
            input = $('input[type=text]');
        }
        var i = 0;
        for (i = 0; i < input.length; i++) {
            input[i].disabled = true
        }
    }

    function displayNext() {
        quiz.fadeOut(function () {
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
        for(var i = 0; i < questions.length; i++) {
            
            if(selections[i] != undefined) {
                if (selections[i].toString().toLowerCase() === questions[i].correctAnswer.toString()) {
                    numCorrect++;
                    questonWiseMarks += '<br><h3>Question ' + (i+1) + ' you got 1 Point';  
                } else {
                    questonWiseMarks += '<br><h3>Question ' + (i+1) + ' you got 0 Point';  
                }
            } else {
                questonWiseMarks += '<br><h3>Question ' + (i+1) + ' you got 0 Point';  
            }
        }

        score.append(questonWiseMarks);

        score.append('<br>Your Total Score is ' + numCorrect + '/' + questions.length);
        return score;
    }
})();


