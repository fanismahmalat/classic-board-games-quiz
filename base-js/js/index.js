let state = {
  score: 0,
  activeQuestion: 1,
  questions: [],
  results: [],
};

/**
 * initializeApp
 * Fetches data from source and sets state
 * @returns {void}
 */
const initialize = () => {
  // Fetch URLs
  const getQuestions = fetch('https://proto.io/en/jobs/candidate-exercise/quiz.json');
  const getResults = fetch('https://proto.io/en/jobs/candidate-exercise/result.json');

  // Fetch data
  Promise.all([getQuestions, getResults])
    .then((res) => {
      // Get JSON from responses
      return Promise.all(res.map((res) => res.json()));
    })
    .then(function (data) {
      // Set state
      state = {
        ...state,
        pageTitle: data[0].title,
        pageDescription: data[0].description,
        questions: data[0].questions,
        results: data[1].results,
      };

      document.getElementById('loading').style.display = 'none';
      document.getElementById('page-title').innerHTML = data[0].title;
      document.getElementById('page-description').innerHTML = data[0].description;

      // Add submit button listener
      setView();
      submitListener();
    })
    .catch((error) => console.log(error));
};

/**
 * setView
 * Populates page with questions' data
 * @returns {void}
 */
const setView = () => {
  state.questions.forEach((question, i) => {
    // Data for boolean question
    const boolAnswers = [true, false];

    // Get the data of the question
    const questionType = question.question_type;
    const answers = questionType === 'truefalse' ? boolAnswers : question.possible_answers;

    // Create answers element and append single answers
    const answersWrapperEl = document.createElement('div');
    answersWrapperEl.setAttribute('class', 'q-answers');

    answers.forEach((answer) => {
      if (questionType === 'truefalse') {
        var boolAnswerCaption, boolAnswerID;
        boolAnswerCaption = answer.toString().charAt(0).toUpperCase() + answer.toString().slice(1);
        boolAnswerID = `q-${question.q_id}-${answer}`;
      }

      // Create answer label
      const answerLabelEl = document.createElement('label');
      answerLabelEl.setAttribute(
        'for',
        questionType === 'truefalse' ? boolAnswerID : `a-${answer.a_id}`
      );
      const answerText = document.createTextNode(
        `${questionType === 'truefalse' ? boolAnswerCaption : answer.caption}`
      );
      answerLabelEl.appendChild(answerText);

      // Create answer input
      const answerInput = document.createElement('input');
      answerInput.setAttribute(
        'type',
        questionType === 'multiplechoice-multiple' ? 'checkbox' : 'radio'
      );
      answerInput.setAttribute('name', `q-${question.q_id}`);
      answerInput.setAttribute(
        'value',
        `${questionType === 'truefalse' ? answer : answer.caption}`
      );
      answerInput.setAttribute(
        'id',
        questionType === 'truefalse' ? boolAnswerID : `a-${answer.a_id}`
      );

      // Create answer wrapper
      const answerWrapperEl = document.createElement('div');
      answerWrapperEl.setAttribute('class', 'answer');

      // Append elements to question box
      answerWrapperEl.appendChild(answerInput);
      answerWrapperEl.appendChild(answerLabelEl);

      answersWrapperEl.appendChild(answerWrapperEl);
    });

    // Create title element
    const titleEl = document.createElement('p');
    titleEl.setAttribute('class', 'q-title');
    const titleText = document.createTextNode(`${question.q_id}. ${question.title}`);
    titleEl.appendChild(titleText);

    // Create image element
    const imageEl = document.createElement('img');
    imageEl.setAttribute('class', 'q-image');
    imageEl.setAttribute('alt', 'Question image');
    imageEl.setAttribute('src', question.img);

    // Create right column wrapper
    const rightCol = document.createElement('div');
    rightCol.setAttribute('class', 'right-col');
    rightCol.appendChild(titleEl);
    rightCol.appendChild(answersWrapperEl);

    // Create question wrapper element
    const questionWrapperEl = document.createElement('div');
    questionWrapperEl.setAttribute('id', `q-${question.q_id}`);
    questionWrapperEl.setAttribute('class', `question ${i === 0 ? 'active' : ''}`);
    questionWrapperEl.appendChild(imageEl);

    questionWrapperEl.appendChild(rightCol);

    // Append question to the form
    const formEl = document.getElementById('form');
    const navEl = formEl.querySelector('.nav');
    formEl.insertBefore(questionWrapperEl, navEl);
  });
};

/**
 * submitListener
 * Listens for button clicks
 * @returns {EventListener}
 */
const submitListener = () => {
  const submitButton = document.getElementById('submit-btn');

  submitButton.addEventListener('click', async () => {
    // Get active question
    const activeQuestion = document.querySelector('.active');
    const answers = activeQuestion.getElementsByTagName('input');

    const userAnswer = getUserAnswer(answers);

    // Handle no answer
    if (userAnswer.length === 0) {
      return (document.getElementById('message').innerHTML = 'Please choose an answer');
    } else {
      // Clear error
      document.getElementById('message').innerHTML = '';
    }

    // Validate answer
    const validation = validateAnswer(userAnswer);

    if (validation.isCorrect) {
      const questionPoints = state.questions[state.activeQuestion - 1].points;

      incrementScore(questionPoints);
      await showAnswerResult(true, validation.correctAnswer);
    } else {
      await showAnswerResult(false, validation.correctAnswer);
    }

    // Handle active question
    if (state.activeQuestion !== state.questions.length) {
      // Proceed to next question
      activeQuestion.classList.remove('active');
      document.querySelector(`#q-${state.activeQuestion + 1}`).classList.add('active');
      state.activeQuestion++;
    } else {
      // Show results
      showFinalResult();
    }
  });
};

