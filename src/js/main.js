import questions from './questions';
import Introduce from './introduce';
import Quiz from './quiz';
import CheckQuiz from './checkQuiz';

const container = document.querySelector('.js-container');

let usersAnswers = [];

const checkQuiz = new CheckQuiz(container, questions, usersAnswers);

const quiz = new Quiz(container, questions, usersAnswers, checkQuiz.displayAnswers);

const user = {};

const btnStart = document.querySelector('.js-start');
btnStart.addEventListener('click', function() {
	container.textContent = '';
	const introduce = new Introduce(container, user, quiz.start);
	introduce.start();
});