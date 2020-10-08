function redirectC() {
    window.location.href = "https://www.learn-c.org/";
}

function redirectPython() {
    window.location.href = "https://www.python.org/";
}

function redirectWebTech() {
    window.location.href = "https://www.w3schools.com/html/";
}

function redirectJava() {
    window.location.href = "https://docs.oracle.com/javase/tutorial/";
}

function redirectRPA() {
    window.location.href = "https://www.uipath.com/rpa/robotic-process-automation";
}

function redirectAIBlog() {
    window.location.href = "https://builtin.com/artificial-intelligence";
}

function redirectHTML() {
    window.location.href = "../HTML/quiz1.html";
}

function redirectPythonQuiz() {
    window.location.href = "../HTML/quiz2.html";
}

function redirectSQL() {
    window.location.href = "../HTML/quiz3.html";
}

function redirectJavaScript() {
    window.location.href = "../HTML/quiz4.html";
}

function redirectAI() {
    window.location.href = "../HTML/quiz5.html";
}

function redirectPHP() {
    window.location.href = "../HTML/quiz6.html";
}


/*Validation for contact us*/


function check_subscription(e) {

    e.preventDefault();
    if (document.getElementById("myCheck").checked) {

        alert("You information is submitted..\nThanks for the subscription..!");

    } else {
        alert("You information is submitted..!");
    }
    document.getElementById('form_id').reset();

}
