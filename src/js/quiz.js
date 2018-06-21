import Error from './error';

const PREV = 320;
const NEXT = -320;


let coordinateX = 0;

export default class Quiz {
	constructor(container, questions) {
		this.container = container;
		this.questions = questions;
		this.message = new Error(container);

		this.form = document.createElement('form');
		this.form.className = 'quiz';
		this.quiz = document.createElement('div');
		this.quiz.className = 'questions';
		
		this._formHandler = this._formHandler.bind(this);
		this._textInputhandler = this._textInputhandler.bind(this);
		this._btnPreviousHandler = this._btnPreviousHandler.bind(this);
		this._btnNextHandler = this._btnNextHandler.bind(this);
		this._btnSubmitHandler = this._btnSubmitHandler.bind(this);

		for(let i = 0; i < this.questions.length; i++) {
			const template = document.querySelector('.js-question');
			const clone = document.importNode(template.content, true);
			clone.querySelector('.js-question__title').textContent = `Question ${i + 1}/${questions.length}`;
			clone.querySelector('.js-question__content').textContent = questions[i].question;
			
			if (this.questions[i].type === 'input') {
				const templateQuestion = document.querySelector('.js-input');
				const cloneQuestion = document.importNode(templateQuestion.content, true);
				const textInput = cloneQuestion.querySelector('.js-text-input');
				textInput.placeholder = 'Your answer';
				textInput.addEventListener('blur', this._textInputhandler);
				
				clone.querySelector('.js-question__answers').appendChild(cloneQuestion);
					
			} else if (this.questions[i].type === 'checkbox'){
				for(let j = 0; j < questions[i].variantsOfAnswers.length; j++) {
					const templateQuestion = document.querySelector('.js-checkbox');
					const cloneQuestion = document.importNode(templateQuestion.content, true);
					cloneQuestion.querySelector('input').name = questions[i].id;
					cloneQuestion.querySelector('input').value = questions[i].variantsOfAnswers[j];
					cloneQuestion.querySelector('.js-checkbox-label').textContent = questions[i].variantsOfAnswers[j];
					clone.querySelector('.js-question__answers').appendChild(cloneQuestion);
				} 
			} else {
				for(let j = 0; j < this.questions[i].variantsOfAnswers.length; j++) {
					const templateQuestion = document.querySelector('.js-radio');
					const cloneQuestion = document.importNode(templateQuestion.content, true);
					cloneQuestion.querySelector('input').name = questions[i].id;
					cloneQuestion.querySelector('input').value = questions[i].variantsOfAnswers[j];
					cloneQuestion.querySelector('.js-checkbox-label').textContent = questions[i].variantsOfAnswers[j];
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
		this.btnPrevious.addEventListener('click', this._btnPreviousHandler);
		this.btnNext = document.createElement('button');
		this.btnNext.className = 'button btn-next js-next';
		this.btnNext.innerHTML = 'Next';
		this.btnNext.type = 'button';
		this.btnNext.addEventListener('click', this._btnNextHandler);
		this.btnSubmit = document.createElement('input');
		this.btnSubmit.className = 'button btn-submit js-submit hidden';
		this.btnSubmit.type = 'submit';
		this.btnSubmit.innerHTML = 'Submit';
		this.btnSubmit.addEventListener('click', this._btnSubmitHandler);
		this.btns = document.createElement('div');
		this.btns.className = 'buttons';
		this.btns.appendChild(this.btnPrevious);
		this.btns.appendChild(this.btnNext);
		this.btns.appendChild(this.btnSubmit);
		this.form.appendChild(this.btns);
		this.form.addEventListener('submit', this._formHandler);
		this.container.appendChild(this.form);
		
		this.slide = this.slide.bind(this);
		this.validate = this.validate.bind(this);
		//this.submit = this.submit.bind(this);

	}

	slide(value) {
		const block = document.querySelector('.questions');
		const translateX = coordinateX + value + 'px';
		if ((translateX !== (-320 * this.questions.length + 'px')) && 
			(translateX !== (320 + 'px'))) {
			coordinateX += value;
			block.style.transform = 'translateX(' + translateX + ')';
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
		if (this.form.checkValidity()) {
			return true;
		} else {
			this.form.classList.add('show-validation');
			this.message.hide();
			this.message.show('Fill out all fields, please! Thanks!');
			return false;
		}
	}

	_formHandler(e) {
		e.preventDefault();
		console.log('send!');
	}
	_textInputhandler(e) {
		if (e.target.value) {
			textInput.classList.remove('invalid');
		}
	}
	_btnPreviousHandler() {
		this.slide(PREV);
	}
	_btnNextHandler() {
		this.slide(NEXT);
		const isValide = this.validate();
			if (isValide) {
				this.resume(getQuizForm());
			}
	}
	_btnSubmitHandler() {
		this.validate();
	}
}