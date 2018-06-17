import Pikaday from 'pikaday';
import Error from './error';

const container = document.querySelector('.js-container');

const mess = new Error(container);

const PREV = 320;
const NEXT = -320;

const user = {};
let usersAnswers = [];

class UsersAnswer {
	constructor(id, answer) {
		this.id = id;
		this.answer = [];
	}
}

let x = 0;

const btnStart = document.querySelector('.js-start');
btnStart.addEventListener('click', function() {
	clearContainer();
	getIntroduceForm();
});


function clearContainer() {
	container.textContent = '';
}

function getIntroduceForm() {
	const form = document.createElement('form');
	form.classList.add('introduce');
	const template = document.querySelector('.js-form-introduce');
	const clone = document.importNode(template.content, true);	
	clone.querySelector('.js-name').addEventListener('input', e => {
		user.name = e.target.value;
		console.log(user)
	});
	const gend = clone.querySelectorAll('input[name=gend]');
	gend.forEach(element => {
		element.addEventListener('change', e => {
			user.gend = e.target.value;
		});
	});

	const btnResume = document.createElement('button');
	btnResume.className = 'button btn-resume js-resume';
	btnResume.type = 'submit';
	btnResume.innerHTML = 'Resume';
	btnResume.addEventListener('click', function() {
		clearContainer();
		getQuizForm();
	});
	const btns = document.createElement('div');
	btns.className = 'buttons';
	btns.appendChild(btnResume);
	
	form.appendChild(clone);
	form.appendChild(btns);
	container.appendChild(form);
	const picker = new Pikaday({ 
		field: document.getElementById('datepicker'),
		yearRange: [1900, (new Date()).getFullYear()],
		maxDate: new Date()
    });
	
	const birthday = document.querySelector('.js-datepicker');
	birthday.addEventListener('change', e => {
		user.age = getAge(e.target.value);
	});
}

