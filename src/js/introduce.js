import Pikaday from 'pikaday';
import Error from './error';

export default class Introduce {
	constructor(container, user, toDo) {
		this.container = container;
		this.user = user;
		this.toDo = toDo;
		this.message = new Error(container);

		this.validate = this.validate.bind(this);
		this.start = this.start.bind(this);
		this.resume = this.resume.bind(this);
		this._formHandler = this._formHandler.bind(this);
		this._nameHandler = this._nameHandler.bind(this);
		this._genderHandler = this._genderHandler.bind(this);
		this._birthdayHandler = this._birthdayHandler.bind(this);
		this._addEventListeners = this._addEventListeners.bind(this);
		this._removeEventListeners = this._removeEventListeners.bind(this);
	}

	start() {
		this.form = document.createElement('form');
		this.form.classList.add('introduce');
		this.template = document.querySelector('.js-form-introduce');
		this.clone = document.importNode(this.template.content, true);
		this.name = this.clone.querySelector('.js-name');
		this.gender = this.clone.querySelectorAll('input[name=gend]');

		this.btnResume = document.createElement('input');
		this.btnResume.type = 'submit';
		this.btnResume.className = 'button btn-resume js-resume';
		this.btnResume.type = 'submit';
		this.btnResume.innerHTML = 'Resume';
				
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
		this._addEventListeners();
	}

	validate() {
		if (this.form.checkValidity()) {
			return true;
		} else {
			this.form.classList.add('show-validation');
			console.log(this.form)
			this.message.hide();
			this.message.show('Fill out all fields, please! Thanks!');
			return false;
		}
	}

	resume() {
		console.log(this.user)
		this._removeEventListeners();
		this.container.textContent = '';
		this.toDo();
	}

	_formHandler(e) {	
		e.preventDefault();
		const isValide = this.validate();
		if (isValide) {
			this.resume();
			console.log('send!');
		}
	}

	_nameHandler(e) {
		this.user.name = e.target.value;
	}

	_genderHandler(e) {	
		this.user.gender = e.target.value;
	}

	_birthdayHandler(e) {	
		this.user.age = getAge(e.target.value);
	}

	_addEventListeners() {
		this.form.addEventListener('submit', this._formHandler);
		this.name.addEventListener('change', this._nameHandler);
		this.gender.forEach(element => {
			element.addEventListener('change', this._genderHandler);
		});
		this.birthday.addEventListener('change', this._birthdayHandler);
	}

	_removeEventListeners() {
		this.form.removeEventListener('submit', this._formHandler);
		this.name.removeEventListener('change', this._nameHandler);
		this.gender.forEach(element => {
			element.removeEventListener('change', this._genderHandler);
		});
		this.birthday.removeEventListener('change', this._birthdayHandler);
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
