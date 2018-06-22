import questions from './questions';
import Introduce from './introduce';
import Quiz from './quiz';

const container = document.querySelector('.js-container');

let usersAnswers = [];
const quiz = new Quiz(container, questions, usersAnswers);

const user = {};

const btnStart = document.querySelector('.js-start');
btnStart.addEventListener('click', function() {
	container.textContent = '';
	const introduce = new Introduce(container, user, quiz.start);
	introduce.start();
});