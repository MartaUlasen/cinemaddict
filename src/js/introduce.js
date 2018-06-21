import Pikaday from 'pikaday';
import getQuizForm from './main';
import Error from './error';

const container = document.querySelector('.js-container');
const message = new Error(container);

export default class Introduce {
	constructor(container, user) {
		this.container = container
		this.user = user;

		this.validate = this.validate.bind(this);
		this.show = this.show.bind(this);
		this.resume = this.resume.bind(this);
		this._formHandler = this._formHandler.bind(this);
		this._cloneHandler = this._cloneHandler.bind(this);
		this._gendHandler = this._gendHandler.bind(this);
		this._btnResumeHandler = this._btnResumeHandler.bind(this);
		this._birthdayHandler = this._birthdayHandler.bind(this);
	}

	show() {
		this.form = document.createElement('form');
		this.form.classList.add('introduce');
		this.form.addEventListener('submit', this._formHandler);
		this.template = document.querySelector('.js-form-introduce');
		this.clone = document.importNode(this.template.content, true);
		this.clone.querySelector('.js-name').addEventListener('change', this._cloneHandler);
		const gend = this.clone.querySelectorAll('input[name=gend]');
		gend.forEach(element => {
			element.addEventListener('change', this._gendHandler);
		});

		this.btnResume = document.createElement('input');
		this.btnResume.type = 'submit';
		this.btnResume.className = 'button btn-resume js-resume';
		this.btnResume.type = 'submit';
		this.btnResume.innerHTML = 'Resume';
		this.btnResume.addEventListener('click', this._btnResumeHandler);
				
		this.btns = document.createElement('div');
		this.btns.className = 'buttons';
		this.btns.appendChild(this.btnResume);
		
		this.form.appendChild(this.clone);
		this.form.appendChild(this.btns);
		this.container.appendChild(this.form);
		this.picker = new Pikaday({ 
			field: document.getElementById('datepicker'),
			yearRange: [1900, (new Date()).getFullYear()],
			maxDate: new Date()
		});
		
		this.birthday = document.querySelector('.js-datepicker');
		this.birthday.addEventListener('change', this._birthdayHandler);
	}

	validate() {
		if (this.form.checkValidity()) {
			return true;
		} else {
			this.form.classList.add('show-validation');
			message.hide();
			message.show('Fill out all fields, please! Thanks!');
			return false;
		}
	}

	resume(toDo) {
		this.container.textContent = '';
		this.toDo = toDo;
		this.toDo;
		/* this.form.removeEventListener('submit', this._formHandler);
		this.clone.querySelector('.js-name').removeEventListener('change', this._cloneHandler);
		this.gend.forEach(element => {
			element.removeEventListener('change', this._gendHandler);
		});
		this.btnResume.removeEventListener('click', this._btnResumeHandler);
		this.birthday.removeEventListener('change', this._birthdayHandler); */
		getQuizForm();
	}

	_formHandler(e) {	
		e.preventDefault();
		console.log('send!');
	}

	_cloneHandler(e) {	
		this.user.name = e.target.value;
	}

	_gendHandler(e) {	
		this.user.gend = e.target.value;
	}

	_btnResumeHandler() {	
		const isValide = this.validate();
			if (isValide) {
				//getQuizForm();
				this.resume(getQuizForm());
			}
	}

	_birthdayHandler(e) {	
		this.user.age = getAge(e.target.value);
	}

}

const getAge = (dateString) => {
	const today = new Date();
	const birthDate = new Date(dateString);
	let age = today.getFullYear() - birthDate.getFullYear();
	const m = today.getMonth() - birthDate.getMonth();
	if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
		age--;
	}
	return age;
}
