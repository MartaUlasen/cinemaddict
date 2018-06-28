export default class CheckQuiz {
	constructor(container, questions, usersAnswers) {
		this.container = container;
		this.questions = questions;
		this.usersAnswers = usersAnswers;

		this.result = document.createElement('div');
		this.result.classList.add('result');

		this.getCountOfRightAnswers = this.getCountOfRightAnswers.bind(this);
		this.displayAnswers = this.displayAnswers.bind(this);
	}

	getCountOfRightAnswers() {
		let countRightAnswers = 0;
		
		for(let i = 0; i < this.questions.length; i++) {
			if (compareArrays(this.questions[i].answers, this.usersAnswers[i].answers)) {
				countRightAnswers ++;
			}
		}
		return countRightAnswers;
	}

	displayAnswers() {
		this.container.textContent = '';
		for(let i = 0; i < this.questions.length; i++) {
			const template = document.querySelector('.js-result');
			const clone = document.importNode(template.content, true);
			clone.querySelector('.js-question__title').textContent = `Question ${i + 1}/${this.questions.length}`;
			clone.querySelector('.js-question__content').textContent = this.questions[i].question;
			clone.querySelector('.js-question__answer--right').textContent = this.questions[i].answers;
			clone.querySelector('.js-question__answer--user').textContent = this.usersAnswers[i].answers;
			this.result.appendChild(clone);
		}
		this.container.appendChild(this.result);
		this.getCountOfRightAnswers();


	}
}

const compareArrays = (arr1, arr2) => {
	const l1 = arr1.length;
	const l2 = arr2.length;

	if (l1 !== l2) {
		return false;
	}

	for (let i = 0; i < l1; i++) {
		if (arr1[i] !== arr2[i]) {
			return false;
		}
	}

	return true;
}
