import Pikaday from 'pikaday';
import Error from './error';

export default class Introduce {
	constructor(container, user, toDo) {
		this.container = container;
		this.user = user;
		this.todo = toDo;
		this.message = new Error(container);

		this.validate = this.validate.bind(this);
		this.start = this.start.bind(this);
		this.resume = this.resume.bind(this);
		this._formHandler = this._formHandler.bind(this);
		this._cloneHandler = this._cloneHandler.bind(this);
		this._genderHandler = this._genderHandler.bind(this);
		this._btnResumeHandler = this._btnResumeHandler.bind(this);
		this._birthdayHandler = this._birthdayHandler.bind(this);
	}

	start() {
		this.form = document.createElement('form');
		this.form.classList.add('introduce');
		this.form.addEventListener('submit', this._formHandler);
		this.template = document.querySelector('.js-form-introduce');
		this.clone = document.importNode(this.template.content, true);
		this.name = this.clone.querySelector('.js-name');
		this.name.addEventListener('change', this._cloneHandler);
		const gender = this.clone.querySelectorAll('input[name=gend]');
		gender.forEach(element => {
			element.addEventListener('change', this._genderHandler);
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
			this.message.hide();
			this.message.show('Fill out all fields, please! Thanks!');
			return false;
		}
	}

	resume(toDo) {
		console.log(this.user)
		this.toDo();
		this.form.removeEventListener('submit', this._formHandler);
		this.name.removeEventListener('change', this._cloneHandler);
		this.gender.forEach(element => {
			element.removeEventListener('change', this._genderHandler);
		});
		this.btnResume.removeEventListener('click', this._btnResumeHandler);
		this.birthday.removeEventListener('change', this._birthdayHandler);
		this.container.textContent = '';
	}

	_formHandler(e) {	
		e.preventDefault();
		console.log('send!');
	}

	_cloneHandler(e) {	
		this.user.name = e.target.value;
	}

	_genderHandler(e) {	
		this.user.gender = e.target.value;
	}

	_btnResumeHandler() {	
		const isValide = this.validate();
			if (isValide) {
				this.resume();
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
