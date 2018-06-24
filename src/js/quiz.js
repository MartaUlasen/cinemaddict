import Error from './error';

const PREV = 320;
const NEXT = -320;

let coordinateX = 0;

export default class Quiz {
	constructor(container, questions, usersAnswers) {
		this.container = container;
		this.questions = questions;
		this.message = new Error(container);
		this.usersAnswers = usersAnswers;

		this.form = document.createElement('form');
		this.form.className = 'quiz';
		this.form.setAttribute('novalidate', true);
		this.quiz = document.createElement('div');
		this.quiz.className = 'questions';
		
		this._formHandler = this._formHandler.bind(this);
		this._textInputhandler = this._textInputhandler.bind(this);
		this._radioInputHandler = this._radioInputHandler.bind(this);
		this._btnPreviousHandler = this._btnPreviousHandler.bind(this);
		this._btnNextHandler = this._btnNextHandler.bind(this);
		this._btnSubmitHandler = this._btnSubmitHandler.bind(this);
		this._addEventListeners = this._addEventListeners.bind(this);
		this._removeEventListeners = this._removeEventListeners.bind(this);

		this.slide = this.slide.bind(this);
		this.validate = this.validate.bind(this);
		this.start = this.start.bind(this);
		this.submit = this.submit.bind(this);

	}
	start() {
		this.questionIndex = 0;
		for(let i = 0; i < this.questions.length; i++) {
			const template = document.querySelector('.js-question');
			const clone = document.importNode(template.content, true);
			clone.querySelector('.js-question__title').textContent = `Question ${i + 1}/${this.questions.length}`;
			clone.querySelector('.js-question__content').textContent = this.questions[i].question;
			
			if (this.questions[i].type === 'input') {
				const templateQuestion = document.querySelector('.js-input');
				const cloneQuestion = document.importNode(templateQuestion.content, true);
				this.textInput = cloneQuestion.querySelector('.js-text-input');
				this.textInput.placeholder = 'Your answer';
				this.textInput.addEventListener('blur', this._textInputhandler);
				
				clone.querySelector('.js-question__answers').appendChild(cloneQuestion);
					
			} else if (this.questions[i].type === 'checkbox'){
				for(let j = 0; j < this.questions[i].variantsOfAnswers.length; j++) {
					const templateQuestion = document.querySelector('.js-checkbox');
					const cloneQuestion = document.importNode(templateQuestion.content, true);
					cloneQuestion.querySelector('input').name = this.questions[i].id;
					cloneQuestion.querySelector('input').value = this.questions[i].variantsOfAnswers[j];
					cloneQuestion.querySelector('.js-checkbox-label').textContent = this.questions[i].variantsOfAnswers[j];
					clone.querySelector('.js-question__answers').appendChild(cloneQuestion);
				} 
			} else {
				for(let j = 0; j < this.questions[i].variantsOfAnswers.length; j++) {
					const templateQuestion = document.querySelector('.js-radio');
					const cloneQuestion = document.importNode(templateQuestion.content, true);
					this.radioInput = cloneQuestion.querySelector('input');
					this.radioInput.name = this.questions[i].id;
					this.radioInput.value = this.questions[i].variantsOfAnswers[j];
					this.radioInput.addEventListener('change', this._radioInputHandler);
					cloneQuestion.querySelector('.js-checkbox-label').textContent = this.questions[i].variantsOfAnswers[j];
					clone.querySelector('.js-question__answers').appendChild(cloneQuestion);
				}
			}
			this.quiz.appendChild(clone);
			this.form.appendChild(this.quiz);
		}	
		this.btnPrevious = document.createElement('button');
		this.btnPrevious.className = 'button btn-previous js-previous';
		this.btnPrevious.innerHTML = 'Previous';
		this.btnPrevious.type = 'button';
		this.btnPrevious.disabled = true;
		this.btnNext = document.createElement('button');
		this.btnNext.className = 'button btn-next js-next';
		this.btnNext.innerHTML = 'Next';
		this.btnNext.type = 'button';
		this.btnSubmit = document.createElement('input');
		this.btnSubmit.className = 'button btn-submit js-submit hidden';
		this.btnSubmit.type = 'submit';
		this.btnSubmit.innerHTML = 'Submit';
		this.btns = document.createElement('div');
		this.btns.className = 'buttons';
		this.btns.appendChild(this.btnPrevious);
		this.btns.appendChild(this.btnNext);
		this.btns.appendChild(this.btnSubmit);
		this.form.appendChild(this.btns);
		this.container.appendChild(this.form);
		this._addEventListeners();
	}
	slide(value) {
		const block = document.querySelector('.questions');
		const translateX = coordinateX + value + 'px';
		if ((translateX !== (-320 * this.questions.length + 'px')) && 
			(translateX !== (320 + 'px'))) {
			coordinateX += value;
			block.style.transform = 'translateX(' + translateX + ')';
			if (value > 0) {
				this.questionIndex --;
			} else {
				this.questionIndex ++;
			}
			if (translateX === (-320 * (this.questions.length - 1) + 'px')) {
				this.btnNext.classList.add('hidden');
				this.btnSubmit.classList.remove('hidden');
			} else if (translateX === (0 + 'px')){
				this.btnPrevious.disabled = true;
			} else {
				this.btnPrevious.disabled = false;
				this.btnNext.classList.remove('hidden');
				this.btnSubmit.classList.add('hidden');
			}
		}
	}

