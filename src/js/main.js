import questions from './questions';
import Introduce from './introduce';
import Quiz from './quiz';

const container = document.querySelector('.js-container');

const quiz = new Quiz(container, questions);

const user = {};

let usersAnswers = [];

class UsersAnswer {
	constructor(id, answer) {
		this.id = id;
		this.answer = [];
	}
}

const btnStart = document.querySelector('.js-start');
btnStart.addEventListener('click', function() {
	container.textContent = '';
	const introduce = new Introduce(container, user, quiz);
	introduce.start();
});

function getUserAnswers() {
	const answers = document.querySelector('.question');
	for (let i = 0; i < answers.length; i++) {
		if ((questions[i].type === radio) || (questions[i].type === checkbox)) {
			console.log (answers[i].querySelector('input').checked);
		} else  {
			console.log('sdfsdf');
		}
	}
}