function getAge(dateString) {
	const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

function getQuizForm() {
	const form = document.createElement('form');
	form.className = 'quiz';
	const quiz = document.createElement('div');
	quiz.className = 'questions';
	
	for(let i = 0; i < questions.length; i++) {
		const template = document.querySelector('.js-question');
		const clone = document.importNode(template.content, true);
		clone.querySelector('.js-question__title').textContent = `Question ${i + 1}/${questions.length}`;
		clone.querySelector('.js-question__content').textContent = questions[i].question;
		
		if (questions[i].type === 'input') {
			const templateQuestion = document.querySelector('.js-input');
			const cloneQuestion = document.importNode(templateQuestion.content, true);
			const textInput = cloneQuestion.querySelector('.js-text-input');
			textInput.placeholder = 'Your answer';
			textInput.addEventListener('blur', e => {
				if (e.target.value) {
					textInput.classList.remove('invalid');
				}
			})
			const userAnswer = new UsersAnswer;
			
			clone.querySelector('.js-question__answers').appendChild(cloneQuestion);
				
		} else if (questions[i].type === 'checkbox'){
			for(let j = 0; j < questions[i].variantsOfAnswers.length; j++) {
				const templateQuestion = document.querySelector('.js-checkbox');
				const cloneQuestion = document.importNode(templateQuestion.content, true);
				cloneQuestion.querySelector('input').name = questions[i].id;
				cloneQuestion.querySelector('input').value = questions[i].variantsOfAnswers[j];
				cloneQuestion.querySelector('.js-checkbox-label').textContent = questions[i].variantsOfAnswers[j];
				clone.querySelector('.js-question__answers').appendChild(cloneQuestion);
			} 
		} else {
			for(let j = 0; j < questions[i].variantsOfAnswers.length; j++) {
				const templateQuestion = document.querySelector('.js-radio');
				const cloneQuestion = document.importNode(templateQuestion.content, true);
				cloneQuestion.querySelector('input').name = questions[i].id;
				cloneQuestion.querySelector('input').value = questions[i].variantsOfAnswers[j];
				cloneQuestion.querySelector('.js-checkbox-label').textContent = questions[i].variantsOfAnswers[j];
				clone.querySelector('.js-question__answers').appendChild(cloneQuestion);
			}
		}
		quiz.appendChild(clone);
		form.appendChild(quiz);
	}	
	const btnPrevious = document.createElement('button');
	btnPrevious.className = 'button btn-previous js-previous';
	btnPrevious.innerHTML = 'Previous';
	btnPrevious.type = 'button';
	btnPrevious.disabled = true;
	btnPrevious.addEventListener('click', function() {
		slide(PREV, btnPrevious, btnNext, btnSubmit);
	});
	const btnNext = document.createElement('button');
	btnNext.className = 'button btn-next js-next';
	btnNext.innerHTML = 'Next';
	btnNext.type = 'button';
	btnNext.addEventListener('click', function() {
		slide(NEXT, btnPrevious, btnNext, btnSubmit);
	});
	const btnSubmit = document.createElement('input');
	btnSubmit.className = 'button btn-submit js-submit hidden';
	btnSubmit.type = 'submit';
	btnSubmit.innerHTML = 'Submit';
	btnSubmit.addEventListener('click', function () {
		validate(form);
	});

	const btns = document.createElement('div');
	btns.className = 'buttons';
	btns.appendChild(btnPrevious);
	btns.appendChild(btnNext);
	btns.appendChild(btnSubmit);
	form.appendChild(btns);
	
	form.addEventListener('submit', e => {	
		e.preventDefault(); // Cancel form data sending
		console.log('send!');
	});
	
	container.appendChild(form);
	
}

function slide(value, btnPrevious, btnNext, btnSubmit) {
	const block = document.querySelector('.questions');
	const translateX = x + value + 'px';
	if ((translateX !== (-320 * questions.length + 'px')) && 
		(translateX !== (320 + 'px'))) {
		x += value;
		block.style.transform = 'translateX(' + translateX + ')';
		if (translateX === (-320 * (questions.length - 1) + 'px')) {
			
			btnNext.classList.add('hidden');
			btnSubmit.classList.remove('hidden');
		} else if (translateX === (0 + 'px')){
			btnPrevious.disabled = true;
		} else {
			btnPrevious.disabled = false;
			btnNext.classList.remove('hidden');
			btnSubmit.classList.add('hidden');
		}
	}
}

function validate(form) {
	form.classList.add('show-validation');
	mess.hide();
	mess.show('Fill out all fields, please! Thanks!');
	//showErrorMessage (container);
}

function showErrorMessage (container) {
	const errorMessage = document.createElement('div');
	errorMessage.className = 'error';
	errorMessage.innerHTML = "Please, fill out all field! Thanks!";
	let timerId;
	
	if ((container.querySelector('.error')) === null) {
		container.insertBefore(errorMessage, container.firstChild);
		timerId = setTimeout(function () {
			container.removeChild(errorMessage);
		}, 5000);
	} else {
		timerId = 0;
	}
}

const questions = [
	{	
		id: 0,
		question: 'Guess the movie from the quote: "I am going to make him an offer he can not refuse"',
		type: "radio",
		variantsOfAnswers: ["Lock, Stock and Two Smoking Barrels", 
		"Snatch", "The Godfather"],
		answers: "The Godfather"
	},
	{
		id: 1,
		question: "In what year the movie Inception was released?",
		type: "input",
		variantsOfAnswers: "",
		answers: "2010"
	},
	{
		id: 2,
		question: "Who starred in the movie Ocean's Eleven?",
		type: "checkbox",
		variantsOfAnswers: [" George Clooney", " Brad Pitt", 
		"Matt Damon", "Julia Roberts", "Tom Cruise"],
		answers: [" George Clooney", " Brad Pitt", "Matt Damon", 
		"Julia Roberts"]
	},
	{
		id: 3,
		question: 'Guess the movie by storyline: "A botched card game in London triggers four friends, thugs, weed-growers, hard gangsters, loan sharks and debt collectors to collide with each other in a series of unexpected events, all for the sake of weed, cash and two antique shotguns."',
		type: "checkbox",
		variantsOfAnswers: ["Lock, Stock and Two Smoking Barrels", 
		"Snatch", "The Man from U.N.C.L.E", "RocknRolla"],
		answers: "Lock, Stock and Two Smoking Barrels"
	},
	{
		id: 4,
		question: "In what year was born was born Leonardo DiCaprio?",
		type: "input",
		variantsOfAnswers: "",
		answers: "1974"
	},
	{
		id: 5,
		question: "Luke Skywalker is the son of...",
		type: "radio",
		variantsOfAnswers: ["Darth Vader", "Ben Obi-Wan Kenobi"],
		answers: "Darth Vader"
	},
	{
		id: 6,
		question: "Guess the title of the film: ____: A Dog's Tale",
		type: "input",
		variantsOfAnswers: "",
		answers: "Hachi"
	},
];

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