/**
 * getUserAnswer
 * Returns checked inputs
 * @param {[HTMLInputElement]} answers Array of input elements
 * @returns {[number | boolean]} Array of ids or booleans
 */
const getUserAnswer = (answers) => {
  let userAnswer = [];

  for (let i = 0; i < answers.length; i++) {
    const includesTrue = answers[i].getAttribute('id').includes('true');
    const includesFalse = answers[i].getAttribute('id').includes('false');

    const answer = {
      isBoolean: includesTrue || includesFalse,
      value: includesTrue ? true : false,
    };

    if (answers[i].checked) {
      if (answer.isBoolean) {
        userAnswer.push(answer.value);
        break;
      }

      userAnswer.push(parseInt(answers[i].getAttribute('id').split('-')[1]));
    }
  }

  return userAnswer;
};

/**
 * validateAnswer
 * Checks whether the answer is correct
 * @param {[number | boolean]} userAnswer The answer of the user
 * @returns {object} A boolean property and the correct answer
 */
const validateAnswer = (userAnswer) => {
  const correctAnswer = state.questions[state.activeQuestion - 1].correct_answer;
  const questionType = state.questions[state.activeQuestion - 1].question_type;

  let validation = {
    isCorrect: false,
    correctAnswer,
  };

  if (questionType === 'multiplechoice-single' || questionType === 'truefalse') {
    if (correctAnswer === userAnswer[0]) {
      validation.isCorrect = true;
    }
  } else if (questionType === 'multiplechoice-multiple') {
    if (
      correctAnswer.length === userAnswer.length &&
      correctAnswer.every((cAnswer) => userAnswer.includes(cAnswer))
    ) {
      validation.isCorrect = true;
    }
  }

  return validation;
};

/**
 * showAnswerResult
 * Shows the validated answer for 3 seconds
 * @param {boolean} isCorrect
 * @param {boolean | number | [number]} correctAnswer
 * @returns {Promise}
 */
const showAnswerResult = (isCorrect, correctAnswer) => {
  return new Promise((resolve, reject) => {
    const questionType = state.questions[state.activeQuestion - 1].question_type;
    const messageEl = document.getElementById('message');

    // Disable button
    document.getElementById('submit-btn').disabled = true;

    const toggleStyles = (addStyles) => {
      switch (questionType) {
        case 'multiplechoice-single':
          var label = document.querySelector(`label[for=a-${correctAnswer}]`);
          addStyles ? label.classList.add('correct') : label.classList.remove('correct');
          break;
        case 'multiplechoice-multiple':
          correctAnswer.forEach((el) => {
            var label = document.querySelector(`label[for=a-${el}]`);
            addStyles ? label.classList.add('correct') : label.classList.remove('correct');
          });
          break;
        case 'truefalse':
          var label = document.querySelector(
            `label[for=q-${state.activeQuestion}-${correctAnswer}]`
          );
          addStyles ? label.classList.add('correct') : label.classList.remove('correct');
          break;
        default:
          break;
      }
    };

    if (isCorrect) {
      messageEl.innerHTML = 'Correct answer!';
    } else {
      messageEl.innerHTML = 'Wrong answer.';
      toggleStyles(true);
    }

    setTimeout(() => {
      messageEl.innerHTML = '';
      toggleStyles(false);
      document.getElementById('submit-btn').disabled = false;
      resolve();
    }, 3000);
  });
};

/**
 * incrementScore
 * Increments the score
 * @param {number} points
 * @returns {void}
 */
const incrementScore = (points) => {
  state.score += points;
};

/**
 * showFinalResult
 * Populates page with quiz result
 * @returns {void}
 */
const showFinalResult = () => {
  const scorePercentage = (state.score * 100) / 20;

  const result = state.results.find(
    (result) => scorePercentage > result.minpoints && scorePercentage < result.maxpoints
  );

  // Get result element
  const resultEl = document.getElementById('final-result');

  // Set title
  const resultTitle = resultEl.querySelector('.right-col .r-title');
  resultTitle.innerHTML = result.title;

  // Set message
  const resultMessage = resultEl.querySelector('.right-col .r-message');
  resultMessage.innerHTML = result.message;

  // Set image
  const resultImage = resultEl.querySelector('.r-image');
  resultImage.setAttribute('src', result.img);

  // Set score
  const resultScore = resultEl.querySelector('.right-col .r-score');
  resultScore.innerHTML = `${scorePercentage}%`;

  // Set button
  const resetButton = resultEl.querySelector('.right-col #reset');
  resetButton.addEventListener('click', reset);

  document.getElementById('form').style.display = 'none';
  resultEl.style.display = 'flex';
};

/**
 * reset
 * Resets quiz state
 * @return {void}
 */
const reset = () => {
  // Reset state
  state.score = 0;
  state.activeQuestion = 1;

  // Reset active class
  const activeQuestion = document.querySelector('.active');
  activeQuestion.classList.remove('active');
  document.querySelector(`#q-${state.activeQuestion}`).classList.add('active');

  // Reset inputs
  document.querySelectorAll('input').forEach((input) => (input.checked = false));

  // Reset view
  document.getElementById('form').style.display = 'block';
  document.getElementById('final-result').style.display = 'none';
};
