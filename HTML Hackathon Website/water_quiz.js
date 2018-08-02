(function() {
  function buildQuiz() {
    // we'll need a place to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // we'll want to store the list of answer choices
      const answers = [];

      // and for each available answer...
      for (letter in currentQuestion.answers) {
        // ...add an HTML radio button
        answers.push(
          `<label>
            <input type="radio" name="question${questionNumber}" value="${letter}">
            ${letter} :
            ${currentQuestion.answers[letter]}
          </label>`
        );
      }

      // add this question and its answers to the output
      output.push(
        `<div class="question"> ${currentQuestion.question} </div>
        <div class="answers"> ${answers.join("")} </div>`
      );
    });

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join("");
  }

  function showResults() {
    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll(".answers");

    // keep track of user's answers in an array (each index holds the number of times you click on a through d)
    var water_score = 0;

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if (userAnswer === "a") {
        //
        water_score += 1;
      } else if (userAnswer === "b") {
        // 
        water_score += 2;
      } else if (userAnswer === "c") {
        // 
        water_score += 3;;
      }
    });

    var saver_type = "";

    // set your super power according to the answer you clicked on most
    if(water_score < 5) {
      saver_type = "You are a super saver!";
    } 
    else if(water_score >=5 && water_score < 10) {
      saver_type = "You are pretty good at saving water, but you can definitely save more!";
    } 
    else {
      saver_type = "You should really start saving more water. Take a look at the water saving tips!";
    } 

    // show your super power
    resultsContainer.innerHTML = `${saver_type}`;
  }

  //select our HTML tags and store references to these elements in variables
  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");
  const myQuestions = [
    {
      question: "How long are your showers?",
      answers: {
        a: "I get in and get out: 5 minutes max!",
        b: "Maybe 10 or 15 minutes. Someimtes it's hard to get out when it's cold!",
        c: "At least 30 minutes. That's where I do my thinking!"
      },
    },
    {
      question: "Do you leave the water running while you brush your teeth?",
      answers: {
        a: "Of course not! That's a waste of water!",
        b: "Sometimes, depends on if I remember.",
        c: "Yeah, why wouldn't you?"
      },
    },
    {
      question: "When do you water your lawn?",
      answers: {
        a: "Twice a week, early in the morning.",
        b: "Every day, in the morning.",
        c: "Every day, in the afternoon."
      },
    },
    {
      question: "What do you do with the water you don't drink?",
      answers: {
        a: "I drink all of the water I pour myself.",
        b: "I water the plants!",
        c: "Just pour it down the sink."
      },
    }
  ];

  // display quiz right away
  buildQuiz();

  // on submit, show results
  submitButton.addEventListener("click", showResults);
})();