	validate() {
		const answers = this.form.querySelectorAll('.js-question__answers');
			
		if (this.questions[this.questionIndex].type === 'input') {
			this.answerTextInput = answers[this.questionIndex].querySelector('.js-text-input');
			
			if (this.answerTextInput.validity.valid) {
				return true;
			} else {
				this.answerTextInput.classList.add('invalid');
				this.message.hide();
				this.message.show('Fill out all fields, please!');
				return false;
			}
		} else if (this.questions[this.questionIndex].type === 'radio') {
			this.answersRadioInput = answers[this.questionIndex].querySelectorAll('input[type="radio"]');
			this.answersRadioInput = Array.prototype.slice.call(this.answersRadioInput)
			function isCheck(input) {
				return input.validity.valid;
			}
			if (this.answersRadioInput.some(isCheck)) {
				return true;
			} else {
				this.answersRadioInput.forEach(function(radio) {
					radio.classList.add('invalid');
				});
				this.message.hide();
				this.message.show('Fill out all fields, please!');
				return false;
			}
		} else return true;
	}

	submit() {
		const dataAnswers = document.querySelectorAll('.js-question__answers');
		
		for (let i = 0; i < dataAnswers.length; i++) {
						
			const usersAnswer =  new UsersAnswer;
			usersAnswer.id = i;
			
			if ((this.questions[i].type === 'radio') || (this.questions[i].type === 'checkbox')) {
				const variantsOfAnswers = dataAnswers[i].querySelectorAll('input');
				const checkedAnswers = [];
				for (let i = 0; i < variantsOfAnswers.length; i++) {
					if (variantsOfAnswers[i].checked) {
						checkedAnswers.push(variantsOfAnswers[i].value);
					}
				}

				usersAnswer.answer = checkedAnswers;
				
			} else  {
				const textAnswer = dataAnswers[i].querySelector('input').value;
				usersAnswer.answer.push(textAnswer);
			}
			this.usersAnswers.push(usersAnswer);
		}
	}

	_formHandler(e) {
		e.preventDefault();
		this.submit();
		console.log('send!');
	}
	_textInputhandler(e) {
		if (e.target.value) {
			if (e.target.classList.contains('invalid')) {
				this.answerTextInput.classList.remove('invalid');
			}			
		}
	}
	_radioInputHandler(e) {
		if (e.target.checked) {
			if (e.target.classList.contains('invalid')) {
				this.answersRadioInput.forEach(function(radio) {
					radio.classList.remove('invalid');
				});
			}
			
		}
	}
	_btnPreviousHandler() {
		this.slide(PREV);
	}
	_btnNextHandler() {
		const isValide = this.validate();
		if (isValide) {
			this.slide(NEXT);
		}
		
	}
	_btnSubmitHandler() {
		this.validate();
	}

	_addEventListeners() {
		this.btnPrevious.addEventListener('click', this._btnPreviousHandler);
		this.btnNext.addEventListener('click', this._btnNextHandler);
		this.btnSubmit.addEventListener('click', this._btnSubmitHandler);
		this.form.addEventListener('submit', this._formHandler);
	}

	_removeEventListeners() {
		this.btnPrevious.removeEventListener('click', this._btnPreviousHandler);
		this.btnNext.removeEventListener('click', this._btnNextHandler);
		this.btnSubmit.removeEventListener('click', this._btnSubmitHandler);
		this.form.removeEventListener('submit', this._formHandler);
	}
}

class UsersAnswer {
	constructor(id, answer) {
		this.id = id;
		this.answer = [];
	}
}